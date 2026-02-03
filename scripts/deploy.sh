#!/bin/bash
# Deployment script for bienvenue-agents
# Usage: ./scripts/deploy.sh
#
# Required environment variables:
#   DEPLOY_PATH - Path to the application on the server
#   HEALTH_URL  - URL for health check endpoint
#
# This script performs:
#   1. Backup of current version
#   2. Pull latest code
#   3. Install dependencies with uv
#   4. Rolling restart
#   5. Health check
#   6. Automatic rollback on failure

set -euo pipefail

DEPLOY_PATH="${DEPLOY_PATH:-/opt/bienvenue}"
HEALTH_URL="${HEALTH_URL:-http://localhost:8000/health}"
BACKUP_DIR="${DEPLOY_PATH}/backups"
MAX_BACKUPS=5
HEALTH_TIMEOUT=30

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

error() {
    log "ERROR: $1" >&2
    exit 1
}

# Create backup
create_backup() {
    log "Creating backup..."
    mkdir -p "$BACKUP_DIR"

    BACKUP_NAME="backup_$(date '+%Y%m%d_%H%M%S')"
    BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"

    # Store current commit hash
    cd "$DEPLOY_PATH"
    git rev-parse HEAD > "$BACKUP_PATH.commit"

    # Copy current venv if exists
    if [ -d ".venv" ]; then
        cp -r .venv "$BACKUP_PATH.venv"
    fi

    log "Backup created: $BACKUP_NAME"

    # Cleanup old backups (keep last MAX_BACKUPS)
    cd "$BACKUP_DIR"
    ls -t *.commit 2>/dev/null | tail -n +$((MAX_BACKUPS + 1)) | while read -r f; do
        rm -f "$f" "${f%.commit}.venv" 2>/dev/null || true
    done
}

# Pull latest code
pull_code() {
    log "Pulling latest code..."
    cd "$DEPLOY_PATH"
    git fetch origin
    git reset --hard origin/main
    log "Code updated to $(git rev-parse --short HEAD)"
}

# Install dependencies
install_deps() {
    log "Installing dependencies..."
    cd "$DEPLOY_PATH"
    uv sync --all-extras
    log "Dependencies installed"
}

# Restart service
restart_service() {
    log "Restarting service..."

    # Try systemd first
    if systemctl is-active --quiet bienvenue-agents 2>/dev/null; then
        sudo systemctl restart bienvenue-agents
        log "Service restarted via systemd"
        return
    fi

    # Try docker-compose
    if [ -f "docker-compose.yml" ]; then
        docker-compose restart api
        log "Service restarted via docker-compose"
        return
    fi

    # Direct uvicorn (find and restart)
    pkill -f "uvicorn.*bienvenue" || true
    sleep 2
    cd "$DEPLOY_PATH"
    nohup uv run uvicorn src.main:app --host 0.0.0.0 --port 8000 > /var/log/bienvenue/app.log 2>&1 &
    log "Service restarted via uvicorn"
}

# Health check
health_check() {
    log "Running health check..."

    for i in $(seq 1 $HEALTH_TIMEOUT); do
        if curl -sf "$HEALTH_URL" > /dev/null 2>&1; then
            log "Health check passed!"
            return 0
        fi
        sleep 1
    done

    error "Health check failed after ${HEALTH_TIMEOUT}s"
}

# Rollback
rollback() {
    log "Rolling back to previous version..."

    LATEST_BACKUP=$(ls -t "$BACKUP_DIR"/*.commit 2>/dev/null | head -1)

    if [ -z "$LATEST_BACKUP" ]; then
        error "No backup found for rollback!"
    fi

    COMMIT=$(cat "$LATEST_BACKUP")
    cd "$DEPLOY_PATH"
    git reset --hard "$COMMIT"

    # Restore venv if exists
    VENV_BACKUP="${LATEST_BACKUP%.commit}.venv"
    if [ -d "$VENV_BACKUP" ]; then
        rm -rf .venv
        mv "$VENV_BACKUP" .venv
    else
        uv sync --all-extras
    fi

    restart_service
    log "Rollback completed to $COMMIT"
}

# Main deployment flow
main() {
    log "Starting deployment..."

    create_backup

    if ! pull_code; then
        error "Failed to pull code"
    fi

    if ! install_deps; then
        log "Failed to install dependencies, rolling back..."
        rollback
        exit 1
    fi

    restart_service

    if ! health_check; then
        log "Health check failed, rolling back..."
        rollback
        exit 1
    fi

    log "Deployment successful!"
}

main "$@"

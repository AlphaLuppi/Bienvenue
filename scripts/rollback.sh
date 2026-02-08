#!/bin/bash
# Quick rollback script for bienvenue-agents
# Usage: ./scripts/rollback.sh [backup_name]
#
# If no backup_name is provided, uses the most recent backup.
# Target: Complete rollback in under 2 minutes.

set -euo pipefail

DEPLOY_PATH="${DEPLOY_PATH:-/opt/bienvenue}"
HEALTH_URL="${HEALTH_URL:-http://localhost:8000/health}"
BACKUP_DIR="${DEPLOY_PATH}/backups"
HEALTH_TIMEOUT=30

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

error() {
    log "ERROR: $1" >&2
    exit 1
}

# List available backups
list_backups() {
    log "Available backups:"
    ls -t "$BACKUP_DIR"/*.commit 2>/dev/null | while read -r f; do
        COMMIT=$(cat "$f")
        NAME=$(basename "${f%.commit}")
        echo "  - $NAME (commit: ${COMMIT:0:8})"
    done
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
    if [ -f "$DEPLOY_PATH/docker-compose.yml" ]; then
        cd "$DEPLOY_PATH"
        docker-compose restart api
        log "Service restarted via docker-compose"
        return
    fi

    # Direct uvicorn
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

# Perform rollback
rollback() {
    local BACKUP_NAME="$1"
    local BACKUP_FILE

    if [ -z "$BACKUP_NAME" ]; then
        # Use most recent backup
        BACKUP_FILE=$(ls -t "$BACKUP_DIR"/*.commit 2>/dev/null | head -1)
        if [ -z "$BACKUP_FILE" ]; then
            error "No backups found!"
        fi
    else
        BACKUP_FILE="$BACKUP_DIR/${BACKUP_NAME}.commit"
        if [ ! -f "$BACKUP_FILE" ]; then
            error "Backup not found: $BACKUP_NAME"
        fi
    fi

    COMMIT=$(cat "$BACKUP_FILE")
    VENV_BACKUP="${BACKUP_FILE%.commit}.venv"

    log "Rolling back to commit: $COMMIT"

    # Restore code
    cd "$DEPLOY_PATH"
    git fetch origin
    git reset --hard "$COMMIT"

    # Restore venv if exists, otherwise reinstall
    if [ -d "$VENV_BACKUP" ]; then
        log "Restoring cached virtualenv..."
        rm -rf .venv
        cp -r "$VENV_BACKUP" .venv
    else
        log "Reinstalling dependencies..."
        uv sync --all-extras
    fi

    # Restart service
    restart_service

    # Verify health
    health_check

    log "Rollback completed successfully!"
}

# Main
main() {
    START_TIME=$(date +%s)

    if [ "${1:-}" = "--list" ] || [ "${1:-}" = "-l" ]; then
        list_backups
        exit 0
    fi

    log "Starting rollback..."
    rollback "${1:-}"

    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))
    log "Total rollback time: ${DURATION}s"

    if [ $DURATION -gt 120 ]; then
        log "WARNING: Rollback took longer than 2 minutes target!"
    fi
}

main "$@"

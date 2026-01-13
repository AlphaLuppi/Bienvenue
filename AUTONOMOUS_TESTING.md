# Autonomous Testing Guide for Claude Code

This document explains how Claude Code can autonomously verify changes and ensure no regressions. **Focus on shipping fast** - tests should verify critical paths, not every UI element.

## Philosophy: MVP Testing

**IMPORTANT**: We prioritize shipping speed over test coverage.

### Real E2E, No Mocks

E2E tests are **real end-to-end tests**:
- Frontend (localhost:5173) makes **actual HTTP calls** to the backend (localhost:3000)
- Backend makes **real Supabase calls** (use a test/staging Supabase project)
- **NO mocking** of API calls or services in tests
- Only the database is a "mock" (test Supabase instance, not production)

This ensures tests catch real integration issues between frontend and backend.

- **Test critical user flows**, not individual UI elements
- **Keep tests minimal** - fewer stable tests beat many fragile tests
- **Don't test implementation details** - test what users actually do
- **A test that breaks on every UI change is worse than no test**

### What to Test (Critical Paths)
1. Can users visit the home page?
2. Can users access the signin page?
3. Are protected routes actually protected?
4. Do main pages load without errors?

### What NOT to Test
- Individual button labels or text content
- Specific CSS classes or styling
- Minor UI elements that change frequently
- Implementation details

## Quick Verification Commands

```bash
# Full verification (run this before completing any task)
bun run verify                    # Type check + lint + build

# Start servers (keep running in background)
bun run dev

# Run E2E smoke tests (only critical paths)
cd apps/web && bun run test:e2e
```

## Standard Workflow

**For any code change, follow this order:**

### 1. Verify Code Quality
```bash
bun run verify
```
This runs type checking, linting, and build in one command. All must pass.

### 2. Run Smoke Tests
```bash
cd apps/web && bun run test:e2e
```
Only run if dev servers are running (`bun run dev`).

### 3. Manual Check (When Needed)
Use Claude in Chrome MCP to visually verify:
- Take screenshot: `mcp__claude-in-chrome__computer` with `action: "screenshot"`
- Navigate: `mcp__claude-in-chrome__navigate` with target URL
- Get tab context first: `mcp__claude-in-chrome__tabs_context_mcp`

## Browser Automation Quick Reference

```
# Get available tabs
mcp__claude-in-chrome__tabs_context_mcp

# Navigate to page
mcp__claude-in-chrome__navigate
  url: "http://localhost:5173"
  tabId: <id>

# Screenshot
mcp__claude-in-chrome__computer
  action: "screenshot"
  tabId: <id>

# Click element
mcp__claude-in-chrome__computer
  action: "left_click"
  coordinate: [x, y]
  tabId: <id>
```

## Writing New Tests

When adding features, **only add E2E tests for critical user flows**.

### Good Test (MVP approach)
```typescript
test('user can complete the main flow', async ({ page }) => {
  // Test the FLOW, not individual elements
  await page.goto('/');
  await expect(page).toHaveTitle(/bienvenue/i);

  // User navigates to signin
  await page.goto('/signin');
  await expect(page.url()).toContain('/signin');
});
```

### Bad Test (Don't do this)
```typescript
test('button has correct text', async ({ page }) => {
  // Testing implementation details - AVOID
  const btn = page.getByRole('button', { name: 'Exact Text' });
  await expect(btn).toBeVisible();
});
```

## Test Files

| File | Purpose |
|------|---------|
| `e2e/smoke.spec.ts` | Critical paths - pages load, routes work |
| `e2e/auth.spec.ts` | Auth flow - signin exists, protected routes redirect |

**Current: 8 tests, ~3 seconds to run.**

**Keep it minimal.** If a test breaks every time you change the UI, delete it.

### Running Real E2E Tests

To run tests against the real stack:

```bash
# Terminal 1: Start full stack
bun run dev
# Wait for both servers to start:
# - Web: http://localhost:5173
# - API: http://localhost:3000

# Terminal 2: Run tests
cd apps/web && bun run test:e2e
```

The frontend will make real API calls to the backend. Ensure both `.env` files are configured with valid Supabase credentials.

## Troubleshooting

### Servers Not Running
```bash
bun run dev  # Start servers first
```

### Tests Too Fragile
If a test breaks on minor UI changes:
1. Make the selector more general
2. Test the flow, not the element
3. Or delete the test - it's not worth maintaining

### Type Errors
```bash
bun run check-types  # See specific errors
```

## CI/CD

GitHub Actions runs automatically on PRs to main/preprod:
1. Type check
2. Lint
3. Build
4. E2E smoke tests

## Checklist Before Completing Tasks

- [ ] `bun run verify` passes (types + lint + build)
- [ ] E2E smoke tests pass (if servers running)
- [ ] Visual check for UI changes (use browser automation)

**Remember: Ship fast. Tests are a tool, not a goal.**

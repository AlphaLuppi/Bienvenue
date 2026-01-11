# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bienvenue is a SvelteKit 2 web application for finding new life opportunities, featuring interactive maps, user authentication via Supabase, and a modern UI built with shadcn-svelte components. Deployed to Vercel.

## Common Commands

```bash
npm run dev           # Start development server
npm run build         # Production build
npm run preview       # Preview production build
npm run check         # Type-check with svelte-check
npm run check:watch   # Type-check in watch mode
npm run lint          # Check formatting (Prettier) and lint (ESLint)
npm run format        # Auto-format all files with Prettier
npm run test:unit     # Run unit tests with Vitest (watch mode)
npm run test:unit -- --run  # Run unit tests once
npm run test:e2e      # Run Playwright E2E tests
npm run test          # Run all tests (unit + e2e)
```

## Svelte 5 Runes (Critical)

This project uses **Svelte 5** with runes. Do NOT use Svelte 4 syntax:

| Feature | Svelte 4 (DON'T USE) | Svelte 5 (USE THIS) |
|---------|---------------------|---------------------|
| Reactive state | `let count = 0` | `let count = $state(0)` |
| Derived values | `$: doubled = count * 2` | `let doubled = $derived(count * 2)` |
| Side effects | `$: { ... }` | `$effect(() => { ... })` |
| Props | `export let prop` | `let { prop } = $props()` |
| Event handlers | `on:click={handler}` | `onclick={handler}` |
| Slots | `<slot />` | `{@render children()}` with snippets |

Key patterns:
- Use `$derived.by(() => ...)` for complex derivations
- Use `$effect.pre()` instead of `beforeUpdate`
- Use `$bindable()` for two-way bindable props
- Use `$state.raw()` for non-deep reactive state (performance)
- Event modifiers like `|preventDefault` are not supported - use wrapper functions

## SvelteKit 2 Patterns

- **Errors/Redirects**: Call directly, don't throw: `error(500, 'message')` not `throw error(...)`
- **Cookies**: Always specify path: `cookies.set(name, value, { path: '/' })`
- **Promises in load**: Must be awaited explicitly, not returned as-is
- **External navigation**: Use `window.location.href`, not `goto()` for external URLs

## Architecture

### Authentication Flow
- **Server hooks** (`src/hooks.server.ts`): Creates Supabase server client, validates JWT, guards `/account` routes
- **Client store** (`src/lib/stores/auth.svelte.ts`): Singleton `AuthStore` class using Svelte 5 runes
- **Supabase clients** (`src/lib/supabase.ts`): Factory functions for server/client/load contexts
- Protected routes redirect unauthenticated users to `/auth`

### Key Directories
- `src/lib/components/ui/` - shadcn-svelte components (Button, Card, Input, etc.)
- `src/lib/components/map/` - Leaflet map integration
- `src/lib/stores/` - Svelte 5 rune-based stores
- `src/lib/types/` - TypeScript type definitions
- `src/routes/solutions/[id]/` - Dynamic solution detail pages

### UI Components
Uses **shadcn-svelte** with Bits UI. Add components via:
```bash
npx shadcn-svelte@latest add [component-name]
```
Components aliased to `$lib/components`, utils to `$lib/utils`.

### Map Integration
Leaflet with clustering (`leaflet.markercluster`), boundary canvas, and Turf.js for geospatial analysis. Types defined in `src/lib/types/map.ts`.

## Environment Variables

Required in `.env`:
```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Code Style

- Prettier: tabs, single quotes, no trailing commas, 100 char width
- TypeScript strict mode enabled
- Tailwind CSS with dark mode (class-based)

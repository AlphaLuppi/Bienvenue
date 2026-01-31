# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit 2 application called "Bienvenue" - a platform that helps citizens find new life opportunities. The project uses Svelte 5 with its new runes system and modern UI components.

## Key Technologies

- **Frontend**: SvelteKit 2 with Svelte 5 (runes, snippets)
- **Styling**: Tailwind CSS with custom UI components
- **Database**: Supabase for backend services
- **Maps**: Leaflet with clustering support
- **Testing**: Vitest (unit tests), Playwright (E2E tests)
- **UI Libraries**: bits-ui, flowbite-svelte, formsnap, sveltekit-superforms

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run all tests
npm run test

# Run unit tests only
npm run test:unit

# Run E2E tests only
npm run test:e2e

# Lint and format
npm run lint
npm run format

# Type checking
npm run check
npm run check:watch
```

## Project Structure

```
src/
├── routes/              # SvelteKit pages and API routes
│   ├── +layout.svelte   # Root layout (minimal, just renders children)
│   ├── +page.svelte     # Homepage with hero section
│   ├── map/             # Interactive map page
│   ├── account/         # User account pages
│   └── solutions/       # Dynamic solution pages
├── lib/
│   ├── components/      # Reusable Svelte components
│   │   ├── ui/          # Shadcn-style UI primitives
│   │   ├── map/         # Leaflet map components
│   │   └── magic_card/  # Special card components
│   ├── stores/          # Svelte stores
│   ├── states/          # Svelte 5 state management
│   └── types/           # TypeScript type definitions
└── app.css             # Global styles with Tailwind
```

## Svelte 5 Patterns

This project uses Svelte 5 runes system. Key patterns to follow:

- Use `$state()` instead of `let` for reactive variables
- Use `$derived()` for computed values instead of `$:`
- Use `$effect()` for side effects instead of `$: {}` blocks
- Use `$props()` for component props instead of `export let`
- Event handlers are properties (`onclick={handler}`) not directives (`on:click`)
- Use snippets with `{#snippet}` and `{@render}` instead of slots

## Important Configuration Notes

- **Adapter**: Uses `@sveltejs/adapter-node` for Node.js deployment
- **Supabase**: Environment variables needed: `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- **Maps**: Leaflet is optimized in vite.config.ts for proper bundling
- **Cursor Rules**: Contains extensive Svelte 5 and SvelteKit 2 migration guide in `.cursorrules`

## Architecture Decisions

1. **State Management**: Mix of Svelte 5 runes and stores for different use cases
2. **UI Components**: Custom components built on top of bits-ui primitives
3. **Form Handling**: Uses sveltekit-superforms with Zod validation
4. **Maps**: Leaflet with custom marker clustering and boundary canvas
5. **Authentication**: Integrated with Supabase Auth

## Testing Strategy

- Unit tests with Vitest in `src/**/*.{test,spec}.{js,ts}`
- E2E tests with Playwright
- Run both test suites with `npm run test`

## ClickUp Integration (CRITICAL)

**ClickUp fournit le contexte spécifique à chaque tâche.** Il COMPLÈTE (ne remplace pas) les autres sources :

| Source | Rôle |
|--------|------|
| Architecture, PRD, Epics | **Spécifications techniques** - toujours consulter |
| project-context.md | **Standards de code** - toujours suivre |
| Story file (.md) | **Acceptance criteria** - autorité sur l'implémentation |
| **ClickUp comments** | **Contexte additionnel** - décisions d'équipe, clarifications, priorités |

**Workflow obligatoire :**

1. Consulter les docs BMAD (architecture, PRD, story file) comme avant
2. **EN PLUS** : Lire les commentaires ClickUp pour le contexte spécifique
3. Les commentaires ClickUp peuvent clarifier/prioriser mais ne remplacent pas les specs

```bash
# Intégration ClickUp
1. clickup_search(keywords="Story X.Y ...") - Trouver la tâche
2. clickup_get_task(task_id="...") - Lire les commentaires pour contexte additionnel
3. clickup_update_task(status="en cours") - Signaler le début du travail
4. clickup_create_task_comment(...) - Documenter les choix importants
5. clickup_update_task(status="review") - Signaler la complétion
```

## Development Notes

- Follow the Svelte 5 patterns documented in `.cursorrules`
- Always run `npm run lint` before committing
- The project includes comprehensive TypeScript types
- UI components follow a consistent design system with Tailwind
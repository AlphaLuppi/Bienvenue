---
project_name: 'Bienvenue'
date: '2026-02-08'
sections_completed: ['clickup_integration', 'technology_stack', 'monorepo_structure', 'architecture_rules', 'frontend_rules', 'backend_rules', 'auth_flow', 'sveltekit_patterns', 'testing_rules', 'anti_patterns', 'integration', 'code_style']
status: 'complete'
rule_count: 48
optimized_for_llm: true
---

# Project Context for AI Agents

_Critical rules and patterns for consistent implementation across Frontend (SvelteKit) and Backend (NestJS + Python/LangGraph)._

---

## ClickUp Integration (MANDATORY)

**All development work is tracked in ClickUp. Agents MUST follow these rules.**

### Workspace Structure
```
Space: Bienvenue (ID: 90151323878)
└── Folder: Développement
    └── List: MVP (ID: 901507766265)
        ├── Epic 0-6 (parent tasks)
        └── Stories (subtasks of epics)
```

### Before Starting Any Story

1. **Search ClickUp** for the story: `clickup_search(keywords="Story X.Y ...")`
2. **Read the task** with comments: `clickup_get_task(task_id="...", subtasks=false)`
3. **Check existing comments** for context, decisions, and requirements
4. **Verify dependencies** are completed (check `blocked_by` in epics.md)

### When Starting Work

1. **Update status to "en cours":**
   ```
   clickup_update_task(task_id="...", status="en cours")
   ```
2. **Add start comment:**
   ```
   clickup_create_task_comment(task_id="...", comment_text="🤖 Agent starting work.
   Approach: [brief implementation plan]")
   ```

### During Implementation

**Comment important decisions on ClickUp:**
```
clickup_create_task_comment(task_id="...", comment_text="📋 Decision: [what]
Rationale: [why]
Alternatives: [other options considered]")
```

### When Completing Work

1. **Add completion summary:**
   ```
   clickup_create_task_comment(task_id="...", comment_text="✅ Implementation complete.

   Changes:
   - [file]: [description]

   Tests: [status]
   Notes: [follow-up if any]")
   ```
2. **Update status to "review":**
   ```
   clickup_update_task(task_id="...", status="review")
   ```
   Note: A "done" status may need to be created in ClickUp if final closure is needed.
3. **Update local sprint-status.yaml** to match

### Status Mapping

| ClickUp Status | sprint-status.yaml |
|----------------|-------------------|
| "a faire" | backlog |
| "en cours" | in-progress |
| "review" | review/done |

Note: ClickUp currently has 3 statuses. Add "terminé" or "done" status in ClickUp settings if needed.

---

## Monorepo Structure (Turborepo)

**IMPORTANT: Use `bun` instead of `npm` for all commands.**

```
Bienvenue/
├── apps/
│   ├── web/          # SvelteKit frontend (SSR/SEO only)
│   └── api/          # NestJS backend (ALL business logic)
└── packages/
    └── shared/       # Shared types and utilities
```

### Common Commands
```bash
bun run dev           # Start development server
bun run build         # Production build
bun run check         # Type-check with svelte-check
bun run lint          # Check formatting (Prettier) and lint (ESLint)
bun run format        # Auto-format all files with Prettier
bun run test:unit     # Run unit tests with Vitest
bun run test:e2e      # Run Playwright E2E tests
bun run test          # Run all tests (unit + e2e)
```

---

## Technology Stack

### Frontend (apps/web/ - Brownfield)
- **SvelteKit** 2.20.2 + **Svelte 5.25.5** (RUNES - critical!)
- **TypeScript** 5.7.3 (strict mode)
- **Tailwind CSS** 3.4.17 + bits-ui 0.22.0
- **shadcn-svelte** with Bits UI (add via: `bunx shadcn-svelte@latest add [component]`)
- **Leaflet** 1.9.4 + markercluster + Turf.js
- **Testing:** Vitest 3.0.0 (unit), Playwright 1.49.1 (E2E)

### Backend API (apps/api/ - NestJS)
- **NestJS** with TypeScript
- **Supabase** (PostgreSQL + Auth)
- Handles ALL auth operations, profile CRUD, business logic

### Backend Agents (Greenfield - Python)
- **Python** 3.12+ with **uv**
- **FastAPI** (SSE streaming)
- **LangGraph** + LangChain
- **Supabase** (PostgreSQL + pgvector)
- **Redis** (cache + rate limiting)
- **Langfuse** (LLM monitoring)

---

## Architecture Rule (MUST FOLLOW)

**All business logic MUST stay on the NestJS backend (`apps/api/`). The SvelteKit frontend should only handle SSR/SEO concerns and session management. Never move business logic to SvelteKit API routes.**

### Responsibility Split

| Layer | Responsibility | Location |
|-------|----------------|----------|
| SvelteKit | SSR, SEO, session management, UI rendering | `apps/web/` |
| NestJS | ALL business logic, auth, API, profile CRUD | `apps/api/` |
| Python | AI agents, LLM orchestration, vector search | `agents/` |

### Key Rule Violations (NEVER DO)
- ❌ Never put business logic in SvelteKit API routes (`+server.ts`)
- ❌ Never access Supabase directly from the frontend
- ❌ Never handle auth tokens in client-side JavaScript
- ❌ Never duplicate backend validation in frontend

---

## Authentication Flow

### How Auth Works
1. **Server hooks** (`apps/web/src/hooks.server.ts`): Validates JWT via NestJS backend
2. **Cookie storage**: Access and refresh tokens in secure httpOnly cookies (not accessible to JS)
3. **Protected routes**: Guard in hooks redirects unauthenticated users to `/signin`
4. **NestJS backend**: Handles ALL auth operations (signup, signin, OAuth, OTP, token validation)

### Auth Rules
- ✅ All Supabase interactions happen through NestJS backend API
- ✅ Tokens stored in httpOnly cookies only
- ✅ JWT validation happens server-side in hooks
- ❌ Never access Supabase auth directly from SvelteKit
- ❌ Never store tokens in localStorage or sessionStorage
- ❌ Never expose tokens to client-side JavaScript

---

## Critical Rules - Frontend (Svelte 5)

### MUST USE Svelte 5 Runes
```svelte
// ❌ WRONG (Svelte 4)
export let name;
let count = 0;
$: doubled = count * 2;

// ✅ CORRECT (Svelte 5)
let { name } = $props();
let count = $state(0);
let doubled = $derived(count * 2);
```

### Event Handlers - Properties, NOT Directives
```svelte
// ❌ WRONG
<button on:click={handler}>

// ✅ CORRECT
<button onclick={handler}>
```

### Snippets, NOT Slots
```svelte
// ❌ WRONG
<slot name="header" />

// ✅ CORRECT
{#snippet header()}...{/snippet}
{@render header()}
```

### Svelte 5 Advanced Patterns
- Use `$derived.by(() => ...)` for complex derivations
- Use `$effect.pre()` instead of `beforeUpdate`
- Use `$bindable()` for two-way bindable props
- Use `$state.raw()` for non-deep reactive state (performance)
- Event modifiers like `|preventDefault` are not supported - use wrapper functions

---

## SvelteKit 2 Patterns (Critical)

### Error and Redirect Handling
```typescript
// ❌ WRONG (throws)
throw error(500, 'Something went wrong');
throw redirect(303, '/login');

// ✅ CORRECT (call directly)
error(500, 'Something went wrong');
redirect(303, '/login');
```

### Cookie Handling
```typescript
// ❌ WRONG (missing path)
cookies.set('token', value);

// ✅ CORRECT (always specify path)
cookies.set('token', value, { path: '/' });
```

### Load Function Promises
```typescript
// ❌ WRONG (returning promise)
return { data: fetchData() };

// ✅ CORRECT (await explicitly)
return { data: await fetchData() };
```

### External Navigation
```typescript
// ❌ WRONG (goto for external)
goto('https://external-site.com');

// ✅ CORRECT (use window.location)
window.location.href = 'https://external-site.com';
```

---

## Key Directories (apps/web/)

| Path | Purpose |
|------|---------|
| `src/lib/components/ui/` | shadcn-svelte components (Button, Card, etc.) |
| `src/lib/components/map/` | Leaflet map integration |
| `src/lib/stores/` | Svelte 5 rune-based stores |
| `src/lib/states/` | Svelte 5 rune-based state (map, chat) |
| `src/lib/types/` | TypeScript type definitions |
| `src/routes/solutions/[id]/` | Dynamic solution detail pages |

---

### TypeScript Strict Mode
- All functions must have explicit return types
- No `any` - use `unknown` and type guards
- Nullable values must be handled explicitly

---

## Critical Rules - Backend (Python)

### Naming Conventions
| Element | Convention | Example |
|---------|------------|---------|
| Tables | snake_case plural | `users`, `solutions` |
| Columns | snake_case | `user_id`, `created_at` |
| Functions | snake_case | `get_commune_scores()` |
| Classes | PascalCase | `ConversationManager` |
| Files | snake_case | `vector_builder.py` |

### API Response Format
```python
# Success
{"data": {...}, "meta": {"total": 100}}

# Error
{"error": {"code": "INVALID_CRITERIA", "message": "...", "details": {}}}
```

### Exception Hierarchy
```python
class BienvenueError(Exception): ...
class ValidationError(BienvenueError): ...  # 400
class AuthenticationError(BienvenueError): ...  # 401
class NotFoundError(BienvenueError): ...  # 404
class RateLimitError(BienvenueError): ...  # 429
class LLMError(BienvenueError): ...  # 500 + retry
```

### LangGraph State Structure
```python
class ConversationState(TypedDict):
    user_id: str
    session_id: str
    messages: Annotated[list, add_messages]
    criteria: dict | None
    solutions: list[dict]
    current_step: str  # "conversation" | "extraction" | "search" | "response"
    error: str | None
```

---

## Testing Rules

### Frontend (Vitest + Playwright)
- Unit tests: `src/**/*.test.ts` (co-located)
- E2E tests: `tests/` folder
- Test naming: `test_{action}_{condition}_{expected}`

### Backend (pytest)
- Structure: `tests/unit/`, `tests/integration/`, `tests/e2e/`
- Personas: 5 JSON files (Alex, Martin, Jean, Sophie, Léa)
- Agent tests: Snapshot testing on JSON STRUCTURE, not exact content

---

## Anti-Patterns - NEVER DO

### Frontend
- ❌ Never use `export let` (Svelte 4 syntax)
- ❌ Never use `on:click` (use `onclick`)
- ❌ Never use `<slot>` (use snippets)
- ❌ Never ignore TypeScript errors

### Backend
- ❌ Never log sensitive data (user criteria OK, tokens/passwords NEVER)
- ❌ Never hardcode API keys (use environment variables)
- ❌ Never test LLM output exact content (test structure only)
- ❌ Never skip error handling in async code

---

## Integration Boundaries

### Frontend → Backend
- `POST /api/v1/chat` : Send user message
- `GET /api/v1/chat/stream` : SSE streaming response
- `GET /api/v1/communes/{id}` : Commune data
- Auth: JWT Supabase in `Authorization: Bearer <token>`

### LLM Model Selection
| Agent | Model |
|-------|-------|
| Conversation Manager | GPT-4o |
| Criteria Extractor | Claude 3.5 Sonnet |

---

## File Locations

### Frontend
- Components: `src/lib/components/`
- UI primitives: `src/lib/components/ui/`
- State: `src/lib/states/`
- Types: `src/lib/types/`

### Backend
- Agents: `src/bienvenue/agents/`
- Tools: `src/bienvenue/tools/`
- Services: `src/bienvenue/services/`
- API routes: `src/bienvenue/api/routes/`

---

## Code Style

### Formatting (Prettier)
- Tabs for indentation
- Single quotes
- No trailing commas
- 100 character line width

### TypeScript
- Strict mode enabled
- All functions must have explicit return types
- No `any` - use `unknown` and type guards
- Nullable values must be handled explicitly

### CSS
- Tailwind CSS with dark mode (class-based)
- Follow existing component patterns in `src/lib/components/ui/`

---

## Environment Variables

### Frontend (apps/web/.env)
```
API_URL=http://localhost:3000  # NestJS backend URL
```

### Backend (apps/api/.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
SUPABASE_JWT_SECRET=your_jwt_secret
```

---

## Usage Guidelines

**For AI Agents:**
- Read this file before implementing any code
- Follow ALL rules exactly as documented
- When in doubt, prefer the more restrictive option
- Refer to `architecture.md` for detailed decisions

**For Humans:**
- Keep this file lean and focused on agent needs
- Update when technology stack changes
- Review quarterly for outdated rules

---

_Last Updated: 2026-02-08_

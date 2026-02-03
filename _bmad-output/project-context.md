---
project_name: 'Bienvenue'
date: '2026-01-25'
sections_completed: ['clickup_integration', 'technology_stack', 'frontend_rules', 'backend_rules', 'testing_rules', 'anti_patterns', 'integration']
status: 'complete'
rule_count: 32
optimized_for_llm: true
---

# Project Context for AI Agents

_Critical rules and patterns for consistent implementation across Frontend (SvelteKit) and Backend (Python/LangGraph)._

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

## Technology Stack

### Frontend (Existing - Brownfield)
- **SvelteKit** 2.20.2 + **Svelte 5.25.5** (RUNES - critical!)
- **TypeScript** 5.7.3 (strict mode)
- **Tailwind CSS** 3.4.17 + bits-ui 0.22.0
- **Supabase** 2.48.1 (@supabase/ssr)
- **Leaflet** 1.9.4 + markercluster
- **Testing:** Vitest 3.0.0 (unit), Playwright 1.49.1 (E2E)

### Backend Agents (Greenfield)
- **Python** 3.12+ with **uv**
- **FastAPI** (SSE streaming)
- **LangGraph** + LangChain
- **Supabase** (PostgreSQL + pgvector)
- **Redis** (cache + rate limiting)
- **Langfuse** (LLM monitoring)

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

_Last Updated: 2026-01-24_

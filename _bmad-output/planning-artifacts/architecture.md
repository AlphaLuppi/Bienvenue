---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: complete
completedAt: '2026-01-24'
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief.md'
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
workflowType: 'architecture'
project_name: 'Bienvenue'
user_name: 'Gabriel'
date: '2026-01-23'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

Le système Bienvenue repose sur un pipeline conversationnel intelligent :

1. **Conversation guidée** - Agent LLM (GPT-4) gère le dialogue naturel multi-tours pour extraire les critères utilisateur
2. **Extraction structurée** - Agent LLM transforme le langage naturel en critères JSON normalisés
3. **Matching vectoriel** - Two-stage search combine similarité vectorielle (pgvector) et filtrage SQL précis
4. **Affichage enrichi** - Résultats avec scores 7 catégories, triple comparaison, offres réelles
5. **Persistance session** - Historique conversation, critères extraits, favoris utilisateur

**Non-Functional Requirements:**

| Catégorie | Requirement | Impact Architecture |
|-----------|-------------|---------------------|
| Performance | Latence < 10s recommendations | Parallel processing, cache, streaming |
| Performance | API commune < 500ms | Redis cache, query optimization |
| Coût | LLM/session < 0.50€ | Model selection par agent, cache prompts |
| Disponibilité | 99.5% uptime (post-MVP) | Queue system, retry logic, fallbacks |
| Compliance | RGPD | Anonymisation, consentement, data retention |
| Scalabilité | 1000+ users actifs/mois | Rate limiting, horizontal scaling |

**Scale & Complexity:**

- **Domaine primaire :** Web App (SvelteKit) + API Backend agentique (LangGraph)
- **Niveau complexité :** Medium-High
- **Composants architecturaux estimés :** ~12-15 (3 agents, 5 tools, API gateway, data layer, cache, monitoring)

### Technical Constraints & Dependencies

**Stack imposé (existant ou décidé) :**
- Frontend : SvelteKit 2 + Svelte 5 sur Vercel (existant)
- Database : Supabase PostgreSQL + pgvector + Auth
- Backend Agents : LangGraph + LangChain sur VPS Python
- LLM APIs : OpenAI GPT-4 + Anthropic Claude
- Cache : Redis
- Monitoring : Langfuse

**Dépendances externes critiques :**
- APIs LLM (latence, coûts, rate limits)
- Supabase (disponibilité, pgvector performance)
- Sources données publiques (INSEE, DVF, Pôle Emploi...)

**Contraintes UX :**
- Streaming LLM obligatoire pour feedback progressif
- Solutions apparaissent une par une (effet découverte)
- Chat accessible pendant chargement
- Desktop-first (overlay 400px + carte full screen)

### Cross-Cutting Concerns Identified

1. **Observabilité LLM** - Traces, coûts, latences, erreurs par agent (Langfuse)
2. **Gestion d'état** - Contexte conversationnel multi-tours, persistence session
3. **Testabilité** - Agents non-déterministes → snapshot testing structure JSON
4. **Sécurité** - Auth Supabase, rate limiting, RGPD, pas de données sensibles en logs
5. **Résilience** - Retry logic LLM, fallbacks, queue pour pics charge
6. **Coût control** - Monitoring temps réel, budget caps, model selection stratégique

## Starter Template Evaluation

### Primary Technology Domain

Backend API agentique Python pour système de recommandation conversationnel.

**Stack cible :**
- Runtime : Python 3.12+
- Package manager : uv (moderne, rapide)
- Framework API : FastAPI
- Orchestration agents : LangGraph + LangChain
- Database : Supabase (PostgreSQL + pgvector)
- Cache : Redis
- Monitoring : Langfuse

### Starter Options Considered

| Option | Évaluation |
|--------|------------|
| agent-service-toolkit | Trop générique, inclut Streamlit non nécessaire |
| fastapi-langgraph-template | Production-ready mais structure rigide |
| langgraph-agent-toolkit (PyPI) | Abstraction haute, moins de contrôle |
| **Structure custom uv** | ✅ Recommandé - 100% adapté aux besoins Bienvenue |

### Selected Approach: Structure Custom avec uv

**Rationale:**
- Agents Bienvenue très spécifiques (Conversation Manager, Criteria Extractor)
- Outils déterministes custom (Vector Builder, Search Orchestrator)
- Intégration Supabase pgvector non standard
- Besoin de contrôle total sur le workflow LangGraph

**Initialization Commands:**

```bash
uv init bienvenue-agents --app
cd bienvenue-agents
uv add fastapi --extra standard
uv add langgraph langchain langchain-openai langchain-anthropic
uv add supabase redis pydantic-settings python-dotenv langfuse
uv add --dev pytest pytest-asyncio ruff mypy
```

**Project Structure:**

```
bienvenue-agents/
├── src/
│   └── bienvenue/
│       ├── __init__.py
│       ├── main.py                 # FastAPI app entry point
│       ├── api/
│       │   ├── routes/
│       │   │   ├── chat.py         # WebSocket/SSE streaming
│       │   │   ├── communes.py     # API données communes
│       │   │   └── health.py
│       │   └── deps.py             # Dependencies injection
│       ├── agents/
│       │   ├── conversation.py     # Conversation Manager (GPT-4)
│       │   ├── extractor.py        # Criteria Extractor
│       │   └── graph.py            # LangGraph workflow principal
│       ├── tools/
│       │   ├── vector_builder.py   # Critères → vecteur
│       │   ├── search.py           # Two-stage search
│       │   ├── history.py          # History Service
│       │   └── negotiation.py      # Negotiation Logic
│       ├── models/
│       │   ├── state.py            # LangGraph state
│       │   ├── criteria.py         # Schémas critères
│       │   └── commune.py          # Schémas communes
│       ├── services/
│       │   ├── supabase.py         # Client Supabase
│       │   ├── llm.py              # LLM providers
│       │   └── redis.py            # Cache
│       └── core/
│           ├── config.py           # Settings (pydantic-settings)
│           └── logging.py          # Structured logging
├── tests/
│   ├── conftest.py
│   ├── personas/                   # 5 personas synthétiques
│   └── e2e/
├── evals/                          # Évaluations qualité agents
├── pyproject.toml
├── uv.lock
├── Dockerfile
└── langgraph.json
```

### Architectural Decisions Provided

**Language & Runtime:**
- Python 3.12+ avec type hints stricts
- uv pour gestion dépendances et environnements

**API Framework:**
- FastAPI avec WebSocket/SSE pour streaming
- Pydantic v2 pour validation schemas

**Agent Orchestration:**
- LangGraph pour workflow stateful
- LangChain pour abstractions LLM

**Project Organization:**
- src/ layout pour package Python propre
- Séparation agents/ tools/ services/
- Tests avec personas synthétiques

**Development Experience:**
- `uv run fastapi dev` pour hot-reload
- ruff pour linting (rapide)
- mypy pour type checking

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Communication temps réel : SSE + REST
- Auth API : JWT Supabase
- Persistance solutions : Supabase (pas cache)
- Modèles LLM : GPT-4o + Claude 3.5 Sonnet

**Important Decisions (Shape Architecture):**
- Rate limiting : Redis sliding window
- Cache performance : Redis avec TTL
- Déploiement : Docker + GitHub Actions SSH

**Deferred Decisions (Post-MVP):**
- Scaling horizontal (si charge augmente)
- CDN pour assets statiques
- Multi-region deployment

### Communication & API

| Décision | Choix | Rationale |
|----------|-------|-----------|
| Streaming LLM | **SSE (Server-Sent Events)** | Standard industrie (OpenAI, Anthropic), unidirectionnel suffit |
| API classique | **REST** | Simple, stateless, bien supporté |
| Format réponses | **JSON** | Standard, Pydantic validation |

### Authentication & Security

| Décision | Choix | Rationale |
|----------|-------|-----------|
| Auth requêtes | **JWT Supabase** | Frontend envoie token, backend vérifie avec clé publique |
| Rate limiting | **Redis sliding window** | 10 conv/h, 50 msg/h par user |
| Stockage secrets | **Variables environnement** | .env local, secrets GitHub Actions en prod |

### Data Architecture

| Décision | Choix | Rationale |
|----------|-------|-----------|
| Cache performance | **Redis** | Scores communes (24h), search results (1h) |
| Solutions user | **Supabase** | Persistant, lié au user_id, favoris |
| Historique conversations | **Supabase** | Persistant, permet reprise session |
| Données communes | **Supabase pgvector** | Vector search + SQL filtering |

### LLM Model Selection

| Agent | Modèle | Raison |
|-------|--------|--------|
| Conversation Manager | **GPT-4o** | Excellent en dialogue naturel, rapide |
| Criteria Extractor | **Claude 3.5 Sonnet** | Excellent en structured output JSON |
| Fallback économique | GPT-4o-mini / Haiku | Si optimisation coûts nécessaire |

### Infrastructure & Deployment

| Décision | Choix | Rationale |
|----------|-------|-----------|
| Containerisation | **Docker + Docker Compose** | FastAPI + Redis ensemble, reproductible |
| CI/CD | **GitHub Actions → SSH deploy** | Simple, gratuit, efficace pour MVP |
| Hébergement backend | **VPS existant** | Déjà provisionné |
| Hébergement frontend | **Vercel** | Déjà en place (SvelteKit) |

### Decision Impact Analysis

**Séquence d'implémentation :**
1. Setup projet Python (uv, structure)
2. Config Supabase (tables solutions, historique)
3. Config Redis (cache + rate limiting)
4. Agents LLM (Conversation + Extractor)
5. API FastAPI (REST + SSE)
6. Intégration frontend
7. CI/CD + Docker

**Dépendances cross-composants :**
- SSE dépend de LangGraph streaming
- Rate limiting dépend de JWT (user_id)
- Solutions persistantes dépendent du schema Supabase

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Database (Supabase):**
- Tables : snake_case pluriel (`users`, `solutions`, `conversations`)
- Colonnes : snake_case (`user_id`, `created_at`, `is_favorite`)
- Foreign keys : `{table}_id` (`user_id`, `commune_id`)
- Index : `idx_{table}_{columns}` (`idx_solutions_user_id`)

**Python Code:**
- Fonctions : snake_case (`get_commune_scores()`, `extract_criteria()`)
- Classes : PascalCase (`ConversationManager`, `CriteriaExtractor`)
- Variables : snake_case (`user_criteria`, `search_results`)
- Fichiers : snake_case (`conversation_manager.py`)

**API Endpoints:**
- Routes : snake_case pluriel (`/api/v1/communes`, `/api/v1/conversations`)
- Params : snake_case (`?user_id=123`, `/communes/{commune_id}`)

**JSON Fields:**
- snake_case (`user_id`, `created_at`)
- Booleans : `is_` ou `has_` prefix (`is_favorite`, `has_offers`)

### API Response Patterns

**Success Response:**
```json
{
    "data": { ... },
    "meta": { "total": 100, "page": 1 }
}
```

**Error Response:**
```json
{
    "error": {
        "code": "INVALID_CRITERIA",
        "message": "Les critères fournis sont invalides",
        "details": { ... }
    }
}
```

**HTTP Codes:** 200 (OK), 201 (Created), 400 (Validation), 401 (Auth), 404 (Not Found), 429 (Rate Limit), 500 (Server Error)

### Error Handling Patterns

**Exception Hierarchy:**
- `BienvenueError` (base)
  - `ValidationError` (400)
  - `AuthenticationError` (401)
  - `NotFoundError` (404)
  - `RateLimitError` (429)
  - `LLMError` (500 + retry)

**Logging Levels:**
- DEBUG : Dev uniquement
- INFO : Actions normales (search, extract)
- WARNING : Situations anormales gérées (retry LLM)
- ERROR : Erreurs nécessitant attention

**Règle :** Jamais de données sensibles dans les logs

### LangGraph Patterns

**State Structure:**
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

**Node Naming:**
- `route_input` : Entry point, routing
- `conversation_manager` : Dialogue
- `criteria_extractor` : Extraction JSON
- `search_orchestrator` : Two-stage search
- `format_response` : Réponse finale

### Testing Patterns

**Structure:** `tests/unit/`, `tests/integration/`, `tests/e2e/`, `tests/personas/`

**Test Naming:** `test_{action}_{condition}_{expected}`

**Agent Tests:** Snapshot testing sur STRUCTURE JSON, pas contenu exact

**Personas:** 5 fichiers JSON (Alex, Martin, Jean, Sophie, Léa)

### Enforcement Guidelines

**Tous les agents IA DOIVENT :**
- Suivre les conventions de naming exactement
- Utiliser le format de réponse API standard
- Logger avec le format structuré
- Hériter de `BienvenueError` pour les exceptions custom
- Tester la structure des outputs LLM, pas le contenu exact

## Project Structure & Boundaries

### Complete Project Directory Structure

```
bienvenue-agents/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Tests + lint sur PR
│       └── deploy.yml                # Deploy VPS sur merge main
├── src/
│   └── bienvenue/
│       ├── __init__.py
│       ├── main.py                   # FastAPI app + lifespan
│       ├── api/
│       │   ├── __init__.py
│       │   ├── deps.py               # get_current_user, get_db, get_redis
│       │   └── routes/
│       │       ├── __init__.py
│       │       ├── health.py         # GET /health
│       │       ├── chat.py           # POST /chat, GET /chat/stream (SSE)
│       │       ├── communes.py       # GET /communes/{id}, GET /communes/{id}/scores
│       │       └── solutions.py      # GET /solutions, POST /solutions/{id}/favorite
│       ├── agents/
│       │   ├── __init__.py
│       │   ├── graph.py              # LangGraph workflow principal
│       │   ├── conversation.py       # ConversationManager (GPT-4o)
│       │   ├── extractor.py          # CriteriaExtractor (Claude Sonnet)
│       │   └── prompts/
│       │       ├── conversation.txt
│       │       └── extractor.txt
│       ├── tools/
│       │   ├── __init__.py
│       │   ├── vector_builder.py     # Critères → vecteur normalisé
│       │   ├── search.py             # Two-stage search (vector + SQL)
│       │   ├── history.py            # HistoryService
│       │   └── validation.py         # Validation offres disponibles
│       ├── models/
│       │   ├── __init__.py
│       │   ├── state.py              # ConversationState (LangGraph)
│       │   ├── criteria.py           # CriteriaSchema, PrioritySchema
│       │   ├── commune.py            # CommuneSchema, ScoreSchema
│       │   ├── solution.py           # SolutionSchema, FavoriteSchema
│       │   └── api.py                # Request/Response schemas
│       ├── services/
│       │   ├── __init__.py
│       │   ├── supabase.py           # SupabaseClient wrapper
│       │   ├── llm.py                # LLMService (OpenAI + Anthropic)
│       │   ├── redis.py              # RedisService (cache + rate limit)
│       │   └── langfuse.py           # LangfuseService (tracing)
│       ├── core/
│       │   ├── __init__.py
│       │   ├── config.py             # Settings (pydantic-settings)
│       │   ├── logging.py            # Structured logging setup
│       │   ├── exceptions.py         # BienvenueError hierarchy
│       │   └── middleware.py         # Auth, rate limiting, error handling
│       └── db/
│           ├── __init__.py
│           └── queries.py            # SQL queries communes/solutions
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── personas/
│       ├── alex_tech.json
│       ├── martin_family.json
│       ├── jean_retraite.json
│       ├── sophie_remote.json
│       └── lea_student.json
├── evals/
├── scripts/
├── .env.example
├── pyproject.toml
├── uv.lock
├── Dockerfile
├── docker-compose.yml
├── langgraph.json
└── README.md
```

### Feature to Structure Mapping

| Feature PRD | Fichiers |
|-------------|----------|
| Conversation guidée | `agents/conversation.py`, `agents/prompts/conversation.txt`, `api/routes/chat.py` |
| Extraction critères | `agents/extractor.py`, `models/criteria.py` |
| Matching communes | `tools/vector_builder.py`, `tools/search.py`, `db/queries.py` |
| Affichage résultats | `api/routes/communes.py`, `api/routes/solutions.py` |
| Historique session | `tools/history.py`, `services/supabase.py` |
| Favoris | `api/routes/solutions.py` |
| Tests personas | `tests/personas/*.json`, `tests/e2e/` |

### Integration Boundaries

**Frontend ↔ Backend API:**
- `POST /api/v1/chat` : Envoie message user
- `GET /api/v1/chat/stream` : SSE streaming réponse
- `GET /api/v1/communes/{id}` : Données commune
- `POST /api/v1/solutions/{id}/favorite` : Toggle favori

**Backend ↔ External Services:**
- Supabase : Tables users, conversations, solutions, communes, favorites
- Redis : Cache (commune scores, search results) + Rate limiting
- OpenAI : GPT-4o pour Conversation Manager
- Anthropic : Claude Sonnet pour Criteria Extractor
- Langfuse : Traces, coûts, latences

### Data Flow

```
User Message → FastAPI → ConversationManager (GPT-4o)
                              ↓
                      CriteriaExtractor (Claude)
                              ↓
                      VectorBuilder → Search (pgvector + SQL)
                              ↓
                      Solutions → SSE Stream → Frontend
```

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
- Python 3.12 + uv + FastAPI + LangGraph + Supabase + Redis = stack 100% compatible
- SSE streaming supporté nativement par FastAPI et LangGraph
- JWT Supabase intégrable via middleware FastAPI standard

**Pattern Consistency:**
- Conventions Python respectées (snake_case fonctions, PascalCase classes)
- Patterns API alignés avec FastAPI best practices
- Patterns LangGraph conformes à la documentation officielle

**Structure Alignment:**
- Chaque décision architecturale a son emplacement dans la structure
- Boundaries clairement définis entre agents, tools, services, API

### Requirements Coverage Validation ✅

**Feature Coverage:**
| Feature PRD | Support |
|-------------|---------|
| Conversation guidée | ✅ `agents/conversation.py`, `graph.py` |
| Extraction critères | ✅ `agents/extractor.py`, `models/criteria.py` |
| Matching communes | ✅ `tools/vector_builder.py`, `tools/search.py` |
| Affichage résultats | ✅ `api/routes/communes.py`, `solutions.py` |
| Historique session | ✅ `tools/history.py`, `services/supabase.py` |
| Favoris persistants | ✅ `api/routes/solutions.py`, Supabase |
| Tests personas | ✅ `tests/personas/`, `tests/e2e/` |

**NFR Coverage:**
| NFR | Support |
|-----|---------|
| Latence < 10s | ✅ Redis cache + SSE streaming |
| Coût < 0.50€/session | ✅ Model selection optimisé |
| 99.5% uptime | ✅ Docker + health checks + retry logic |
| RGPD | ✅ Règle logging sans données sensibles |

### Implementation Readiness Validation ✅

- ✅ Décisions documentées avec rationale
- ✅ Patterns complets (naming, API, errors, LangGraph, tests)
- ✅ Structure projet complète avec tous les fichiers
- ✅ Mapping features → fichiers explicite
- ✅ Exemples de code fournis

### Gap Analysis Results

**Gaps critiques :** Aucun

**Gaps mineurs (non bloquants) :**
- Schéma tables Supabase à définir à l'implémentation
- Prompts agents à itérer pendant le développement

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Medium-High)
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented (SSE, JWT, Redis, LLM models)
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] API response patterns defined
- [x] Error handling patterns documented
- [x] LangGraph patterns specified
- [x] Testing patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**
- Stack moderne et cohérent (Python 3.12, uv, FastAPI, LangGraph)
- Patterns clairs pour éviter les conflits entre agents IA
- Structure projet complète et mappée aux features
- Décisions documentées avec rationale

**First Implementation Priority:**
```bash
uv init bienvenue-agents --app
cd bienvenue-agents
uv add fastapi --extra standard
uv add langgraph langchain langchain-openai langchain-anthropic
uv add supabase redis pydantic-settings python-dotenv langfuse
uv add --dev pytest pytest-asyncio ruff mypy
```

## Architecture Completion Summary

### Workflow Completion

| Métrique | Valeur |
|----------|--------|
| **Status** | ✅ COMPLETED |
| **Steps Completed** | 8/8 |
| **Date** | 2026-01-24 |
| **Document** | `_bmad-output/planning-artifacts/architecture.md` |

### Final Deliverables

- ✅ **15+ décisions architecturales** documentées avec rationale
- ✅ **5 catégories de patterns** (naming, API, errors, LangGraph, tests)
- ✅ **~40 fichiers/répertoires** spécifiés dans la structure
- ✅ **7 features PRD + 4 NFRs** entièrement supportés
- ✅ **Validation complète** confirmant cohérence et couverture

### Implementation Handoff

**Pour les agents IA :** Ce document est le guide complet pour implémenter Bienvenue. Suivre toutes les décisions, patterns et structures exactement comme documenté.

**Séquence recommandée :**
1. Initialiser le projet Python avec uv
2. Créer la structure de base
3. Implémenter les services (Supabase, Redis, LLM)
4. Développer les agents LangGraph
5. Créer l'API FastAPI avec SSE
6. Intégrer avec le frontend SvelteKit existant

---

**Architecture Status:** ✅ READY FOR IMPLEMENTATION
**Next Phase:** Créer les Epics & Stories pour guider l'implémentation


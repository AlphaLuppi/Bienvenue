---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - '_bmad-output/planning-artifacts/prd.md'
  - '_bmad-output/planning-artifacts/architecture.md'
  - '_bmad-output/planning-artifacts/ux-design-specification.md'
version: 2.0
lastUpdated: 2026-01-24
changes:
  - Added Epic 0 Infrastructure
  - Added [Frontend]/[Backend]/[Infra] tags
  - Added NFR Coverage Map
  - Added blocked_by dependencies
  - Split large stories
  - Mapped NFRs to dedicated stories
---

# Bienvenue - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Bienvenue, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Users can create an account using email/password
FR2: Users can create an account using Google OAuth
FR3: Users can log in to access their session history and favorites
FR4: Users can log out from their account
FR5: Users can reset their password via email
FR6: System authenticates users via JWT tokens from Supabase
FR7: Users can start a new relocation conversation via natural language
FR8: Users can engage in multi-turn dialogue with conversational agent
FR9: Users can answer clarifying questions about their relocation criteria
FR10: System extracts structured criteria from natural language (emploi, logement, localisation, lifestyle)
FR11: Users can view a summary of extracted criteria before search execution
FR12: Users can modify extracted criteria before confirming
FR13: Users can explicitly validate criteria to trigger commune search
FR14: System maintains conversation context across multiple messages
FR15: System generates top 10 commune recommendations based on validated criteria
FR16: System calculates global score (0-100) for each recommended commune
FR17: System calculates category scores for 7 data categories per commune
FR18: System provides justification for each recommended commune
FR19: System filters recommendations by available job offers matching user criteria
FR20: System filters recommendations by available housing offers matching user budget
FR21: System returns recommendations within target latency (<5s)
FR22: Users can view top 10 recommended communes in ranked list
FR23: Users can view detailed scores by category for each commune
FR24: Users can view justifications explaining why each commune was recommended
FR25: Users can view recommended communes on interactive map
FR26: Users can click on map markers to view commune details
FR27: Users can view available job offers for each recommended commune
FR28: Users can view available housing offers for each recommended commune
FR29: Users can access external links to job and housing offers
FR30: Users can provide thumbs up/down feedback on recommendations
FR31: System automatically detects communes matching criteria but with zero current offers
FR32: System enrolls users in Ghost Monitoring for communes with zero offers
FR33: System notifies users when Ghost Monitoring is activated for a commune
FR34: System scans for new offers daily for all Ghost Monitored communes
FR35: System sends email notifications when new matching offers appear
FR36: Users can opt-out of Ghost Monitoring for specific communes
FR37: System automatically stops Ghost Monitoring after 30 days
FR38: System includes unsubscribe link in all Ghost Monitoring emails (RGPD compliance)
FR39: System persists conversation sessions across page reloads
FR40: Users can view history of past conversations
FR41: Users can save communes to favorites list
FR42: Users can view their saved favorite communes
FR43: Users can remove communes from favorites list
FR44: System maintains user preferences across sessions
FR45: System tracks all LLM API calls with associated costs (Langfuse)
FR46: System traces complete conversation flows with parent/child relationships
FR47: Operators (Gabriel) can view dashboard of conversation metrics
FR48: Operators can view aggregated LLM costs per conversation and per day
FR49: Operators can view p95 latency metrics for conversations
FR50: System sends alerts when cost thresholds exceeded (>€10/day)
FR51: System logs all errors with structured context (user_id, conversation_id, timestamp)
FR52: Operators can query logs to debug issues

### NonFunctional Requirements

NFR1: First agent response chunk within 1s; full conversation turn within 5s (p95)
NFR2: Top 10 recommendations within 5s (p95) with vector <50ms, SQL <20ms, enrichment <15ms
NFR3: Frontend FCP <1.5s, LCP <2.5s, TTI <3.5s, Lighthouse >90 on public pages
NFR4: Map ready <1s after load; markers <500ms; pan/zoom at 60 FPS
NFR5: DB queries: vector search <50ms (p95), SQL <20ms (p95), no query >100ms (p99)
NFR6: All API endpoints require Supabase JWT validation (JWKS); token expiration max 1h; refresh tokens managed by Supabase
NFR7: Users access only their own data; 403 on unauthorized access; audit logging of access denials
NFR8: Data encrypted at rest and in transit (HTTPS/TLS 1.3+); JWT tokens never in URLs or logs
NFR9: Rate limiting: 100 msg/hour, 10 msg/minute, cost cap €0.50/day per user, 10 ghost communes/user, 500 concurrent WS connections
NFR10: RGPD compliance: delete data on request, auto-delete after 90 days, unsubscribe in emails, no PII in logs/traces, privacy policy accessible
NFR11: Secure identifiers use UUID v4 only; no predictable IDs
NFR12: Supports 30 concurrent WS users (8GB VPS) and 100 with Supabase Pro; stateless horizontal scaling
NFR13: PgBouncer pooling (transaction mode); 60 connections free/200 pro; connections released between messages
NFR14: Maintains <5s latency with 10x growth; <10% degradation at 2x capacity; cost/user <€0.20 at 1000 MAU
NFR15: Handles 35K communes, 10K+ conversation history, and 100K+ offers with queries <100ms
NFR16: Uptime >95% (MVP) with max 3.6h downtime/month; maintenance windows announced 24h ahead
NFR17: Errors logged with context; critical alerts within 5 minutes; user-facing errors actionable; graceful degradation
NFR18: Sessions, favorites, and ghost subscriptions persist across crashes; ACID transactions enforce consistency
NFR19: Recovery within 2 minutes; backups/restore tested monthly; rollback procedures documented and tested
NFR20: LLM failures handled with exponential backoff; fallback provider; user notified if both fail; max 3 retries
NFR21: External data failures logged without blocking search; stale data acceptable up to 7 days; partial data allowed; ghost monitoring compensates
NFR22: Email notifications within 15 minutes; delivery rate >95%; bounce/spam monitored; unsubscribe within 24h
NFR23: Langfuse traces 100% LLM calls; PostHog tracks all user actions; costs accurate within 5%; alerts delivered within 5 minutes
NFR24: Structured JSON logs with severity; queryable by user_id/conversation_id; no sensitive data in logs
NFR25: End-to-end traces in Langfuse with parent/child relationships, latency breakdown, and cost per conversation
NFR26: Metrics dashboard refresh every 5 minutes with conversations, engagement, costs, p95 latency, error rate; 90-day retention
NFR27: Alerts: critical via Slack+Email (error rate >5%, costs >€10/day, latency >10s) and warnings via Slack; actionable links; <5% false positives

### Additional Requirements

- [Architecture] Utiliser un starter template custom Python 3.12+ avec `uv` (FastAPI + LangGraph/LangChain) et la structure projet définie; commandes d'init `uv init bienvenue-agents --app` + dépendances listées.
- [Architecture] Streaming temps réel via SSE, endpoints REST complémentaires, réponses JSON standard, versioning `/api/v1`.
- [Architecture] Auth JWT Supabase validée via JWKS; tokens jamais en URL; rate limiting et cache via Redis (sliding window).
- [Architecture] Infrastructure : Docker + Docker Compose, CI/CD GitHub Actions → SSH deploy, backend sur VPS, frontend sur Vercel.
- [Architecture] Observabilité Langfuse + logging structuré; aucune donnée sensible en logs; hiérarchie d'erreurs `BienvenueError`.
- [Architecture] Persistance Supabase (conversations, solutions, favoris, historiques) + pgvector; sessions et solutions persistées.
- [Architecture] Tests avec personas synthétiques, snapshot testing JSON, pytest/pytest-asyncio, ruff/mypy.
- [UX] Carte full screen avec overlay conversation gauche (400px desktop), overlay toujours visible, input fixé en bas.
- [UX] Desktop-first; breakpoints 1280/1024/768 avec mode mobile dégradé.
- [UX] Solutions affichées une par une avec feedback progressif; pas d'écran bloquant; chat utilisable pendant le chargement.
- [UX] Interactions carte : hover preview (desktop), clic zoom + bandeau "En savoir plus / Partager / Favoris".
- [UX] Accessibilité WCAG 2.1 A minimum : texte >=16px, contrastes élevés, navigation clavier, focus visible.
- [UX] Design system : Tailwind + shadcn-svelte + Magic UI + bits-ui, dark mode auto via `prefers-color-scheme`.

---

## Coverage Maps

### FR Coverage Map

| FR | Epic |
|----|------|
| FR1-FR6 | Epic 1 - Compte et accès sécurisé |
| FR7-FR14 | Epic 2 - Conversation et validation des critères |
| FR15-FR21 | Epic 3 - Recommandations de communes pertinentes |
| FR22-FR30, FR39-FR44 | Epic 4 - Exploration des résultats, carte et continuité |
| FR31-FR38 | Epic 5 - Ghost Monitoring et notifications |
| FR45-FR52 | Epic 6 - Observabilité et opérations |

### NFR Coverage Map

| NFR | Epic/Story | Description |
|-----|------------|-------------|
| NFR1-2 | Story 3.1a, 3.1b | Performance recommandations |
| NFR3-4 | Story 4.2 | Performance frontend/carte |
| NFR5 | Story 0.3, 3.1a | Performance DB |
| NFR6-8 | Story 1.4, 0.6 | Sécurité JWT/encryption |
| NFR9 | Story 0.7 | Rate limiting dédié |
| NFR10 | Story 0.8 | RGPD dédié |
| NFR11 | Story 0.3 | UUID secure |
| NFR12-14 | Story 0.2, 0.4 | Scalabilité Redis/PgBouncer |
| NFR15 | Story 0.3, 0.13 | Volume données + seed communes |
| NFR16-19 | Story 0.9 | Fiabilité/Recovery |
| NFR20-21 | Story 2.8 | Fallbacks LLM |
| NFR22 | Story 5.5 | Email delivery |
| NFR23-27 | Epic 6 | Observabilité complète |

---

## Epic List

### Epic 0: Infrastructure & DevOps
Mise en place de l'infrastructure technique nécessaire avant le développement des fonctionnalités.
**NFRs covered:** NFR5, NFR9, NFR10, NFR11, NFR12, NFR13, NFR16, NFR17, NFR18, NFR19

### Epic 1: Compte et accès sécurisé
Les utilisateurs peuvent créer un compte, se connecter et accéder à leur espace de façon sécurisée.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6
**NFRs covered:** NFR6, NFR7, NFR8, NFR11

### Epic 2: Conversation et validation des critères
Les utilisateurs peuvent exprimer leurs besoins, clarifier les critères et les valider avant la recherche.
**FRs covered:** FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14
**NFRs covered:** NFR1, NFR20, NFR21

### Epic 3: Recommandations de communes pertinentes
Le système génère des recommandations classées avec scores, justifications et filtres d'offres dans la latence cible.
**FRs covered:** FR15, FR16, FR17, FR18, FR19, FR20, FR21
**NFRs covered:** NFR2, NFR5, NFR14, NFR15

### Epic 4: Exploration des résultats, carte et continuité
Les utilisateurs explorent les résultats sur la carte, consultent les détails et gèrent favoris et historique.
**FRs covered:** FR22, FR23, FR24, FR25, FR26, FR27, FR28, FR29, FR30, FR39, FR40, FR41, FR42, FR43, FR44
**NFRs covered:** NFR3, NFR4, NFR18

### Epic 5: Ghost Monitoring et notifications
Les utilisateurs sont surveillés sur les communes sans offres et reçoivent des notifications quand de nouvelles offres apparaissent.
**FRs covered:** FR31, FR32, FR33, FR34, FR35, FR36, FR37, FR38
**NFRs covered:** NFR22

### Epic 6: Observabilité et opérations
Les opérateurs suivent coûts, latences, traces et logs pour piloter et sécuriser le système.
**FRs covered:** FR45, FR46, FR47, FR48, FR49, FR50, FR51, FR52
**NFRs covered:** NFR23, NFR24, NFR25, NFR26, NFR27

---

## Stories

---

### Epic 0: Infrastructure & DevOps

---

### Story 0.1: Initialisation du projet agents (uv) `[Infra]`

As a opérateur technique,
I want initialiser le projet agents avec uv et la structure recommandée,
So that l'architecture de référence est en place pour le dev.

**FRs covered:** Aucun
**NFRs covered:** Aucun
**Additional Requirements:** Starter template custom uv et structure projet de référence
**blocked_by:** Aucun (première story)

**Acceptance Criteria:**

**Given** le dépôt backend est prêt à être initialisé
**When** j'exécute les commandes uv recommandées (uv init + uv add)
**Then** la structure projet référence est créée (src/, api/, agents/, tools/, services/, core/, tests/)
**And** l'application FastAPI démarre en mode dev avec un endpoint de santé minimal (`/health`)
**And** les dépendances principales sont installées (fastapi, langgraph, langchain, supabase-py)

---

### Story 0.2: Configuration Docker et Docker Compose `[Infra]`

As a opérateur technique,
I want containeriser le backend avec Docker,
So that le déploiement soit reproductible et isolé.

**FRs covered:** Aucun
**NFRs covered:** NFR12 (scalabilité), NFR16 (uptime)
**Additional Requirements:** Docker + Docker Compose
**blocked_by:** Story 0.1

**Acceptance Criteria:**

**Given** le projet agents est initialisé
**When** je lance `docker-compose up`
**Then** le backend FastAPI démarre dans un container
**And** Redis démarre dans un container séparé
**And** les volumes persistent les données entre redémarrages
**And** le fichier `.env.example` documente toutes les variables requises

---

### Story 0.3: Schéma Supabase et extension pgvector `[Infra]`

As a opérateur technique,
I want créer le schéma de base de données avec support vectoriel,
So that les données métier et les embeddings puissent être persistés.

**FRs covered:** Aucun (prérequis pour FR39, FR41, FR44, FR15)
**NFRs covered:** NFR5 (performance queries), NFR11 (UUID v4), NFR15 (volume données), NFR18 (persistance)
**Additional Requirements:** Supabase PostgreSQL + pgvector
**blocked_by:** Aucun (peut être fait en parallèle de 0.1)

**Acceptance Criteria:**

**Given** le projet Supabase existe
**When** les migrations sont appliquées
**Then** l'extension `pgvector` est activée (`CREATE EXTENSION IF NOT EXISTS vector`)
**And** les tables suivantes existent avec leurs colonnes :
  - `communes` (code VARCHAR PK, nom, departement, region, population, embedding VECTOR(1536), data JSONB)
  - `conversations` (id UUID, user_id, created_at, updated_at, status)
  - `messages` (id UUID, conversation_id FK, role, content, created_at)
  - `solutions` (id UUID, conversation_id FK, communes JSONB, scores JSONB)
  - `favorites` (id UUID, user_id, commune_code, created_at)
  - `ghost_subscriptions` (id UUID, user_id, commune_code, criteria JSONB, expires_at)
**And** un index HNSW est créé sur `communes.embedding` pour la recherche vectorielle
**And** les index sont créés pour les requêtes fréquentes (user_id, conversation_id)
**And** les RLS policies protègent l'accès aux données par user_id
**And** tous les IDs sont des UUID v4

---

### Story 0.4: Configuration Redis (cache + rate limiting) `[Infra]`

As a opérateur technique,
I want configurer Redis pour le cache et le rate limiting,
So that les performances et la sécurité soient assurées.

**FRs covered:** Aucun
**NFRs covered:** NFR9 (rate limiting), NFR12 (scalabilité), NFR13 (connection pooling)
**Additional Requirements:** Cache via Redis (sliding window)
**blocked_by:** Story 0.2

**Acceptance Criteria:**

**Given** Docker Compose est configuré
**When** Redis est démarré
**Then** le backend peut se connecter à Redis
**And** un test de cache simple fonctionne (set/get)
**And** la configuration de sliding window rate limiting est prête
**And** le TTL par défaut est configuré (1h pour cache, configurable)

---

### Story 0.5: Configuration des variables d'environnement `[Infra]`

As a opérateur technique,
I want une gestion propre des secrets et configurations,
So that les environnements soient isolés et sécurisés.

**FRs covered:** Aucun
**NFRs covered:** NFR8 (encryption), NFR17 (graceful degradation)
**blocked_by:** Story 0.1

**Acceptance Criteria:**

**Given** le projet est initialisé
**When** je configure l'environnement
**Then** un fichier `.env.example` liste toutes les variables requises
**And** les secrets (API keys, DB password) ne sont jamais commités
**And** le backend échoue avec un message clair si une variable requise manque
**And** les variables sont validées au démarrage avec Pydantic Settings

---

### Story 0.6: Endpoint SSE pour le streaming temps réel `[Backend]`

As a développeur,
I want un endpoint SSE fonctionnel,
So that le frontend puisse recevoir les réponses en streaming.

**FRs covered:** Aucun (prérequis pour FR8)
**NFRs covered:** NFR1 (first chunk <1s)
**Additional Requirements:** Streaming temps réel via SSE
**blocked_by:** Story 0.1

**Acceptance Criteria:**

**Given** le backend FastAPI est configuré
**When** un client se connecte à `/api/v1/chat/stream`
**Then** le serveur maintient une connexion SSE ouverte
**And** les événements sont envoyés au format `data: {json}\n\n`
**And** les types d'événements incluent : `message`, `criteria`, `recommendations`, `error`, `done`
**And** la connexion se ferme proprement après `done`

---

### Story 0.7: Rate limiting par utilisateur `[Backend]`

As a opérateur technique,
I want limiter le nombre de requêtes par utilisateur,
So that le système soit protégé contre les abus.

**FRs covered:** Aucun
**NFRs covered:** NFR9 (rate limiting complet)
**blocked_by:** Story 0.4, Story 1.4

**Acceptance Criteria:**

**Given** Redis est configuré et l'auth JWT fonctionne
**When** un utilisateur dépasse les limites
**Then** il reçoit une erreur 429 avec le temps d'attente
**And** les limites suivantes sont appliquées :
  - 100 messages/heure
  - 10 messages/minute
  - €0.50/jour de coût LLM
  - 10 communes ghost max
**And** les limites sont trackées par user_id via Redis sliding window
**And** les utilisateurs non authentifiés ont des limites plus restrictives

---

### Story 0.8: Conformité RGPD (suppression, anonymisation) `[Backend]`

As a utilisateur,
I want pouvoir supprimer mes données,
So that mes droits RGPD soient respectés.

**FRs covered:** Aucun
**NFRs covered:** NFR10 (RGPD complet)
**blocked_by:** Story 0.3, Story 1.4

**Acceptance Criteria:**

**Given** un utilisateur authentifié
**When** il demande la suppression de ses données
**Then** toutes ses conversations, favoris et subscriptions sont supprimés
**And** les données sont auto-supprimées après 90 jours d'inactivité
**And** aucune PII n'est présente dans les logs/traces
**And** la politique de confidentialité est accessible publiquement
**And** un endpoint `/api/v1/user/delete` permet la suppression

---

### Story 0.9: CI/CD GitHub Actions `[Infra]`

As a développeur,
I want un pipeline CI/CD automatisé,
So that les déploiements soient fiables et rapides.

**FRs covered:** Aucun
**NFRs covered:** NFR16 (uptime), NFR19 (recovery)
**Additional Requirements:** CI/CD GitHub Actions → SSH deploy
**blocked_by:** Story 0.2

**Acceptance Criteria:**

**Given** le code est poussé sur main
**When** le pipeline s'exécute
**Then** les tests (pytest) sont lancés
**And** le linting (ruff) et typing (mypy) sont vérifiés
**And** si tout passe, le déploiement SSH vers le VPS est déclenché
**And** le déploiement utilise une stratégie rolling update
**And** un rollback est possible en <2 minutes

---

### Story 0.10: Correction auth routing frontend `[Frontend]`

As a utilisateur,
I want accéder aux bonnes pages de connexion/inscription,
So that je puisse m'authentifier sans confusion.

**FRs covered:** FR1, FR2, FR3 (correction existant)
**NFRs covered:** Aucun
**blocked_by:** Aucun (correction code existant)

**Acceptance Criteria:**

**Given** la codebase frontend existante
**When** je navigue vers l'authentification
**Then** les routes `/signin` et `/signup` existent et fonctionnent
**And** le Header utilise les bonnes URLs de navigation
**And** `authGuard` redirige vers `/signin` (pas `/auth`)
**And** les pages `/login` et `/register` redirigent vers `/signin` et `/signup`

---

### Story 0.11: Unification du chat state `[Frontend]`

As a développeur,
I want un seul store pour l'état du chat,
So that l'état soit cohérent entre les composants.

**FRs covered:** FR7, FR8 (correction existant)
**NFRs covered:** Aucun
**blocked_by:** Aucun (correction code existant)

**Acceptance Criteria:**

**Given** les deux fichiers `map.svelte.ts` et `chat.svelte.ts` contiennent un chatState
**When** le refactoring est appliqué
**Then** un seul `chatState` existe dans `chat.svelte.ts`
**And** `map/+page.svelte` importe depuis `chat.svelte.ts`
**And** `Chat.svelte` utilise le même store
**And** l'accès à `window` est protégé avec `browser` check

---

### Story 0.12: Réactivité des marqueurs carte `[Frontend]`

As a utilisateur,
I want que la carte se mette à jour quand les recommandations changent,
So that je voie toujours les communes actuelles.

**FRs covered:** FR25, FR26 (correction existant)
**NFRs covered:** NFR4 (markers <500ms)
**blocked_by:** Aucun (correction code existant)

**Acceptance Criteria:**

**Given** `mapState.solutionData` change
**When** de nouvelles communes sont chargées
**Then** les marqueurs sur la carte sont mis à jour automatiquement
**And** les anciens marqueurs sont supprimés
**And** le zoom s'ajuste pour inclure tous les marqueurs
**And** la mise à jour se fait en <500ms

---

### Story 0.13: Seed data communes (import initial) `[Infra]`

As a opérateur technique,
I want importer les données des 35K communes françaises,
So that le système dispose des données de référence pour les recommandations.

**FRs covered:** Aucun (prérequis pour FR15, FR16, FR17)
**NFRs covered:** NFR15 (35K communes)
**Additional Requirements:** 7 catégories MVP pour 35 570 communes françaises
**blocked_by:** Story 0.3

**Acceptance Criteria:**

**Given** le schéma Supabase avec pgvector est en place
**When** le script d'import est exécuté
**Then** les 35 570 communes françaises sont insérées dans la table `communes`
**And** chaque commune a ses données pour les 7 catégories MVP (emploi, immobilier, services, démographie, accessibilité, environnement, sécurité)
**And** les embeddings vectoriels sont générés et stockés pour chaque commune
**And** le script est idempotent (peut être relancé sans créer de doublons)
**And** un script de mise à jour incrémentale existe pour les rafraîchissements futurs

---

## Epic 1: Compte et accès sécurisé

---

### Story 1.1: Inscription email / mot de passe `[Frontend]` `[Backend]`

As a nouvel utilisateur,
I want créer un compte avec email et mot de passe,
So that je peux accéder à la plateforme.

**FRs covered:** FR1
**NFRs covered:** NFR6 (JWT), NFR11 (UUID)
**blocked_by:** Story 0.3, Story 0.10

**Acceptance Criteria:**

**Given** je suis sur l'écran d'inscription `/signup`
**When** je soumets un email valide et un mot de passe conforme aux règles Supabase
**Then** le compte est créé dans Supabase Auth et une session est ouverte
**And** si l'email existe déjà, un message d'erreur clair est affiché sans créer de session
**And** le mot de passe doit faire minimum 8 caractères

---

### Story 1.2: Connexion email / mot de passe `[Frontend]` `[Backend]`

As a utilisateur existant,
I want me connecter avec mon email et mot de passe,
So that je retrouve mon espace.

**FRs covered:** FR3
**NFRs covered:** NFR6 (JWT)
**blocked_by:** Story 1.1

**Acceptance Criteria:**

**Given** un compte existe avec cet email
**When** je soumets des identifiants valides sur `/signin`
**Then** une session est établie et l'état authentifié est visible dans l'UI
**And** si les identifiants sont invalides, je vois une erreur et aucune session n'est créée
**And** après 5 échecs consécutifs, un délai de 30s est imposé

---

### Story 1.3: Accès sécurisé aux routes et APIs protégées (JWT Supabase) `[Backend]`

As a utilisateur authentifié,
I want accéder à mon espace de manière sécurisée,
So that mes données restent privées.

**FRs covered:** FR6
**NFRs covered:** NFR6 (JWKS validation), NFR7 (data isolation), NFR8 (no token in URL)
**blocked_by:** Story 0.1, Story 0.3

**Acceptance Criteria:**

**Given** une route ou API protégée est appelée
**When** un JWT Supabase valide est fourni via header Authorization
**Then** l'accès est autorisé après vérification JWKS
**And** sans token, invalide ou expiré, la réponse est 401 avec un message d'erreur standard
**And** si la ressource appartient à un autre utilisateur, la réponse est 403 et l'accès est journalisé sans PII
**And** aucun token n'est passé dans l'URL ni journalisé

---

### Story 1.4: Déconnexion `[Frontend]`

As a utilisateur authentifié,
I want me déconnecter,
So that je termine proprement ma session.

**FRs covered:** FR4
**NFRs covered:** Aucun
**blocked_by:** Story 1.2

**Acceptance Criteria:**

**Given** je suis connecté
**When** je clique sur "Se déconnecter"
**Then** la session locale est supprimée et je suis redirigé vers une page publique
**And** toute route protégée me redemande une connexion
**And** le token refresh est révoqué côté Supabase

---

### Story 1.5: Réinitialisation du mot de passe `[Frontend]` `[Backend]`

As a utilisateur,
I want réinitialiser mon mot de passe par email,
So that je récupère l'accès à mon compte.

**FRs covered:** FR5
**NFRs covered:** NFR22 (email delivery)
**blocked_by:** Story 1.1

**Acceptance Criteria:**

**Given** je suis sur l'écran "Mot de passe oublié"
**When** je soumets mon email
**Then** un email de réinitialisation est envoyé (Supabase) et un message neutre est affiché
**And** avec un lien valide, je peux définir un nouveau mot de passe
**And** avec un lien invalide ou expiré, un message d'erreur clair est affiché
**And** le lien expire après 1 heure

---

### Story 1.6: Connexion Google OAuth `[Frontend]` `[Backend]`

As a utilisateur,
I want me connecter via Google,
So que je peux accéder sans mot de passe.

**FRs covered:** FR2
**NFRs covered:** NFR6 (JWT)
**blocked_by:** Story 0.10

**Acceptance Criteria:**

**Given** je clique "Se connecter avec Google"
**When** l'auth OAuth réussit
**Then** une session est créée et un compte est créé si c'est une première connexion
**And** si l'OAuth échoue ou est annulé, je reste non authentifié avec un message d'erreur
**And** le callback `/auth/callback` gère correctement l'échange de code

---

## Epic 2: Conversation et validation des critères

---

### Story 2.1: Démarrage d'une conversation de relocation `[Frontend]` `[Backend]`

As a utilisateur,
I want démarrer une conversation de relocation,
So that je puisse exprimer mes besoins.

**FRs covered:** FR7
**NFRs covered:** NFR11 (UUID)
**blocked_by:** Story 0.3, Story 0.6, Story 0.11

**Acceptance Criteria:**

**Given** je suis sur l'interface de conversation
**When** je lance une nouvelle conversation
**Then** une session est créée avec un identifiant UUID unique
**And** un message d'accueil s'affiche
**And** les messages sont associés à cette session en base de données

---

### Story 2.2: Échanges multi-tours avec contexte `[Backend]`

As a utilisateur,
I want échanger en multi-tours avec l'agent,
So that il comprenne mon contexte.

**FRs covered:** FR8, FR14
**NFRs covered:** NFR1 (first chunk <1s)
**blocked_by:** Story 2.1

**Acceptance Criteria:**

**Given** une session de conversation existe
**When** j'envoie plusieurs messages successifs
**Then** chaque message et réponse est enregistré dans la session
**And** l'agent tient compte du contexte précédent
**And** le premier fragment de réponse est affiché en moins d'1 seconde via SSE

---

### Story 2.3: Questions de clarification `[Backend]`

As a utilisateur,
I want répondre aux questions de clarification,
So que mes critères soient précisés.

**FRs covered:** FR9
**NFRs covered:** Aucun
**blocked_by:** Story 2.2

**Acceptance Criteria:**

**Given** l'agent pose une question de clarification
**When** je réponds dans la conversation
**Then** ma réponse est ajoutée au contexte et visible dans l'historique
**And** l'agent peut poser une autre question si nécessaire
**And** l'agent ne pose pas plus de 5 questions consécutives

---

### Story 2.4: Extraction structurée des critères `[Backend]`

As a utilisateur,
I want que mes critères soient extraits en format structuré,
So that la recherche soit précise.

**FRs covered:** FR10
**NFRs covered:** Aucun
**blocked_by:** Story 2.2

**Acceptance Criteria:**

**Given** l'historique de conversation contient suffisamment d'informations
**When** l'extraction est déclenchée
**Then** un objet de critères structuré (emploi, logement, localisation, lifestyle) est produit
**And** les critères sont associés à la session en base
**And** si l'extraction échoue, je suis invité à reformuler sans bloquer la conversation
**And** le schéma JSON est validé avec Pydantic

---

### Story 2.5: Résumé des critères avant recherche `[Frontend]` `[Backend]`

As a utilisateur,
I want voir un résumé de mes critères avant la recherche,
So that je vérifie ce qui sera utilisé.

**FRs covered:** FR11
**NFRs covered:** Aucun
**blocked_by:** Story 2.4

**Acceptance Criteria:**

**Given** des critères structurés existent pour la session
**When** l'étape de validation est atteinte
**Then** un résumé clair est affiché dans le chat avant tout lancement de recherche
**And** l'action de recherche reste désactivée tant que je n'ai pas validé
**And** le résumé est formaté de manière lisible (bullet points)

---

### Story 2.6: Modification des critères `[Frontend]` `[Backend]`

As a utilisateur,
I want modifier mes critères,
So que je corrige les erreurs ou ajuste mes besoins.

**FRs covered:** FR12
**NFRs covered:** Aucun
**blocked_by:** Story 2.5

**Acceptance Criteria:**

**Given** le résumé des critères est affiché
**When** je modifie un champ ou un critère via le chat
**Then** les changements sont sauvegardés dans la session
**And** le résumé se met à jour pour refléter les nouvelles valeurs
**And** je peux modifier en langage naturel ou via UI dédiée

---

### Story 2.7: Validation explicite des critères `[Frontend]` `[Backend]`

As a utilisateur,
I want valider explicitement mes critères,
So that la recherche de communes soit lancée.

**FRs covered:** FR13
**NFRs covered:** Aucun
**blocked_by:** Story 2.5

**Acceptance Criteria:**

**Given** le résumé des critères est affiché
**When** je confirme la validation des critères (bouton ou message)
**Then** un signal de validation est enregistré pour déclencher la recherche
**And** aucune recherche n'est lancée sans cette validation explicite
**And** l'UI indique clairement que la recherche démarre

---

### Story 2.8: Fallbacks et retry logic LLM `[Backend]`

As a opérateur technique,
I want que les erreurs LLM soient gérées gracieusement,
So that l'utilisateur ne soit pas bloqué.

**FRs covered:** Aucun
**NFRs covered:** NFR20 (LLM failures), NFR21 (external data failures)
**blocked_by:** Story 2.2

**Acceptance Criteria:**

**Given** un appel LLM échoue
**When** le système détecte l'erreur
**Then** un retry avec exponential backoff est tenté (max 3 fois)
**And** si OpenAI échoue, le fallback vers Claude est utilisé
**And** si les deux échouent, l'utilisateur est notifié avec un message actionnable
**And** l'erreur est loggée avec contexte pour debug

---

## Epic 3: Recommandations de communes pertinentes

---

### Story 3.1a: Recherche vectorielle des communes candidates `[Backend]`

As a système,
I want trouver les communes les plus proches sémantiquement des critères,
So that je dispose d'une liste de candidates.

**FRs covered:** FR15 (partiel)
**NFRs covered:** NFR2 (vector <50ms), NFR5 (query performance)
**blocked_by:** Story 2.7, Story 0.3

**Acceptance Criteria:**

**Given** des critères validés et vectorisés existent
**When** la recherche vectorielle est lancée
**Then** les 50-100 communes les plus proches sont retournées via pgvector
**And** la recherche s'exécute en <50ms (p95)
**And** le vecteur utilisateur est généré depuis les critères structurés

---

### Story 3.1b: Filtrage SQL et scoring des communes `[Backend]`

As a système,
I want filtrer et scorer les communes candidates,
So that je retourne un top 10 pertinent.

**FRs covered:** FR15, FR21
**NFRs covered:** NFR2 (SQL <20ms, total <5s), NFR14 (scalabilité)
**blocked_by:** Story 3.1a

**Acceptance Criteria:**

**Given** une liste de communes candidates existe
**When** le filtrage SQL et le scoring sont appliqués
**Then** les filtres métier sont appliqués (offres emploi, budget logement)
**And** un score global est calculé pour chaque commune
**And** le top 10 est retourné trié par score décroissant
**And** le temps total (vector + SQL + enrichment) est <5s (p95)

---

### Story 3.2: Filtrage par offres d'emploi `[Backend]`

As a utilisateur,
I want que les communes recommandées aient des offres d'emploi compatibles,
So that les résultats soient actionnables.

**FRs covered:** FR19
**NFRs covered:** Aucun
**blocked_by:** Story 3.1b

**Acceptance Criteria:**

**Given** une liste de recommandations existe et des critères emploi sont fournis
**When** le filtrage par offres d'emploi est appliqué
**Then** les communes sans offres d'emploi correspondantes sont retirées ou marquées
**And** si aucun critère emploi n'est fourni, la liste reste inchangée
**And** les communes "ghost" (matching mais sans offres) sont identifiées

---

### Story 3.3: Filtrage par offres de logement `[Backend]`

As a utilisateur,
I want que les communes recommandées respectent mon budget logement,
So that les résultats restent réalistes.

**FRs covered:** FR20
**NFRs covered:** Aucun
**blocked_by:** Story 3.1b

**Acceptance Criteria:**

**Given** une liste de recommandations existe et un budget logement est défini
**When** le filtrage par offres de logement est appliqué
**Then** les communes sans offres logement compatibles sont retirées ou marquées
**And** si aucun budget n'est fourni, la liste reste inchangée

---

### Story 3.4: Calcul du score global `[Backend]`

As a utilisateur,
I want un score global par commune,
So que je puisse comparer rapidement les recommandations.

**FRs covered:** FR16
**NFRs covered:** Aucun
**blocked_by:** Story 3.1b

**Acceptance Criteria:**

**Given** une liste de communes recommandées existe
**When** le score global est calculé
**Then** chaque commune obtient un score global compris entre 0 et 100
**And** le classement utilise ce score comme critère principal
**And** le calcul pondère les scores par catégorie selon les critères utilisateur

---

### Story 3.5: Calcul des scores par catégorie `[Backend]`

As a utilisateur,
I want des scores par catégorie,
So que je comprenne les forces et faiblesses de chaque commune.

**FRs covered:** FR17
**NFRs covered:** Aucun
**blocked_by:** Story 3.1b

**Acceptance Criteria:**

**Given** une liste de communes recommandées existe
**When** les scores par catégorie sont calculés
**Then** chaque commune expose 7 scores (emploi, immobilier, services, démographie, accessibilité, environnement, sécurité)
**And** chaque score est compris entre 0 et 100
**And** les scores sont basés sur les données réelles de la BDD

---

### Story 3.6: Justifications des recommandations `[Backend]`

As a utilisateur,
I want une justification claire pour chaque recommandation,
So that je comprenne pourquoi elle est proposée.

**FRs covered:** FR18
**NFRs covered:** Aucun
**blocked_by:** Story 3.4, Story 3.5

**Acceptance Criteria:**

**Given** une liste de communes recommandées existe avec leurs scores
**When** les justifications sont générées
**Then** chaque commune affiche au moins deux raisons liées aux critères et aux données
**And** les justifications sont lisibles et actionnables
**And** elles mentionnent des données concrètes (ex: "15 offres d'emploi en développement web")

---

## Epic 4: Exploration des résultats, carte et continuité

---

### Story 4.1: Affichage du classement des communes `[Frontend]`

As a utilisateur,
I want voir un classement des communes recommandées,
So that je puisse parcourir rapidement les meilleurs résultats.

**FRs covered:** FR22
**NFRs covered:** NFR3 (FCP, LCP)
**blocked_by:** Story 3.1b, Story 0.11

**Acceptance Criteria:**

**Given** des recommandations ont été générées
**When** la vue résultats est affichée
**Then** je vois une liste classée des communes avec leur rang et leur score global
**And** la liste est limitée aux communes recommandées par le système
**And** chaque item affiche le nom, le score, et un aperçu des points forts

---

### Story 4.2: Visualisation sur carte et interaction marqueurs `[Frontend]`

As a utilisateur,
I want voir les communes sur une carte interactive,
So que je puisse explorer géographiquement les résultats.

**FRs covered:** FR25, FR26
**NFRs covered:** NFR4 (map ready <1s, markers <500ms, 60 FPS)
**blocked_by:** Story 4.1, Story 0.12

**Acceptance Criteria:**

**Given** des recommandations ont été générées
**When** la carte est affichée
**Then** chaque commune recommandée apparaît avec un marqueur visible
**And** en cliquant un marqueur, la commune correspondante est sélectionnée
**And** la carte est prête en <1s après le chargement
**And** les marqueurs apparaissent en <500ms
**And** le pan/zoom fonctionne à 60 FPS

---

### Story 4.3: Détails de commune avec scores et justifications `[Frontend]`

As a utilisateur,
I want consulter les détails d'une commune,
So that je comprenne ses scores et pourquoi elle est recommandée.

**FRs covered:** FR23, FR24
**NFRs covered:** Aucun
**blocked_by:** Story 4.1

**Acceptance Criteria:**

**Given** une commune est sélectionnée dans la liste ou sur la carte
**When** j'ouvre la vue détail
**Then** je vois le score global et les scores par catégorie (graphique radar ou barres)
**And** je vois les justifications associées à la recommandation
**And** les données sont chargées depuis l'API (pas mock data)

---

### Story 4.4: Affichage des offres et liens externes `[Frontend]`

As a utilisateur,
I want voir les offres emploi et logement liées à une commune,
So que je puisse passer à l'action.

**FRs covered:** FR27, FR28, FR29
**NFRs covered:** Aucun
**blocked_by:** Story 4.3

**Acceptance Criteria:**

**Given** une commune est sélectionnée
**When** je consulte la section offres
**Then** je vois les offres emploi et logement disponibles pour cette commune
**And** chaque offre propose un lien externe d'accès
**And** si aucune offre n'est disponible, un message informatif est affiché
**And** le clic sur une offre est tracké (PostHog)

---

### Story 4.5: Feedback thumbs up/down sur les recommandations `[Frontend]` `[Backend]`

As a utilisateur,
I want donner un retour rapide sur les recommandations,
So que le système sache si c'est pertinent.

**FRs covered:** FR30
**NFRs covered:** NFR23 (PostHog tracking)
**blocked_by:** Story 4.1

**Acceptance Criteria:**

**Given** des recommandations sont affichées
**When** je donne un feedback thumbs up ou thumbs down
**Then** le feedback est enregistré pour la session courante en base
**And** l'interface indique que mon retour a bien été pris en compte
**And** le feedback est tracké dans PostHog pour analytics

---

### Story 4.6: Ajout d'une commune aux favoris `[Frontend]` `[Backend]`

As a utilisateur,
I want enregistrer une commune en favoris,
So que je la retrouve plus tard.

**FRs covered:** FR41
**NFRs covered:** NFR18 (persistance)
**blocked_by:** Story 4.1, Story 0.3, Story 1.3

**Acceptance Criteria:**

**Given** une commune est visible dans les résultats
**When** je clique sur "Favori"
**Then** la commune est ajoutée à ma liste de favoris en base
**And** un indicateur visuel confirme l'ajout (icône remplie)
**And** je dois être authentifié pour ajouter un favori

---

### Story 4.7: Consultation et suppression des favoris `[Frontend]` `[Backend]`

As a utilisateur,
I want consulter et retirer mes favoris,
So que je gère ma sélection.

**FRs covered:** FR42, FR43
**NFRs covered:** NFR18 (persistance)
**blocked_by:** Story 4.6

**Acceptance Criteria:**

**Given** j'ai des communes en favoris
**When** j'ouvre la liste des favoris
**Then** je vois toutes mes communes sauvegardées
**And** je peux retirer un favori avec effet immédiat dans la liste
**And** la suppression est confirmée visuellement

---

### Story 4.8: Persistance de session, historique et préférences `[Frontend]` `[Backend]`

As a utilisateur,
I want retrouver ma session et mes préférences après un retour,
So que je continue sans perdre mon contexte.

**FRs covered:** FR39, FR40, FR44
**NFRs covered:** NFR18 (persistance ACID)
**blocked_by:** Story 2.1, Story 0.3

**Acceptance Criteria:**

**Given** j'ai une session précédente avec des résultats
**When** je recharge la page ou reviens plus tard
**Then** la session est restaurée avec l'historique des messages et les résultats
**And** mes favoris et préférences utilisateur sont conservés
**And** je peux voir mes conversations passées dans un historique

---

## Epic 5: Ghost Monitoring et notifications

---

### Story 5.1: Détection automatique des communes sans offres `[Backend]`

As a utilisateur,
I want que le système détecte les communes sans offres,
So que je puisse être informé plus tard si des offres apparaissent.

**FRs covered:** FR31
**NFRs covered:** Aucun
**blocked_by:** Story 3.2, Story 3.3

**Acceptance Criteria:**

**Given** une commune est recommandée
**When** aucune offre emploi ou logement n'est disponible selon mes critères
**Then** la commune est marquée comme éligible au Ghost Monitoring
**And** cette détection ne bloque pas l'affichage des autres recommandations
**And** l'UI indique clairement que c'est une commune "fantôme"

---

### Story 5.2: Activation automatique du Ghost Monitoring `[Backend]`

As a utilisateur,
I want être inscrit automatiquement au Ghost Monitoring,
So que je sois averti sans action manuelle.

**FRs covered:** FR32
**NFRs covered:** NFR9 (max 10 ghost communes/user)
**blocked_by:** Story 5.1, Story 0.3

**Acceptance Criteria:**

**Given** une commune est marquée éligible
**When** le Ghost Monitoring est activé
**Then** une inscription est créée en base avec user_id, commune_code, critères et statut actif
**And** la durée maximale de surveillance est fixée à 30 jours
**And** si l'utilisateur a déjà 10 communes surveillées, un message l'en informe

---

### Story 5.3: Notification d'activation du Ghost Monitoring `[Frontend]`

As a utilisateur,
I want être informé que le Ghost Monitoring est actif,
So que je comprenne ce qui sera surveillé.

**FRs covered:** FR33
**NFRs covered:** Aucun
**blocked_by:** Story 5.2

**Acceptance Criteria:**

**Given** une inscription Ghost Monitoring a été créée
**When** la commune est affichée dans l'interface
**Then** un message indique que la commune est surveillée
**And** un lien "Ne plus surveiller" est visible
**And** la date d'expiration est affichée

---

### Story 5.4: Scan périodique des nouvelles offres `[Backend]`

As a utilisateur,
I want que le système scanne régulièrement les nouvelles offres,
So que je sois averti des opportunités.

**FRs covered:** FR34
**NFRs covered:** Aucun
**blocked_by:** Story 5.2

**Acceptance Criteria:**

**Given** des inscriptions Ghost Monitoring actives existent
**When** le job de scan périodique s'exécute (quotidien)
**Then** les nouvelles offres compatibles sont détectées
**And** aucune commune inactive ou expirée n'est scannée
**And** le job est idempotent (peut être relancé sans doublon)

---

### Story 5.5: Envoi d'email de notification `[Backend]`

As a utilisateur,
I want recevoir un email quand une offre apparaît,
So que je puisse agir rapidement.

**FRs covered:** FR35
**NFRs covered:** NFR22 (email <15min, >95% delivery)
**blocked_by:** Story 5.4

**Acceptance Criteria:**

**Given** une nouvelle offre correspond à mes critères pour une commune surveillée
**When** la notification est déclenchée
**Then** un email est envoyé avec le détail de l'offre et un lien d'accès
**And** l'envoi respecte un délai raisonnable (<= 15 minutes)
**And** le taux de délivrance est >95%

---

### Story 5.6: Opt-out par commune `[Frontend]` `[Backend]`

As a utilisateur,
I want désactiver la surveillance d'une commune,
So que je contrôle mes notifications.

**FRs covered:** FR36
**NFRs covered:** Aucun
**blocked_by:** Story 5.3

**Acceptance Criteria:**

**Given** une commune est surveillée
**When** je clique sur "Ne plus surveiller"
**Then** la surveillance est désactivée immédiatement pour cette commune
**And** je ne reçois plus d'email pour celle-ci
**And** l'UI reflète le changement instantanément

---

### Story 5.7: Expiration automatique après 30 jours `[Backend]`

As a utilisateur,
I want que la surveillance s'arrête automatiquement après 30 jours,
So que je ne sois pas notifié indéfiniment.

**FRs covered:** FR37
**NFRs covered:** Aucun
**blocked_by:** Story 5.2

**Acceptance Criteria:**

**Given** une surveillance est active depuis 30 jours
**When** la date limite est atteinte
**Then** le statut passe à expiré et la surveillance cesse
**And** aucune notification n'est envoyée après expiration
**And** un job cron vérifie les expirations quotidiennement

---

### Story 5.8: Lien unsubscribe RGPD dans les emails `[Backend]`

As a utilisateur,
I want un lien de désinscription clair dans les emails,
So que je puisse respecter mes préférences RGPD.

**FRs covered:** FR38
**NFRs covered:** NFR10 (RGPD), NFR22 (unsubscribe <24h)
**blocked_by:** Story 5.5

**Acceptance Criteria:**

**Given** un email Ghost Monitoring est envoyé
**When** je consulte l'email
**Then** un lien de désinscription est présent et fonctionne
**And** la désinscription est effective sous 24h maximum
**And** le lien utilise un token sécurisé (pas d'ID prévisible)

---

## Epic 6: Observabilité et opérations

---

### Story 6.1: Traces complètes des conversations (Langfuse) `[Backend]`

As a opérateur,
I want des traces complètes des conversations,
So que je puisse analyser le comportement des agents.

**FRs covered:** FR46
**NFRs covered:** NFR23 (100% LLM calls traced), NFR25 (parent/child relationships)
**blocked_by:** Story 2.2

**Acceptance Criteria:**

**Given** une conversation est exécutée
**When** les agents et outils sont appelés
**Then** une trace Langfuse est enregistrée avec les relations parent/enfant
**And** chaque appel LLM est tracé avec son temps et son statut
**And** les tokens input/output sont comptés

---

### Story 6.2: Suivi des coûts LLM par conversation et par jour `[Backend]`

As a opérateur,
I want suivre les coûts LLM par conversation et par jour,
So que je contrôle le budget.

**FRs covered:** FR45, FR48
**NFRs covered:** NFR23 (costs accurate within 5%)
**blocked_by:** Story 6.1

**Acceptance Criteria:**

**Given** des conversations ont été traitées
**When** je consulte les coûts
**Then** je vois le coût total par conversation
**And** je vois un agrégat journalier des coûts
**And** les coûts sont calculés avec les tarifs OpenAI/Anthropic actuels

---

### Story 6.3: Mesure de la latence p95 `[Backend]`

As a opérateur,
I want suivre la latence p95 des conversations,
So que je détecte les dégradations.

**FRs covered:** FR49
**NFRs covered:** NFR26 (refresh every 5 minutes)
**blocked_by:** Story 6.1

**Acceptance Criteria:**

**Given** des conversations ont été traitées
**When** les métriques sont calculées
**Then** la latence p95 est disponible et consultable
**And** les valeurs sont actualisées toutes les 5 minutes
**And** un historique de 90 jours est conservé

---

### Story 6.4: Dashboard opérateur `[Frontend]` `[Backend]`

As a opérateur,
I want un dashboard de métriques,
So que je visualise l'état du système.

**FRs covered:** FR47
**NFRs covered:** NFR26 (dashboard complet)
**blocked_by:** Story 6.2, Story 6.3

**Acceptance Criteria:**

**Given** des métriques existent
**When** j'ouvre le dashboard
**Then** je vois le volume de conversations, l'engagement, les coûts, la latence et le taux d'erreur
**And** le dashboard est accessible uniquement aux opérateurs (Gabriel)
**And** les données sont rafraîchies toutes les 5 minutes

---

### Story 6.5: Alertes de dépassement de coûts `[Backend]`

As a opérateur,
I want être alerté en cas de dépassement de coûts,
So que je puisse agir rapidement.

**FRs covered:** FR50
**NFRs covered:** NFR27 (alerts <5 minutes, Slack+Email)
**blocked_by:** Story 6.2

**Acceptance Criteria:**

**Given** un seuil quotidien de coût est défini (€10/jour)
**When** ce seuil est dépassé
**Then** une alerte est envoyée (email + Slack)
**And** l'alerte contient le montant, la période et un lien vers le dashboard
**And** l'alerte est envoyée en <5 minutes

---

### Story 6.6: Logs structurés avec contexte `[Backend]`

As a opérateur,
I want des logs structurés avec contexte,
So que je puisse diagnostiquer les erreurs rapidement.

**FRs covered:** FR51
**NFRs covered:** NFR24 (structured JSON logs)
**blocked_by:** Story 0.1

**Acceptance Criteria:**

**Given** un événement ou une erreur survient
**When** le log est écrit
**Then** il contient user_id, conversation_id, timestamp et niveau de sévérité
**And** aucune donnée sensible n'est journalisée (PII, tokens)
**And** le format est JSON structuré

---

### Story 6.7: Recherche et investigation dans les logs `[Backend]`

As a opérateur,
I want rechercher dans les logs,
So que je retrouve rapidement un incident.

**FRs covered:** FR52
**NFRs covered:** NFR24 (queryable logs)
**blocked_by:** Story 6.6

**Acceptance Criteria:**

**Given** des logs structurés existent
**When** je recherche par user_id ou conversation_id
**Then** je retrouve tous les événements associés
**And** je peux filtrer par niveau de sévérité
**And** les logs sont conservés 90 jours

---

### Story 6.8: Alertes critiques multi-canal `[Backend]`

As a opérateur,
I want des alertes pour les erreurs critiques,
So que je réagisse immédiatement aux incidents.

**FRs covered:** Aucun
**NFRs covered:** NFR17 (critical alerts <5 min), NFR27 (multi-channel)
**blocked_by:** Story 6.6

**Acceptance Criteria:**

**Given** une erreur critique survient (error rate >5%, latency >10s)
**When** le seuil est dépassé
**Then** une alerte Slack + Email est envoyée en <5 minutes
**And** l'alerte contient un lien actionnable vers les logs
**And** le taux de faux positifs est <5%

---

### Story 6.9: PostHog analytics intégration `[Frontend]` `[Backend]`

As a opérateur,
I want tracker les actions utilisateur,
So que je comprenne l'engagement produit.

**FRs covered:** Aucun
**NFRs covered:** NFR23 (PostHog tracks all user actions)
**blocked_by:** Story 0.10

**Acceptance Criteria:**

**Given** PostHog est configuré
**When** un utilisateur interagit avec la plateforme
**Then** les événements clés sont trackés :
  - Page views
  - Conversation started
  - Criteria validated
  - Commune clicked
  - Offer clicked
  - Favorite added
**And** les données sont disponibles dans le dashboard PostHog

---

## Summary

| Epic | Stories | FRs | NFRs |
|------|---------|-----|------|
| Epic 0 | 13 | 0 (prérequis) | 15 |
| Epic 1 | 6 | 6 | 5 |
| Epic 2 | 8 | 8 | 3 |
| Epic 3 | 7 | 7 | 4 |
| Epic 4 | 8 | 15 | 4 |
| Epic 5 | 8 | 8 | 3 |
| Epic 6 | 9 | 8 | 7 |
| **Total** | **59** | **52** | **27** |

---

## Dependency Graph (Critical Path)

```
Story 0.1 (uv init)
    ├── Story 0.2 (Docker) → Story 0.4 (Redis) → Story 0.7 (Rate Limiting)
    ├── Story 0.5 (Env) 
    ├── Story 0.6 (SSE) → Story 2.1 (Chat start)
    └── Story 0.9 (CI/CD)

Story 0.3 (Supabase schema + pgvector) [parallel with 0.1]
    ├── Story 0.13 (Seed data communes) → Story 3.1a (Vector search)
    ├── Story 0.8 (RGPD)
    ├── Story 1.1-1.6 (Auth)
    └── Story 2.1 (Chat start)

Story 0.10, 0.11, 0.12 (Frontend fixes) [parallel, no deps]

Story 1.1 → Story 1.2 → Story 1.4
Story 1.3 (JWT) → Story 0.7 (Rate Limiting)

Story 2.1 → Story 2.2 → Story 2.3, 2.4, 2.8
Story 2.4 → Story 2.5 → Story 2.6, 2.7
Story 2.7 → Story 3.1a

Story 3.1a → Story 3.1b → Story 3.2, 3.3, 3.4, 3.5
Story 3.4, 3.5 → Story 3.6

Story 3.1b → Story 4.1 → Story 4.2, 4.3, 4.5, 4.6
Story 4.3 → Story 4.4
Story 4.6 → Story 4.7

Story 3.2, 3.3 → Story 5.1 → Story 5.2 → Story 5.3, 5.4, 5.7
Story 5.4 → Story 5.5 → Story 5.8
Story 5.3 → Story 5.6

Story 2.2 → Story 6.1 → Story 6.2, 6.3
Story 6.2 → Story 6.4, 6.5
Story 6.6 → Story 6.7, 6.8
```

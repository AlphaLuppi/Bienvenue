# Product Brief : Bienvenue - Système Agentique de Relocation Intelligente

**Date :** 2026-01-18
**Auteur :** Gabriel
**Version :** 1.0 (MVP)
**Statut :** Ready for Implementation

---

## Vision du Produit

### Le Problème

Les citoyens français cherchant à déménager font face à un processus fragmenté et inefficace :
- Recherche d'emploi, de logement et de qualité de vie sont des processus séparés
- Aucune vision holistique des opportunités selon leurs critères personnels
- Information dispersée sur 130+ sources de données publiques
- Impossibilité d'explorer les opportunités au-delà de leur connaissance géographique limitée
- Décisions basées sur des critères incomplets ou biaisés

### La Solution : Bienvenue

**Bienvenue est une plateforme de relocation intelligente qui recommande les communes françaises optimales pour chaque citoyen, basée sur leurs critères personnels et validée par la disponibilité d'opportunités réelles.**

**Proposition de valeur unique :**
- **Holistique** : La "solution" est une COMMUNE, pas une combinaison emploi+maison+loisirs
- **Personnalisée** : Matching intelligent basé sur 900+ indicateurs et profil utilisateur
- **Conversationnelle** : Interaction naturelle guidée par agents LLM
- **Validée** : Chaque recommandation est vérifiée avec des offres réelles (emploi, immobilier)
- **Exploratoire** : Navigation géographique innovante par similarité

---

## Personas Cibles

### Persona 1 : Jeune Actif Tech - "Alex"
**Profil :** 28 ans, développeur, célibataire, Paris
**Critères prioritaires :** Opportunités tech, dynamisme, connectivité, vie sociale
**Contraintes :** Mobilité élevée, budget moyen, télétravail partiel possible
**Objectif :** Meilleure qualité de vie sans sacrifier la carrière

### Persona 2 : Famille Jeunes Enfants - "Les Martin"
**Profil :** 35 ans, 2 enfants (5 et 8 ans), couple actif, banlieue Lyon
**Critères prioritaires :** Éducation, sécurité, services, espaces verts
**Contraintes :** Stabilité requise, budget immobilier, deux emplois
**Objectif :** Cadre de vie optimal pour élever les enfants

### Persona 3 : Retraité Actif - "Jean"
**Profil :** 65 ans, récemment retraité, Lille
**Critères prioritaires :** Santé, calme, services, accessibilité, climat doux
**Contraintes :** Revenu fixe (pension), proximité famille souhaitable
**Objectif :** Profiter de la retraite dans un cadre agréable

### Persona 4 : Télétravailleur Nature - "Sophie"
**Profil :** 40 ans, consultante freelance, télétravail 100%
**Critères prioritaires :** Nature, connectivité fibre, calme, coût de vie bas
**Contraintes :** Connexion internet critique, occasionnels déplacements TGV
**Objectif :** Échapper à la ville tout en restant connectée

### Persona 5 : Étudiant Budget Serré - "Léa"
**Profil :** 20 ans, étudiante master, Toulouse
**Critères prioritaires :** Coût de vie, transports, vie étudiante, services
**Contraintes :** Budget très limité, mobilité temporaire (2 ans)
**Objectif :** Ville étudiante abordable avec bonnes opportunités stage/emploi

---

## Architecture Produit

### Vue d'Ensemble du Système

**Stack Technique :**
- **Frontend :** SvelteKit 2 + Svelte 5 (existant) sur Vercel
- **Backend Data :** Supabase (PostgreSQL + pgvector + Auth)
- **Backend Agents :** LangGraph + LangChain sur VPS Python
- **LLM APIs :** OpenAI GPT-4 + Anthropic Claude (selon agents)
- **Monitoring :** Langfuse (observabilité complète)
- **Cache :** Redis pour performance

### Architecture Agents (Cœur du Système)

**3 Agents LLM :**
1. **Conversation Manager** (GPT-4) : Gère le dialogue naturel, le contexte conversationnel, le routing
2. **Criteria Extractor** (Large Model) : Extrait critères structurés des conversations
3. **Constraint Analyzer** (optionnel) : Analyse contradictions et négocie compromis

**5 Outils/Fonctions Déterministes :**
1. **Vector Builder** : Transforme critères → vecteur utilisateur normalisé
2. **Search Orchestrator** : Recherche two-stage (vector similarity + SQL filtering)
3. **Negotiation Logic** : Algorithmes de compromis et relaxation contraintes
4. **History Service** : Gestion historique sessions et préférences
5. **Ghost Monitor** : Surveillance communes sans offres + alerting proactif

**Workflow LangGraph :**
```
User Input → Conversation Manager
           ↓
    Criteria Extractor → Vector Builder
           ↓
    Search Orchestrator (vector + SQL)
           ↓
    Results Validation (offres réelles)
           ↓
    Conversation Manager → User Output
           ↓
    (loop or negotiation if needed)
```

### Architecture de Données

**Vectorisation Géographique :**
- **Unité atomique :** IRIS (16 000 zones INSEE)
- **Alternative :** Cadastre (550 000 parcelles) - trop granulaire pour MVP
- **Vecteur structuré :** [score_emploi, score_immobilier, ..., score_sécurité] (7 dimensions MVP)

**Two-Stage Search Pipeline :**
1. **Stage 1 - Vector Search :** Similarité cosine sur caractéristiques statiques communes
2. **Stage 2 - SQL Filtering :** Filtrage précis sur contraintes dynamiques (offres emploi/immobilier actuelles)

**Sources de Données (130+ identifiées) :**
- INSEE : démographie, emploi, revenus, entreprises
- DVF (data.gouv) : transactions immobilières, prix au m²
- Base Sirene : entreprises, secteurs d'activité
- Pôle Emploi : offres d'emploi géolocalisées
- SeLoger/LeBonCoin APIs : offres immobilières
- Base Permanente Équipements : services publics/privés
- API Transports : accessibilité TER/TGV/métro
- Atmo France : qualité de l'air
- Intérieur.gouv : statistiques délinquance

**Méthodologie Scoring (inspirée Ville de Rêve) :**
- **19 catégories totales** : Emploi, Immobilier, Commerces, Services, Éducation, Santé, Transports, Culture, Loisirs, Nature, Environnement, Sécurité, Démographie, Économie, Connectivité, Coût de vie, Politique, Météo, Bien-être
- **MVP : 7 catégories prioritaires** (règle 80/20)
- **~900 indicateurs** au complet (100-150 pour MVP)
- **Normalisation 0-100** avec distribution non-linéaire (discrimination top/bottom 1%)
- **Triple comparaison :** National, similaires (cluster), local (voisines)

---

## Features MVP vs Futures

### MVP - Phase 1 (Semaines 1-15)

**Feature 1 : Conversation Guidée**
- Dialogue naturel pour extraire critères utilisateur
- Gestion contexte multi-tours
- Clarification questions ouvertes
- Résumé critères extraits avec validation

**Feature 2 : Recherche Intelligente Communes**
- Matching basé sur 7 catégories de scores
- Top 10 communes recommandées avec explications
- Validation existence offres emploi + immobilier
- Affichage sur carte interactive (frontend existant)

**Feature 3 : Profils Détaillés Communes**
- Scores par catégorie (0-100)
- Comparaison triple (national, similaires, local)
- Indicateurs clés par catégorie
- Offres emploi/immobilier disponibles (liens externes)

**Feature 4 : Gestion Historique Session**
- Sauvegarde critères extraits
- Historique communes explorées
- Favoris utilisateur (via frontend Supabase)

**Feature 5 : Testing Framework Production**
- 5 personas synthétiques
- Tests E2E automatisés
- Validation structure (snapshot testing)
- CI/CD intégré

### Phase 2 - Post-MVP (Semaines 16-30)

**Feature 6 : Observabilité Complète**
- Dashboard Langfuse temps réel
- Tracking coûts API par agent
- Analytics comportement utilisateurs
- Debug kit crashes production

**Feature 7 : Négociation Intelligente**
- Détection contradictions critères
- Proposition compromis algorithmiques
- Relaxation contraintes progressive
- Explication trade-offs

**Feature 8 : Monitoring Ghost Communes**
- Détection communes sans offres
- Alerting utilisateur quand offres apparaissent
- Prédiction probabilité apparition offres

**Feature 9 : Infrastructure Production**
- Rate limiting et sécurité RGPD
- Queue system pour résilience
- Cache Redis optimisé
- Multi-region deployment

### Phase 3 - Nice-to-Have (Post-Launch)

**Feature 10 : Gradient Spatial Navigation**
- Navigation géographique par similarité vectorielle
- Heatmap France interactive multi-dimensionnelle
- Exploration "communes similaires à proximité"

**Feature 11 : Personnalisation Avancée**
- Pondération personnalisée des 19 catégories
- Profils sauvegardés multiples
- Historique évolution préférences

**Feature 12 : Data Complète**
- 19 catégories complètes (vs 7 MVP)
- 900 indicateurs complets
- Fréquence update optimale par source

**Feature 13 : Optimisations Avancées**
- Streaming LLM pour feedback immédiat
- Parallel tool calls LangGraph
- Pre-warming caches communes populaires
- Modèles différenciés par agent (coûts)

**Feature 14 : A/B Testing & Analytics Produit**
- Framework A/B testing prompts
- Tableau de bord product analytics
- Funnel conversion détaillé
- Budget cap avec upsell freemium

---

## Différenciation Compétitive

### Concurrence Actuelle

**Sites généralistes immobilier** (SeLoger, LeBonCoin) :
- Focus pur immobilier, pas de vision holistique
- Recherche par localisation connue uniquement
- Aucune personnalisation critères de vie

**Sites emploi** (Pôle Emploi, Indeed) :
- Focus pur emploi, ignorent qualité de vie
- Pas de recommandation géographique intelligente

**Classements génériques** (Ville Idéale, L'Express) :
- Classements statiques non-personnalisés
- Méthodologie opaque
- Pas d'interaction conversationnelle
- Pas de validation offres réelles

### Notre Avantage Unique

**1. Vision Holistique : Solution = Commune**
- Seule plateforme qui considère emploi + immobilier + qualité de vie ensemble
- La commune est le produit, pas les offres individuelles

**2. Personnalisation Totale via LLM**
- Conversation naturelle (pas 50 filtres à remplir)
- Adaptation dynamique aux préférences utilisateur
- Explication personnalisée de chaque recommandation

**3. Validation Temps Réel**
- Chaque commune recommandée a des offres réelles disponibles
- Pas de "ville parfaite" sans opportunités concrètes

**4. Innovation Gradient Spatial (Phase 3)**
- Navigation géographique unique par similarité
- Découverte de communes inconnues mais optimales

**5. Transparence Méthodologie**
- 900 indicateurs documentés
- Sources publiques vérifiables
- Scores expliqués et comparatifs

**6. Observabilité & Qualité**
- Monitoring complet via Langfuse
- Tests continus avec personas
- Amélioration continue prompts et algorithmes

---

## Métriques de Succès

### Phase MVP (3 mois)

**Métriques Produit :**
- ✅ **5 personas** avec journeys E2E fonctionnels
- ✅ **7 catégories de données** complètes pour 35 570 communes
- ✅ **95% précision** extraction critères (validation manuelle sur 100 sessions)
- ✅ **<2s latence** pour générer recommandations top 10
- ✅ **85%+ pertinence** communes recommandées (validation utilisateurs beta)

**Métriques Techniques :**
- ✅ **100% coverage** tests structure agents
- ✅ **<5 min** temps exécution CI/CD
- ✅ **99.5% uptime** backend agents
- ✅ **<500ms** latence API get_commune_data

**Métriques Business (Beta) :**
- ✅ **100 utilisateurs beta** testant le système
- ✅ **60%+ engagement** (complètent conversation jusqu'aux recommandations)
- ✅ **NPS >40** sur expérience MVP

### Phase Post-MVP (6 mois)

**Métriques Produit :**
- 🎯 **1000+ utilisateurs actifs** mensuels
- 🎯 **70%+ conversion** première visite → recommandations
- 🎯 **40%+ return users** (reviennent explorer plus de communes)
- 🎯 **10+ communes** explorées par utilisateur en moyenne
- 🎯 **NPS >50**

**Métriques Business :**
- 🎯 **Coût acquisition utilisateur** <10€
- 🎯 **Coût LLM par session** <0.50€
- 🎯 **Taux conversion freemium→premium** >5% (si modèle payant)

**Métriques Différenciation :**
- 🎯 **30%+ utilisateurs** découvrent des communes qu'ils ne connaissaient pas
- 🎯 **80%+ utilisateurs** trouvent les recommandations pertinentes
- 🎯 **20%+ utilisateurs** contactent offres emploi/immobilier depuis nos recommandations

---

## Risques et Mitigations

### Risques Techniques

**Risque 1 : Non-déterminisme LLM**
- **Impact :** Résultats incohérents, tests flaky, mauvaise UX
- **Mitigation :** Snapshot testing structure, personas tests, validation schémas JSON, monitoring Langfuse

**Risque 2 : Coûts API LLM élevés**
- **Impact :** Budget explosé, rentabilité compromise
- **Mitigation :** Budget cap, modèles différenciés par agent, cache intelligent, monitoring coûts temps réel

**Risque 3 : Latence système**
- **Impact :** UX dégradée, frustration utilisateurs
- **Mitigation :** Streaming LLM, parallel tool calls, pre-warming caches, architecture optimisée

**Risque 4 : Qualité données**
- **Impact :** Recommandations non-pertinentes, perte confiance
- **Mitigation :** Validation multi-sources, tests cohérence, méthodologie documentée, feedback utilisateurs

**Risque 5 : Scalabilité**
- **Impact :** Crashes sous charge, coûts infrastructure
- **Mitigation :** Queue system, rate limiting, architecture micro-services, monitoring proactif

### Risques Produit

**Risque 6 : Adoption utilisateurs**
- **Impact :** Produit non utilisé malgré qualité technique
- **Mitigation :** Beta testing itératif, UX simple, valeur immédiate visible, marketing ciblé

**Risque 7 : Concurrence**
- **Impact :** Concurrents copient l'approche, perdons avantage
- **Mitigation :** Vitesse exécution, innovations continues (gradient spatial), qualité données, brand

**Risque 8 : Réglementation RGPD**
- **Impact :** Problèmes légaux, amendes, arrêt service
- **Mitigation :** Privacy by design, anonymisation, consentement explicite, audit juridique

**Risque 9 : Fiabilité offres externes**
- **Impact :** Offres obsolètes, utilisateurs déçus
- **Mitigation :** Refresh fréquent, disclaimer validité, liens directs sources, monitoring ghost communes

---

## Roadmap de Déploiement

### Semaines 1-5 : Fondations MVP
- **Plan 1 :** Pipeline tests (framework, personas, CI/CD)
- **Plan 2 :** Architecture agents (LangGraph, 3 agents, workflow)
- **Plan 3 :** Data core (7 catégories, ETL, vectorisation)
- **Livrable :** Système fonctionnel end-to-end (pas production-ready)

### Semaines 6-10 : Intégration & Refinement
- Intégration frontend SvelteKit existant
- Tests E2E complets avec 5 personas
- Optimisation prompts agents
- Debug et stabilisation
- **Livrable :** Beta privée fonctionnelle

### Semaines 11-15 : Pre-Production
- Monitoring Langfuse intégré
- Sécurité et RGPD compliance
- Infrastructure production (queue, cache, rate limiting)
- Documentation complète
- **Livrable :** MVP production-ready

### Semaines 16-20 : Beta Publique
- 100 utilisateurs beta invités
- Collecte feedback intensif
- Itérations rapides UX
- Analytics et métriques produit
- **Livrable :** Produit validé utilisateurs réels

### Semaines 21-30 : Scale & Optimize
- Features Phase 2 (négociation, ghost monitoring)
- Optimisations performance
- Enrichissement données (vers 12-15 catégories)
- Marketing et acquisition
- **Livrable :** Produit scalable et monétisable

---

## Décisions Architecturales Clés

### Décision 1 : Pourquoi LangGraph et pas autre framework agents ?

**Choix :** LangGraph + LangChain

**Raison :**
- Workflow déterministe et contrôlable (vs agents autonomes type AutoGPT)
- State management riche et structuré
- Intégration native monitoring (Langfuse/LangSmith)
- Communauté active et documentation complète
- Flexibilité pour agents custom et outils Python

**Alternatives rejetées :**
- **Agents autonomes** (AutoGPT, BabyAGI) : trop imprévisibles, coûts incontrôlables
- **LLM brut** (OpenAI API directement) : trop de boilerplate, pas de state management
- **CrewAI** : moins mature, moins flexible pour cas complexes

### Décision 2 : Pourquoi IRIS et pas Cadastre pour vectorisation ?

**Choix :** IRIS (16 000 zones INSEE)

**Raison :**
- Granularité optimale pour qualité de vie (quartier, pas parcelle)
- Données INSEE déjà agrégées par IRIS
- 16K zones = manageable pour calcul, storage, et update
- Utilisateurs ne choisissent pas parcelle mais quartier/commune

**Alternative rejetée :**
- **Cadastre** (550 000 parcelles) : trop granulaire, données pas agrégées, coûts calcul/storage élevés, pas pertinent pour critères utilisateur

### Décision 3 : Pourquoi 3 agents + 5 outils et pas 7 agents LLM ?

**Choix :** 3 agents LLM + 5 outils/fonctions déterministes

**Raison :**
- **Critère de décision clair :** Reasoning contextuel → agent LLM, Logique déterministe → outil
- **Coûts maîtrisés :** LLM seulement où nécessaire
- **Testabilité :** Outils déterministes = tests unitaires simples
- **Performance :** Outils Python instantanés vs appels LLM (secondes)
- **Maintenabilité :** Logique métier dans code testable, pas prompts

**Alternative rejetée :**
- **7 agents LLM** : sur-ingénierie, coûts explosifs, latence, difficulté testing

### Décision 4 : Pourquoi Langfuse et pas LangSmith ?

**Choix :** Langfuse pour monitoring

**Raison :**
- **Open-source et gratuit** (self-hosted)
- **Intégration native LangChain/LangGraph**
- **Features complètes :** traces, prompts, analytics, coûts, A/B testing
- **Privacy :** données sensibles restent sur notre infra
- **Customisable :** peut ajouter métriques custom produit

**Alternative :**
- **LangSmith** (LangChain officiel) : excellent mais coût SaaS élevé à scale, vendor lock-in

### Décision 5 : Pourquoi Two-Stage Search (vector + SQL) ?

**Choix :** Pipeline two-stage (vector pre-rank → SQL post-filter)

**Raison :**
- **Vector search** : excellent pour similarité sémantique caractéristiques statiques (emploi, environnement, services)
- **SQL filtering** : nécessaire pour contraintes dynamiques précises (offres emploi/immobilier actuelles, prix exact)
- **Performance optimale :** Vector réduit 35K communes → 100 candidates, SQL filtre finement
- **Flexibilité :** Peut ajuster balance vector/SQL selon besoin

**Alternative rejetée :**
- **Pure vector search** : ne gère pas bien contraintes strictes dynamiques (budget précis, type emploi exact)
- **Pure SQL** : perd la notion de "similarité sémantique" pour matching holistique

### Décision 6 : Pourquoi MVP 7 catégories et pas 19 complètes ?

**Choix :** 7 catégories prioritaires (règle 80/20)

**Raison :**
- **Principe Pareto :** 20% catégories donnent 80% de la valeur
- **Time-to-market :** 3 mois vs 9 mois pour données complètes
- **Validation hypothèse :** tester produit avant investissement massif data
- **Itération :** feedback utilisateurs guide quelles catégories enrichir

**Catégories MVP :** Emploi, Immobilier, Services, Démographie, Accessibilité, Environnement, Sécurité

**Phase 2 :** + Culture, Loisirs, Nature, Coût de vie, Santé (12-15 catégories)

**Phase 3 :** Toutes les 19 catégories complètes

---

## Conclusion

**Bienvenue est positionné pour devenir la référence en relocation intelligente en France grâce à :**

1. **Vision holistique unique** : Commune comme solution atomique validée par offres réelles
2. **Technologie de pointe** : LLM agents conversationnels + matching vectoriel intelligent
3. **Données différenciantes** : 900 indicateurs, 130+ sources, méthodologie transparente
4. **Roadmap pragmatique** : MVP 3 mois, validation beta, scale progressif
5. **Architecture solide** : Testable, observable, scalable, maintenable

**Ce Product Brief est le document de référence pour l'implémentation. Toutes les décisions techniques et produit sont documentées et justifiées.**

**Prochaine étape : Démarrer les 3 plans d'action MVP en parallèle (Tests + Architecture + Data).**

---

**Document vivant** : Ce brief sera mis à jour lors des learnings beta et des itérations produit.

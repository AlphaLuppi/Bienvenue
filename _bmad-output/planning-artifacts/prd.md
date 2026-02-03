---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief.md'
  - '_bmad-output/analysis/brainstorming-session-2026-01-18.md'
briefCount: 1
researchCount: 0
brainstormingCount: 1
projectDocsCount: 0
workflowType: 'prd'
projectType: 'greenfield'
classification:
  projectType: 'web_app_api_backend'
  domain: 'general_scientific'
  complexity: 'medium-high'
  projectContext: 'greenfield'
  description: 'Web App (SvelteKit) + API Backend agentique (LangGraph) pour plateforme de relocation intelligente'
---

# Product Requirements Document - Bienvenue

**Author:** Gabriel
**Date:** 2026-01-20
**Version:** 1.0 (Draft)
**Status:** In Progress

## Executive Summary

Bienvenue : plateforme de relocation intelligente aidant les citoyens français à trouver leur commune idéale. Combine interface web SvelteKit existante avec backend agentique LangGraph pour expérience conversationnelle personnalisée.

**Proposition de valeur :**
- **Approche commune-first :** Recommandation de communes complètes (pas emploi+logement séparés)
- **Matching intelligent :** 900+ indicateurs par commune française
- **Conversation naturelle :** Agents LLM extraient critères complexes
- **Validation temps réel :** Vérification offres emploi/immobilier actuelles
- **Méthodologie data-driven :** Scoring et ranking transparents

**Stack technique :**
- **Frontend :** SvelteKit 2 + Svelte 5 sur Vercel
- **Database :** Supabase (PostgreSQL + pgvector + Auth)
- **Backend Agents :** LangGraph + LangChain (cœur du PRD)
- **Monitoring :** Langfuse (observabilité LLM)
- **Analytics :** PostHog
- **Gestion projet :** ClickUp

**Classification :** Web App + API Backend agentique (greenfield agents)
**Domaine :** General/Scientific (ML, data science, agents LLM)
**Complexité :** Medium-High

---

## Success Criteria

### User Success

Succès utilisateur mesuré par **trois moments "Aha!" critiques** :

**1. Moment pertinence - "Cette commune me correspond exactement"**
- User identifie ≥1 commune "coup de cœur" dans top 10
- Conversation capture critères réels (pas juste emploi+logement séparés)
- Recommendations alignées avec préférences exprimées
- **Mesure :** Validation qualitative beta - users verbalisent pertinence

**2. Moment validation - "Les données confirment mon intuition"**
- User clique "en savoir plus" pour explorer scores détaillés
- Métriques catégories (emploi, environnement, services) renforcent choix
- Triple comparaison (national, similaires, local) donne confiance
- **Mesure :** Taux clic "en savoir plus" par recommandation

**3. Moment opportunité - "Ils m'ont recontacté au bon moment"** (Post-MVP)
- User reçoit alerte quand nouvelle offre apparaît sur commune "fantôme"
- Ghost monitoring proactif crée valeur long-terme
- **Mesure :** Taux retour suite alerting proactif

**Critères succès user MVP :**
- ✅ Users beta confirment verbalement pertinence recommendations
- ✅ ≥1 commune explorée détails (scores) par session
- ✅ Latence perçue acceptable : <10s recommendations (cible <5s)
- ✅ Workflow conversationnel fluide sans blocages techniques

### Business Success

**North Star Metric : Déménagements réels**

Vrai succès business = users **déménagent réellement** suite recommendations Bienvenue. Signal le plus fort de création valeur.

**Importance stratégique :**
- Valide que système influence décisions vie majeures
- Permet génération leads qualifiés (10% conversion historique observée)
- Justifie business model : apport leads ultra-qualifiés

**Challenge mesure :**
- Difficile tracker automatiquement (user pas incentive signaler)
- Nécessite validation manuelle (enquêtes, entretiens)
- Timeline longue (décision déménagement = plusieurs mois)

**Validation MVP :** **1-2 déménagements confirmés** valident concept.

**Proxy Metrics (en attendant déménagements confirmés) :**

1. **Intention forte :**
   - % users cliquant offres emploi/immobilier depuis recommendations
   - % users sauvegardant communes en favoris
   - Cible MVP : **20%+ cliquent offres** = signal intention sérieuse

2. **Engagement profond :**
   - % users revenant explorer autres communes
   - Moyenne communes explorées par user
   - Cible MVP : **3+ communes explorées** = user investi

3. **Découverte valeur :**
   - % users découvrant communes inconnues
   - Cible : **30%+ découvrent communes inconnues** = création valeur unique

**Business Model Alternatif (10K+ conversations) :**

Au-delà des déménagements individuels, la plateforme génère un **dataset d'insights statistiques** représentatif de la population française :
- Critères de relocation par profil démographique
- Préférences géographiques émergentes
- Tendances de migration intra-France
- **Monétisable :** Études de marché, collectivités territoriales, promoteurs immobiliers

**Timeline Business Success :**
- **Semaine 15 :** MVP fonctionnel validé techniquement
- **Semaine 20 :** 100 utilisateurs beta testent le système
- **Mois 6 :** 1-2 déménagements confirmés = validation concept
- **Mois 12 :** 1000+ utilisateurs actifs + dataset insights exploitable

### Technical Success

**Critère non-négociable : Pertinence recommendations**

Tous autres critères techniques secondaires. Ceci = **cœur proposition valeur**.

**Pertinence définie :**
- Communes recommandées matchent réellement critères exprimés
- Ordre ranking fait sens (top 1-3 = vraies opportunités)
- Users jamais "ça n'a rien à voir avec ce que je cherche"

**Validation pertinence MVP :**
- ✅ 5 personas synthétiques : journeys E2E produisent recommendations cohérentes
- ✅ Tests qualité : 85%+ recommendations jugées pertinentes par beta testeurs
- ✅ Zéro miss catastrophiques (commune urbaine quand user veut campagne, etc.)

**Autres critères techniques MVP :**

1. **Extraction critères structurée :**
   - Agent Criteria Extractor produit JSON valide conforme au schéma
   - Pas besoin de 95% précision - validation : structure correcte + pas d'erreurs bloquantes

2. **Stabilité workflow :**
   - 100 sessions de test passent sans crash
   - Gestion erreurs : retry logic, fallbacks appropriés
   - Workflow LangGraph complète conversation → recommandations

3. **Performance acceptable :**
   - Latence <10s pour top 10 recommandations (idéal <5s)
   - Latence API get_commune_data : <500ms
   - Pas de timeout utilisateur frustrant

4. **Données de base :**
   - 7 catégories MVP pour 35 570 communes françaises
   - Vectorisation IRIS (16K zones) fonctionnelle
   - Pipeline ETL stable avec refresh programmé

**Critères techniques Post-MVP (scalabilité) :**
- 99.5%+ uptime backend agents
- Rate limiting et queue system pour charge
- Cache Redis optimisé pour communes populaires
- Tests CI/CD <5 minutes
- Monitoring Langfuse complet (coûts, latences, erreurs)

### Measurable Outcomes

**Métriques MVP (Semaines 1-15) :**

| Catégorie | Métrique | Cible | Validation |
|-----------|----------|-------|------------|
| **User Success** | Pertinence verbalisée | Qualitative | Beta testeurs confirment |
| **User Success** | Exploration détaillée | 1+ commune/session | Analytics PostHog |
| **User Success** | Latence acceptable | <10s recommandations | Monitoring Langfuse |
| **Business** | Clics sur offres | 20%+ | Analytics PostHog |
| **Business** | Communes explorées | 3+ par utilisateur | Analytics PostHog |
| **Technical** | Extraction valide | Structure JSON OK | Tests automatisés |
| **Technical** | Stabilité | 100 sessions sans crash | Tests E2E |
| **Technical** | Données complètes | 7 catégories × 35K communes | Validation data |

**Métriques Post-MVP (Mois 6-12) :**

| Catégorie | Métrique | Cible | Validation |
|-----------|----------|-------|------------|
| **Business** | Déménagements confirmés | 1-2 cas | Enquêtes manuelles |
| **Business** | Utilisateurs actifs | 1000+ | Analytics PostHog |
| **Business** | Découverte communes | 30%+ | Analytics PostHog |
| **Business** | Dataset insights | 10K+ conversations | Database queries |
| **Technical** | Uptime | 99.5%+ | Monitoring Langfuse |
| **Technical** | Coût LLM/session | <0.50€ | Monitoring Langfuse |

---

## Product Scope

### MVP - Minimum Viable Product

**Objectif MVP :** Prouver que **les recommandations de communes sont pertinentes** pour l'utilisateur.

**Scope technique MVP (Semaines 1-15) :**

**1. Conversation guidée pour extraction critères**
- Agent LLM Conversation Manager (GPT-4)
- Dialogue naturel multi-tours
- Clarification questions ouvertes
- Résumé critères avec validation utilisateur

**2. Matching intelligent communes**
- Agent LLM Criteria Extractor (Large Model)
- Outil Vector Builder : critères → vecteur utilisateur
- Outil Search Orchestrator : two-stage search (vector similarity + SQL filtering)
- Top 10 communes recommandées avec scores

**3. Affichage résultats enrichis**
- Intégration frontend SvelteKit existant
- Carte interactive avec communes recommandées
- Scores détaillés par catégorie (7 catégories MVP)
- Triple comparaison : national, similaires, local
- Liens directs vers offres emploi/immobilier externes

**4. Gestion session & historique**
- History Service : sauvegarde critères extraits
- Historique communes explorées
- Favoris utilisateur (via Supabase)
- Persistance session conversationnelle

**5. Testing framework production-ready**
- 5 personas synthétiques avec profils détaillés
- Tests E2E automatisés avec journeys complets
- Snapshot testing structure (pas texte exact)
- CI/CD intégré
- Validation qualitative beta testeurs

**Données MVP (7 catégories essentielles - règle 80/20) :**
1. Emploi (offres, secteurs, taux chômage)
2. Immobilier (prix, disponibilité, typologie)
3. Services (santé, éducation, commerces)
4. Démographie (population, âge, dynamique)
5. Accessibilité (transports, distances aux POI)
6. Environnement (qualité air, espaces verts)
7. Sécurité (délinquance, sentiment sécurité)

**Stack MVP :**
- Frontend : SvelteKit 2 + Svelte 5 (existant)
- Backend Data : Supabase (PostgreSQL + pgvector)
- Backend Agents : LangGraph + LangChain sur VPS Python
- LLM APIs : OpenAI GPT-4 + Anthropic Claude
- Cache : Redis (performance)
- Deployment : Vercel (front) + VPS (agents)

**Hors scope MVP (délibérément exclu) :**
- ❌ Monitoring Langfuse complet (ajouté Post-MVP)
- ❌ Ghost monitoring + alerting proactif (Phase 2)
- ❌ Négociation intelligente contradictions (Phase 2)
- ❌ Optimisations avancées (streaming, parallel calls)
- ❌ 19 catégories complètes (seulement 7 pour MVP)
- ❌ Personnalisation pondération scores (Phase 3)

### Growth Features (Post-MVP)

**Phase 2 : Production-Ready (Semaines 16-30)**

Une fois le MVP validé (recommandations pertinentes prouvées), ajout des fonctionnalités pour scale et production :

**1. Observabilité complète**
- Langfuse intégré : traces, prompts, analytics
- Dashboard temps réel : métriques produit + coûts API
- Debug kit complet : input, prompt, state au crash
- Tracking évolution coûts par agent
- Alerting multi-niveaux

**2. Ghost Monitoring proactif**
- Détection communes "fantômes" (matching mais sans offres)
- Surveillance automatique apparition nouvelles offres
- Alerting utilisateur personnalisé
- Prédiction probabilité apparition offres

**3. Négociation intelligente**
- Agent Constraint Analyzer (optionnel, activé si contradictions)
- Détection contradictions critères
- Proposition compromis algorithmiques
- Relaxation progressive contraintes
- Explication trade-offs à l'utilisateur

**4. Infrastructure production**
- Rate limiting et sécurité RGPD
- Queue system pour résilience charge
- Cache Redis optimisé (pre-warming communes populaires)
- Multi-region deployment (si besoin)

**5. Optimisations performance**
- Streaming LLM pour feedback immédiat
- Parallel tool calls LangGraph
- Modèles différenciés par agent (coûts optimisés)
- Lazy loading données non-critiques

**6. Enrichissement données**
- Passage de 7 → 12-15 catégories
- Culture, Loisirs, Nature, Coût de vie, Santé détaillée
- Fréquence refresh optimale par source
- +300 indicateurs additionnels

### Vision (Future)

**Phase 3 : Innovation & Différenciation**

Fonctionnalités avancées pour différenciation compétitive long-terme :

**1. Personnalisation avancée**
- Pondération personnalisée des 19 catégories par utilisateur
- Profils sauvegardés multiples (ex: "solo" vs "en famille")
- Historique évolution préférences dans le temps
- ML sur préférences implicites (clics, temps passé)

**2. Data complète & méthodologie riche**
- 19 catégories complètes (vs 7 MVP)
- 900 indicateurs complets par commune
- Sources enrichies : 130+ APIs publiques
- Méthodologie Ville de Rêve complète

**3. Analytics produit avancés**
- A/B testing framework pour prompts agents
- Tableau de bord product analytics détaillé
- Funnel conversion complet
- Budget cap avec upsell freemium

**4. Business model insights statistiques**
- À partir de 10K+ conversations : dataset représentatif
- Insights tendances migration France
- Critères de relocation par démographie
- Monétisation : études marché, collectivités, promoteurs

**5. Distances POI encodées**
- Pour chaque commune : distances exactes aux points d'intérêt critiques
- "École la plus proche : 2km, hôpital : 5km, gare TGV : 15km"
- Simple, pragmatique, explicable
- Remplace le concept de "gradient spatial navigation" (retiré - trop complexe)

**Features retirées de la vision (pragmatisme) :**
- ❌ Gradient spatial navigation (algorithme complexe, ROI incertain)
- ❌ Heatmap France interactive multi-dimensionnelle (nice-to-have, pas prioritaire)

---

## User Journeys

Cette section décrit les parcours narratifs complets des différents types d'utilisateurs interagissant avec Bienvenue. Chaque journey suit une structure narrative (ouverture, action, climax, résolution) pour capturer l'expérience émotionnelle et fonctionnelle.

### Journey 1 : Alex - L'Échappée Tech

**Persona :** Alex, 28 ans, développeur full-stack à Paris

**Scène d'ouverture - La saturation parisienne**

Alex rentre chez lui un mercredi soir après 1h15 de RER bondé. Son studio 18m² à 950€/mois sent l'humidité. Il ouvre son laptop pour un side-project mais n'arrive pas à se concentrer - le couple d'à côté se dispute encore. Sur son téléphone, il scroll LinkedIn : "Senior Dev Remote 100% - Bordeaux" attire son œil. Il se demande : "Et si je me cassais de Paris ?"

Mais par où commencer ? Bordeaux, Lyon, Nantes... Il ne connaît que Paris et sa ville natale. Comment choisir une ville pour les 5 prochaines années sans se tromper ?

**Action montante - La découverte**

Le lendemain matin, un collègue lui parle de Bienvenue. "Ça matche ta situation avec des villes françaises, c'est conversationnel." Alex est sceptique mais curieux.

*Premier contact (Soir même, 21h30) :*
- Alex lance Bienvenue sur son laptop
- Interface épurée, carte de France, prompt : "Où souhaitez-vous vivre demain ?"
- Il tape naturellement : "Je cherche une ville dynamique avec des opportunités tech mais moins stressante que Paris, budget 1200€ max pour un T2"

*Conversation (5 minutes) :*
- L'agent lui pose des questions naturelles : "Qu'est-ce qui vous manque le plus à Paris ?" → "Des espaces verts, pouvoir respirer"
- "Travail sur site ou remote ?" → "Remote 100%, mais j'aime la vie sociale"
- "Sports/loisirs ?" → "Escalade, jeux vidéo, meetups tech"

Alex sent que l'agent **comprend vraiment** ce qu'il cherche - pas juste logement + job séparément.

*Résumé critères :*
L'agent affiche : "Si je comprends bien, vous cherchez une ville avec :
- Écosystème tech dynamique (startups, meetups)
- Nature/espaces verts accessibles
- Vie sociale active
- Coût de vie <1200€ pour T2
- Connectivité (fibre, transports)
Est-ce correct ?"

Alex valide. Moment de vérité.

**Climax - "Cette ville existe vraiment ?"**

*7 secondes d'attente* (Alex sent son cœur battre)

Top 10 communes s'affichent sur la carte. **#1 : Rennes, Ille-et-Vilaine**

Alex clique. Les scores apparaissent :
- Emploi Tech : 87/100 (national : 65) - "3e écosystème tech France"
- Environnement : 78/100 - "12 espaces verts majeurs, forêt de Brocéliande 30min"
- Vie sociale : 82/100 - "Population jeune 25-35 ans : 28%"
- Immobilier : T2 moyenne 750€/mois - **450€ économisés vs Paris !**
- Accessibilité : TGV Paris 1h30, Fibre 100%

**Moment "Aha!" :** Alex découvre 12 offres dev remote/hybride à Rennes **maintenant**. Et 47 appartements T2 disponibles entre 650-850€. "C'est pas théorique... c'est réel, **aujourd'hui**."

Il explore #2 (Nantes), #3 (Lyon Part-Dieu) - toutes pertinentes mais Rennes l'obsède.

**Résolution - Le nouveau chapitre**

- **3 jours plus tard :** Alex a passé 2h sur Bienvenue à comparer Rennes, Nantes et Grenoble. Il a mis Rennes en favori.
- **1 semaine plus tard :** Il a postulé à 2 jobs à Rennes. Un recruteur l'appelle : "On cherche justement quelqu'un de Paris pour apporter l'expérience startup."
- **1 mois plus tard :** Alex a visité Rennes un weekend. Il se balade au Parc du Thabor, teste une salle d'escalade, participe à un meetup DevOps. Il se projette.
- **3 mois plus tard :** Alex signe un CDI remote à Rennes, loue un T2 avec balcon (780€), démissionne de Paris.
- **Sa nouvelle réalité :** Vélo pour aller au café le matin, escalade 2x/semaine, économise 500€/mois, stress divisé par 3. Sur Slack avec ses ex-collègues parisiens : "Bienvenue m'a changé la vie."

---

### Journey 2 : Les Martin - La Quête du Cadre Idéal

**Persona :** Claire & Thomas Martin, 35 ans, 2 enfants (Emma 8 ans, Lucas 5 ans), banlieue Lyon

**Scène d'ouverture - Le dilemme familial**

Dimanche soir, Claire et Thomas regardent leur salon encombré de jouets dans leur T4 banlieue lyonnaise (1450€/mois). Emma entre : "Maman, Sarah déménage à Annecy, elle dit qu'il y a une super école et des montagnes."

Claire soupire. Lyon c'est bien, mais : Emma fait 40min de bus pour l'école, Thomas 1h15 de trajet/jour, weekend = pollution pic, pas d'espace extérieur pour les enfants. Et ils paient le prix de Lyon sans en profiter.

Thomas : "Si on changeait de région ?" Claire : "Pour aller où ? On a deux jobs à garder, une école pour Emma, une crèche pour Lucas, et notre budget..."

**La complexité les paralyse.** Ils ont 15 critères contradictoires. Comment trouver LA ville parfaite pour leur famille ?

**Action montante - L'exploration familiale**

*Découverte (lundi midi, Claire) :*
Une collègue maman lui montre Bienvenue : "Ça m'a trouvé Chambéry, je déménage cet été avec mes 3 enfants."

*Session 1 - Mercredi soir, après coucher des enfants (22h) :*

Claire et Thomas lancent Bienvenue ensemble, laptop sur les genoux dans le canapé.

*Conversation (12 minutes, ils prennent leur temps) :*
- "Qu'est-ce qui vous pousse à déménager ?" → "Qualité de vie pour nos enfants, moins de stress quotidien"
- "Vos priorités pour les enfants ?" → "Excellente école primaire, espaces verts, sécurité, activités extra-scolaires"
- "Situation professionnelle ?" → "On a besoin de 2 emplois stables : marketing (Claire) + comptable (Thomas)"
- "Budget immobilier ?" → "Max 1400€ pour maison/grand T4"
- "Proximité famille ?" → "Grands-parents région Rhône-Alpes, on veut rester à 2h max"

L'agent détecte une contradiction : "Vous voulez rester proche de Lyon mais cherchez moins de densité urbaine. On va chercher des villes moyennes bien connectées ?"

Claire : "Exactement !"

**Climax - "On peut vraiment tout avoir ?"**

*9 secondes d'attente.* Claire serre la main de Thomas.

**Top 10 s'affiche. #1 : Annecy, Haute-Savoie**

Thomas clique immédiatement.

*Les scores qui les font pleurer (presque) :*
- Éducation : 94/100 (vs national 65) - "Écoles primaires classées top 10 France"
- Sécurité : 91/100 - "Taux délinquance -67% vs moyenne nationale"
- Environnement : 96/100 - "Lac, montagnes, 42 parcs"
- Services : 88/100 - "Tous services médicaux, activités enfants"
- Immobilier : Maison 4 pièces moyenne 1350€

*Claire clique "Voir les offres" :*
- 23 offres marketing Annecy (dont 4 remote partiel)
- 17 offres comptabilité
- **67 locations disponibles** (maisons + T4)

Thomas trouve une maison avec jardin à Annecy-le-Vieux : 1380€, 10min école à vélo.

**Moment "Aha!" :** Claire : "Mais... c'est exactement ce qu'on cherchait. Même la ville de Sarah !" Thomas : "Regarde le temps Lyon-Annecy parents : 1h45. On reste proches."

Ils explorent #2 (Chambéry), #3 (Aix-les-Bains) - mais **Annecy c'est l'évidence.**

**Résolution - La renaissance familiale**

- **2 semaines plus tard :** Les Martin visitent Annecy un weekend. Emma teste l'école internationale, Lucas joue au bord du lac. "On veut rester ici Maman !"
- **3 mois plus tard :** Claire négocie 3j/semaine remote avec son employeur lyonnais, trouve un job marketing local 2j/semaine. Thomas postule à 5 cabinets comptables.
- **6 mois plus tard :** Déménagement effectif. Maison avec jardin 100m², Emma à l'école à 800m (vélo), Lucas crèche 400m, weekend = rando famille.
- **1 an plus tard :** Emma raconte à sa classe parisienne venue en voyage scolaire : "Avant j'habitais en ville, maintenant j'ai le lac et les montagnes." Thomas sur LinkedIn : "Bienvenue a permis à ma famille de gagner 10 ans de vie."

---

### Journey 3 : Jean - La Retraite Sereine

**Persona :** Jean Dupont, 65 ans, récemment retraité, Lille

**Scène d'ouverture - L'hiver lillois de trop**

Janvier, Lille. Jean regarde par la fenêtre son appartement T3 : pluie, gris, 4°C. Il tousse - sa bronchite chronique empire chaque hiver. Le médecin lui a dit : "Monsieur Dupont, à votre âge, un climat plus doux ferait du bien."

Jean a 65 ans, vient de prendre sa retraite après 40 ans comme professeur de maths. Pension confortable mais fixe. Sa fille habite Toulouse (3h de route). Il rêve d'un endroit calme, ensoleillé, avec des services médicaux à proximité.

Mais comment choisir ? Il ne connaît que le Nord. "À mon âge, on ne se trompe pas de ville."

**Action montante - La recherche du havre**

*Découverte (février, chez le médecin) :*
La secrétaire, voyant Jean chercher sur son téléphone "meilleures villes retraités France", lui dit : "Mon père a utilisé Bienvenue, il est à Montpellier maintenant, il adore."

*Session 1 - Samedi après-midi, thé à la main (15h) :*

Jean s'installe confortablement, met ses lunettes, lance Bienvenue sur sa tablette.

*Conversation (8 minutes, Jean tape lentement mais précisément) :*
- "Bonjour Jean, que recherchez-vous ?" → "Une ville calme pour ma retraite, avec du soleil et de bons services santé"
- "Proximité famille ?" → "Ma fille est à Toulouse, j'aimerais être à moins de 2h"
- "Budget logement ?" → "Ma pension me permet 900€ max pour un T2"
- "Activités souhaitées ?" → "Marche, lecture, bénévolat, peut-être rejoindre club échecs"
- "Préoccupations santé ?" → "Bronchite chronique, j'ai besoin hôpital avec pneumologie à proximité"

L'agent : "Je comprends. Climat doux, services santé excellents, proximité Toulouse, calme. C'est bien ça ?"

Jean : "Exactement, vous m'avez compris."

**Climax - "Je peux vraiment bien vieillir là-bas ?"**

*6 secondes.* Jean retient son souffle.

**Top 10 s'affiche. #1 : Albi, Tarn**

Jean clique, ajuste ses lunettes.

*Scores qui le rassurent profondément :*
- Santé : 89/100 - "CHU Albi avec service pneumologie, 3 cliniques privées"
- Météo : 87/100 - "220 jours soleil/an, climat doux méditerranéen"
- Calme : 92/100 - "Ville moyenne 51K hab, rythme paisible"
- Accessibilité : Toulouse 1h10 train, fille = visites faciles
- Immobilier : T2 centre historique moyenne 680€

*Jean clique "Services seniors" :*
- 8 associations bénévolat
- Club échecs actif (17 membres)
- Marche nordique 2x/semaine groupe seniors
- Médecin généraliste 300m (accepte nouveaux patients)

**Moment "Aha!" :** Jean voit une photo du centre historique d'Albi, la cathédrale Sainte-Cécile au soleil. "C'est magnifique... et je peux me le permettre." Il calcule : 680€ vs 850€ Lille = 170€ économisés pour voir sa fille.

Il ajoute Albi en favori, explore #2 (Castres), #3 (Carcassonne).

**Résolution - La renaissance dorée**

- **2 semaines plus tard :** Jean prend le train Lille→Toulouse→Albi. Sa fille l'accompagne visiter. Ils marchent au bord du Tarn sous 18°C ensoleillé (février !). Jean sourit : "Je respire mieux déjà."
- **2 mois plus tard :** Jean loue un T2 lumineux centre Albi (720€), balcon vue cathédrale.
- **6 mois plus tard :** Déménagement effectif. Jean s'inscrit au club échecs, marche nordique. Sa bronchite diminue (médecin confirme). Sa fille vient un weekend/mois (1h10 train).
- **1 an plus tard :** Jean sur Facebook : Photo coucher de soleil sur le Tarn. "À 65 ans, j'ai trouvé mon paradis grâce à Bienvenue. Je respire, je vis." 127 likes.

---

### Journey 4 : Sophie - L'Équilibre Connecté

**Persona :** Sophie Lefèvre, 40 ans, consultante freelance, télétravail 100%, Paris

**Scène d'ouverture - L'appel de la nature**

Confinement 2025, Paris 11e, 6e étage sans ascenseur. Sophie travaille depuis son canapé-lit studio 28m² (1150€/mois). Fenêtre sur cour intérieure sombre. Elle termine une visio client épuisante, ferme son laptop, et pleure.

"Je ne peux plus vivre comme ça."

Sophie est consultante digital marketing freelance, revenus corrects (3K€/mois), 100% remote depuis 5 ans. Elle rêve de nature, forêt, silence. Mais elle a besoin de **fibre absolue** (visios quotidiennes) et TGV occasionnel (4-5 déplacements clients/an Paris).

Dilemme : nature = connexion nulle. Ville = béton. "Je suis coincée."

**Action montante - La quête de l'impossible**

*Découverte (mai, podcast freelance) :*
Une consultante raconte : "J'ai trouvé ma ferme rénovée dans les Vosges avec fibre 1Gb grâce à Bienvenue."

Sophie : "Une ferme... avec la fibre ??"

*Session 1 - Dimanche matin, café (10h) :*

Sophie ouvre Bienvenue, pieds nus sur son canapé.

*Conversation (7 minutes, elle va droit au but) :*
- "Que cherchez-vous ?" → "Nature, forêt, montagne, MAIS fibre obligatoire + TGV accessible"
- "Budget ?" → "Max 800€ pour maison/grand appart, je gagne 3K/mois freelance"
- "Activités ?" → "Rando, VTT, yoga, lecture, café coworking si existe"
- "Contrainte critique ?" → "Fibre minimum 500Mb, je fais 3-4h visio/jour"

L'agent : "Vous cherchez l'équilibre nature + connectivité professionnelle. Zone rurale avec infrastructure digitale. Correct ?"

Sophie : "ENFIN quelqu'un qui comprend !"

**Climax - "Ça existe vraiment ??"**

*8 secondes.* Sophie croise les doigts.

**Top 10 s'affiche. #1 : La Bresse, Vosges**

Sophie, incrédule, clique.

*Scores qui la font bondir du canapé :*
- Nature : 98/100 - "Parc naturel Ballons des Vosges, forêts à 200m"
- Connectivité : 91/100 - **"Fibre FTTH 1Gb disponible (plan France Relance)"**
- Calme : 95/100 - "2700 habitants, zéro pollution sonore"
- Accessibilité : Gare TGV Remiremont 25min → Paris 2h45
- Immobilier : Maison 3 pièces moyenne 650€

*Sophie clique "Connectivité détails" :*
- Fibre FTTH Orange/SFR disponible (déployée 2024)
- 4 espaces coworking Vosges (dont 1 La Bresse)
- Couverture 4G/5G excellente

**Moment "Aha!" :** Sophie voit des photos de chalets rénovés avec vue montagne. 650€. Fibre. 30min de rando. "C'est pas possible... c'est trop beau." Elle googlee "La Bresse fibre" → confirme. **C'est réel.**

Elle met La Bresse en favori, explore #2 (Gérardmer), #3 (Saint-Dié-des-Vosges).

**Résolution - La reconnexion (à la vie)**

- **3 semaines plus tard :** Sophie loue une voiture, weekend La Bresse. Elle teste la fibre chez un Airbnb (896Mb download). Rando 2h forêt. Coworking local (12 freelances). "Je suis chez moi."
- **2 mois plus tard :** Sophie loue une maison 4 pièces (680€), vue montagne, jardin. Déménagement en 1 weekend (elle a peu d'affaires).
- **6 mois plus tard :** Sa vie = 9h visio client (fibre parfaite), pause midi rando 1h, soir yoga terrasse. Weekend ski/VTT. 4 déplacements Paris/an : TGV Remiremont easy.
- **1 an plus tard :** Sophie lance un podcast "Freelance & Nature". Episode 1 : "Comment Bienvenue m'a sauvée du burnout parisien." 15K écoutes. Les freelances déménagent en masse aux Vosges.

---

### Journey 5 : Léa - L'Aventure Budget Serré

**Persona :** Léa Durand, 20 ans, étudiante Master 1, Toulouse

**Scène d'ouverture - Le studio hors budget**

Septembre, rentrée Master 1. Léa cherche un studio Toulouse depuis 3 semaines. Tous les trucs corrects = 550€+. Ses parents l'aident à 300€, elle bosse McDo weekend (200€), bourse 280€ = **780€ total/mois**. Après loyer, il reste 230€ pour vivre (bouffe, sorties, transports).

"C'est impossible."

Elle voit passer une annonce Facebook : "Master Com à distance Université Bretagne Sud (Lorient) - Même diplôme, 50% moins cher." Léa : "Mais Lorient c'est où ?"

Elle veut une ville étudiante, vivante, mais **abordable**. Dilemme : quitter Toulouse où elle a ses potes vs survivre financièrement.

**Action montante - L'exploration étudiante**

*Découverte (soir même, 23h dans son lit) :*
Léa google "villes étudiantes pas chères France". Tombe sur un article blog étudiant : "J'ai trouvé ma ville avec Bienvenue."

*Session 1 - Mardi soir, dans le bus (18h) :*

Léa sort son iPhone, lance Bienvenue.

*Conversation (4 minutes, elle tape vite) :*
- "Salut ! T'es étudiante ?" → "Ouais Master Com, je cherche une ville moins chère que Toulouse"
- "Budget max ?" → "400€ ABSOLU max pour studio"
- "Priorités ?" → "Vie étudiante (bars, soirées), boulot étudiant possible, pas mourir d'ennui quoi"
- "Études ?" → "Master peut être à distance, je veux juste une ville cool"

L'agent : "OK donc ville étudiante dynamique, budget serré, tu veux kiffer sans te ruiner. Check ?"

Léa : "Exactement ça !"

**Climax - "Je peux vraiment avoir une vie ?"**

*5 secondes.* Léa fixe son écran.

**Top 10 s'affiche. #1 : Poitiers, Vienne**

Léa : "Poitiers ?? C'est pas mort là-bas ?" Elle clique, sceptique.

*Scores qui la surprennent totalement :*
- Coût de vie : 94/100 - **"Studio 300-380€ en moyenne"**
- Vie étudiante : 88/100 - "30K étudiants, 40+ asso étudiantes, 20 bars/clubs"
- Emploi étudiant : 82/100 - "350+ offres jobs étudiants actuellement"
- Transports : 79/100 - "Abonnement bus étudiant 20€/mois"
- Connectivité : TGV Paris 1h30 (voir potes parisiens facilement)

*Léa clique "Voir logements" :*
- 87 studios 280-400€ disponibles **maintenant**
- 12 colocations 250-320€

*Elle clique "Jobs étudiants" :*
- 23 offres restau/bar
- 15 offres retail
- 8 offres babysitting

**Moment "Aha!" :** Léa calcule : Studio 350€ + vie 430€ = exactement son budget 780€. ET il reste de l'argent. "Attends... je peux faire des soirées ET économiser ?" Elle mate des stories Insta #PoitiersStudent : ça a l'air vivant.

Elle met Poitiers en favori, check #2 (Limoges), #3 (Le Mans).

**Résolution - La liberté financière**

- **3 semaines plus tard :** Léa visite Poitiers avec sa mère. Quartier étudiant animé, elle rencontre des étudiants à une terrasse. "C'est moins grand que Toulouse mais grave sympa."
- **1 mois plus tard :** Léa loue un studio 360€ centre-ville, inscrit master à distance Lorient (économise 1200€ frais scolarité vs Toulouse). Job bar étudiant 3 soirs/semaine.
- **6 mois plus tard :** Léa a économisé 800€ (première fois de sa vie). Soirées 2x/semaine, asso surf (Atlantique 1h30), potes parisiens viennent la voir.
- **1 an plus tard :** Story Instagram : "Meilleure décision ever. Bienvenue m'a montré qu'on peut être étudiante ET pas broke." 2400 vues. Ses potes toulousains galérent encore.

---

### Journey 6 : Gabriel - Le Gardien de la Qualité

**Persona :** Gabriel + Data Team, rôle Admin/Ops/Support

**Scène d'ouverture - Le monitoring mensuel**

Début du mois, 10h. Gabriel ouvre Langfuse dashboard. Routine mensuelle : vérifier que le système tourne bien, que les recommandations restent pertinentes, que les coûts LLM n'explosent pas.

**Workflow habituel (1-2h/mois) :**

*1. Check Langfuse (20 min) :*
- Traces conversations : erreurs, latences anormales ?
- Coûts API LLM : toujours sous 0.50€/session ?
- Drift detection : prompts agents performent encore bien ?

Alerte : Coût moyen session passé de 0.35€ à 0.52€. Investigation.

*2. Debug (15 min) :*
- Gabriel lit quelques traces : Agent Criteria Extractor fait trop de retries
- Cause : utilisateurs formulent critères très longs → token overflow
- Fix : ajuster prompt pour synthétiser mieux

*3. Pipeline ETL Check (20 min) :*
- Refresh données communes : dernière exec OK ?
- Nouvelles offres emploi scrapées : 2300 cette semaine (normal)
- Vectorisation : cohérence scores vérifiée

*4. Qualité Recommandations (30 min) :*
- Gabriel lance tests automatiques 5 personas
- Alex → Rennes top 3 : ✅
- Jean → Albi top 3 : ✅
- Sophie → La Bresse top 5 : ✅ (avant c'était top 1, slight drift)

Décision : Acceptable. Note pour suivi mois prochain.

*5. Support Utilisateur (occasionnel, 5-10 min/incident) :*
- Email : "Mes favoris ont disparu" → Check Supabase → bug frontend, pas backend agents
- Email : "Recommandations pas pertinentes" → Replay conversation dans Langfuse → utilisateur a dit "peu importe" sur critères clés → cannot fix user input

**Résolution - Le système stable**

Gabriel ferme Langfuse. Système = healthy. Coûts maîtrisés. Qualité OK. RDV dans 1 mois.

**Temps total : ~2h/mois sauf incidents.**

---

### Journey Requirements Summary

Les 6 user journeys révèlent les capabilities essentielles suivantes :

**Capabilities Conversationnelles (tous journeys) :**
- Conversation naturelle multi-tours avec contexte maintenu
- Extraction holistique des critères (pas juste job + logement séparés)
- Résumé et validation des critères avant recherche
- Ton adapté au persona (professionnel pour Alex, casual pour Léa, rassurant pour Jean)

**Capabilities Matching & Recommandation (tous journeys) :**
- Matching vectoriel basé sur critères multiples
- Top 10 communes personnalisées avec ranking clair
- Latence <10s acceptable (moment de suspense OK)
- Exploration comparative (favoris, comparaison multi-communes)

**Capabilities Scores & Validation (tous journeys) :**
- Scores détaillés par catégorie avec explications
- Triple comparaison (national, similaires, local) pour contexte
- Validation temps réel avec offres emploi/immobilier actuelles
- Liens directs vers offres externes

**Capabilities Spécifiques par Persona :**

**Alex (Tech Worker) :**
- Écosystème tech quantifié (startups, meetups)
- Vie sociale jeune (bars, associations)
- Calcul économies potentielles
- Accessibilité TGV pour déplacements occasionnels

**Les Martin (Famille) :**
- Gestion multi-critères complexes (famille = beaucoup de contraintes)
- Double emploi : 2 recherches emploi simultanées
- Services enfants (écoles, crèches, activités)
- Détection contradictions + négociation intelligente

**Jean (Senior) :**
- Interface accessible (clarté, pas de jargon)
- Services santé détaillés (spécialités médicales)
- Données météo/climat intégrées
- Services seniors (clubs, associations, bénévolat)
- Proximité famille calculée (temps trajet)

**Sophie (Remote Worker) :**
- Connectivité critique (fibre, débits précis)
- Infrastructure remote work (coworking, 4G/5G)
- Filtrage strict sur contraintes non-négociables
- Validation infrastructure avant recommandation

**Léa (Étudiant) :**
- Tone conversationnel jeune/casual
- Focus coût de vie (critique budget serré)
- Vie étudiante (bars, assos, scène sociale)
- Jobs étudiants disponibles
- Interface mobile-first

**Gabriel (Ops) :**
- Dashboard Langfuse avec métriques clés
- Tests automatisés regression (5 personas)
- Alerting coûts si dépassement seuils
- Replay conversations pour debug
- Monitoring pipeline ETL status
- Logs erreurs accessibles

---

## Innovation & Novel Patterns

### Detected Innovation Areas

**Innovation #1 : Conversation Naturelle pour Relocation Complexe**

**Approche innovante :**
- Interaction conversationnelle LLM pour extraire critères de relocation holistiques
- Alternative au formulaire gigantesque (15+ critères) qui crée friction
- L'agent pose questions naturelles, adapte dynamiquement selon réponses

**Unique parce que :**
- Concurrents = filtres statiques ou formulaires complexes
- SeLoger, Pôle Emploi = listings passifs sans intelligence conversationnelle
- Classements génériques (Ville Idéale, L'Express) = statiques, non-personnalisés

**Statut validation :** Hypothèse à valider avec MVP. Pari = friction réduite augmente engagement.

---

**Innovation #2 : Paradigm Shift "Solution = Commune"**

**Approche innovante :**
- Inverser la logique traditionnelle : trouver la commune optimale d'abord, valider offres ensuite
- Matching holistique sur qualité de vie globale, pas emploi + logement séparés

**Unique parce que :**
- Tous les concurrents séparent : emploi (Pôle Emploi), logement (SeLoger), qualité de vie (ignorée)
- Bienvenue : la commune EST le produit, offres sont validation

**Breakthrough moment :** Identifié lors brainstorming - simplifie radicalement le problème vs combinatoire job×house×leisure.

---

**Innovation #3 : Two-Stage Search (Vector Numérique + SQL)**

**Approche innovante :**
- Stage 1 : Vector search sur données tabulaires structurées [score_emploi: 0.87, score_immo: 0.45, ...]
- Stage 2 : SQL filtering sur contraintes dynamiques strictes (offres actuelles, budget précis)
- **Clarification technique :** Vecteurs = scores numériques structurés, PAS embeddings sémantiques textuels

**Unique parce que :**
- Combine forces ML (similarité multi-dimensionnelle) + SQL (contraintes précises)
- Réduit 35K communes → 100 candidates (vector) → top 10 pertinentes (SQL)
- Concurrents : soit pure SQL (rigide), soit pure recherche texte (imprécis)

**Fallback :** Si 0 résultats, Agent Constraint Analyzer négocie et relâche contraintes progressivement.

---

**Innovation #4 : Richesse Data Inégalée**

**Approche innovante :**
- 900 indicateurs par commune, 19 catégories, 130+ sources publiques
- Triple comparaison (national, similaires cluster, local voisines)
- Méthodologie Ville de Rêve adaptée et automatisée

**Unique parce que :**
- Concurrents : quelques dizaines d'indicateurs max, méthodologie opaque
- Bienvenue : transparence complète, sources vérifiables, scoring documenté

**Barrière compétitive :** Difficile à reproduire (effort ETL massif, maintenance 130 sources).

---

**Innovation #5 : Ghost Monitoring Proactif**

**Approche innovante :**
- Communes "fantômes" (match parfait mais 0 offres) surveillées automatiquement
- Alerting asynchrone par email quand nouvelles offres apparaissent
- Le système travaille pour l'utilisateur dans le temps

**Unique parce que :**
- Concurrents : recherche ponctuelle uniquement
- Bienvenue : monitoring temporel + alerting proactif

**Double usage :**
- Gère risque "commune parfaite sans offres"
- Crée valeur long-terme (utilisateur revient quand opportunité apparaît)

---

### Market Context & Competitive Landscape

**Concurrents Principaux :**

**1. SeLoger, LeBonCoin (Immobilier pur)**
- Forces : listings massifs, SEO puissant, notoriété
- Faiblesses : focus pur immobilier, aucune vision holistique, pas d'intelligence conversationnelle

**2. Pôle Emploi, Indeed (Emploi pur)**
- Forces : base emplois exhaustive, présence institutionnelle
- Faiblesses : focus pur emploi, ignorent qualité de vie, UI/UX datée

**3. Ville Idéale, L'Express Classements**
- Forces : notoriété presse, méthodologie connue
- Faiblesses : classements statiques non-personnalisés, pas d'interaction, pas de validation offres

**Votre Avantage Compétitif :**

**Court-terme (12-24 mois) : Vitesse + Agilité**
- Concurrents = grosses boîtes avec décideurs âgés, pas à jour sur LLM/agents
- Cycles décision lents (6-12 mois pour intégrer LLM)
- Culture d'entreprise résistante au changement
- **Votre edge :** First mover, itération rapide, stack moderne

**Moyen-terme (24+ mois) : Données + Exécution**
- Reproduction de l'idée : facile (LLM disponibles)
- Reproduction des données : difficile (900 indicateurs, 130 sources, pipeline ETL complexe)
- **Votre edge :** Avance data + qualité execution

**Long-terme : Brand + Network Effects**
- Utilisateurs génèrent dataset insights (10K+ conversations)
- Qualité recommandations s'améliore avec usage
- Bouche-à-oreille utilisateurs satisfaits (Alex, Léa stories)

---

### Validation Approach

**Hypothèses Critiques à Valider (MVP) :**

**Hypothèse #1 : Conversation > Formulaire**
- **À valider :** Utilisateurs préfèrent conversation naturelle vs formulaire gigantesque
- **Méthode :** A/B test (si temps) ou tests qualitatifs beta avec 5 personas
- **Métrique :** % utilisateurs complètent extraction critères (cible >70%)

**Hypothèse #2 : Pertinence Vector Search Numérique**
- **À valider :** Vecteurs numériques structurés produisent recommandations pertinentes
- **Méthode :** Tests automatisés 5 personas + validation qualitative beta
- **Métrique :** 85%+ recommandations jugées pertinentes

**Hypothèse #3 : Paradigm "Solution = Commune" Accepté**
- **À valider :** Utilisateurs acceptent logique inversée (commune d'abord, offres ensuite)
- **Méthode :** Observation sessions beta + feedback qualitatif
- **Métrique :** Utilisateurs ne demandent pas "mais où sont les jobs d'abord ?"

**Hypothèse #4 : Ghost Monitoring = Valeur**
- **À valider :** Utilisateurs trouvent valeur dans alerting asynchrone long-terme
- **Méthode :** Post-MVP (difficile à tester court-terme)
- **Métrique :** Taux retour suite alerte fantôme

---

### Risk Mitigation

**Risque #1 : Conversation Extrait Mal les Critères**
- **Impact :** Recommandations non-pertinentes, perte confiance
- **Mitigation :**
  - Résumé critères + validation utilisateur avant recherche
  - Possibilité éditer critères extraits
  - Snapshot testing structure extraction (tests régression)
  - Fallback : formulaire guidé si échec extraction

**Risque #2 : Vector Search Retourne 0 Résultats**
- **Impact :** Utilisateur bloqué, frustration
- **Mitigation :**
  - Agent Constraint Analyzer détecte contradictions
  - Négociation intelligente pour relâcher contraintes progressivement
  - Explication pourquoi 0 résultats (critères impossibles)
  - Proposition alternatives (élargir budget, élargir rayon, etc.)

**Risque #3 : Commune Parfaite Mais 0 Offres**
- **Impact :** Déception utilisateur
- **Mitigation :**
  - Mode fantôme automatique + monitoring
  - Système continue chercher autres communes (élargit critères)
  - Pas de blocage : utilisateur voit d'autres options immédiatement
  - Alerting email quand offres apparaissent

**Risque #4 : Concurrents Copient l'Approche**
- **Impact :** Perte avantage compétitif
- **Mitigation Court-terme :**
  - Vitesse execution (MVP 3 mois, eux 12-18 mois)
  - Itération rapide sur feedback utilisateurs
  - Brand building via bouche-à-oreille
- **Mitigation Long-terme :**
  - Barrière data (900 indicateurs difficiles à reproduire)
  - Quality of execution (UX, pertinence, fiabilité)
  - Network effects (insights dataset 10K+ conversations)

**Risque #5 : Coûts LLM Explosent**
- **Impact :** Rentabilité compromise
- **Mitigation :**
  - Budget cap par session (<0.50€)
  - Monitoring Langfuse temps réel avec alerting
  - Modèles différenciés par agent (cher où nécessaire)
  - Cache intelligent pour requêtes communes

**Risque #6 : Qualité Données Dégrade**
- **Impact :** Recommandations non-pertinentes, perte confiance
- **Mitigation :**
  - Tests cohérence automatisés (Paris = score services élevé, etc.)
  - Tests régression 5 personas mensuels
  - Monitoring drift qualité (Rennes doit rester top 3 pour Alex)
  - Pipeline ETL avec versioning et rollback

---

## Project-Type Specific Requirements

### Architecture Overview

Bienvenue est un système hybride combinant :
1. **Web App (SvelteKit)** - Interface utilisateur avec rendu mixte SSR/CSR
2. **API Backend Agentique (LangGraph)** - Système d'agents conversationnels séparé
3. **Ghost Monitoring Service** - Service automatisé de surveillance des offres

Ces trois composantes sont architecturalement **séparées** mais communiquent via APIs.

### Web App Requirements (SvelteKit)

#### Rendering Strategy

**Approche hybride SSR/CSR :**

**Pages SSR (Server-Side Rendering) :**
- Pages publiques de communes : `/communes/[commune-slug]`
- Landing pages SEO-optimisées
- Contenu généré par LLM avec données localisées
- **Objectif :** Maximiser SEO et découvrabilité locale

**Pages CSR (Client-Side Rendering) :**
- Application conversationnelle : `/app/conversation`
- Interface carte interactive : `/map`
- Dashboard utilisateur : `/account`
- **Objectif :** Expérience interactive temps réel

**Justification :**
- Contenu commune localisé = énorme potentiel SEO (35K communes × contenu unique)
- Conversation temps réel = latence critique, CSR avec WebSocket obligatoire

#### Browser Compatibility

**Navigateurs supportés :**
- Chrome/Edge (dernières 2 versions)
- Firefox (dernières 2 versions)
- Safari (dernières 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Features modernes requises :**
- WebSocket support (conversation temps réel)
- Geolocation API (carte interactive)
- LocalStorage (cache préférences utilisateur)
- ES2020+ support

**Responsive Design :**
- Desktop-first pour MVP (expérience principale)
- Mobile-responsive progressif (post-MVP prioritaire)
- Breakpoints : Desktop (1024px+), Tablet (768-1023px), Mobile (320-767px)

#### SEO Requirements

**Priorité : CRITIQUE**

**Pages SEO-optimized :**

1. **Pages de communes** (`/communes/[slug]`)
   - Meta description unique générée par LLM
   - Contenu H1/H2/H3 structuré avec données localisées
   - Schema.org markup (Place, LocalBusiness si applicable)
   - Open Graph tags pour partage social
   - Sitemap XML auto-généré (35K URLs)

2. **Landing pages thématiques**
   - `/tech-workers` → Profils personnalisés
   - `/families` → Critères famille
   - `/retirees` → Critères retraités

**Performance SEO :**
- Core Web Vitals respectés (LCP <2.5s, FID <100ms, CLS <0.1)
- Lighthouse score >90 sur pages publiques
- Canonical URLs propres

**Stratégie de contenu localisé :**
- Génération automatique de descriptions enrichies par commune
- Intégration données exclusives (900 indicateurs → storytelling SEO)
- Exemple : "Rennes : 12ème ville pour les développeurs web - 1200+ offres tech, loyer moyen 14€/m², score qualité de vie 8.2/10"

#### Real-Time Features

**WebSocket Connection pour Conversation :**

**Protocole :**
- Client ouvre connexion WebSocket : `wss://api.bienvenue.fr/api/v1/conversation`
- Authentification : Token Supabase passé dans query string ou premier message
- Bidirectionnel : Client envoie messages JSON, Backend stream réponses

**Format messages :**

```json
// Client → Backend
{
  "type": "user_message",
  "content": "Je cherche une ville tech-friendly avec budget 1200€/mois",
  "session_id": "uuid-session"
}

// Backend → Client (streaming)
{
  "type": "agent_message_chunk",
  "content": "D'accord, je comprends que...",
  "session_id": "uuid-session"
}

// Backend → Client (recommendations finales)
{
  "type": "recommendations",
  "communes": [
    {
      "insee_code": "35238",
      "name": "Rennes",
      "score_global": 0.92,
      "scores_categories": {...},
      "offres_emploi": [...],
      "offres_immobilier": [...]
    }
  ],
  "session_id": "uuid-session"
}
```

**Gestion de connexion :**
- Reconnexion automatique si déconnexion (max 3 tentatives)
- Heartbeat toutes les 30s pour maintenir connexion
- Timeout client : 5min d'inactivité → fermeture gracieuse

**Fallback :**
- Si WebSocket échoue : afficher message d'erreur + contact support
- Pas de fallback HTTP polling (trop complexe pour MVP)

#### Accessibility

**Niveau requis : Bonnes pratiques de base (WCAG 2.1 A minimum)**

**Critères obligatoires :**
- Contraste texte/fond suffisant (ratio 4.5:1 minimum)
- Navigation clavier complète (Tab, Enter, Espace)
- Labels aria sur éléments interactifs
- Alt text sur images
- Structure sémantique HTML5 (header, nav, main, section)

**Non-prioritaire pour MVP :**
- Lecteur d'écran optimization (niveau AA/AAA)
- Support users malvoyants avancé
- Navigation vocale

**Justification :** Population cible = digitally literate, usage standard browsers. Accessibility avancée sera ajoutée post-MVP selon feedback.

---

### API Backend Requirements (LangGraph)

#### Endpoints & Protocol

**Architecture : WebSocket-first**

**Endpoint principal :**

```
WS /api/v1/conversation
```

**Fonctionnalité :**
- Connexion WebSocket persistante pour session de conversation
- Streaming bidirectionnel (user → agent, agent → user)
- Recommendations transmises via même canal (pas de GET séparé)

**Endpoint complémentaire (HTTP) :**

```
GET /api/v1/conversation/:id/history
```

**Fonctionnalité :**
- Récupérer historique d'une conversation passée
- Utilisé quand utilisateur revient sur l'app (reload page)
- Retourne messages + recommendations précédentes

**Justification architecture :**
- WebSocket = latence minimale pour conversation temps réel
- Évite polling HTTP inefficace
- Simplifie code client (un seul canal communication)

#### Authentication & Authorization

**Méthode : Supabase JWT Tokens**

**Flow d'authentification :**

1. **User login via Supabase Auth (frontend)**
   - Email/password, Google OAuth, etc.
   - Frontend reçoit JWT token de Supabase

2. **WebSocket connection avec token (First Message Pattern)**
   - Client ouvre connexion WebSocket : `wss://api/v1/conversation`
   - Client envoie token dans **premier message** après connexion :
     ```json
     { "type": "auth", "token": "eyJhbGc..." }
     ```
   - Backend ferme connexion si pas d'auth reçue dans 5 secondes

   **⚠️ Sécurité :** Token dans query string (`?token=xxx`) **évité** car :
   - Loggé par load balancers, reverse proxies, CDN
   - Exposé dans browser history
   - Risque leak si URL partagée accidentellement

3. **Validation backend sécurisée**
   - Backend LangGraph reçoit token dans premier message
   - **Valide signature JWT complète** avec clé publique Supabase (JWKS endpoint)
   - Vérifie algorithme (`RS256`), audience (`authenticated`), expiration
   - Extrait `user_id` du claim `sub` (pas payload non-vérifié)
   - Associe session WebSocket à `user_id` validé

   **Pattern sécurisé (pseudo-code) :**
   ```python
   # ✅ SECURE
   decoded = jwt.decode(
       token,
       supabase_jwks_public_key,
       algorithms=['RS256'],
       audience='authenticated',
       verify=True  # CRITICAL
   )
   user_id = decoded['sub']

   # ❌ INSECURE - NEVER DO THIS
   decoded = jwt.decode(token, verify=False)
   user_id = decoded['user_id']  # Exploitable
   ```

**Avantages :**
- Pas de base de données session côté backend (stateless)
- Supabase gère rotation tokens, refresh
- Backend juste valide signature (rapide)
- Tokens jamais exposés dans URLs/logs

**Token Revocation (Risk Acceptance MVP) :**
- ⚠️ **Limitation connue :** Si user change password ou compte supprimé, token reste valide jusqu'à expiration (1h)
- **Mitigation MVP :** Tokens courts (1h expiration) limitent fenêtre risque
- **Post-MVP :** Implémenter cache Redis des tokens révoqués si nécessaire

**Rate Limiting par user :**
- Max 100 messages/heure par `user_id` (évite abus)
- Max 5 sessions simultanées par `user_id`

#### Data Formats

**Format principal : JSON**

**Messages WebSocket :**
- Tous les messages client ↔ backend en JSON
- UTF-8 encoding

**Vecteurs numériques :**
- Stockés en PostgreSQL via pgvector (HNSW index)
- Format : tableau floats `[0.87, 0.45, 0.92, ...]`
- Pas exposés au frontend (utilisés uniquement backend)

**Données carte (GeoJSON) :**
- Contours communes en GeoJSON (simplifié pour performance)
- Transmis via HTTP GET séparé (pas WebSocket) : `GET /api/v1/communes/:code/geometry`

#### Rate Limiting

**Objectif : Prévenir abus, gérer coûts LLM**

**Limites par user authentifié (conversation) :**
- **100 messages/heure** (global window - moyenne 6-7 conversations complètes)
- **10 messages/minute** (burst protection - évite scripts abusifs)
- **€0.50 coût LLM/jour** (cost-based cap - ~100-200 messages selon modèle)
- **5 conversations simultanées** (évite multi-tab abuse)
- **10 conversations/jour** (évite farming données)

**Limites Ghost Monitoring :**
- **10 communes max** surveillées simultanément par user
- **1 nouvelle subscription/heure** (évite spam subscriptions)
- **30 jours durée max** de surveillance automatique

**Limites globales (tous users) :**
- **1000 requêtes/seconde** sur API HTTP (health check, history, geometry)
- **500 connexions WebSocket simultanées** (capacité serveur)

**Comportement si limite atteinte :**
- Message d'erreur JSON avec type spécifique :
  ```json
  {
    "error": "rate_limit_exceeded",
    "limit_type": "burst|hourly|daily_cost|ghost_monitoring",
    "retry_after": 3600,
    "current_usage": "8/10 messages in last minute"
  }
  ```
- Frontend affiche message contextualisé selon `limit_type`

**Monitoring :**
- Tableau Langfuse avec top users par volume requêtes ET coûts cumulés
- Alerting si user suspect (>200 messages/heure OU >€1/jour)
- Dashboard coûts LLM temps réel avec projection mensuelle

#### API Versioning

**Stratégie : Versioning dès le début**

**Format : `/api/v1/...`**

**Justification :**
- Coût zéro d'ajouter `/v1/` maintenant
- Évite migration douloureuse plus tard (breaking changes inévitables)
- Permet dépréciation gracieuse si v2 nécessaire

**Roadmap versions :**
- **v1** (MVP) : Conversation WebSocket + history HTTP
- **v2** (potentiel) : Si changement majeur protocole ou format données

**Backward compatibility :**
- v1 maintenue minimum 6 mois après release v2
- Deprecation warnings dans headers HTTP : `X-API-Deprecation: v1 deprecated, migrate to v2`

#### SDK / Client Library

**Décision : Client WebSocket TypeScript structuré dans repo (pas SDK npm externe)**

**Justification :**
- Frontend et backend contrôlés par même équipe (Gabriel)
- Overhead maintenance SDK npm pas justifié pour MVP
- Mais logique WebSocket (reconnexion, auth, heartbeat) = ~150 lignes complexes

**Approche retenue :**

Créer **`src/lib/api/websocket-client.ts`** avec fonctionnalités encapsulées :

```typescript
class ConversationClient {
  // Core
  - connect(token: string): Promise<void>
  - sendMessage(content: string): void
  - disconnect(): void

  // Reliability
  - Auto-reconnection (exponential backoff, max 3 tentatives)
  - Message queueing (si connexion temporairement perdue)
  - Heartbeat automatique (30s keep-alive)

  // Auth
  - First message auth pattern (secure)
  - Token refresh handling

  // Types
  - TypeScript interfaces pour tous messages
  - Type-safe event handlers

  // Integration
  - Svelte stores pour state reactivity
  - Error handling avec retry logic
}
```

**Avantages :**
- ✅ Réutilisable dans tout le frontend
- ✅ Testé unitairement (Vitest)
- ✅ Typage TypeScript fort
- ✅ Toujours dans repo (pas dependency externe)
- ✅ Évite duplication logique complexe

**Post-MVP :**
- Si API publique pour partenaires → Extraire vers SDK TypeScript npm
- Si adoption interne forte → SDK réutilisable

---

### Ghost Monitoring Service Requirements

**Architecture : Service backend séparé (pas LangGraph)**

**Déclencheur :**
- Cron job exécuté par Supabase Functions ou service externe
- Déclenché à chaque ajout de nouvelles données (offres emploi/immobilier)
- Fréquence : Toutes les 4h (ou event-driven si possible)

**Logique :**
1. Scanner toutes communes en mode "ghost" (0 offres lors de recherche initiale)
2. Vérifier si nouvelles offres apparues matchant critères utilisateur
3. Si match : envoyer email notification utilisateur
4. Marquer alerte comme envoyée (éviter duplicates)

**Pas d'endpoint user-facing :**
- Utilisateurs ne "subscribe" pas manuellement
- Activation automatique si commune recommandée = 0 offres
- Désactivation automatique après 30 jours ou si user clique "ne plus surveiller"

**Stockage état :**
- Table Supabase `ghost_monitoring` :
  - `user_id`, `commune_code`, `criteres_json`, `created_at`, `alerted_at`

**Performance :**
- Max 1000 communes surveillées simultanément (MVP)
- Batch processing (50 communes/batch)

---

### Critical Risk Mitigations (Pre-Mortem Analysis)

Cette section documente les scénarios d'échec identifiés via Pre-mortem Analysis et les préventions à implémenter dès le MVP pour les éviter.

---

#### Scénario d'Échec #1 : Explosion des Coûts LLM

**Risque :** Coûts LLM incontrôlés dépassent €4,000/mois au lieu de €300 budget. Rentabilité compromise, shutdown.

**Causes potentielles :**
- Users utilisent Bienvenue comme ChatGPT généraliste (questions hors-sujet)
- Bots scrapent données via conversations automatisées
- Bug rate limiting (reset minuit au lieu de rolling 24h)
- Agent fait 3-4 appels LLM par message user au lieu de 1-2

**✅ Mitigations implémentées :**

1. **Guardrails de contenu strict**
   - Prompt système agent : "ONLY answer relocation questions"
   - Detection layer pré-LLM : si message hors-sujet → réponse template sans appel LLM
   - Redirect automatique : "Je ne peux vous aider que pour votre recherche de commune"

2. **Circuit breaker par session**
   ```yaml
   Limits par conversation:
     - Max 30 messages total (typique = 15-20)
     - Max €0.30 coût LLM par session
     - Si atteint: "Conversation terminée. Recommendations disponibles dans votre compte."
   ```

3. **Agent call optimization monitoring**
   - Langfuse trace chaque appel LLM avec parent/child
   - Alerting si Agent >2 calls par user message
   - Metric target : "LLM calls per user message" <1.5

4. **Bot detection**
   - Turnstile/CAPTCHA sur création compte
   - Pattern detection : >5 messages/min = suspect flag
   - IP rate limiting global : 1000 req/h par IP

5. **Daily cost alerts & kill switch**
   - Email alert si coûts journaliers >€20 (projection €600/mois)
   - Dashboard coûts avec projection 7j/30j visible
   - Kill switch manuel si explosion détectée

**Métriques de succès :**
- Coût moyen par conversation <€0.15
- 0% conversations hors-sujet traitées par LLM
- 0 bots détectés après 7 jours post-launch

---

#### Scénario d'Échec #2 : Recommendations Non-Pertinentes

**Risque :** 85% users partent après 1 conversation. NPS = -40. "Recommendations pourries, ne correspondent pas".

**Causes potentielles :**
- LLM extrait mal les critères ("budget flexible" au lieu de "800€ max")
- Vector search ignore contraintes critiques (géographie, must-haves)
- Edge cases non testés (budgets bas, contraintes complexes, critères rares)
- Pas d'explainability (user ne comprend pas pourquoi Rennes recommandé)

**✅ Mitigations implémentées :**

1. **Validation critères obligatoire AVANT recherche**
   ```
   Agent affiche résumé critères extraits:
   "J'ai compris :
   - Budget logement : 800€/mois MAX
   - Zone : < 50km de Lille
   - Emploi : Développeur web
   - Must-have : Écoles Montessori

   [Modifier] [Confirmer et Rechercher]"

   User DOIT valider explicitement avant execution search
   ```

2. **Tests de régression automatisés**
   - 20 personas détaillés couvrant edge cases :
     - Budgets très bas (<500€)
     - Contraintes géographiques strictes
     - Critères rares (écoles alternatives, sports spécifiques)
     - Familles, retraités, étudiants (pas juste tech)
   - CI/CD bloque deploy si persona "Alex → Rennes" rate
   - Run complet chaque déploiement

3. **Explainability forcée**
   ```
   Chaque recommendation avec justification:
   "Pourquoi Rennes?
   ✅ 1200+ offres dev (critère emploi)
   ✅ Loyer moy. 14€/m² = 560€ pour 40m² (budget 800€)
   ✅ Score qualité vie : 8.2/10 (critère bien-être)
   ❌ Pas d'école Montessori trouvée (compromis)

   Score global : 92/100"
   ```

4. **Confidence scoring avec warnings**
   - Système calcule confidence par recommendation (0-100%)
   - Si confidence <60% → Warning : "Peu de résultats exacts, élargir critères?"
   - Jamais afficher recommendations avec confidence artificiellement gonflée

5. **Feedback loop immédiat**
   - Après affichage top 10 : "Ces recommendations correspondent? 👍👎"
   - Si 👎 → Log conversation pour review manuelle hebdo
   - Identifier patterns d'échec pour améliorer extraction critères

**Métriques de succès :**
- 👍 rate >70% sur recommendations affichées
- 100% personas tests passent en CI/CD
- <5% conversations flaggées 👎 après 30 jours

---

#### Scénario d'Échec #3 : Effondrement Technique

**Risque :** Site down 40% du temps. Crashs fréquents. Latence 30-45s. Users fuient.

**Causes potentielles :**
- Memory leaks : LangGraph state persiste en RAM sans cleanup
- 50 connexions WebSocket × 150 MB/connexion = 7.5 GB → OOM kill (VPS = 8 GB)
- Pas de load testing avant prod
- Pas de graceful degradation si overload

**✅ Mitigations implémentées :**

1. **Memory budget strict par session**
   ```python
   MAX_MEMORY_PER_SESSION = 50 MB  # Pas 150 MB

   Cleanup agressif après chaque message:
     - Clear intermediate LLM responses
     - Keep only : user_criteria + final_recommendations
     - Explicit garbage collection call
   ```

2. **Connection limits avec queueing**
   ```yaml
   Max concurrent WebSocket: 30 (pour VPS 8GB RAM)

   Si 31ème user connecte:
     - Afficher : "Forte affluence, position file : #5"
     - Queue timeout : 60s max
     - Ou message : "Essayez dans 2 minutes"
   ```

3. **Stateless conversation architecture**
   - État conversation stocké PostgreSQL (pas RAM)
   - WebSocket = canal transport uniquement
   - Flow : Load state from DB → Process → Save state → Respond
   - RAM libérée complètement entre messages

4. **Load testing obligatoire pré-deploy**
   - Script k6 ou Locust
   - Simulate 50 users simultanés conversations réalistes
   - Run AVANT chaque production deploy
   - Acceptance criteria : p95 latency <10s, crash rate 0%

5. **Monitoring proactif avec alerts**
   ```yaml
   Alerts Slack/Email:
     - RAM usage >85% → "Scale warning"
     - WebSocket connections >25 → "Approche limite capacité"
     - Service crash/restart → "Incident critique"
     - p95 latency >15s → "Dégradation performance"
   ```

6. **Graceful degradation fallback**
   - Si backend overload détecté → Afficher formulaire simple
   - Message : "Système surchargé. Laissez email, recommendations sous 1h"
   - Batch processing background au lieu de temps réel

**Métriques de succès :**
- Uptime >99.5% (3.6h downtime/mois max)
- p95 latency <10s
- 0 OOM kills après load testing validé
- Memory usage stable <80% même avec 30 users simultanés

---

#### Scénario d'Échec #4 : Faille de Sécurité & Data Leak

**Risque :** 10K conversations privées leakées. Article presse négatif. CNIL investigation + amende €50K. Réputation détruite.

**Causes potentielles :**
- Endpoint `/conversation/:id/history` accessible sans auth
- UUIDs séquentiels → crawling facile de tous IDs
- Admin dashboard Langfuse exposé publiquement sans password
- Logs contiennent conversations complètes en clair
- Pas d'audit logging des accès

**✅ Mitigations implémentées :**

1. **Auth stricte sur TOUS endpoints**
   ```python
   # Pattern obligatoire partout:
   @app.get("/api/v1/conversation/{id}/history")
   def get_history(
       id: str,
       user: User = Depends(require_auth)  # JWT validation
   ):
       conversation = db.get_conversation(id)
       if conversation.user_id != user.id:
           raise HTTPException(403, "Forbidden")
       return conversation
   ```

2. **UUIDs v4 (random) obligatoire**
   - JAMAIS IDs séquentiels (1, 2, 3...)
   - JAMAIS UUIDs v1 (time-based predictable)
   - UUID v4 = 122 bits randomness → impossible brute-force

3. **Rate limiting même sur lecture**
   - Endpoints "lecture seule" aussi limités
   - Évite mass crawling même si auth bypass découvert
   - 100 req/h par user sur GET endpoints

4. **Audit logging complet**
   ```yaml
   Log tous accès sensibles:
     - WHO : user_id
     - WHAT : endpoint + action
     - WHEN : timestamp ISO8601
     - RESULT : status_code (200/403/500)

   Alert patterns suspects:
     - 403 rate >10/min = attaque en cours
     - Accès conversation_id depuis autre user_id
   ```

5. **Langfuse self-hosted sécurisé**
   - JAMAIS exposé publiquement sans auth
   - Options (ordre préférence) :
     1. VPN/Tailscale access only
     2. OAuth Google Workspace
     3. Basic auth minimum (user/pass fort)

6. **No sensitive data in logs**
   ```python
   # ❌ JAMAIS faire ça
   logger.info(f"User said: {user_message}")
   logger.info(f"Criteria extracted: {criteria_json}")

   # ✅ Pattern sécurisé
   logger.info(
       f"Message received",
       extra={
           "user_id": user_id,
           "message_length": len(user_message),
           "criteria_count": len(criteria_keys)
       }
   )
   ```

7. **RGPD compliance by design**
   - Conversations stockées avec encryption at rest (PostgreSQL)
   - User peut supprimer conversations (right to erasure)
   - Data retention : conversations auto-delete après 90 jours inactivité
   - No PII in Langfuse traces (hash user_id)

**Métriques de succès :**
- 0 endpoints sans auth protection
- 0 sensitive data in logs (audit mensuel)
- Pentest externe avant launch public
- RGPD compliance checklist 100% complète

---

### Performance Requirements & Optimizations

Cette section documente les budgets de performance, bottlenecks identifiés, et optimisations critiques pour atteindre les targets de latence <5-10s.

---

#### Performance Budget Global

**Target User Journey: "Alex cherche une ville tech"**

```yaml
1. Page Load (Pages SSR communes):
   - First Contentful Paint (FCP): <1.5s
   - Largest Contentful Paint (LCP): <2.5s
   - Time to Interactive (TTI): <3.5s
   - Bundle Size: <400 KB initial

2. Conversation (WebSocket):
   - Connection établie: <300ms
   - First message sent: <250ms
   - First agent chunk received: <1s (streaming)
   - Full recommendations: <5s (p95)

3. Map Interactive:
   - Map ready: <1s after page load
   - Markers rendered (viewport): <500ms
   - Pan/zoom responsive: 60 FPS

4. Database Performance:
   - Vector search (35K→100): <50ms
   - SQL filtering (100→10): <20ms
   - Offres enrichment: <15ms
   - Total DB time: <100ms

Target End-to-End: <5s from message → recommendations visible (p95)
```

---

#### Database Layer Optimizations (PostgreSQL + pgvector)

**Expert: Sophie (Database Specialist)**

**Bottlenecks identifiés & solutions :**

**1. Vector Search Performance**

**Problème :** HNSW index peut être contre-productif avec seulement 35K vecteurs (overhead > gain).

**Solution :**
```sql
-- Benchmark obligatoire avant production
-- Test 1: HNSW index
CREATE INDEX idx_communes_vector ON communes
  USING hnsw (vector vector_cosine_ops);
SET hnsw.ef_search = 100;

-- Test 2: Brute-force (peut être plus rapide avec 35K rows)
DROP INDEX idx_communes_vector;

-- Mesure: EXPLAIN ANALYZE sur queries réelles
-- Choisir approche la plus rapide empiriquement
```

**Action :** Inclure benchmark dans tests performance CI/CD.

**Target :** Vector search <50ms (p95)

---

**2. N+1 Queries Elimination**

**Problème :** Charger offres pour chaque commune = 20+ queries séparées.

**Solution :**
```sql
-- ❌ Anti-pattern N+1 (éviter)
-- for commune in top_10:
--     offres = query("SELECT * FROM offres WHERE commune = ?")

-- ✅ Single query avec JOINs + json_agg
SELECT
  c.*,
  json_agg(DISTINCT oe.*) FILTER (WHERE oe.id IS NOT NULL) as offres_emploi,
  json_agg(DISTINCT oi.*) FILTER (WHERE oi.id IS NOT NULL) as offres_immo
FROM communes c
LEFT JOIN offres_emploi oe ON c.insee_code = oe.commune_code
  AND oe.salaire >= :min_salary
LEFT JOIN offres_immobilier oi ON c.insee_code = oi.commune_code
  AND oi.prix_m2 <= :max_price
WHERE c.id = ANY(:top_10_ids)
GROUP BY c.id;
```

**Gain :** 100ms → 15ms (6x faster)

---

**3. Index Strategy Critique**

**Indexes obligatoires (MVP) :**
```sql
-- Offres emploi
CREATE INDEX idx_offres_emploi_commune ON offres_emploi(commune_code);
CREATE INDEX idx_offres_emploi_salaire ON offres_emploi(salaire);
CREATE INDEX idx_offres_emploi_commune_salaire
  ON offres_emploi(commune_code, salaire);

-- Offres immobilier
CREATE INDEX idx_offres_immo_commune ON offres_immobilier(commune_code);
CREATE INDEX idx_offres_immo_prix ON offres_immobilier(prix_m2);
CREATE INDEX idx_offres_immo_commune_prix
  ON offres_immobilier(commune_code, prix_m2);

-- Timestamps (BRIN plus efficace que B-tree)
CREATE INDEX idx_offres_emploi_created
  ON offres_emploi USING BRIN(created_at);
CREATE INDEX idx_offres_immo_created
  ON offres_immobilier USING BRIN(created_at);
```

**Gain :** SQL filtering 200ms → 20ms (10x faster)

---

**4. Caching Layer (Redis)**

**Données statiques à cacher :**
```python
@cache(ttl=3600)  # 1h cache
def get_commune_indicators(commune_id):
    """900 indicateurs changent rarement (refresh quotidien)"""
    return db.query("SELECT * FROM communes WHERE id = ?", commune_id)

@cache(ttl=86400)  # 24h cache
def get_commune_scores_precomputed():
    """Scores précalculés (materialized view)"""
    return db.query("SELECT * FROM communes_enriched")
```

**Materialized Views :**
```sql
-- Refresh nightly via cron
CREATE MATERIALIZED VIEW communes_enriched AS
SELECT
  c.*,
  compute_score_emploi(c.data) as score_emploi,
  compute_score_immo(c.data) as score_immo,
  compute_score_services(c.data) as score_services
  -- ... autres scores précalculés
FROM communes c;

-- Refresh quotidien
REFRESH MATERIALIZED VIEW communes_enriched;
```

**Gain :** Query communes 50ms → 5ms (10x faster avec Redis)

---

**5. Connection Pooling**

**Configuration PgBouncer (via Supabase) :**
```python
# Stateless connections (released entre messages)
DATABASE_URL = "postgresql://...?pgbouncer=true&pool_mode=transaction"

async def handle_message(session_id, message):
    async with db.connection() as conn:
        # Use connection
        state = await conn.get_session_state(session_id)
        result = await process(state, message)
        await conn.save_session_state(session_id, result)
    # Connection auto-released
    return result
```

**Capacité :** 100+ users simultanés avec 60 connections pool (Supabase Free)

---

#### Frontend Layer Optimizations (SvelteKit + Leaflet)

**Expert: Marc (Frontend Specialist)**

**Bottlenecks identifiés & solutions :**

**1. Bundle Size - Code Splitting**

**Problème :** Leaflet + GeoJSON = 1.2 MB initial bundle.

**Solution :**
```javascript
// ❌ Static import (bad)
import L from 'leaflet';
import 'leaflet.markercluster';

// ✅ Dynamic import (code splitting)
export async function initMap() {
  const L = await import('leaflet');
  const { MarkerClusterGroup } = await import('leaflet.markercluster');
  // Map code only loads when needed
}

// ✅ On-demand GeoJSON loading
async function loadRegionCommunes(region_code) {
  // Load only visible region data
  const geojson = await fetch(`/api/geojson/region/${region_code}`);
  return geojson.json();
}
```

**Gain :** Initial bundle 1.2 MB → 400 KB (3x reduction)

---

**2. Map Rendering - Canvas + Virtualization**

**Problème :** 35K SVG markers = 2-3s rendering bloque UI.

**Solution :**
```javascript
// ✅ Canvas rendering (10x faster que SVG)
import { Canvas } from 'leaflet.canvas-markers';

const canvas = new L.Canvas();
communes.forEach(c => {
  L.circleMarker([c.lat, c.lon], {
    renderer: canvas,  // Canvas au lieu de SVG
    radius: 3
  }).addTo(map);
});

// ✅ Viewport-based rendering (virtualization)
map.on('moveend', () => {
  const bounds = map.getBounds();
  const visibleCommunes = communes.filter(c =>
    bounds.contains([c.lat, c.lon])
  );
  renderMarkers(visibleCommunes);  // ~200 au lieu de 35K
});
```

**Gain :** Map ready 3s → 500ms (6x faster)

---

**3. WebSocket - Optimistic UI**

**Problème :** Reconnection stalls perçus comme freeze.

**Solution :**
```svelte
<script>
  let connectionState = $state('connected');
  let messageQueue = $state([]);

  function handleDisconnect() {
    connectionState = 'reconnecting';

    // ✅ UI continue à fonctionner
    showToast('Reconnexion...', { persistent: true });

    // ✅ Messages affichés avec pending indicator
    messageQueue.forEach(msg => {
      displayMessage(msg, { pending: true, icon: '⏳' });
    });
  }

  function handleReconnect() {
    connectionState = 'connected';
    sendQueuedMessages();
    hideToast();
  }
</script>

<!-- Visual feedback constant -->
{#if connectionState === 'reconnecting'}
  <ConnectionBanner>
    Reconnexion... Vos messages seront envoyés automatiquement.
  </ConnectionBanner>
{/if}
```

**Gain UX :** User ne sent jamais les disconnections (optimistic rendering)

---

**4. SSR - Incremental Static Regeneration (ISR)**

**Problème :** Pre-render 35K pages = 40 min build time (Vercel timeout 15 min).

**Solution :**
```javascript
// +page.server.js
export async function load({ params }) {
  const commune = await getCommune(params.slug);

  // ✅ ISR: Generate on-demand, cache 24h
  return {
    commune,
    cache: {
      maxage: 86400,  // 24h
      stale: 3600     // Serve stale while revalidating
    }
  };
}

// svelte.config.js
export const config = {
  prerender: {
    // Pre-render top 500 communes only
    entries: topCommunes.map(c => `/communes/${c.slug}`),
    // Autres: on-demand first visit, cached après
  }
};
```

**Gain :** Build time 40min → 2min (pre-render top 500), reste ISR

---

**5. Streaming LLM Responses**

**Problème :** 4s latency perçue (blocking wait).

**Solution :**
```typescript
// ✅ Stream chunks progressivement
async function* streamConversation(message: string) {
  yield { type: 'thinking', message: 'Je réfléchis...' };

  // Stream agent reasoning
  for await (const chunk of agent.processStreaming(message)) {
    yield { type: 'agent_chunk', content: chunk };
  }

  // Stream recommendations as they arrive
  for await (const commune of vectorSearchStreaming()) {
    yield {
      type: 'recommendation',
      commune: await enrichWithOffres(commune)
    };
  }
}
```

**Gain UX :** Latency perçue 4s → <1s (premier chunk visible)

---

#### Infrastructure Layer Optimizations

**Expert: Karim (DevOps Engineer)**

**Bottlenecks identifiés & solutions :**

**1. Cold Starts Prevention**

**Problème :** Container sleep après 5min inactivité = 6.5s cold start.

**Solution :**
```yaml
# Cron job ping keep-alive (gratuit, simple)
# Vercel Cron ou external service (UptimeRobot)
schedule: "*/4 * * * *"  # Every 4 minutes
endpoint: GET /api/health

# Alternative: Always-on container (Railway)
# Cost: +€10-20/mois mais 0 cold starts
```

**Gain :** Premier user 10.5s → 4s (pas de cold start)

---

**2. Streaming LLM (Backend)**

**Problème :** LLM calls = 80% latency (2-5s), non-compressible.

**Solution :**
```python
# ✅ Stream responses incrementally
async def handle_user_message(message: str):
    # Immediate ack
    yield {"type": "thinking", "message": "Je réfléchis..."}

    # Stream agent processing
    async for chunk in agent.process_streaming(message):
        yield {"type": "agent_chunk", "content": chunk}

    # Stream recommendations as computed
    async for commune in vector_search_streaming():
        commune_data = await enrich_with_offres(commune)
        yield {"type": "recommendation", "commune": commune_data}
```

**Gain UX :** Latency perçue 4s → <1s (illusion vitesse via streaming)

---

**3. Geographic Optimization**

**Stratégie MVP :**
```yaml
Target Audience: France + Europe
Datacenter: Paris ou Frankfurt (OVH/Hostinger)

Latency estimates:
  - Paris user: 10-20ms RTT ✅
  - London user: 30-40ms RTT ✅
  - Berlin user: 40-50ms RTT ✅
  - New York user: 100ms RTT (acceptable)
  - Tokyo user: 300ms RTT (acceptable pour MVP)

Post-MVP si international traction:
  - Multi-region deployment (CloudFlare Workers)
  - Database read replicas
```

**Action MVP :** Europe-first, optimiser global si traction internationale.

---

**4. CDN pour Assets Statiques**

**Configuration :**
```yaml
CDN (CloudFlare ou Vercel):
  - GeoJSON files (simplified)
  - Images communes
  - Leaflet assets
  - Fonts

Cache headers:
  - GeoJSON: 24h cache, stale-while-revalidate
  - Images: 7 days cache
  - Fonts: 365 days cache (immutable)
```

**Gain :** Assets load time 2s → 300ms (edge caching)

---

#### Top 10 Optimisations Prioritaires

| # | Optimisation | Impact | Effort | Priorité |
|---|--------------|--------|--------|----------|
| **1** | Streaming LLM responses | Latency perçue: 4s→1s | Moyen | 🔴 Critical |
| **2** | N+1 queries → Single JOIN | -100ms DB | Faible | 🔴 Critical |
| **3** | Indexes DB sur offres | -200ms DB | Faible | 🔴 Critical |
| **4** | Code split Leaflet | -800ms FCP | Moyen | 🟠 High |
| **5** | Canvas rendering markers | -2s map | Moyen | 🟠 High |
| **6** | Redis cache communes | -50ms queries | Moyen | 🟠 High |
| **7** | Ping cron (no cold start) | -6s first user | Faible | 🟠 High |
| **8** | Viewport-based GeoJSON | -800KB bundle | Élevé | 🟡 Medium |
| **9** | HNSW vs brute-force test | ±30ms | Faible | 🟡 Medium |
| **10** | ISR communes pages | Build time | Moyen | 🟡 Medium |

---

#### Performance Monitoring & Metrics

**Monitoring obligatoire (MVP) :**

```yaml
Frontend (Vercel Analytics + PostHog):
  - Core Web Vitals (FCP, LCP, CLS, FID)
  - Page load times par route
  - Bundle sizes tracking

Backend (Langfuse + Custom):
  - API response times (p50, p95, p99)
  - LLM latency per agent
  - Database query times (slow query log >50ms)
  - WebSocket connection count
  - Memory usage per container

Infrastructure:
  - Uptime monitoring (99.5% target)
  - Error rates (<1%)
  - Cold start frequency
  - Database connection pool usage
```

**Alerts configurés :**
```yaml
Critical (Slack + Email):
  - API p95 latency >10s
  - Uptime <99%
  - Error rate >5%
  - Memory usage >90%

Warning (Slack):
  - API p95 latency >7s
  - Database slow queries >100ms
  - WebSocket connections >80% capacity
```

**Performance Tests (CI/CD) :**
```yaml
Automated tests avant deploy:
  1. Load test: 50 users simultanés
  2. Database benchmarks (HNSW vs brute-force)
  3. Bundle size check (<500 KB)
  4. Lighthouse score (>90 sur pages publiques)
  5. Persona regression (20 personas <5s)

Acceptance criteria:
  - p95 latency <5s
  - 0 crashes
  - Lighthouse >90
  - All personas pass
```

---

### Implementation Pathways (Reverse Engineered)

Cette section documente les chemins d'implémentation critiques travaillés à rebours depuis les outcomes désirés. Chaque pathway identifie les milestones nécessaires pour garantir le succès.

---

#### Outcome #1 : User Success - "Alex trouve Rennes et dit 'C'est parfait !'"

**État final désiré (T+15min après début conversation) :**

Alex (28 ans, développeur) termine sa conversation. Il voit Rennes en #1 avec score 92/100. Il dit "Wow, c'est exactement ce que je cherchais." Il clique sur 3 offres d'emploi, sauvegarde Rennes en favoris, et revient demain.

**Milestones nécessaires (ordre chronologique) :**

**Milestone 1: Conversation Engage (T+0 → T+5min)**
```yaml
Objectif: Alex comprend immédiatement quoi faire et répond naturellement

Implémentation:
  - [ ] Prompt système agent optimisé:
      "Je suis votre assistant relocation. Posons quelques questions
       pour trouver votre commune idéale en France."
  - [ ] WebSocket connection <300ms (ping cron pour éviter cold start)
  - [ ] Error handling gracieux (pas d'erreurs rouges visibles)
  - [ ] UI claire: input message placeholder "Décrivez votre projet...",
       bouton "Envoyer" évident

Critères de succès:
  ✅ 0 abandons pendant les 5 premières minutes
  ✅ Moyenne 5-7 questions posées (pas 20)
  ✅ User comprend workflow sans instructions
```

**Milestone 2: Extraction Critères Complète (T+5min → T+10min)**
```yaml
Objectif: Critères Alex capturés avec précision et validés explicitement

Structure critères cibles:
  {
    "emploi": {
      "metier": "Développeur web",
      "technologies": ["React", "Node.js", "TypeScript"],
      "salaire_min": 35000,
      "type_contrat": "CDI"
    },
    "logement": {
      "budget_max": 800,
      "type": "T2",
      "surface_min": 40
    },
    "localisation": {
      "region_preferee": "Bretagne ou Pays de Loire",
      "taille_ville": "moyenne (50K-500K habitants)"
    },
    "lifestyle": {
      "priorites": ["vie culturelle", "proximité mer", "communauté tech"],
      "contraintes": ["pas Paris", "pas trop cher"]
    }
  }

Implémentation:
  - [ ] Agent Criteria Extractor avec prompt structuré
  - [ ] Détection critères implicites ("pas Paris" → taille_ville: moyenne)
  - [ ] Résumé critères affiché AVANT recherche:
      """
      J'ai compris :
      - Budget logement : 800€/mois MAX
      - Zone : Bretagne ou Pays de Loire
      - Emploi : Développeur web (React/Node)
      - Lifestyle : Vie culturelle + proximité mer

      [Modifier] [Confirmer et Rechercher]
      """
  - [ ] User DOIT valider explicitement (bouton click)

Critères de succès:
  ✅ 100% critères majeurs capturés (emploi, budget, localisation)
  ✅ User valide sans modifier (80%+ des cas)
  ✅ Temps moyen extraction <5min
```

**Milestone 3: Search Retourne Rennes Top 100 (T+10min → T+13min)**
```yaml
Objectif: Vector search place Rennes dans top 100 candidats

Implémentation:
  - [ ] Vecteur Alex construit avec poids corrects:
      emploi_tech: 0.9 (priorité haute)
      immo_budget: 0.8 (contrainte stricte)
      localisation_bretagne: 0.7 (préférence forte)
      lifestyle_culture: 0.6 (nice-to-have)
      proximite_mer: 0.6 (nice-to-have)

  - [ ] Vector search execute (HNSW ou brute-force benchmarké):
      SELECT commune_id, vector <=> user_vector AS distance
      FROM communes
      ORDER BY distance
      LIMIT 100

  - [ ] Rennes dans dataset avec données correctes:
      - 1200+ offres dev actuelles
      - Loyer moyen 14€/m²
      - Score vie culturelle: 8.2/10
      - Distance mer: 60km
      - Population: 220K (taille moyenne)

Critères de succès:
  ✅ Rennes dans top 100 (position typique: 5-15)
  ✅ Vector search <50ms (p95)
  ✅ Dataset à jour (<7 jours)
```

**Milestone 4: SQL Filtering Valide Rennes (T+13min → T+14min)**
```yaml
Objectif: SQL confirme Rennes a ≥5 offres dev avec salaire ≥35K

Implémentation:
  - [ ] SQL query avec JOINs optimisés:
      SELECT c.*,
        json_agg(oe.*) as offres_emploi,
        json_agg(oi.*) as offres_immo
      FROM communes c
      JOIN offres_emploi oe ON c.insee_code = oe.commune_code
        AND oe.salaire >= 35000
        AND oe.categorie IN ('dev', 'tech')
      JOIN offres_immobilier oi ON c.insee_code = oi.commune_code
        AND oi.prix_m2 <= 20  -- 800€ budget / 40m²
      WHERE c.id IN (top_100_ids)
      GROUP BY c.id
      HAVING COUNT(oe.id) >= 5
      ORDER BY score DESC
      LIMIT 10

  - [ ] Offres emploi Rennes dans DB:
      - ≥5 offres avec salaire ≥35K
      - Offres récentes (<30 jours)
      - Détails complets (salaire, tech stack, entreprise, lien)

Critères de succès:
  ✅ Rennes passe SQL filtering (dans top 10)
  ✅ Query <20ms (avec indexes)
  ✅ Offres qualité (pas doublons, pas périmées)
```

**Milestone 5: Affichage Top 10 Pertinent (T+14min → T+15min)**
```yaml
Objectif: Alex voit Rennes #1, comprend pourquoi, engage avec offres

Implémentation:
  - [ ] UI Card Rennes:
      Titre: "🏆 #1 - Rennes (35) - Score 92/100"

      Justification visible:
      "Pourquoi Rennes ?
      ✅ 1200+ offres dev (salaire moyen 38K€)
      ✅ Loyer moyen 14€/m² = 560€ pour T2 40m²
      ✅ Score qualité vie : 8.2/10
      ✅ Vie culturelle riche + 60km de la mer
      ✅ Communauté tech active (meetups, startups)"

      Offres emploi (5 affichées):
      - [Entreprise] Développeur Full-Stack React/Node - 38K€
      - [Startup] Lead Dev TypeScript - 42K€
      - [ESN] Développeur Web Junior - 35K€
      ...

      Boutons: [❤️ Sauvegarder] [📍 Voir sur carte] [📊 Détails complets]

  - [ ] Map montre Rennes avec pin rouge + zoom

Critères de succès:
  ✅ User clique ≥1 offre (80%+ des cas)
  ✅ User sauvegarde commune (60%+ des cas)
  ✅ User dit "pertinent" dans feedback (>70%)
```

**Tests de validation end-to-end :**
```yaml
Persona Test: "Alex cherche Rennes"
  - Simuler conversation complète
  - FAIL si Rennes pas dans top 3
  - FAIL si latency >10s
  - FAIL si critères mal extraits

KPIs tracking:
  - Position moyenne Rennes pour profil tech: #1-3
  - Taux engagement offres: >70%
  - Satisfaction (thumbs up): >80%
```

---

#### Outcome #2 : Retention - "Utilisateur revient 7 jours plus tard"

**État final désiré (J+7) :**

Marie a utilisé Bienvenue il y a 7 jours. Elle a trouvé Annecy intéressant mais 0 offres marketing. Aujourd'hui, elle reçoit email : "🎉 Nouvelle offre à Annecy : Chef de projet marketing - 45K€". Elle clique, revient sur l'app, postule.

**Milestones nécessaires (ordre chronologique) :**

**Milestone 1: Ghost Mode Activé Automatiquement (J+0)**
```yaml
Objectif: Marie inscrite en Ghost Monitoring pour Annecy

Implémentation:
  - [ ] Si commune dans top 10 MAIS 0 offres matchant critères:
      - Flag commune "ghost" pour cet user
      - Insert dans table ghost_monitoring:
        INSERT INTO ghost_monitoring
          (user_id, commune_code, criteres_json, created_at, status)
        VALUES
          ('marie-uuid', '74010',
           '{"metier": "marketing", "salaire_min": 40000, "type_contrat": "CDI"}',
           NOW(), 'active')

  - [ ] Message affiché dans UI:
      "🔔 Annecy correspond à vos critères mais pas d'offres actuellement.
       Nous vous préviendrons dès qu'une offre apparaît (max 30 jours).

       [Ne plus surveiller Annecy]"

  - [ ] User peut désactiver (update status='disabled')

Critères de succès:
  ✅ 100% communes 0-offres → Ghost Mode auto
  ✅ User notifié clairement (pas silencieux)
  ✅ Opt-out possible (RGPD)
```

**Milestone 2: Pipeline Offres Fonctionne (J+1 à J+6)**
```yaml
Objectif: Nouvelles offres ajoutées quotidiennement avec qualité

Implémentation:
  - [ ] Scraper/API sources offres:
      - Pôle Emploi API
      - Indeed scraper
      - Welcome to the Jungle API
      - LinkedIn Jobs (si API access)

  - [ ] ETL pipeline quotidien (cron 02:00):
      - Fetch nouvelles offres depuis sources
      - Parse: titre, salaire, commune_code, catégorie, lien
      - Deduplicate (éviter doublons)
      - Insert dans table offres_emploi avec created_at=NOW()

  - [ ] Data quality checks:
      - Commune_code valide (match référentiel INSEE)
      - Salaire parsé correctement (ou NULL si absent)
      - Catégorie mappée (marketing, tech, commerce, etc.)
      - Offres périmées supprimées (>60 jours)

Critères de succès:
  ✅ Pipeline run quotidien sans fail
  ✅ ≥100 nouvelles offres/jour nationales
  ✅ <5% offres avec données manquantes
```

**Milestone 3: Ghost Monitoring Cron (J+7 04:00)**
```yaml
Objectif: Détecter nouvelles offres matchant critères Ghost users

Implémentation:
  - [ ] Cron job toutes les 4h (00:00, 04:00, 08:00, 12:00, 16:00, 20:00)

  - [ ] Query matching:
      SELECT
        gm.user_id,
        gm.commune_code,
        gm.criteres_json,
        oe.*
      FROM ghost_monitoring gm
      JOIN offres_emploi oe
        ON oe.commune_code = gm.commune_code
        AND oe.created_at > gm.last_check_at
        AND oe.categorie = gm.criteres_json->>'metier'
        AND (oe.salaire >= (gm.criteres_json->>'salaire_min')::int
             OR oe.salaire IS NULL)
      WHERE gm.status = 'active'
        AND gm.created_at >= NOW() - INTERVAL '30 days'

  - [ ] Pour chaque match:
      - Create notification job (table notifications)
      - Update gm.last_check_at = NOW()
      - Update gm.match_count += 1

Critères de succès:
  ✅ Cron run <5min execution time
  ✅ 0 missed notifications (tous matches détectés)
  ✅ Pas de duplicates (check last_notified_offre_id)
```

**Milestone 4: Email Notification Envoyé (J+7 06:00)**
```yaml
Objectif: Marie reçoit email personnalisé avec lien direct

Implémentation:
  - [ ] Email worker (process table notifications)

  - [ ] Email template (Resend/SendGrid):
      Subject: "🎉 Nouvelle offre à Annecy : Chef de projet marketing"

      Body:
      """
      Bonjour Marie,

      Bonne nouvelle ! Une offre correspondant à vos critères
      vient d'apparaître à Annecy :

      📍 Annecy (74)
      💼 Chef de projet marketing
      💰 45 000€ brut/an
      🏢 [Nom Entreprise]

      [Voir l'offre →] (lien trackable)

      Cette offre correspond aux critères que vous aviez validés :
      - Métier : Marketing
      - Salaire minimum : 40K€

      ---

      Vous recevez cet email car vous surveillez Annecy depuis le [date].
      [Ne plus surveiller Annecy] | [Gérer mes alertes]
      """

  - [ ] Lien trackable:
      https://bienvenue.fr/communes/annecy?offre_id=xyz&utm_source=ghost_alert

  - [ ] Unsubscribe link RGPD-compliant

Critères de succès:
  ✅ Email envoyé <6h après offre ajoutée
  ✅ Deliverability >95% (pas spam)
  ✅ Unsubscribe fonctionnel
```

**Milestone 5: User Return Journey (J+7 matin)**
```yaml
Objectif: Marie clique email, voit offre, engage

Implémentation:
  - [ ] Lien email → /communes/annecy?offre_id=xyz

  - [ ] Page charge avec:
      - Offre highlightée en haut (sticky banner)
      - Détails offre complets
      - Bouton "Postuler" ou "Voir offre externe" clair
      - Context Annecy rappelé (scores, autres offres)

  - [ ] Session user restaurée si logged in (cookie)

  - [ ] Analytics tracking:
      - Event: "ghost_alert_clicked" (PostHog)
      - Conversion: "ghost_alert_application" si postule

Critères de succès:
  ✅ Click-through rate email >20%
  ✅ Page load <2s
  ✅ Conversion (postule ou sauvegarde) >50% des clics
```

**Tests de validation end-to-end :**
```yaml
Simulation Test: "Marie Ghost Mode Annecy"
  - J+0: Simuler conversation → Annecy 0 offres → Ghost activé
  - J+1: Insérer offre test Annecy marketing 45K
  - J+1 04:00: Run cron manuellement
  - J+1 06:00: Vérifier email reçu
  - J+1 08:00: Click email, vérifier landing page

KPIs tracking:
  - % communes Ghost Mode → offre trouvée: >30%
  - Email open rate: >40%
  - Click-through rate: >20%
  - Return rate après notification: >50%
```

---

#### Outcome #3 : Observability - "Gabriel voit que le système marche bien"

**État final désiré (chaque lundi matin) :**

Gabriel ouvre dashboard. Il voit : 150 conversations cette semaine, 78% engagement (≥1 clic offre), coûts LLM €42 (budget €50/sem), 0 erreurs critiques, p95 latency 4.2s. Il pense : "Le système tourne bien, rien à corriger."

**Milestones nécessaires (ordre chronologique) :**

**Milestone 1: Instrumentation Analytics (avant launch MVP)**
```yaml
Objectif: Tous events trackés automatiquement

Implémentation PostHog (Frontend):
  - [ ] SDK init dans +layout.svelte:
      posthog.init('phc_XXX', { api_host: 'https://app.posthog.com' })

  - [ ] Events trackés:
      posthog.capture('conversation_started', {
        user_id: user.id,
        timestamp: Date.now()
      })

      posthog.capture('criteria_validated', {
        user_id: user.id,
        criteres: JSON.stringify(criteres)
      })

      posthog.capture('recommendations_shown', {
        user_id: user.id,
        commune_ids: communes.map(c => c.id),
        top_commune: communes[0].name
      })

      posthog.capture('click_offre', {
        user_id: user.id,
        commune: commune.name,
        offre_id: offre.id,
        salaire: offre.salaire
      })

      posthog.capture('favorite_saved', {
        user_id: user.id,
        commune: commune.name
      })

      posthog.capture('ghost_mode_activated', {
        user_id: user.id,
        commune: commune.name
      })

Critères de succès:
  ✅ Tous events définis et documentés
  ✅ Tracking marche en dev (test avec PostHog debugger)
  ✅ PII anonymisée (hash user_id si nécessaire)
```

**Milestone 2: Instrumentation LLM Costs (backend)**
```yaml
Objectif: Chaque appel LLM tracé avec coût dans Langfuse

Implémentation Langfuse (Backend):
  - [ ] SDK init:
      from langfuse import Langfuse
      langfuse = Langfuse(
        public_key="pk_XXX",
        secret_key="sk_XXX",
        host="https://langfuse.yourdomain.com"  # self-hosted
      )

  - [ ] Wrapper LLM calls:
      @langfuse.observe(as_type="generation")
      async def call_llm(prompt, model="gpt-4"):
          response = await openai.chat.completions.create(
              model=model,
              messages=[{"role": "user", "content": prompt}]
          )
          return response

  - [ ] Trace structure:
      Root trace: conversation_id
      ├─ Span: Agent Conversation Manager (cost: €0.05)
      ├─ Span: Agent Criteria Extractor (cost: €0.08)
      └─ Span: Vector Search (cost: €0.00, no LLM)

      Total conversation cost: €0.13

Critères de succès:
  ✅ 100% appels LLM tracés
  ✅ Coût calculé automatiquement (Langfuse)
  ✅ Agrégations disponibles (coût/jour, coût/user)
```

**Milestone 3: Logging Structuré (backend)**
```yaml
Objectif: Tous logs avec context, queryable, niveaux appropriés

Implémentation:
  - [ ] JSON structured logging:
      import structlog
      logger = structlog.get_logger()

      logger.info(
        "message_received",
        user_id=user_id,
        conversation_id=conversation_id,
        message_length=len(message),
        timestamp=datetime.utcnow().isoformat()
      )

      logger.error(
        "vector_search_failed",
        user_id=user_id,
        error=str(e),
        traceback=traceback.format_exc(),
        severity="critical"
      )

  - [ ] Levels utilisés correctement:
      DEBUG: Détails développement (désactivé prod)
      INFO: Operations normales
      WARN: Situations anormales mais gérées
      ERROR: Erreurs bloquantes mais récupérables
      CRITICAL: Erreurs système (downtime)

  - [ ] Centralized logging:
      - Loki + Grafana (self-hosted)
      - OU CloudWatch Logs (si AWS)
      - OU simple file + grep (MVP acceptable)

Critères de succès:
  ✅ Logs JSON parsables automatiquement
  ✅ Context user_id présent partout
  ✅ 0 sensitive data in logs (vérifié manuellement)
```

**Milestone 4: Dashboard Monitoring (avant launch)**
```yaml
Objectif: Gabriel voit métriques clés en un coup d'œil

Implémentation Dashboard (Grafana ou custom Next.js):
  - [ ] Panels configurés:

      Panel 1: Conversations (7 jours rolling)
        Query: SELECT COUNT(*) FROM conversations
               WHERE created_at > NOW() - INTERVAL '7 days'
        Display: Big number + sparkline

      Panel 2: Engagement Rate
        Query: % users avec event "click_offre" (PostHog)
        Display: Gauge (target 70%)

      Panel 3: Coûts LLM (7 jours)
        Query: SUM(cost) FROM langfuse.traces
               WHERE timestamp > NOW() - INTERVAL '7 days'
        Display: Big number + projection mensuelle

      Panel 4: Error Rate
        Query: COUNT(*) WHERE severity='critical' / total_requests
        Display: Percentage (target <1%)

      Panel 5: Latency p95
        Query: Langfuse p95 latency per conversation
        Display: Line chart + horizontal target line (5s)

      Panel 6: Ghost Monitoring
        Query: Active ghost subscriptions + notifications sent
        Display: Two numbers

  - [ ] Auth: Basic auth ou Google OAuth (Gabriel only)

  - [ ] Refresh: Auto-refresh 5min

Critères de succès:
  ✅ Dashboard accessible (URL bookmarked)
  ✅ Toutes queries <5s load time
  ✅ Mobile responsive (Gabriel check sur téléphone)
```

**Milestone 5: Alerting Proactif (avant launch)**
```yaml
Objectif: Gabriel notifié si problème, pas besoin check manuel

Implémentation Alerts (Slack webhook ou Email):
  - [ ] Alerts configurées:

      CRITICAL (Slack + Email):
        - Error rate >5% (check every 5min)
        - Coûts LLM >€10/jour (check every 1h)
        - API p95 latency >10s (check every 5min)
        - Uptime <99% (24h rolling, check every 15min)
        - Memory usage >90% (check every 5min)

      WARNING (Slack):
        - API p95 latency >7s
        - Database slow queries >100ms
        - WebSocket connections >80% capacity
        - Ghost monitoring cron failed

  - [ ] Alert format:
      🚨 CRITICAL: Error rate 7.2% (target <1%)

      Time: 2026-02-15 14:32 UTC
      Window: Last 5 minutes
      Details: 42 errors / 582 requests

      Top errors:
      - VectorSearchTimeout: 18 occurrences
      - DatabaseConnectionRefused: 12 occurrences

      [View Dashboard] [View Logs]

Critères de succès:
  ✅ Alerts testées (trigger test alert)
  ✅ Slack webhook fonctionne
  ✅ Pas de false positives (tune thresholds)
```

**Tests de validation :**
```yaml
Pre-launch Checklist:
  - [ ] Simuler 10 conversations end-to-end
  - [ ] Vérifier dashboard montre 10 conversations
  - [ ] Vérifier Langfuse montre 10 traces avec coûts
  - [ ] Déclencher erreur test → vérifier alert reçue <1min
  - [ ] Check logs : 0 sensitive data leaked

Post-launch Monitoring (Semaine 1):
  - [ ] Gabriel check dashboard chaque matin
  - [ ] Log toute alerte reçue + action prise
  - [ ] Tune alert thresholds si false positives
```

---

#### Outcome #4 : Scalability - "Bienvenue scale à 1000 users/mois"

**État final désiré (6 mois post-launch) :**

Bienvenue a 1000 users actifs/mois. 50 conversations simultanées à peak hours. Coûts infrastructure €200/mois (viable). p95 latency stable 4.5s. 0 downtime majeur (>1h) en 6 mois. Gabriel dort tranquille.

**Milestones nécessaires (ordre chronologique) :**

**Milestone 1: Architecture Scalable Dès MVP (Mois 1)**
```yaml
Objectif: Fondations permettent scale sans refacto majeure

Implémentation:
  - [ ] Backend stateless:
      - Conversations stockées PostgreSQL (pas RAM)
      - WebSocket connection = transport only
      - Flow: Load state → Process → Save state → Release memory

  - [ ] PgBouncer connection pooling:
      DATABASE_URL="postgresql://...?pgbouncer=true&pool_mode=transaction"

      Capacity avec Supabase Free (60 connections):
        - 30 WebSocket users simultanés
        - 30 connections pour queries (API, cron)

      Capacity avec Supabase Pro (200 connections):
        - 100 WebSocket users simultanés
        - 100 connections pour queries

  - [ ] Monitoring avec alerts (déjà configuré Milestone 3.5)

  - [ ] Load test validé AVANT launch:
      k6 script: 50 users simultanés, conversations réalistes

      Acceptance criteria:
        - p95 latency <5s
        - 0 crashes
        - Memory usage stable <80%
        - Database connections <60% pool

Critères de succès:
  ✅ Load test 50 users pass
  ✅ Architecture stateless documentée
  ✅ Rollback plan si problème production
```

**Milestone 2: Performance Optimizations Implémentées (Mois 2-3)**
```yaml
Objectif: Latency optimisée, coûts réduits, UX fluide

Implémentation (voir section Performance Requirements):
  - [ ] Streaming LLM responses (latency perçue <1s)
  - [ ] N+1 queries éliminées (single JOIN)
  - [ ] Indexes DB critiques (offres_emploi, offres_immo)
  - [ ] Redis cache layer (communes statiques)
  - [ ] Frontend code splitting (Leaflet lazy load)
  - [ ] Canvas rendering map (pas SVG)
  - [ ] Ping cron (0 cold starts)

Validation:
  - [ ] Re-run load test 50 users après optimisations
  - [ ] Comparer metrics avant/après:
      - Latency: 6s → 4s (33% improvement)
      - Memory: 85% → 65% (better)
      - Cost per user: €0.25 → €0.15 (40% reduction)

Critères de succès:
  ✅ p95 latency <5s maintenu sous charge
  ✅ Cost per user <€0.20
  ✅ Memory usage <70% avec 50 users
```

**Milestone 3: Monitoring Usage Trends (Mois 3-5)**
```yaml
Objectif: Détecter besoin scale avant que ça casse

Implémentation:
  - [ ] Dashboard panel "Capacity Planning":
      - Concurrent users trend (7d, 30d)
      - Memory usage trend
      - Database connection pool usage trend
      - Peak hours identification

  - [ ] Projections automatiques:
      IF current_trend_30d > 20% growth/month:
        projected_users_3months = current * 1.2^3
        projected_memory = current_memory * 1.2^3

        IF projected_memory > 80%:
          ALERT: "Scale needed in 2-3 months"

  - [ ] Cost tracking mensuel:
      CSV export: month, active_users, infrastructure_cost, cost_per_user

      Target: cost_per_user <€0.20

Critères de succès:
  ✅ Trends visibles dans dashboard
  ✅ Gabriel review trends chaque mois
  ✅ Projections aident planifier upgrades
```

**Milestone 4: Infrastructure Upgrade Plan (Mois 4-6 si nécessaire)**
```yaml
Objectif: Scale infrastructure quand métriques atteignent 80% capacity

Trigger conditions (any of):
  - Memory usage >80% sustained 7 days
  - Database connections >80% pool sustained
  - Concurrent users peak >40 (capacity 50)
  - Cost per user >€0.25 (profitability menacée)

Option A: Upgrade VPS Hostinger
  - KVM-4 (8GB RAM) → KVM-8 (16GB RAM)
  - Cost: +€15-20/mois
  - Capacity: 100 concurrent users
  - Migration: 2h downtime (weekend)

Option B: Migrate to Railway
  - Auto-scaling containers
  - 0 downtime scaling
  - Cost: €50-100/mois (variable)
  - Migration: 1 jour dev work

Option C: Upgrade Supabase Tier
  - Free (60 connections) → Pro (200 connections)
  - Cost: +€25/mois
  - Capacity: 100 concurrent users
  - Migration: 0 downtime (just upgrade)

Decision Matrix:
  IF users <500/mois: Option A (VPS upgrade simple)
  IF users 500-1000/mois: Option C (Supabase Pro)
  IF users >1000/mois: Option B (Railway auto-scale)

Critères de succès:
  ✅ Plan documenté AVANT besoin urgent
  ✅ Migration testée en staging
  ✅ Rollback plan préparé
```

**Milestone 5: Business Viability Validation (Mois 6)**
```yaml
Objectif: Coûts infrastructure permettent viabilité long-terme

Cost Model Target:
  1000 active users/mois
  × €0.20 cost per user
  = €200/mois infrastructure total

Breakdown cibles:
  - VPS/Railway: €50-80/mois
  - Supabase Pro: €25/mois
  - LLM costs (OpenAI): €100/mois (0.10€ per user)
  - Monitoring (Langfuse cloud): €20/mois
  - Email (Resend): €10/mois
  - TOTAL: €205/mois ✅

Validation:
  - [ ] Export costs réels Mois 6
  - [ ] Calculer cost per active user
  - [ ] Projeter à 5K users, 10K users
  - [ ] Identifier optimizations si cost >€0.20/user

Monetization future (hors scope MVP):
  IF cost per user <€0.20:
    - Freemium viable (ads, premium features)
    - B2B leads model viable (€5-10 per qualified lead)

  IF cost per user >€0.30:
    - Monetization obligatoire pour survivre
    - Options: subscription (€9.99/mois), pay-per-search

Critères de succès:
  ✅ Cost per user <€0.20 maintenu à 1K users
  ✅ Projection 10K users <€2000/mois
  ✅ Path to profitability identifié
```

**Tests de validation :**
```yaml
Stress Test (avant déclarer "scale success"):
  - [ ] Load test 100 users simultanés (2x capacity)
  - [ ] Simulate 1 semaine à 1000 users actifs (staging)
  - [ ] Chaos engineering:
      - Kill backend container → auto-restart <30s
      - Database restart → connections reconnect
      - Network latency +200ms → graceful degradation

  - [ ] Cost projection validated:
      - Réel mois 6 vs projected
      - Error margin <20%

Scale Readiness Checklist:
  ✅ Architecture stateless (state en DB)
  ✅ Load tests 100 users pass
  ✅ Monitoring + alerts en place
  ✅ Upgrade plan documenté et testé
  ✅ Cost per user <€0.20 validé
  ✅ 0 single points of failure critiques
```

---

### Key Insights from Reverse Engineering

**Insights critiques découverts :**

**1. User Success = Extraction Critères Non-Négociable**

Le moment le plus critique du user journey est l'extraction et validation des critères (T+5min → T+10min). Si cette étape échoue, tout le reste est compromis.

**Implications architecture :**
- Prompt Agent Criteria Extractor = optimisation priorité #1
- Résumé critères + validation explicite = non-négociable (pas optionnel)
- Tests régression 20 personas doivent TOUS passer extraction correctement
- Logging exhaustif : chaque critère extrait loggé pour debug

**2. Ghost Monitoring = Retention Feature Non-Optionnelle**

Sans Ghost Monitoring, users avec 0 résultats partent et ne reviennent jamais. Avec Ghost Monitoring, 50%+ reviennent quand notifiés.

**Implications architecture :**
- Ghost Monitoring = MVP feature (pas post-MVP)
- Pipeline offres doit être fiable dès J+0 (sinon notifications vides)
- Email deliverability critique (test avec Resend dès début)
- Opt-out RGPD obligatoire (éviter spam complaints)

**3. Observability = Gabriel Dort Tranquille**

Sans monitoring, Gabriel est aveugle. Chaque incident = 3am debugging panique. Avec monitoring + alerts, problèmes détectés avant que users impactés.

**Implications architecture :**
- Instrumentation (PostHog + Langfuse + Logs) = must-have AVANT launch
- Dashboard accessible mobile (Gabriel check en déplacement)
- Alerts tuned (pas trop sensibles = false positives ignorées)
- Weekly review metrics = rituel obligatoire

**4. Scalability = Architectural Choices Day 1**

Refactorer de stateful → stateless après crash production = cauchemar. Choisir architecture scalable dès MVP = scale sans douleur.

**Implications architecture :**
- Backend stateless (state en DB) = décision irrévocable MVP
- Load testing AVANT launch (pas après crash avec users réels)
- Cost modeling dès maintenant (€0.20/user target = guide optimizations)
- Upgrade plan documenté (pas improviser sous stress)

**5. Performance = 80% Perception, 20% Réalité**

Latency réelle 4s vs perçue <1s via streaming = même impact UX que 4s → 1s réel mais 10x moins cher à implémenter.

**Implications architecture :**
- Streaming responses = quick win priorité #1 (effort moyen, impact énorme)
- Optimistic UI (reconnection invisible) = détails qui comptent
- Loading states bien designés > optimisations backend complexes (dans certains cas)

---

## Project Scoping & Phased Development (REVISED - 1 Month Timeline)

### MVP Strategy & Philosophy

**MVP Approach : Problem-Solving MVP (Validation Pertinence)**

L'objectif du MVP est de **prouver que les recommendations de communes sont pertinentes** pour les utilisateurs français cherchant à déménager. Le système doit démontrer qu'une conversation naturelle peut extraire des critères complexes et générer des recommendations qui font dire "Wow, c'est exactement ce que je cherchais."

**Philosophy : Ship Fast, Learn Fast, Iterate Fast**

Timeline agressive de **4 semaines** avec exécution focalisée et itérations rapides. Priorité absolue : valeur utilisateur (pertinence recommendations) + retention (Ghost Monitoring) + observabilité (Langfuse pour contrôler coûts/qualité).

**Resource Requirements MVP :**
- 1 développeur full-stack (Gabriel) - temps plein intense
- Stack : SvelteKit + LangGraph + Supabase + OpenAI/Anthropic APIs
- Infrastructure : Hostinger VPS (8GB) + Supabase + Vercel
- Budget : ~€100-200 pour APIs/services pendant MVP

---

### MVP Feature Set (Phase 1 - 4 Semaines)

**Timeline : 4 semaines (launch début mars 2026)**

#### Core User Journeys Supported

**3 personas prioritaires MVP :**
1. **Alex (Tech Worker)** - Cherche ville tech avec budget moyen → Doit trouver Rennes pertinent
2. **Les Martin (Famille)** - Cherche ville familiale avec écoles → Doit trouver Annecy pertinent
3. **Jean (Retraité)** - Cherche ville calme budget serré → Doit trouver Albi pertinent

**User Journey MVP complet :**
```
1. Landing page → User comprend immédiatement la valeur proposition
2. Conversation naturelle (WebSocket temps réel)
3. Agent extrait critères via questions guidées (5-7 questions)
4. User valide critères explicitement (résumé + bouton confirmer)
5. Système génère top 10 communes en <5s (streaming feedback)
6. Affichage résultats : carte + scores + justifications + offres
7. User explore détails, sauvegarde favoris
8. SI 0 offres : Ghost Monitoring activé automatiquement
```

#### Must-Have Capabilities (Non-Négociables)

**1. Conversation Naturelle & Extraction Critères**
- Agent LLM conversationnel (GPT-4 via LangGraph)
- Dialogue multi-tours avec questions de clarification
- Extraction structurée critères (emploi, logement, localisation, lifestyle)
- Résumé critères + validation utilisateur obligatoire
- WebSocket pour conversation temps réel

**2. Matching Intelligent Communes**
- Vector search sur 35K communes (brute-force ou HNSW benchmarké)
- Two-stage search : vector similarity (35K→100) + SQL filtering (100→10)
- 7 catégories de données (règle 80/20) :
  1. Emploi (offres, secteurs, taux chômage)
  2. Immobilier (prix, disponibilité, typologie)
  3. Services (santé, éducation, commerces)
  4. Démographie (population, âge, dynamique)
  5. Accessibilité (transports, distances POI)
  6. Environnement (qualité air, espaces verts)
  7. Sécurité (délinquance, sentiment sécurité)

**3. Affichage Résultats Enrichis**
- Top 10 communes avec scores globaux (0-100)
- Justifications détaillées par commune (pourquoi recommandée)
- Scores par catégorie visibles
- Carte interactive Leaflet avec markers communes
- Liens directs vers offres emploi/immobilier externes
- Bouton "Sauvegarder favoris"

**4. Ghost Monitoring Automatisé** ⭐ *Ajouté MVP*
- Détection automatique communes 0-offres matchant critères
- Inscription user en Ghost Monitoring (table PostgreSQL)
- Cron job quotidien scanne nouvelles offres (04:00)
- Email notification automatique si match (Resend/SendGrid)
- Opt-out RGPD-compliant (bouton "Ne plus surveiller")

**5. Observabilité Langfuse** ⭐ *Ajouté MVP*
- Langfuse SDK intégré dans backend LangGraph
- Traces complètes chaque conversation (LLM calls + costs)
- Dashboard Langfuse Cloud accessible Gabriel
- Coûts LLM trackés par conversation et agrégés
- Alerting basique si coûts >€10/jour

**6. Session & Historique**
- Persistance session conversationnelle (Supabase)
- Historique conversations user (récupérable)
- Favoris communes sauvegardés
- Auth Supabase (email/password + Google OAuth)

**7. Testing Production-Ready**
- 5 personas synthétiques testés end-to-end
- Tests E2E automatisés (Playwright)
- CI/CD basique (GitHub Actions)
- Snapshot testing structure extraction critères

#### Technical Architecture MVP

**Stack complet :**
- **Frontend** : SvelteKit 2 + Svelte 5 (déjà existant) sur Vercel
- **Backend Agents** : LangGraph + LangChain sur VPS Hostinger (Python)
- **Database** : Supabase (PostgreSQL + pgvector + Auth)
- **LLM APIs** : OpenAI GPT-4 + Anthropic Claude (fallback)
- **Monitoring** : Langfuse Cloud (traces LLM + costs)
- **Email** : Resend ou SendGrid (Ghost notifications)
- **Maps** : Leaflet + OpenStreetMap

**Agents LangGraph :**
- Agent Conversation Manager (GPT-4) - dialogue utilisateur
- Agent Criteria Extractor (GPT-4) - extraction structurée critères
- Tools : Vector Builder, Search Orchestrator, History Service, Ghost Monitor

**Data Pipeline :**
- 35K communes avec 7 catégories (900 indicateurs sélectionnés)
- Offres emploi : Scraper Pôle Emploi + Indeed (refresh hebdomadaire MVP)
- Offres immobilier : APIs SeLoger/LeBonCoin (refresh hebdomadaire MVP)
- Vecteurs pré-calculés et stockés (pgvector)

#### Roadmap Semaine par Semaine

**Semaine 1 : Foundation (Backend Agents + Data)**
- Jour 1-2 : Setup infrastructure (VPS, Supabase, Langfuse)
- Jour 3-4 : Agent Conversation Manager + Criteria Extractor (LangGraph)
- Jour 5-7 : Data pipeline 7 catégories + import PostgreSQL

**Semaine 2 : Matching & Search**
- Jour 8-9 : Vector search implementation (brute-force + benchmark HNSW)
- Jour 10-11 : SQL filtering + offres enrichment
- Jour 12-14 : Tools LangGraph (Vector Builder, Search Orchestrator)

**Semaine 3 : Frontend & Ghost Monitoring**
- Jour 15-16 : Frontend SvelteKit intégration (WebSocket conversation)
- Jour 17-18 : Affichage résultats + carte Leaflet
- Jour 19-21 : Ghost Monitoring (cron + email notifications)

**Semaine 4 : Testing & Launch**
- Jour 22-23 : Langfuse intégration complète + dashboard
- Jour 24-25 : Tests 5 personas + E2E Playwright + CI/CD
- Jour 26-27 : Bug fixes + optimisations finales
- Jour 28 : **Launch MVP** 🚀

#### Success Criteria MVP

**User Success :**
- ✅ 3 personas prioritaires (Alex, Martin, Jean) trouvent leurs communes en top 3
- ✅ 80%+ users beta disent "recommendations pertinentes" (feedback thumbs up)
- ✅ Latency perçue <5s pour générer recommendations
- ✅ 0 blocages techniques pendant beta testing

**Business Success :**
- ✅ 50+ conversations complètes pendant beta (2 semaines)
- ✅ 60%+ users explorent ≥1 commune en détail
- ✅ 30%+ users sauvegardent ≥1 commune en favoris
- ✅ Ghost Monitoring : 10+ users inscrits, 2+ notifications envoyées avec succès

**Technical Success :**
- ✅ Coûts LLM <€0.20 par conversation (budget viable)
- ✅ System uptime >95% pendant beta
- ✅ 0 erreurs critiques non-gérées
- ✅ Langfuse traces 100% conversations

#### Out of Scope MVP (Délibérément Exclu)

**Optimisations performance** *(reporté Phase 2)* :
- ❌ Streaming LLM responses (latency perçue <1s)
- ❌ Parallel tool calls LangGraph
- ❌ Redis cache layer
- ❌ Canvas rendering map (SVG markers suffisent MVP)
- ❌ Code splitting frontend avancé

**Features avancées** *(reporté Phase 2)* :
- ❌ Agent Constraint Analyzer (négociation contradictions)
- ❌ Personnalisation pondération scores
- ❌ Dashboard analytics produit complet
- ❌ Load balancing / multi-region
- ❌ Rate limiting sophistiqué (basique suffit MVP)

**Data enrichie** *(reporté Phase 2+)* :
- ❌ 19 catégories complètes (seulement 7 MVP)
- ❌ Refresh quotidien offres (hebdomadaire suffit MVP)
- ❌ 900 indicateurs complets (sélection 80/20 MVP)

---

### Post-MVP Features

#### Phase 2 : Production-Ready & Scale (Semaines 5-12 post-MVP)

**Objectif Phase 2 :** Optimiser performance, scale infrastructure, enrichir données après validation MVP.

**1. Performance Optimizations**
- Streaming LLM responses (latency perçue 4s → <1s)
- N+1 queries elimination (single JOINs)
- Indexes DB critiques complets
- Redis cache layer (communes statiques)
- Frontend code splitting (Leaflet lazy load)
- Canvas rendering map (35K markers optimisés)

**2. Infrastructure Production**
- Rate limiting sophistiqué (burst + cost-based + Ghost limits)
- Security hardening (audit logging, UUIDs v4, RGPD compliance)
- Monitoring infrastructure complet (Grafana + Prometheus)
- Load testing 100 users validé
- Auto-scaling ou upgrade VPS

**3. Négociation Intelligente**
- Agent Constraint Analyzer (détecte contradictions)
- Proposition compromis algorithmiques
- Relaxation progressive contraintes si 0 résultats
- Explication trade-offs utilisateur

**4. Data Enrichment**
- Passage 7 → 12 catégories :
  - Culture & Loisirs
  - Coût de vie global
  - Nature & Espaces verts détaillé
  - Éducation complète
  - Santé complète
- Refresh quotidien offres emploi/immobilier
- +200 indicateurs additionnels

**5. Testing & CI/CD Robuste**
- 20 personas régression automatisés
- Load testing 50 users intégré CI/CD
- Chaos engineering (kill containers, DB restart)
- Performance budgets enforcement

**Timeline Phase 2 :** 2 mois après MVP validé

---

#### Phase 3 : Innovation & Différenciation (Mois 4-6 post-MVP)

**Objectif Phase 3 :** Différenciation compétitive long-terme, business model insights.

**1. Personnalisation Avancée**
- Pondération personnalisée 19 catégories par user
- Profils sauvegardés multiples ("solo" vs "en famille")
- ML sur préférences implicites (clics, temps passé)
- Historique évolution préférences dans le temps

**2. Data Complète & Méthodologie Riche**
- 19 catégories complètes (vs 7 MVP)
- 900 indicateurs complets par commune
- 130+ sources publiques enrichies
- Méthodologie Ville de Rêve complète documentée

**3. Analytics Produit Avancés**
- A/B testing framework prompts agents
- Funnel conversion complet analysé
- Dashboard product analytics détaillé
- Budget cap avec upsell freemium

**4. Business Model Insights**
- Dataset 10K+ conversations = insights représentatifs
- Tendances migration France analysées
- Critères relocation par démographie
- Monétisation : études marché, collectivités, promoteurs

**5. Distances POI Encodées**
- Pour chaque commune : distances exactes POI critiques
- "École la plus proche : 2km, hôpital : 5km, gare TGV : 15km"
- Simple, pragmatique, explicable

**Timeline Phase 3 :** Mois 4-6 après MVP validé

---

### Risk Mitigation Strategy

#### Technical Risks

**Risque #1 : Timeline 1 mois trop ambitieuse**
- **Probabilité :** Moyenne-Haute
- **Impact :** Launch retardé ou features coupées
- **Mitigation :**
  - Daily progress tracking (micro-milestones)
  - Priorité absolue : 3 personas doivent passer (test réussi = MVP validé)
  - Buffer intégré jours 26-27 pour bug fixes
  - Plan B : Si retard >3 jours, couper CI/CD automatisé (tests manuels)

**Risque #2 : Vector Search Performance Insuffisante**
- **Probabilité :** Faible-Moyenne
- **Impact :** Latency >10s inacceptable
- **Mitigation :**
  - Benchmark brute-force vs HNSW semaine 2 jour 8
  - Si brute-force <50ms : utiliser ça (plus simple)
  - Fallback : Pré-filtrage SQL avant vector search (réduire dataset)

**Risque #3 : Coûts LLM Explosent Pendant Dev**
- **Probabilité :** Moyenne
- **Impact :** Budget dev dépassé
- **Mitigation :**
  - Langfuse intégré dès semaine 1 (tracking coûts immédiat)
  - Dev/staging avec modèles cheaper (GPT-3.5) pour tests
  - Prod avec GPT-4 seulement
  - Alert si coûts dev >€50/semaine

**Risque #4 : Data Pipeline Fail (Offres Non Disponibles)**
- **Probabilité :** Moyenne
- **Impact :** Recommendations sans offres = valeur compromise
- **Mitigation :**
  - Semaine 1 : Scraper POC validé avant full pipeline
  - Fallback : Dataset statique pré-scraped si scraping real-time échoue
  - Ghost Monitoring compense partiellement (alerte quand offres apparaissent)

#### Market Risks

**Risque #1 : Recommendations Non-Pertinentes (Échec MVP)**
- **Probabilité :** Faible-Moyenne (mitigé par Architecture Decision Records)
- **Impact :** Critique - MVP invalidé
- **Mitigation :**
  - Validation critères OBLIGATOIRE (user doit confirmer avant search)
  - Tests 5 personas AVANT launch (Alex → Rennes DOIT passer)
  - Feedback thumbs up/down immédiat (detect problème rapidement)
  - Fallback : Itération rapide prompts agents (ajustements quotidiens si besoin)

**Risque #2 : Users Beta Pas Intéressés (Adoption Faible)**
- **Probabilité :** Faible
- **Impact :** Apprentissage retardé
- **Mitigation :**
  - Recrutement beta users AVANT launch (5-10 early adopters confirmés)
  - Landing page claire avec value prop forte
  - Incentive beta users (accès gratuit vie, priorité features)

#### Resource Risks

**Risque #1 : Burnout Gabriel (Travail Intense 4 Semaines)**
- **Probabilité :** Moyenne
- **Impact :** Velocity chute, qualité compromise
- **Mitigation :**
  - Scope clair et non-négociable (pas de scope creep)
  - Micro-wins quotidiens (célébrer progrès)
  - 1 jour off par semaine obligatoire (dimanche)
  - Support communauté (Discord, forums, Claude Code)

**Risque #2 : Infrastructure Failure Pendant Dev**
- **Probabilité :** Faible
- **Impact :** Blocage dev
- **Mitigation :**
  - Backup plan : Railway.app si VPS Hostinger problèmes
  - Supabase Cloud (pas self-hosted) = plus fiable
  - Documentation rollback procedures

---

## Functional Requirements

Cette section définit le **contrat de capacités** pour tout le produit. Chaque feature doit tracer vers un FR ici. Si une capacité manque de cette liste, elle n'existera pas dans le produit final.

**Organisation :** 52 Functional Requirements organisés en 7 domaines de capacités.

---

### 1. User Account & Authentication

- **FR1:** Users can create an account using email/password
- **FR2:** Users can create an account using Google OAuth
- **FR3:** Users can log in to access their session history and favorites
- **FR4:** Users can log out from their account
- **FR5:** Users can reset their password via email
- **FR6:** System authenticates users via JWT tokens from Supabase

---

### 2. Conversation & Criteria Extraction

- **FR7:** Users can start a new relocation conversation via natural language
- **FR8:** Users can engage in multi-turn dialogue with conversational agent
- **FR9:** Users can answer clarifying questions about their relocation criteria
- **FR10:** System extracts structured criteria from natural language (emploi, logement, localisation, lifestyle)
- **FR11:** Users can view a summary of extracted criteria before search execution
- **FR12:** Users can modify extracted criteria before confirming
- **FR13:** Users can explicitly validate criteria to trigger commune search
- **FR14:** System maintains conversation context across multiple messages

---

### 3. Commune Matching & Recommendations

- **FR15:** System generates top 10 commune recommendations based on validated criteria
- **FR16:** System calculates global score (0-100) for each recommended commune
- **FR17:** System calculates category scores for 7 data categories per commune
- **FR18:** System provides justification for each recommended commune
- **FR19:** System filters recommendations by available job offers matching user criteria
- **FR20:** System filters recommendations by available housing offers matching user budget
- **FR21:** System returns recommendations within target latency (<5s)

---

### 4. Results Exploration & Visualization

- **FR22:** Users can view top 10 recommended communes in ranked list
- **FR23:** Users can view detailed scores by category for each commune
- **FR24:** Users can view justifications explaining why each commune was recommended
- **FR25:** Users can view recommended communes on interactive map
- **FR26:** Users can click on map markers to view commune details
- **FR27:** Users can view available job offers for each recommended commune
- **FR28:** Users can view available housing offers for each recommended commune
- **FR29:** Users can access external links to job and housing offers
- **FR30:** Users can provide thumbs up/down feedback on recommendations

---

### 5. Ghost Monitoring & Notifications

- **FR31:** System automatically detects communes matching criteria but with zero current offers
- **FR32:** System enrolls users in Ghost Monitoring for communes with zero offers
- **FR33:** System notifies users when Ghost Monitoring is activated for a commune
- **FR34:** System scans for new offers daily for all Ghost Monitored communes
- **FR35:** System sends email notifications when new matching offers appear
- **FR36:** Users can opt-out of Ghost Monitoring for specific communes
- **FR37:** System automatically stops Ghost Monitoring after 30 days
- **FR38:** System includes unsubscribe link in all Ghost Monitoring emails (RGPD compliance)

---

### 6. Session & Favorites Management

- **FR39:** System persists conversation sessions across page reloads
- **FR40:** Users can view history of past conversations
- **FR41:** Users can save communes to favorites list
- **FR42:** Users can view their saved favorite communes
- **FR43:** Users can remove communes from favorites list
- **FR44:** System maintains user preferences across sessions

---

### 7. Monitoring & Observability

- **FR45:** System tracks all LLM API calls with associated costs (Langfuse)
- **FR46:** System traces complete conversation flows with parent/child relationships
- **FR47:** Operators (Gabriel) can view dashboard of conversation metrics
- **FR48:** Operators can view aggregated LLM costs per conversation and per day
- **FR49:** Operators can view p95 latency metrics for conversations
- **FR50:** System sends alerts when cost thresholds exceeded (>€10/day)
- **FR51:** System logs all errors with structured context (user_id, conversation_id, timestamp)
- **FR52:** Operators can query logs to debug issues

---

## Non-Functional Requirements

Ces exigences définissent **comment le système doit performer** - qualité, performance, sécurité, scalabilité. Seules les catégories pertinentes pour Bienvenue sont documentées.

---

### Performance

**NFR-P1: Response Time - Conversation**
- User messages receive first agent response chunk within 1 second (streaming)
- Complete conversation turn completes within 5 seconds (p95 latency)

**NFR-P2: Response Time - Recommendations**
- System generates top 10 commune recommendations within 5 seconds (p95)
- Target breakdown: Vector search <50ms, SQL filtering <20ms, enrichment <15ms

**NFR-P3: Frontend Load Time**
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s
- Lighthouse score > 90 on public pages

**NFR-P4: Map Rendering**
- Interactive map ready <1s after page load
- Markers rendered (viewport-based) <500ms
- Pan/zoom responsive at 60 FPS

**NFR-P5: Database Query Performance**
- Vector search (35K communes) < 50ms (p95)
- SQL filtering queries < 20ms (p95)
- No queries exceed 100ms (p99)

---

### Security

**NFR-S1: Authentication**
- All API endpoints require valid JWT authentication
- JWT tokens validated with Supabase public key (JWKS)
- Token expiration: 1 hour maximum
- Refresh tokens managed by Supabase

**NFR-S2: Authorization**
- Users can only access their own conversations and favorites
- 403 Forbidden returned for unauthorized access attempts
- Audit logging of all access denials

**NFR-S3: Data Encryption**
- All data encrypted at rest (PostgreSQL encryption)
- All data encrypted in transit (HTTPS/TLS 1.3+)
- JWT tokens never exposed in URLs or logs

**NFR-S4: Rate Limiting**
- Conversation: 100 messages/hour per user (global window)
- Conversation: 10 messages/minute per user (burst protection)
- LLM cost cap: €0.50/day per user
- Ghost Monitoring: 10 communes max per user
- Global: 500 concurrent WebSocket connections

**NFR-S5: RGPD Compliance**
- Users can delete all their data (right to erasure)
- Conversations auto-delete after 90 days inactivity
- All emails include unsubscribe link
- No PII in logs or traces (user_id hashed if needed)
- Privacy policy accessible

**NFR-S6: Secure Identifiers**
- All resource IDs use UUID v4 (random, not sequential)
- No predictable IDs exploitable for enumeration attacks

---

### Scalability

**NFR-SC1: User Capacity**
- System supports 30 concurrent WebSocket users (MVP with VPS 8GB)
- System supports 100 concurrent users with Supabase Pro upgrade
- Horizontal scaling possible without code changes (stateless architecture)

**NFR-SC2: Database Connections**
- Connection pooling via PgBouncer (transaction mode)
- Capacity: 60 connections (Supabase Free) or 200 (Pro)
- Connections released between messages (not held per WebSocket)

**NFR-SC3: Growth Handling**
- System maintains <5s latency with 10x user growth (30 → 300 users)
- Performance degradation <10% under 2x capacity (60 concurrent users)
- Cost per user remains <€0.20 at 1000 active users/month

**NFR-SC4: Data Volume**
- System handles 35K communes without performance degradation
- System handles 10K+ conversation history without query slowdown
- Database queries remain <100ms with 100K+ job/housing offers

---

### Reliability

**NFR-R1: Uptime**
- System uptime >95% (target >99% post-MVP)
- Maximum 3.6 hours downtime per month tolerated (MVP)
- Planned maintenance windows communicated 24h advance

**NFR-R2: Error Handling**
- All errors logged with structured context (user_id, conversation_id, timestamp)
- Critical errors trigger alerts within 5 minutes
- User-facing errors provide actionable messages (no stack traces)
- System degrades gracefully (no complete failures)

**NFR-R3: Data Integrity**
- Conversation sessions persist across crashes
- User favorites survive system restarts
- Ghost Monitoring subscriptions survive outages
- Database transactions ensure consistency (ACID compliance)

**NFR-R4: Recovery Time**
- System recovers from crashes within 2 minutes (automatic restart)
- Database backup/restore tested monthly
- Rollback procedures documented and tested

---

### Integration

**NFR-I1: LLM API Reliability**
- System handles LLM API failures gracefully (retry with exponential backoff)
- Fallback to alternative LLM provider if primary fails (OpenAI → Anthropic)
- User notified if both LLM providers unavailable
- Maximum 3 retry attempts before failing request

**NFR-I2: External APIs (Job/Housing Offers)**
- Scraping failures logged but don't block user searches
- Stale data acceptable (up to 7 days old for MVP)
- System continues functioning with partial data
- Ghost Monitoring compensates for missing real-time data

**NFR-I3: Email Delivery**
- Email notifications delivered within 15 minutes of trigger
- Delivery rate >95% (via Resend/SendGrid)
- Bounce/spam complaints monitored
- Unsubscribe processed within 24 hours

**NFR-I4: Monitoring Integration**
- Langfuse traces 100% of LLM calls (no sampling)
- PostHog events tracked for all user actions
- Cost tracking accurate within 5% (validated monthly)
- Alerts delivered via Slack/Email within 5 minutes

---

### Observability

**NFR-O1: Logging**
- All errors logged with severity (DEBUG/INFO/WARN/ERROR/CRITICAL)
- Structured JSON logs with consistent schema
- Logs queryable for debugging (searchable by user_id, conversation_id)
- No sensitive data in logs (PII, tokens, passwords)

**NFR-O2: Tracing**
- All conversations traced end-to-end in Langfuse
- Parent/child relationships visible (Agent calls, Tool calls)
- Latency breakdown visible per step
- Costs calculated per conversation

**NFR-O3: Metrics Dashboard**
- Dashboard shows real-time metrics (refresh every 5 minutes)
- Metrics: conversations count, engagement rate, LLM costs, latency p95, error rate
- Dashboard accessible to operators (Gabriel)
- Historical data retained 90 days minimum

**NFR-O4: Alerting**
- Critical alerts (error rate >5%, costs >€10/day, latency >10s) via Slack + Email
- Warning alerts (latency >7s, connections >80%) via Slack
- Alerts actionable (include links to dashboard/logs)
- False positive rate <5% (alerts tuned)

---

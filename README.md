# Bienvenue

**Trouvez l'endroit où votre vie s'épanouit.**

Bienvenue is a platform that helps people discover comprehensive "new life opportunities" in France by combining three essential lifestyle dimensions: housing, employment, and hobbies.

## The Problem

When people want to relocate or start a new chapter in their lives, they face a fragmented experience:

- **Apartment hunting** on one platform
- **Job searching** on another
- **Researching local activities** through countless Google searches
- **No way to visualize** how these pieces fit together geographically

This leads to hours of research without ever getting a clear picture of what life could actually look like in a new place.

## The Solution

Bienvenue brings everything together in one interactive experience:

1. **Describe what you're looking for** in natural language (e.g., "I'm looking for a tech job in the south with a budget of 900€/month")
2. **Explore possibilities on an interactive map** showing matching opportunities
3. **See the full picture** — each opportunity shows housing, work, and leisure activities connected on the map

### Key Features

- **Natural language search** — Just describe what you want like you're talking to a friend
- **Interactive map visualization** — See France covered with life opportunities
- **Connected solutions** — Each opportunity shows housing, job, and hobbies as a connected triangle
- **Smart filtering** — Filter by job sector, budget, location, city size, hobbies, and more
- **Detailed housing cards** — Photos, prices, ratings, and reviews at a glance

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   "Je cherche un job en tech dans le sud"                   │
│                                                             │
│   ┌─────────────────┐    ┌─────────────────────────────┐   │
│   │                 │    │           MAP               │   │
│   │   Chat avec     │    │                             │   │
│   │   l'Assistant   │    │    🔵 ─────── 🏠            │   │
│   │   Bienvenue     │    │    │╲                       │   │
│   │                 │    │    │ ╲                      │   │
│   │                 │    │    💼 ─── 🎨                │   │
│   │                 │    │                             │   │
│   └─────────────────┘    └─────────────────────────────┘   │
│                                                             │
│   🔵 Main location   🏠 Housing   💼 Work   🎨 Hobbies     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

1. **Share your preferences** — Tell us about your ideal lifestyle, job, budget, and interests
2. **Explore the map** — Watch as matching opportunities appear across France
3. **Dive into details** — Click any marker to see housing photos, job details, and nearby activities
4. **Visualize your future life** — See how housing, work, and leisure connect geographically

## Tech Stack

- **Frontend:** SvelteKit 2 with Svelte 5 runes
- **Backend:** NestJS API
- **Database:** Supabase (PostgreSQL)
- **Maps:** Leaflet with marker clustering
- **UI:** shadcn-svelte components
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Project Structure

```
bienvenue/
├── apps/
│   ├── web/          # SvelteKit frontend
│   └── api/          # NestJS backend
├── packages/
│   └── shared/       # Shared types and utilities
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (recommended) or npm
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bienvenue.git
cd bienvenue

# Install dependencies
bun install

# Set up environment variables
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
# Edit .env files with your Supabase credentials

# Start development servers
bun run dev
```

### Available Commands

```bash
bun run dev           # Start development server
bun run build         # Production build
bun run preview       # Preview production build
bun run check         # Type-check with svelte-check
bun run lint          # Check formatting and lint
bun run format        # Auto-format all files
bun run test:unit     # Run unit tests
bun run test:e2e      # Run E2E tests
bun run test          # Run all tests
```
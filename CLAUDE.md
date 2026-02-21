# CLAUDE.md — KidStream

Project-specific instructions for Claude Code when working in this repository.

## Project Overview

KidStream is a kid-safe, unified content discovery PWA. It aggregates content from YouTube, Shorts, Reels, and image sources into a single personalized feed with deduplication, safety filtering, and preference-based ranking.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **State:** Zustand (persisted to localStorage)
- **Routing:** React Router v6
- **Backend:** Node.js + Express + TypeScript
- **Monorepo:** npm workspaces (client/, server/, shared/)
- **PWA:** Vite PWA plugin

## Project Structure

```
client/           # React frontend (Vite + TS + Tailwind)
  src/
    components/   # Shared UI components (Layout, ContentCard, ContentViewer, PlatformFilter)
    pages/        # Route pages (FeedPage, ExplorePage, ProfilePage, ParentDashboard, OnboardingPage)
    store/        # Zustand stores (userStore, feedStore)
    services/     # API client layer
    data/         # Demo/mock content data
server/           # Express backend (TS)
  src/
    routes/       # API route handlers (feed, kids, signals)
    services/     # Business logic
      aggregator/ # Platform-specific content fetchers (youtube, shorts, reels, images)
      dedup/      # Content deduplication pipeline
      safety/     # Content safety filtering
      preference/ # Preference-based ranking engine
shared/           # Shared TypeScript types between client and server
  src/types.ts    # ContentItem, KidProfile, FeedRequest/Response, etc.
```

## Commands

```bash
npm install            # Install all workspace dependencies
npm run dev            # Start both client (port 5173) and server (port 3001)
npm run dev:client     # Start frontend only
npm run dev:server     # Start backend only
npm run build          # Production build (shared → client → server)
npm run test           # Run tests across workspaces
```

## Key Entry Points

- `client/src/main.tsx` — Frontend entry point
- `server/src/index.ts` — Backend entry point (Express server)
- `shared/src/types.ts` — Shared type definitions

## API Endpoints

- `GET  /api/health` — Health check
- `GET  /api/feed?kidProfileId=&platforms=&limit=&cursor=` — Aggregated content feed
- `GET  /api/kids/:id` — Kid profile
- `POST /api/signals` — Track user interaction signals (like, skip, watch)

## Coding Conventions

- TypeScript strict mode everywhere
- Functional React components with hooks (no class components)
- Zustand for state management — userStore is the single source of truth for user state
- Tailwind CSS for styling — no CSS modules or styled-components
- Mobile-first responsive design
- Import shared types from `@kidstream/shared/src/types`
- Platform fetchers in `server/src/services/aggregator/` return `ContentItem[]`
- Content pipeline: aggregate → deduplicate → safety filter → rank by preference

## Important Notes

- Vite dev server binds to `0.0.0.0` (configured in `client/vite.config.ts`) for network access
- User state is persisted to localStorage via Zustand `persist` middleware (key: `kidstream-user`)
- The onboarding flow gates all routes — users must complete it before accessing the app
- Demo content lives in `client/src/data/demoContent.ts` — replace with real API calls when integrating platform APIs
- Parent dashboard supports optional PIN lock
- Environment variables are documented in `.env.example`

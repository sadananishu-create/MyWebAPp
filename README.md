# KidStream

A safe, unified content discovery platform for kids. Aggregates content from multiple sources (YouTube, Shorts, Reels, image platforms), deduplicates it, filters for age-appropriateness, and presents a single personalized feed based on the child's interests.

## Key Features

- **Multi-Platform Aggregation** — Pulls content from YouTube, YouTube Shorts, Instagram Reels, and image sources into one feed
- **Smart Deduplication** — Detects and removes duplicate/near-duplicate content across platforms
- **Kid-Safe Filtering** — Age-based content filtering with parental controls
- **Preference Engine** — Learns what each child likes and surfaces relevant content
- **Unified Feed** — Single scrollable feed with consistent UI regardless of source platform
- **Parental Dashboard** — Parents manage profiles, set content rules, and review activity
- **PWA + Mobile** — Works as a responsive web app and installable mobile PWA

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS |
| State | Zustand |
| Routing | React Router v6 |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL (users, preferences) + Redis (caching, dedup) |
| Content APIs | YouTube Data API, Instagram Basic Display API, custom scrapers |
| AI/ML | Content similarity (dedup), preference scoring, safety classification |
| Auth | JWT + OAuth 2.0 (parent accounts) |
| PWA | Workbox (service worker, offline support) |
| Testing | Vitest (unit), Playwright (e2e) |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   KidStream Client                  │
│              (React PWA — Web + Mobile)             │
│                                                     │
│  ┌───────────┐ ┌───────────┐ ┌────────────────┐    │
│  │ Kid Feed  │ │ Explore   │ │ Parent Portal  │    │
│  │ (unified) │ │ (search)  │ │ (dashboard)    │    │
│  └───────────┘ └───────────┘ └────────────────┘    │
└──────────────────────┬──────────────────────────────┘
                       │ REST / WebSocket
┌──────────────────────▼──────────────────────────────┐
│                  KidStream API                       │
│               (Node + Express + TS)                  │
│                                                      │
│  ┌────────────┐ ┌────────────┐ ┌────────────────┐   │
│  │ Content    │ │ Preference │ │ Safety         │   │
│  │ Aggregator │ │ Engine     │ │ Filter         │   │
│  └─────┬──────┘ └────────────┘ └────────────────┘   │
│        │                                             │
│  ┌─────▼──────┐                                      │
│  │ Dedup      │                                      │
│  │ Pipeline   │                                      │
│  └────────────┘                                      │
└──────────────────────┬──────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ YouTube  │  │ Instagram│  │ Other    │
  │ Data API │  │ API      │  │ Sources  │
  └──────────┘  └──────────┘  └──────────┘
```

## Project Structure

```
├── client/                  # React frontend (Vite + TS)
│   ├── public/
│   │   ├── manifest.json    # PWA manifest
│   │   └── sw.js            # Service worker
│   ├── src/
│   │   ├── components/      # Shared UI components
│   │   ├── pages/           # Route-level pages
│   │   ├── store/           # Zustand state stores
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API client layer
│   │   ├── types/           # TypeScript types
│   │   └── App.tsx          # Root component
│   └── index.html
├── server/                  # Express backend (TS)
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── services/        # Business logic
│   │   │   ├── aggregator/  # Platform-specific fetchers
│   │   │   ├── dedup/       # Deduplication pipeline
│   │   │   ├── safety/      # Content safety checks
│   │   │   └── preference/  # Recommendation engine
│   │   ├── models/          # DB models
│   │   ├── middleware/       # Auth, rate-limit, etc.
│   │   └── index.ts         # Server entry point
│   └── tsconfig.json
├── shared/                  # Shared types between client/server
│   └── types.ts
└── package.json             # Workspace root
```

## Getting Started

```bash
npm install          # install all dependencies
npm run dev          # start both client + server in dev mode
npm run dev:client   # start only frontend
npm run dev:server   # start only backend
npm run build        # production build
npm run test         # run tests
```

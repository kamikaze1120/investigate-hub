# DREADFLIX

Recruiter-facing showcase for a large-scale investigative archive UI built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

**Live Preview:** [DREADFLIX Preview](https://id-preview--f124a84b-b27a-453f-8dd5-556a7b5d405e.lovable.app)

## Executive Summary

DREADFLIX is a cinematic, streaming-inspired intelligence interface for exploring large public-record datasets. The project focuses on high-volume browsing, entity-centric navigation, deterministic data presentation, and fast movement between interconnected records.

This build demonstrates:

- **Frontend architecture for large datasets**
- **Design systems and themed UX execution**
- **Cross-linked entity browsing**
- **Responsive motion design and immersive content presentation**
- **Data quality remediation in generated archive interfaces**

## Dataset Scale Demonstrated

| Domain | Indexed Volume |
| --- | ---: |
| Documents | 248,192 |
| Individuals | 21,847 |
| Flight Records | 1,826 |
| Video Entries | 1,826 |

## What Recruiters Should Notice

### Product Thinking
- Reframed a static archive into a **streaming-style browse experience** inspired by modern content platforms.
- Improved discovery with **homepage shelves, quick-pick navigation, and continuous horizontal browsing**.
- Designed around a clear audience: users who need to move quickly between **people, documents, flights, and media evidence**.

### Frontend Engineering
- Built with **component-driven React architecture** and reusable page/card primitives.
- Used **deterministic generators** to create stable large-scale mock datasets for repeatable UI behavior.
- Added **deep-linkable archive navigation** for documents, profiles, and flight references.
- Preserved performance by avoiding naïve rendering patterns for large record counts.

### Data Integrity Work
- Audited duplicate and missing data behavior across the archive views.
- Corrected broken profile-level routing to related documents, flights, and connected individuals.
- Standardized portrait fallbacks so non-photo profiles still render consistently.
- Reduced repeated media mapping issues in the generated video source model.

## Core Experience Areas

- **Homepage browse system** with curated shelves and streaming-style discovery
- **Person profiles** with documents, timeline events, flights, videos, and relationship links
- **Document archive** with type filters, search, and deep links
- **Flight explorer** with passenger-to-profile navigation
- **Video library** with thumbnails, playback modal, and related-person access

## Technical Stack

| Layer | Implementation |
| --- | --- |
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3 |
| UI Foundation | shadcn/ui |
| Motion | Framer Motion |
| Icons | Lucide React |
| Routing | React Router |

## Architecture Notes

### Deterministic Data Layer
The application uses seeded generation patterns so large synthetic datasets remain stable across reloads, previews, and environments. This allows the interface to simulate real archive scale while keeping behavior predictable for QA and design iteration.

### Entity-Centric Navigation
People act as the connective tissue of the product. From a single profile, users can pivot into associated documents, flight records, video evidence, and linked profiles.

### Media Fallback Strategy
The app blends a limited local real-media set with deterministic generated portraits and generated thumbnails to keep the interface visually complete even when source assets are sparse.

## Project Structure

```text
src/
  components/       Reusable UI, rows, cards, modals, nav, hero modules
  data/             Archive datasets, generators, enrichment logic
  lib/              URL helpers and media utilities
  pages/            Route-level archive experiences
  test/             Vitest setup and example test coverage
public/
  photos/           Real local portrait assets for key individuals
  videos/           Local clip assets and supporting media
```

## Local Development

```bash
npm install
npm run dev
```

## Deployment Workflow

This project is edited and previewed in Lovable, with GitHub sync handled through the platform integration.

## Important Note

This version is a **frontend portfolio/demo build**. The archive scale and many relationships are represented through deterministic generated data rather than a live production ingestion pipeline.

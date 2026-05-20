# DREADFLIX Archive

A large-scale investigative data archive built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS**. This frontend powers a searchable, browsable repository of public-record documents, flight logs, video evidence, and person profiles.

**Live Preview:** [https://id-preview--f124a84b-b27a-453f-8dd5-556a7b5d405e.lovable.app](https://id-preview--f124a84b-b27a-453f-8dd5-556a7b5d405e.lovable.app)

---

## Project Overview

DREADFLIX is a data-dense investigative platform handling hundreds of thousands of indexed records. It demonstrates frontend engineering at scale: virtualized lists, deterministic data generation, deep-linking, and a fully responsive dark-mode UI.

| Dataset | Records |
|---------|---------|
| Documents | 248,192 |
| Individuals | 21,847 |
| Flight Logs | 1,826 |
| Video Evidence | 1,826 |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + Vite |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |

---

## Key Features

- **Global Search** — Full-text autocomplete with dataset-scoped filters
- **Person Profiles** — Consolidated timelines, flight logs, document references, and relationship graphs
- **Video Evidence Library** — Time-offset mapped video player with unique SVG thumbnails
- **Flight Log Explorer** — Searchable, filterable aviation record grid
- **Document Archive** — Paginated, deep-linkable record browser
- **Connection Radar** — D3.js-powered relationship visualization
- **Responsive Dark Mode** — Cinematic Netflix-style UI optimized for desktop and mobile

---

## Architecture Highlights

- **Deterministic Data Generation** — Seeded PRNG engine produces consistent, non-repeating portraits, thumbnails, and mock datasets across reloads and environments.
- **Virtualized Pagination** — Large datasets (200k+ documents) are queried and rendered efficiently without crashing the DOM.
- **Deep-Linking** — URLSearchParams drive filtered views (e.g., `/flights?name=...`) so any state is shareable.
- **Modular Asset Pipeline** — Local SVG avatar generation and time-offset video URLs eliminate external API dependencies and broken-image risk.
- **Component-Driven UI** — Shared cards, modals, and layout primitives built on shadcn/ui for rapid iteration.

---

## Project Structure

```
src/
  pages/                  Route-level views (archive, profiles, grids)
  components/             Shared UI (cards, modals, search, stats)
  data/
    mockData.ts           Primary generated datasets
    allIndividuals.ts     Full 21k+ people index
    allDocuments.ts       Paged document querying
    profileEnrichment.ts  Deterministic profile metadata
  lib/
    archiveLinks.ts       URL helpers for in-app deep links
    personMedia.ts        SVG portrait generation utilities
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

---

## Deployment

The project is deployed via the Lovable platform. To sync changes to the connected GitHub repository, use the **Plus (+) menu → GitHub** integration in the Lovable editor.

---

## License

This project is a frontend demonstration. All data is procedurally generated for UI/UX showcase purposes.

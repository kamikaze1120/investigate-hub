# DREADFLIX Archive

Investigative archive frontend built with React, Vite, TypeScript, shadcn-ui, and Tailwind CSS.

## Current app behavior

- **Documents indexed:** 248,192
- **Individuals indexed:** 21,847
- **Flight logs indexed:** 1,826
- **Videos indexed:** 1,826

## What was fixed in this revision

- Aligned homepage and index counts with the actual generated datasets
- Replaced repeated remote avatar generation with deterministic local SVG portraits
- Fixed document source links so archive entries open into searchable in-app record views
- Fixed flight-log deep links so person profiles can jump to matching flight references
- Updated video modal behavior so records keep their mapped media offset instead of resetting to the same frame

## Project structure

- `src/pages/` — archive pages and profile views
- `src/components/` — shared UI components
- `src/data/mockData.ts` — primary generated archive datasets
- `src/data/allIndividuals.ts` — complete indexed people list
- `src/data/allDocuments.ts` — paged document querying for the full archive size
- `src/data/profileEnrichment.ts` — deterministic profile enrichment for documents, flights, timeline, and connections
- `src/lib/archiveLinks.ts` — in-app source/deep-link helpers
- `src/lib/personMedia.ts` — deterministic portrait generation helpers

## Local development

```sh
npm install
npm run dev
```

## Publishing / GitHub

- Use the connected GitHub integration to sync and push repository changes
- Publish from the Lovable Share/Publish flow when you are ready to ship

<p align="center">
  <img src="./.github/readme/hero.svg" width="100%" alt="DREADFLIX — a streaming-style archive browser built with React, TypeScript and Vite">
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&amp;weight=600&amp;size=18&amp;duration=2600&amp;pause=700&amp;color=F4C65A&amp;center=true&amp;vCenter=true&amp;width=850&amp;height=42&amp;lines=A+Netflix-style+shell+for+browsing+a+record+archive.;Profiles%2C+documents%2C+flights%2C+timeline+and+video+%E2%80%94+cross-linked.;Seeded+generators+keep+a+248%2C192-row+archive+stable+on+reload.;Frontend+demo+%E2%80%94+no+backend%2C+no+live+ingestion." alt="Typing summary of DREADFLIX">
</p>

<p align="center">
  <a href="https://github.com/kamikaze1120/investigate-hub/commits/main"><img src="https://img.shields.io/github/last-commit/kamikaze1120/investigate-hub?style=for-the-badge&amp;labelColor=15103A&amp;color=F4C65A" alt="Last commit"></a>
  <img src="https://img.shields.io/github/languages/top/kamikaze1120/investigate-hub?style=for-the-badge&amp;labelColor=15103A&amp;color=BD3CFF" alt="Top language">
  <img src="https://img.shields.io/badge/React-18-CB55FF?style=for-the-badge&amp;logo=react&amp;logoColor=white&amp;labelColor=15103A" alt="React 18">
  <img src="https://img.shields.io/badge/Vite-5-F4C65A?style=for-the-badge&amp;logo=vite&amp;logoColor=white&amp;labelColor=15103A" alt="Vite 5">
</p>

**DREADFLIX** (repo: `investigate-hub`) is a cinematic, streaming-inspired interface for exploring a large investigative record archive. It treats people as the connective tissue: from any profile you can jump to the documents, flights, timeline events, videos and other people linked to it, and every list is searchable, filterable and deep-linkable. It is a **frontend portfolio build** — the archive is a small curated set plus deterministic, seeded generated records, not a live data pipeline.

<p align="center"><sub><code>REACT 18</code> ✦ <code>TYPESCRIPT</code> ✦ <code>FRAMER MOTION</code> ✦ <code>DEEP LINKS</code> ✦ <code>SEEDED DATA</code> ✦ <code>NO BACKEND</code></sub></p>

<h2 align="center">✦ THE EXPERIENCE ✦</h2>
<p align="center"><sub>SEVEN ROUTES · ONE CONNECTED ARCHIVE</sub></p>

<table>
  <tr>
    <td width="33%" valign="top">🎬 <b>Streaming home</b><br><sub>Animated hero stats, category tiles, quick actions and horizontal shelves of people, documents, flights and video.</sub></td>
    <td width="33%" valign="top">🧑‍💼 <b>Person profiles</b><br><sub><code>/person/:id</code> collects linked documents, flights, timeline events, videos and connections for one individual.</sub></td>
    <td width="33%" valign="top">📄 <b>Document archive</b><br><sub>Type filters + text search over the full index, 60 per page, reading filters from both the URL and router state.</sub></td>
  </tr>
  <tr>
    <td valign="top">✈️ <b>Flight explorer</b><br><sub>Search by route, location or passenger; every passenger chip links to their profile.</sub></td>
    <td valign="top">🎞️ <b>Video library</b><br><sub>Thumbnails, a playback modal and links to the people referenced in each entry.</sub></td>
    <td valign="top">🕰️ <b>Timeline</b><br><sub>Chronological events, each tagged with the people it involves.</sub></td>
  </tr>
  <tr>
    <td valign="top">🔎 <b>Global search</b><br><sub>Navbar search across documents, people and flights, plus quick-pick shortcuts.</sub></td>
    <td valign="top">⚖️ <b>Disclaimer gate</b><br><sub>A first-visit legal notice (remembered in <code>localStorage</code>): a name appearing does not imply wrongdoing.</sub></td>
    <td valign="top">🖼️ <b>Media fallbacks</b><br><sub>Deterministic generated portraits and thumbnails keep every card visually complete when no local asset exists.</sub></td>
  </tr>
</table>

<h2 align="center">◈ HOW IT'S BUILT ◈</h2>
<p align="center"><sub>A CLIENT-ONLY APP WITH A SEEDED DATA LAYER</sub></p>

```mermaid
flowchart LR
  subgraph Data["src/data · deterministic data layer"]
    CUR["Curated records<br/>mockData.ts"]
    GEN["Seeded generators<br/>allIndividuals · allDocuments"]
    ENR["profileEnrichment.ts<br/>seeded PRNG"]
  end
  subgraph Lib["src/lib"]
    LINKS["archiveLinks.ts<br/>deep-link builders"]
    MEDIA["personMedia.ts<br/>portrait fallbacks"]
  end
  subgraph Routes["React Router routes"]
    HOME["/ · streaming home"]
    LISTS["/documents · /individuals<br/>/flights · /videos · /timeline"]
    PROFILE["/person/:id"]
  end
  CUR --> GEN --> LISTS
  CUR --> HOME
  ENR --> PROFILE
  MEDIA --> PROFILE
  MEDIA --> LISTS
  LINKS --> LISTS
  PROFILE <-->|deep links| LISTS
  ASSETS[("public/<br/>photos · clips · thumbnails")] --> MEDIA
  classDef gold fill:#1d1732,stroke:#F4C65A,color:#ffe7a2
  classDef violet fill:#160f38,stroke:#BD3CFF,color:#f0d7ff
  classDef red fill:#2a0b18,stroke:#ff4a5c,color:#ffd3d8
  class CUR,GEN,ENR gold
  class LINKS,MEDIA violet
  class HOME,LISTS,PROFILE red
  class ASSETS gold
```

<details>
<summary><b>What the numbers on screen actually are</b></summary>

| Shown as | Where it comes from |
|---|---|
| Documents indexed — 248,192 | `TOTAL_DOCUMENTS_INDEXED` in `src/data/allDocuments.ts`. A few curated entries, then records are **generated on demand per page** by index, so the full set is never held in memory. |
| Individuals referenced — 21,847 | `allIndividuals.ts`: curated top profiles plus names built from first/last-name pools with `seededRandom(42)`. |
| Flight records — 1,826 | `TOTAL_FLIGHT_LOGS` in `mockData.ts`: curated logs plus generated routes between a fixed airport list. |
| Video entries | `TOTAL_RELEASED_VIDEOS` = the number of bundled clips (37 in `public/videos`). |

Every generated value is seeded, so lists, profiles and links are identical on every reload — useful for QA and design iteration, and the reason the counts should be read as UI scale tests, not facts about any real archive.

</details>

<h2 align="center">◆ TECH STACK ◆</h2>
<p align="center"><sub>FROM <code>package.json</code></sub></p>

<p align="center">
  <img src="https://skillicons.dev/icons?i=ts,react,vite,tailwind,vitest&amp;theme=dark" alt="TypeScript, React, Vite, Tailwind CSS, Vitest">
</p>

| Layer | What's used |
|---|---|
| Framework | React 18 + Vite 5 (SWC plugin), TypeScript 5 |
| Routing / data | React Router 6, TanStack Query 5 |
| UI | Tailwind CSS 3, shadcn/ui on Radix primitives, Lucide icons |
| Motion | Framer Motion 12 |
| Tests | Vitest + Testing Library setup (one placeholder test), Playwright config |

<h2 align="center">✦ RUN IT LOCALLY ✦</h2>
<p align="center"><sub>NO KEYS · NO ENV FILE · NO BACKEND</sub></p>

```bash
git clone https://github.com/kamikaze1120/investigate-hub.git
cd investigate-hub
npm install
npm run dev
```

Open the URL Vite prints. The repo is ~145 MB because the video clips live in `public/videos` — a partial clone (`git clone --filter=blob:none …`) keeps the first download lighter.

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run build:dev` | Development-mode build |
| `npm run preview` | Serve the built app |
| `npm run lint` | ESLint |
| `npm test` | Vitest, single run (`npm run test:watch` for watch mode) |

<h2 align="center">◈ PROJECT MAP ◈</h2>
<p align="center"><sub>WHERE THINGS LIVE</sub></p>

<details>
<summary><b>Folder tree</b></summary>

```text
investigate-hub/
├─ src/
│  ├─ App.tsx              routes: /, /person/:id, /individuals, /documents,
│  │                       /videos, /timeline, /flights, 404
│  ├─ pages/               route-level views (Index, PersonProfile, All*)
│  ├─ components/          Navbar, HeroStats, HubTiles, ContentRow, cards,
│  │                       VideoModal, DisclaimerModal, ui/ (shadcn)
│  ├─ data/                types, curated records, seeded generators, enrichment
│  ├─ lib/                 archiveLinks (deep links), personMedia (portraits)
│  └─ test/                Vitest setup + example test
├─ public/
│  ├─ photos/              local portrait images
│  └─ videos/              clips/ and thumbnails/
└─ memory.md               change log of the last data-quality pass
```

</details>

<h2 align="center">◆ SCOPE &amp; HONESTY ◆</h2>
<p align="center"><sub>READ THIS BEFORE QUOTING ANYTHING FROM THE APP</sub></p>

- This is a UI/UX and frontend-architecture demo. Most records, titles, summaries and relationships are **generated placeholders** so the interface can be exercised at scale; video entries reuse a small local clip library.
- Nothing in the app is a source of record. Do not cite it as evidence about any person — the in-app disclaimer applies: appearing in the archive does not imply wrongdoing.
- Known constraints are tracked in [`memory.md`](memory.md).

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&amp;weight=500&amp;size=14&amp;duration=3200&amp;pause=900&amp;color=CB55FF&amp;center=true&amp;vCenter=true&amp;width=520&amp;height=28&amp;lines=%E2%97%89+archive+online+%2F%2F+press+play" alt="archive online">
  <br>
  <sub><code>◉ DREADFLIX // GILDED ORBIT</code> · built by <a href="https://github.com/kamikaze1120">kamikaze1120</a></sub>
</p>

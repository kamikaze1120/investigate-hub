# Project Change Memory

## Last remediation pass

- Audited runtime signals, route wiring, dataset generators, profile enrichment, and media assets.
- Confirmed the app renders without current runtime errors, but data quality issues were caused by deterministic mock generators and repeated clip reuse.
- Reworked video source mapping so entries no longer collapse onto the same exact source URL pattern as often, and excluded one known duplicate clip asset from rotation.
- Normalized person media usage so profile connections and detail views consistently use deterministic unique portraits when no local photo exists.
- Fixed profile-level routing so documents open their archive links, flight entries deep-link into filtered flight results, and connections route to the correct person page.
- Improved browse pages so referenced people on flights and videos are navigable.
- Updated document filtering to read both URL params and router state, preventing mismatched filtered views.
- Remixed homepage discovery flow toward a more streaming-platform browsing experience with stronger browse actions, additional video shelfing, and improved nav quick picks.

## Known data constraints

- The app still uses generated/mock archive data for scale; it does not yet ingest 1:1 source-truth records for every document, person, video, and flight.
- Only 10 local real photos exist in `public/photos`; all other people use deterministic generated portraits.
- Only a limited local clip library exists in `public/videos/clips`, so unique titles/thumbnails can exceed unique underlying master footage.
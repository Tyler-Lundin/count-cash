# PWA Approach (Next.js)

## Goals
- Installable (manifest + icons), offline-capable shell, quick loads.
- Cache static assets and app shell; avoid stale data traps.

## Pieces
- Manifest: `public/manifest.webmanifest` with app name, theme, icons.
- Icons: minimal set (192, 512) to start; can expand later.
- Meta: Link manifest + theme-color in `app/layout.tsx` (or `_document.tsx`).
- Service Worker: Use `next-pwa` for Workbox-powered precache + runtime caching.

## Implementation Outline
1. Install `next-pwa` and configure in `next.config.js`:
   - Enable in production only; disable in dev to avoid SW bugs during iteration.
   - Basic runtime caching for images and same-origin fetches.
2. Add `public/manifest.webmanifest` and icon set.
3. Add metadata in the root layout or document (name, theme-color, apple meta).
4. Verify: Lighthouse PWA checks, offline loads primary route, install works.

## Caching Strategy
- Precache: JS, CSS, static assets.
- Runtime: cache-first for images, stale-while-revalidate for pages/data.
- SW update flow: Show a toast when a new version is available and allow reload.

## Data Storage
- Counts + float stored in `localStorage`. No network dependency in v1.

## Notes
- Next 13+/App Router works fine with `next-pwa` (latest). We’ll gate SW in prod.
- If avoiding a plugin, a custom SW is possible but adds complexity; plugin is preferred for v1 velocity.

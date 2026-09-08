# Brooks Geospatial

A static Astro website for Brooks Geospatial’s GIS mapping, spatial analysis, drone imagery, commercial media, and site documentation work in Central Texas.

## Development

Use Node.js 20.19.5 or newer.

```sh
npm install
npm run dev
```

## Checks

```sh
npm run format:check
npm run lint
npm test
npm run check
npm run build
```

## Content

- `src/data/site.mjs`: public contact details and metadata.
- `src/data/projects.mjs`: portfolio copy, categories, imagery, and galleries.
- `CONTENT-SOURCES.md`: recovered source history and attribution.
- `scripts/restore-portfolio.mjs`: reproducible image recovery from the original Git history and globe geography preparation.
- `src/lib/globe.ts`: interactive Three.js globe. Supports dragging, keyboard arrows, pause/resume, reduced motion, and a static fallback when WebGL is unavailable. Pauses outside the viewport.
- Photos are served locally as optimized WebP files; fonts and globe geography are hosted locally.
- The contact form retains the existing FormSubmit endpoint with native validation fallback, bounded request timeout, and a direct email alternative. Live delivery depends on the existing recipient activation at FormSubmit.

## Deployment

The existing GitHub Actions workflow builds `dist/` and publishes it to GitHub Pages after a push to `main`. The company’s domain and hosting arrangement are preserved.

Old AI/evaluation routes and `/projects` use static redirect pages to the new services and portfolio, since GitHub Pages does not support repository-level HTTP redirect rules. Redirect pages are excluded from the sitemap. `/portfolio` and `/commercial-drone-media` are full pages again.

Unselected legacy assets, client proposals, and private source files stay in `private/` and are not published.

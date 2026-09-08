# Content and image sources

The September 2026 redesign restores the geospatial and drone focus explicitly requested by the site owner.

- Repository: https://github.com/BrooksGeo/BrooksGeospatial
- Original content and image source: commit `0a898a5` (before the legacy-media removal and AI evaluation update).
- `src/pages/about.astro` at that commit supplies the founder’s geography, market research, GIS, and FAA Part 107 background.
- The original homepage supplies GIS mapping, aerial imagery, and utility/site documentation services.
- The original commercial drone media page supplies the Fayette County service area, media offerings, and country club project description.
- Original portfolio images include parcel/market maps and aerial property imagery. Market study maps retain their original Capitol Market Research branding and are attributed to Mac’s work there.
- `scripts/restore-portfolio.mjs` records the exact original image paths and generates WebP delivery sizes without changing photographic content.
- No client proposals, private documents, or old videos are restored to the public directory.
- The globe uses locally hosted land geometry from the public-domain Natural Earth 1:110m dataset, distributed through `world-atlas`. https://www.naturalearthdata.com/about/terms-of-use/
- Globe connection arcs are illustrative; they do not represent clients, live telemetry, or a claimed service footprint.
- Current public contact address is preserved from `src/data/site.mjs`.

No invented client counts, project results, testimonials, or performance statistics have been added.

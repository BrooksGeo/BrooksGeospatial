# Brooks Geospatial

Static Astro site for Brooks Geospatial, focused on geospatial AI evaluation and GIS quality assurance.

## Local development

```sh
npm install
npm run dev
```

## Quality checks

```sh
npm run format:check
npm run lint
npm test
npm run check
npm run build
```

## Resume downloads

The human-readable resume is available at `/resume`. The PDF and DOCX downloads are generated from the same fact-limited source with:

```sh
npm run generate:resume
```

The download URLs live in `src/data/site.mjs`.

## Content and configuration

- `src/data/site.mjs` contains public contact, social, phone-visibility, metadata, and resume-download settings.
- `src/data/projects.mjs` contains the project cards and static project-detail routes.
- Projects must remain `in-progress` until public, non-confidential evidence supports a `published` status.
- Do not put client documents, branded client maps, or private imagery in `public/`. Legacy material is kept in `private/legacy-assets/` and `private/legacy-source/`, neither of which is deployed.

## Deployment

The GitHub Actions workflow deploys the static `dist/` output to GitHub Pages on pushes to `main`. Review this branch, merge it to `main`, and verify the GitHub Pages deployment.

`/portfolio` and `/commercial-drone-media` use static redirect pages because GitHub Pages does not provide repository-level HTTP 301 rules. If the domain is later placed behind a proxy or another host, configure permanent 301 redirects there for those two paths.

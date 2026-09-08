import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://brooksgeospatial.com",
  devToolbar: { enabled: false },
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return ![
          "/ai-evaluation/",
          "/gis-data-qa/",
          "/projects/",
          "/projects/spatial-data-qa-toolkit/",
          "/projects/geoeval-benchmark/",
          "/projects/texas-geocoder-evaluation/",
        ].includes(pathname);
      },
    }),
  ],
});

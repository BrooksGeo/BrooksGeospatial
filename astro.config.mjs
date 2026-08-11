import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://brooksgeospatial.com",
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !["/portfolio/", "/commercial-drone-media/"].includes(pathname);
      },
    }),
  ],
});

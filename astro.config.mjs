import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Your actual domain name
  site: 'https://brooksgeospatial.com',
  
  // Load the design and 3D engines
  integrations: [tailwind(), react()],
});
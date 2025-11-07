import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://riformula.app',
  output: 'static',
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://aborruso.github.io',
  base: '/in_due_tocchi',
  output: 'static',
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});

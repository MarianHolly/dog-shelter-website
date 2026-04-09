// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),

  vite: {
    // @ts-ignore -- @tailwindcss/vite requires Vite 7; Astro ships Vite 6. Works at runtime.
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'framer-motion': ['framer-motion'],
          },
        },
      },
    },
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },

  site: 'https://utulok-trencin.sk',
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],
});
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import { astroImageTools } from 'astro-imagetools';

// https://astro.build/config
export default defineConfig({
  // base: '.', // Set a path prefix.
  site: 'https://axlc.dev/', // Use to generate your sitemap and canonical URLs in your final build.
  markdown: {
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'monokai',
    },
  },
  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger'],
      exclude: ['lucide-react'],
    },
    ssr: {
      noExternal: ['gsap'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Split Three.js into its own chunk
            three: ['three'],
            // Split scenes into separate chunks
            scenes: [
              './src/scenes/IntroScene.tsx',
              './src/scenes/TechMasteryScene.tsx',
              './src/scenes/SystemBuilderScene.tsx',
              './src/scenes/MentorScene.tsx',
              './src/scenes/InnovatorScene.tsx',
              './src/scenes/FinalScene.tsx',
            ],
            // Split animation utilities
            animations: ['framer-motion'],
            // Split UI components
            ui: ['lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Increase warning limit since we're code splitting
    },
  },
  integrations: [
    react(),
    tailwind({}),
    sitemap(),
    robotsTxt(),
    astroImageTools,
  ],
});

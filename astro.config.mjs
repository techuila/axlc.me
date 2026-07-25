import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://axlc.dev',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      // Colors come from --astro-code-* CSS variables so code blocks
      // follow the site's light/dark theme (see src/styles/global.css).
      theme: 'css-variables',
    },
  },
  integrations: [mdx(), sitemap()],
});

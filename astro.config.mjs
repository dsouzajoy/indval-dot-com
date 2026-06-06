// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Deploy target controls the public base path + canonical site URL.
//   DEPLOY_TARGET=ghpages → GitHub Pages project page (served from a subpath)
//   DEPLOY_TARGET=prod    → production custom domain (served from root)
//   unset (dev)           → local dev server (served from root)
const target = process.env.DEPLOY_TARGET ?? 'dev';

const targets = {
  dev:     { site: 'http://localhost:4321',      base: '/' },
  prod:    { site: 'https://www.indvaltech.com', base: '/' },
  ghpages: { site: 'https://dsouzajoy.github.io', base: '/indval-dot-com' },
};

const { site, base } = targets[target] ?? targets.dev;

export default defineConfig({
  site,
  base,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});

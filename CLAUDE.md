# CLAUDE.md — Indval Technologies Website

Astro static site deployed to both GitHub Pages (`/indval-dot-com` subpath) and a production custom domain (`/`). The base path difference is the source of most environment-specific bugs.

## Image & Asset Paths — ALWAYS use `withBase`

Every `src` attribute on an `<img>` tag and every asset path that references `public/` must be wrapped with `withBase()`. Raw `/images/...` paths break on GitHub Pages because the site is served from a subpath.

```astro
---
import { withBase } from '@/lib/utils';
---

<!-- Correct -->
<img src={withBase('/images/my-image.png')} alt="..." />

<!-- Wrong — breaks on GitHub Pages -->
<img src="/images/my-image.png" alt="..." />
```

This applies to:
- `<img src={...}>` in templates
- Image paths serialized to JSON (e.g. `data-*` attributes read by JS) — apply `withBase` **before** `JSON.stringify`
- CSS `background-image` set via inline styles
- Font and other asset paths in `<style>` blocks

`BaseHead.astro` already handles OG image and font paths correctly — do not change those.

## Deploy Targets

```
DEPLOY_TARGET=ghpages  → https://dsouzajoy.github.io/indval-dot-com  (base: /indval-dot-com)
DEPLOY_TARGET=prod     → https://www.indvaltech.com                   (base: /)
unset (dev)            → http://localhost:4321                        (base: /)
```

Build commands:
```bash
npm run build                        # dev/default
DEPLOY_TARGET=ghpages npm run build  # GitHub Pages
DEPLOY_TARGET=prod npm run build     # Production
```

## i18n

All user-facing strings go through `src/i18n/locales/en.ts`. Components import `{ en }` and also add `data-i18n="key.path"` attributes for runtime locale switching.

## Tech Stack

- Astro (static output) + Tailwind CSS + React (islands only)
- `@/` path alias maps to `src/`
- Material Symbols Outlined icon font (self-hosted)
- No CMS — content is hardcoded in components or i18n files

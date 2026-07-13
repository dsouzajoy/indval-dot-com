# CLAUDE.md — Indval Technologies Website

Astro static site deployed to both GitHub Pages (`/indval-dot-com` subpath) and a production custom domain (`/`). The base path difference is the source of most environment-specific bugs.

## All Links & Asset Paths — ALWAYS use `withBase`

Every internal `href` and every asset `src` that references a root-relative path must be wrapped with `withBase()`. Raw `/...` paths break on GitHub Pages because the site is served from a subpath (`/indval-dot-com`).

```astro
---
import { withBase } from '@/lib/utils';
---

<!-- Correct -->
<a href={withBase('/contact#contact-form')}>Get In Touch</a>
<Button href={withBase('/contact')} variant="secondary">Contact Us</Button>
<img src={withBase('/images/my-image.png')} alt="..." />

<!-- Wrong — breaks on GitHub Pages -->
<a href="/contact#contact-form">Get In Touch</a>
<img src="/images/my-image.png" alt="..." />
```

This applies to **every** root-relative path in templates:
- `<a href={...}>` and `<Button href={...}>` — all internal navigation links and CTAs
- `<img src={...}>` — image tags
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

## Buttons & CTAs — ALWAYS use `<Button>`

The `Button` component (`src/components/ui/Button.astro`) is the single source of truth for all CTA styling. Never hand-roll button classes from scratch.

```astro
---
import Button from '@/components/ui/Button.astro';
import { withBase } from '@/lib/utils';
---

<!-- Primary: navy fill — forms, nav actions, "Back to Home" -->
<Button href={withBase('/contact')} variant="primary">Contact Us</Button>

<!-- Secondary: orange fill — hero sections, page-level CTAs, "Get In Touch" -->
<Button href={withBase('/contact')} variant="secondary">Get In Touch</Button>

<!-- Ghost: navy outline — secondary actions alongside a primary CTA -->
<Button href={withBase('/contact#contact-form')} variant="ghost">Get In Touch</Button>

<!-- Without href renders a <button> element (e.g. form submit) -->
<Button type="submit" variant="primary">Send Enquiry</Button>
```

**When `<Button>` cannot be used** (e.g. an anchor inside a dark hero overlay with gradient styling), copy the exact base classes from `Button.astro` and add `btn-press`. Do not use `active:scale-95` or `transition-all` — the site uses a Y-axis lift press animation (`btn-press`) exclusively for all full-size CTAs.

The three correct press utilities are:
- `btn-press` — full-size buttons and CTAs
- `btn-press-card` — clickable card containers
- `btn-press-icon` — small icon controls (close, prev/next)

## Copy & Content Style

Never use em dashes (`—`) in any user-facing copy. Rephrase the sentence instead:

- To introduce examples: use "including", "such as", or a colon
- To add a qualifier or range: fold it into the sentence with "from", "covering", "with", etc.
- To insert a parenthetical: use parentheses

This applies to all copy in components, i18n locale files (`en.ts`, etc.), and meta descriptions.

## i18n

All user-facing strings go through `src/i18n/locales/en.ts`. Components import `{ en }` and also add `data-i18n="key.path"` attributes for runtime locale switching.

Whenever adding a new feature or making any change that includes copy changes or copy additions, translations must strictly be added for the English, German, and Polish i18n locale files.

## Tech Stack

- Astro (static output) + Tailwind CSS + React (islands only)
- `@/` path alias maps to `src/`
- Material Symbols Outlined icon font (self-hosted)
- No CMS — content is hardcoded in components or i18n files

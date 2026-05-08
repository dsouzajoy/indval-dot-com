# Architecture Reference
## Industrial Equipment Discovery Website

> This file is the authoritative technical reference for this project. All implementation decisions should align with what is documented here.

---

## Project Overview

A static, SEO-first, multi-page discovery website for an industrial equipment company. The primary goal is global search visibility — ensuring the company's equipment appears in worldwide search results. The site serves as a product discovery and lead generation platform.

**Key Constraints:**
- Static output only — no server runtime
- Hosted on Bluehost shared hosting (cPanel/Apache)
- Solo developer
- English only at launch
- Client updates content approximately once per year

---

## Tech Stack

| Layer | Decision | Rationale |
|---|---|---|
| **Framework** | Astro | Zero-JS by default, outstanding Core Web Vitals, React component support, built-in image optimisation, static output, ideal for SEO-first sites |
| **Styling** | Tailwind CSS | Utility-first, minimal CSS bundle, maps cleanly to brand tokens, pairs natively with Astro |
| **Components** | shadcn/ui | Accessible (Radix UI primitives), unstyled (fully brand-compliant), developer owns the code, no heavy third-party bundle |
| **Language** | TypeScript | Type safety on data files and component props — critical for 10–50 category pages driven from JSON |
| **Data Layer** | Local JSON files | No CMS needed at this stage; clean migration path to headless CMS later |
| **Sitemap** | @astrojs/sitemap | Official Astro integration, auto-discovers all static pages at build time |
| **Image Optimisation** | Astro built-in `<Image />` | Automatic WebP conversion, correct dimensions, lazy loading |
| **Fonts** | Self-hosted WOFF2 | No third-party DNS lookups, full cache control, ships inside /dist |
| **Analytics** | Google Search Console | Free, essential for global SEO tracking, zero performance impact |
| **Security** | Apache .htaccess headers | X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| **Hosting** | Bluehost (cPanel/Apache) | Existing client infrastructure, static file serving only |
| **Deployment** | Manual FTP / cPanel File Manager | IT team deploys /dist folder |
| **Browser Support** | Modern browsers (last 2 versions) | Chrome, Firefox, Safari, Edge |
| **Accessibility** | WCAG 2.1 AA | Covered largely by shadcn/ui + semantic HTML |
| **i18n** | English only | Architecture is ready for future i18n expansion |
| **CMS** | None at launch | To be revisited if content update frequency increases |
| **Forms** | Static UI only | Form submission wiring (Formspree/Web3Forms) deferred to a future phase |

---

## Folder Structure

```
/
├── public/
│   ├── fonts/
│   │   ├── clientfont.woff2
│   │   └── clientfont-bold.woff2
│   ├── images/
│   │   └── (static assets not processed by Astro)
│   ├── robots.txt
│   └── .htaccess
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Navigation.astro
│   │   ├── seo/
│   │   │   ├── BaseHead.astro        ← meta tags, OG, canonical, JSON-LD
│   │   │   └── SchemaOrg.astro       ← structured data components
│   │   ├── ui/
│   │   │   ├── Button.tsx            ← shadcn/ui components
│   │   │   ├── Card.tsx
│   │   │   └── ...
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── CategoryGrid.astro
│   │       ├── ContactForm.astro     ← static UI only
│   │       └── LeadershipCard.astro
│   │
│   ├── data/
│   │   ├── categories.json           ← drives all /products/[slug] pages
│   │   ├── company.json              ← org name, address, contact details
│   │   └── leadership.json          ← leadership team details
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro          ← wraps all pages, injects BaseHead
│   │   └── ProductLayout.astro      ← extended layout for category pages
│   │
│   ├── pages/
│   │   ├── index.astro               → /
│   │   ├── about.astro               → /about
│   │   ├── contact.astro             → /contact
│   │   ├── products/
│   │   │   ├── index.astro           → /products
│   │   │   └── [slug].astro          → /products/[category] (dynamic)
│   │   └── 404.astro                 → custom 404 page
│   │
│   └── styles/
│       └── global.css                ← @font-face, base styles, Tailwind directives
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## Page Architecture & SEO Targets

Each page is an independent SEO target.

| Page | URL | Primary SEO Target | JSON-LD Schema |
|---|---|---|---|
| Home | `/` | Brand + company overview | `Organization` |
| Products Index | `/products` | "industrial equipment supplier" | `ItemList` |
| Category Page | `/products/[slug]` | e.g. "industrial hydraulic presses" | `Product` |
| About | `/about` | Brand trust, E-E-A-T signals | `Organization` |
| Contact | `/contact` | Local/global contact intent | `ContactPage` |
| 404 | `/404` | Error handling | — |

### Dynamic Category Page Generation

Category pages are generated at build time from `src/data/categories.json`:

```typescript
// src/pages/products/[slug].astro
export async function getStaticPaths() {
  const categories = await import('../data/categories.json');
  return categories.default.map((category) => ({
    params: { slug: category.slug },
    props: { category },
  }));
}
```

### categories.json Schema

```json
[
  {
    "slug": "hydraulic-presses",
    "title": "Hydraulic Presses",
    "metaTitle": "Industrial Hydraulic Presses | Company Name",
    "metaDescription": "Browse our range of industrial hydraulic presses...",
    "heroImage": "/images/categories/hydraulic-presses.webp",
    "description": "Full category description here...",
    "specs": [],
    "relatedCategories": ["conveyor-systems"]
  }
]
```

---

## SEO Implementation

### BaseHead Component

Every page includes a `<BaseHead />` component. It accepts `title`, `description`, `canonicalURL`, and `ogImage` as props and injects the following:

```astro
---
// src/components/seo/BaseHead.astro
const { title, description, canonicalURL, ogImage } = Astro.props;
---
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonicalURL} />

<!-- Open Graph -->
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:type" content="website" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />

<!-- Google Search Console Verification -->
<meta name="google-site-verification" content="VERIFICATION_TOKEN" />

<!-- Fonts -->
<link rel="preload" href="/fonts/clientfont.woff2" as="font" type="font/woff2" crossorigin />
```

### JSON-LD Structured Data

**Organization schema** — injected on Home and About pages:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Company Name",
  "url": "https://clientdomain.com",
  "logo": "https://clientdomain.com/images/logo.webp",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-000-000-0000",
    "contactType": "sales"
  }
}
```

**Product schema** — injected on each `/products/[slug]` page:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Hydraulic Presses",
  "description": "...",
  "brand": {
    "@type": "Brand",
    "name": "Company Name"
  }
}
```

### Sitemap

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://clientdomain.com',
  integrations: [
    sitemap(),
    tailwind(),
    react(),
  ],
  output: 'static',
});
```

### robots.txt

```
User-agent: *
Allow: /
Sitemap: https://clientdomain.com/sitemap-index.xml
```

### Font Loading Strategy

```css
/* src/styles/global.css */
@font-face {
  font-family: 'ClientFont';
  src: url('/fonts/clientfont.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'ClientFont';
  src: url('/fonts/clientfont-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### Tailwind Brand Token Configuration

```javascript
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#000000',    // replace with actual brand colour
          secondary: '#000000',  // replace with actual brand colour
          accent: '#000000',     // replace with actual brand colour
        },
      },
      fontFamily: {
        sans: ['ClientFont', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

---

## Security Configuration (.htaccess)

The `.htaccess` file lives in `/public/` and is automatically included in the `/dist` build output.

```apache
# Security Headers
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

# Caching Strategy
<FilesMatch "\.(woff2|jpg|jpeg|png|webp|gif|svg|ico)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

<FilesMatch "\.(css|js)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

<FilesMatch "\.(html)$">
  Header set Cache-Control "public, max-age=3600"
</FilesMatch>

# 301 Redirects — populate after URL audit
# Redirect 301 /old-page.php /new-page
# Redirect 301 /products.php /products

# Custom 404
ErrorDocument 404 /404.html
```

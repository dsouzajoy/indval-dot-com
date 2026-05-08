# Project Notes
## Industrial Equipment Discovery Website

---

## Pending Decisions — Requires Client Input

These must be resolved before or during development. They do not block project start but must be closed before handoff.

| # | Decision | Owner | Action Required |
|---|---|---|---|
| 1 | **IE11 Browser Support** | Client | Present IE11 market share data (<0.5% globally). Recommend dropping. Await client sign-off. |
| 2 | **URL Audit & Redirects** | Developer | Audit existing PHP site URLs using Screaming Frog + Google Search Console before development starts. Map old URLs to new structure. Populate .htaccess redirects. |
| 3 | **Google Search Console Verification** | Client | Client to create/share Google Search Console account. Verification token needed for BaseHead component. |
| 4 | **Final Domain Confirmation** | Client | Confirm exact production domain for canonical URLs and sitemap generation. |
| 5 | **Brand Font Files** | Client | Obtain licensed WOFF2 font files from brand guidelines for self-hosting. |

---

## Recommended Build Order

Follow this sequence to avoid rework and ensure SEO foundations are in place from the first page built.

### Phase 1 — Foundation _(do not skip)_
- [ ] Initialise Astro project with TypeScript
- [ ] Install and configure Tailwind CSS
- [ ] Install shadcn/ui
- [ ] Add @astrojs/sitemap and @astrojs/react integrations
- [ ] Configure `astro.config.mjs` (site URL, `output: static`)
- [ ] Set up `global.css` with `@font-face` declarations
- [ ] Configure `tailwind.config.mjs` with brand tokens
- [ ] Build `BaseLayout.astro` with `BaseHead.astro`
- [ ] Build Header and Footer components
- [ ] Create `.htaccess` with security headers
- [ ] Create `robots.txt`

### Phase 2 — Data Layer
- [ ] Define and populate `categories.json` schema
- [ ] Populate `company.json`
- [ ] Populate `leadership.json`

### Phase 3 — Pages
- [ ] Home page (`index.astro`)
- [ ] Products index page (`/products`)
- [ ] Dynamic category page (`/products/[slug].astro`)
- [ ] About page
- [ ] Contact page (static form UI + leadership section)
- [ ] 404 page

### Phase 4 — SEO & Verification
- [ ] JSON-LD schemas on all pages
- [ ] Verify `sitemap.xml` generates correctly
- [ ] Verify `robots.txt`
- [ ] Add Google Search Console verification token
- [ ] Populate `.htaccess` 301 redirects (from URL audit)

### Phase 5 — QA & Handoff
- [ ] Lighthouse audit — all pages 95+
- [ ] WCAG 2.1 AA audit (keyboard nav, contrast, ARIA)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness check
- [ ] Run final build and verify `/dist` output
- [ ] Handoff `/dist` to IT team with deployment instructions

---

## Deployment Handoff Instructions

### Pre-requisites
- Node.js 18+ installed on developer machine
- Access to Bluehost cPanel / FTP credentials

### Build Steps (Developer)
```bash
npm install
npm run build
# Locate the /dist folder in the project root
```

### Deployment Steps (IT Team)
1. Log in to Bluehost cPanel
2. Open File Manager → navigate to `public_html`
3. Delete or backup existing site files
4. Upload **all contents** of `/dist` folder to `public_html`
5. Verify `.htaccess` file is present in `public_html`
6. Visit `https://clientdomain.com` and verify the site is live

### Verification Checklist
- [ ] Homepage loads correctly
- [ ] `/products` page loads
- [ ] At least one `/products/[category]` page loads
- [ ] `/contact` page loads
- [ ] 404 page loads on an invalid URL
- [ ] `sitemap.xml` accessible at `/sitemap-index.xml`
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] Security headers present (check via https://securityheaders.com)
- [ ] Lighthouse score 95+ (run via Chrome DevTools)

---

## Future Improvement Roadmap

These items are explicitly out of scope for v1 but the architecture supports them without rework.

| Priority | Improvement | Trigger |
|---|---|---|
| High | Connect form to Formspree/Web3Forms | Before site goes live — form is currently UI only |
| High | GitHub Actions → FTP automated deployment | When developer wants to stop manual handoffs |
| Medium | Headless CMS (Sanity/Contentful) | If client increases content update frequency |
| Medium | GA4 Analytics | If client wants visitor behaviour data |
| Low | i18n (multi-language) | If client targets non-English markets |
| Low | IE11 support | Only if client audit reveals significant IE11 audience |

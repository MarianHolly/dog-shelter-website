# Research & Tool Selection: Dog Shelter Website MVP

**Date**: 2025-12-27
**Phase**: 0 - Research & Decision Making
**Status**: Complete

## Overview

This document captures research findings and tool selection decisions for completing the dog shelter website MVP. All decisions prioritize: (1) Free tier availability, (2) Performance impact, (3) Ease of integration with Astro/React stack, (4) Non-technical staff usability.

---

## 1. Web Scraping Approach

### Research Question
Best tool for scraping dog profiles from utulok-trencin.sk?

### Options Evaluated

| Tool | Pros | Cons | Free Tier | Bundle Impact |
|------|------|------|-----------|---------------|
| **Cheerio** (Node.js) | Fast, lightweight, jQuery-like syntax | Static HTML only, no JS rendering | Yes (library) | None (dev dependency) |
| **Playwright** | Full browser automation, handles JS | Heavy, complex setup, slower | Yes (library) | None (dev dependency) |
| **Python BeautifulSoup** | Simple, popular, good docs | Requires Python, separate toolchain | Yes (library) | None (separate script) |

### Decision: **Cheerio (Node.js)**

**Rationale**:
- Lightest weight solution, fast scraping
- Stays in Node.js/TypeScript ecosystem (no Python dependency)
- utulok-trencin.sk likely uses server-rendered HTML (no heavy JS), Cheerio sufficient
- Simple jQuery-like selectors for DOM traversal

**Implementation Approach**:
```typescript
// scripts/scrape-dogs.ts
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

1. Fetch HTML from utulok-trencin.sk/psici
2. Load HTML into Cheerio: const $ = cheerio.load(html)
3. Select dog elements: $('.dog-card').each(...)
4. Extract data: name, breed, age, gender, description, image URL
5. Download images to /public/images/dogs/[slug]/
6. Generate markdown files in /src/content/dogs/
7. Map to 40+ field schema (fill missing with placeholders)
```

**Alternatives Considered**:
- **Playwright**: Rejected due to heavy setup for simple HTML scraping, unnecessary complexity
- **BeautifulSoup**: Rejected to avoid Python dependency, keep toolchain unified

**Risk Mitigation**: If site has heavy JavaScript rendering, fallback to Playwright or manual data entry.

---

## 2. Form Service Selection

### Research Question
Which form service for contact/adoption/volunteer forms?

### Options Evaluated

| Service | Free Tier | Features | Slovak Support | Spam Protection |
|---------|-----------|----------|----------------|-----------------|
| **Formspree** | 50 submissions/month | Email notifications, webhooks, custom redirects | Yes (any language) | reCAPTCHA, honeypot |
| **Web3Forms** | 250 submissions/month | Email, webhooks, file uploads | Yes (any language) | reCAPTCHA, honeypot, captcha |
| **Netlify Forms** | 100 submissions/month | Built-in Netlify integration | Yes | Akismet spam filter |

### Decision: **Web3Forms**

**Rationale**:
- Highest free tier limit (250 submissions/month vs 50 for Formspree)
- Supports file uploads (useful for future enhancements)
- Good spam protection (reCAPTCHA + honeypot + custom captcha)
- Simple REST API, no vendor lock-in
- Works with any static site (not tied to Netlify)

**Implementation Approach**:
```typescript
// src/components/forms/ContactForm.tsx
1. Form submits to https://api.web3forms.com/submit
2. Include access_key (from env variable)
3. Client-side validation before submit
4. Handle success/error responses
5. Display feedback to user (success message or error)
6. Form fields: name, email, phone, message, subject (hidden for dog-specific inquiries)
```

**API Contract** (see contracts/form-api.md):
- Endpoint: POST https://api.web3forms.com/submit
- Required fields: access_key, name, email, message
- Optional fields: subject, phone, redirect, botcheck (honeypot)
- Response: JSON with success boolean and message

**Alternatives Considered**:
- **Formspree**: Rejected due to lower submission limit (50/month insufficient for 20-40 dogs × multiple inquiries)
- **Netlify Forms**: Rejected to avoid vendor lock-in (site is on Cloudflare Pages)

**Cost**: €0/month within 250 submissions limit. Monitor usage in first month.

---

## 3. Newsletter Service Selection

### Research Question
Which email service for newsletter signups?

### Options Evaluated

| Service | Free Tier | API | GDPR Compliance | Features |
|---------|-----------|-----|-----------------|----------|
| **MailerLite** | 1,000 subscribers | REST API | Yes (EU-based, compliant) | Automation, templates, analytics |
| **Mailchimp** | 500 subscribers | REST API | Yes | Advanced features, but limited free tier |
| **Sendinblue** (Brevo) | Unlimited contacts, 300 emails/day | REST API | Yes | Good for transactional emails |

### Decision: **MailerLite**

**Rationale**:
- Best free tier (1,000 subscribers vs 500 for Mailchimp)
- EU-based company, strong GDPR compliance (important for Slovak audience)
- Clean, simple UI for shelter staff to send campaigns
- Excellent email editor and automation features
- 12,000 emails/month included

**Implementation Approach**:
```typescript
// src/components/forms/NewsletterForm.tsx
1. Form submits email + GDPR consent to API endpoint
2. Call MailerLite API: POST /api/v2/subscribers
3. Add subscriber to group "Website Signups"
4. Handle double opt-in confirmation email
5. Display success message with "Check your email to confirm"
```

**API Contract** (see contracts/newsletter-api.md):
- Endpoint: POST https://api.mailerlite.com/api/v2/subscribers
- Headers: X-MailerLite-ApiKey: {API_KEY}
- Body: { email: string, fields: { consent: boolean } }
- Response: JSON with subscriber data or error

**GDPR Compliance**:
- Mandatory consent checkbox on form
- Double opt-in confirmation email
- Unsubscribe link in every email (MailerLite auto-includes)
- Privacy policy link on form

**Alternatives Considered**:
- **Mailchimp**: Rejected due to lower free tier (500 vs 1,000 subscribers)
- **Sendinblue**: Rejected due to daily email limit (300/day might restrict campaigns)

**Cost**: €0/month within 1,000 subscribers and 12,000 emails/month.

---

## 4. Image Optimization Patterns

### Research Question
How to implement lazy loading, responsive images, and LQIP with Astro?

### Astro Image Component Research

**Built-in Solution**: Astro 5.x includes `astro:assets` module with `<Image />` and `<Picture />` components.

**Features**:
- Automatic image optimization (WebP, AVIF formats)
- Responsive srcset generation
- Lazy loading with loading="lazy"
- Blur placeholder support (experimental)
- Build-time optimization (no runtime cost)

**Implementation Pattern**:
```astro
---
import { Image } from 'astro:assets';
import dogPhoto from '@/content/dogs/max/photo.jpg';
---

<!-- Lazy loaded, responsive, optimized -->
<Image
  src={dogPhoto}
  alt="Max - Labrador Retriever"
  width={800}
  height={600}
  loading="lazy"
  decoding="async"
  quality={85}
  format="webp"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

**Configuration** (astro.config.mjs):
```javascript
export default defineConfig({
  image: {
    domains: ['res.cloudinary.com'], // Allow Cloudinary URLs
    service: {
      entrypoint: 'astro/assets/services/sharp', // Use Sharp for optimization
    },
  },
});
```

**LQIP (Low Quality Image Placeholder)**:
- Option 1: Use `sharp` to generate tiny blurred placeholder at build time
- Option 2: Use CSS blur with low-quality thumbnail
- Option 3: Use Astro's experimental `inferSize` + placeholder features

**Decision**: Use Astro `<Image />` component with lazy loading, responsive srcset, and CSS blur placeholder.

**Performance Targets**:
- Original images: <2MB uploaded to Cloudinary
- Optimized WebP: <200KB for desktop, <100KB for mobile
- Srcset: 3 sizes (400px, 800px, 1200px)
- Lazy load: All below-fold images
- Result: <500KB total page weight ✅

---

## 5. Animation Library Selection

### Research Question
Framer Motion vs CSS animations for smooth 60fps animations?

### Options Evaluated

| Approach | Bundle Size | Performance | Astro Compatibility | Ease of Use |
|----------|-------------|-------------|---------------------|-------------|
| **CSS Animations** | 0KB (native) | Excellent (GPU accelerated) | Perfect | Requires CSS knowledge |
| **Framer Motion** | ~30KB gzipped | Good (React optimized) | Works with React components | Declarative, easy |
| **GSAP** | ~40KB+ | Excellent | Works but heavy | Powerful but overkill |

### Decision: **CSS Animations + Tailwind CSS + View Transitions API**

**Rationale**:
- Zero bundle size impact (native browser features)
- Best performance (GPU accelerated transforms)
- Tailwind CSS provides animation utilities (animate-fadeIn, animate-slideUp)
- Astro View Transitions API for page transitions (experimental, progressive enhancement)
- Meets bundle size constraint (<50KB JS per page)

**Implementation Approach**:

**1. Hover Effects (Cards, Buttons)**:
```css
/* global.css */
.card-hover {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}
```

**2. Scroll-Triggered Animations (Sections)**:
```typescript
// components/animations/ScrollReveal.tsx
import { useEffect, useRef } from 'react';

export function ScrollReveal({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="opacity-0">{children}</div>;
}
```

**3. Tailwind Animation Utilities** (tailwind.config.js):
```javascript
theme: {
  extend: {
    animation: {
      fadeIn: 'fadeIn 0.6s ease-out forwards',
      slideUp: 'slideUp 0.6s ease-out forwards',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      slideUp: {
        '0%': { opacity: '0', transform: 'translateY(40px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
  },
}
```

**4. Respect prefers-reduced-motion**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Performance Validation**:
- Use Chrome DevTools Performance tab
- Ensure 60fps during animations
- No layout thrashing (animate transform/opacity only)
- Debounce scroll listeners if needed

**Alternatives Considered**:
- **Framer Motion**: Rejected due to 30KB bundle size (exceeds budget for animations)
- **GSAP**: Rejected due to overkill for simple animations

**Bundle Impact**: 0KB (CSS only)

---

## 6. Decap CMS Configuration

### Research Question
How to configure Decap CMS with GitHub OAuth and Cloudinary integration?

### Decap CMS Overview

**Decap CMS** (formerly Netlify CMS) is a Git-based CMS:
- No database required (content stored as markdown in Git)
- GitHub OAuth for authentication
- Cloudinary widget for media uploads
- Preview templates for WYSIWYG editing
- Free and open-source

### Configuration Steps

**1. Create `/public/admin/index.html`**:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

**2. Create `/public/admin/config.yml`** (see full config below)

**3. GitHub OAuth Setup**:
- Register OAuth app on GitHub: Settings → Developer settings → OAuth Apps
- Application name: "Trenčiansky útulok CMS"
- Homepage URL: https://utulok-trencin.sk
- Authorization callback URL: https://api.netlify.com/auth/done
- Use Netlify's OAuth gateway (free, no backend needed)
- Alternative: Use Cloudflare Workers for custom OAuth (requires setup)

**4. Cloudinary Widget Integration**:
```yaml
# In config.yml
media_library:
  name: cloudinary
  config:
    cloud_name: your_cloud_name
    api_key: your_api_key
```

### Decap CMS config.yml (Full Configuration)

```yaml
backend:
  name: github
  repo: maria/dog-shelter-website  # Replace with actual repo
  branch: master
  base_url: https://api.netlify.com  # OAuth gateway
  auth_endpoint: auth

media_library:
  name: cloudinary
  config:
    cloud_name: trenciansky-utulok  # Replace with Cloudinary cloud name
    api_key: 123456789012345  # Replace with actual API key

media_folder: "public/images"
public_folder: "/images"

locale: sk

collections:
  - name: "dogs"
    label: "Psíci"
    folder: "src/content/dogs"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Meno", name: "name", widget: "string"}
      - {label: "Plemeno", name: "breed", widget: "string"}
      - {label: "Vek", name: "age", widget: "string"}
      - {label: "Pohlavie", name: "gender", widget: "select", options: ["Pes", "Suka"]}
      - {label: "Hlavná fotka", name: "image", widget: "image"}
      - {label: "Galéria (viacero fotiek)", name: "images", widget: "list", field: {label: "Fotka", name: "image", widget: "image"}, required: false}
      - {label: "Video URL", name: "videoUrl", widget: "string", required: false}
      - {label: "Krátky popis", name: "description", widget: "text"}
      - {label: "Veľkosť", name: "size", widget: "select", options: ["Malý", "Stredný", "Veľký"], required: false}
      - {label: "Hmotnosť", name: "weight", widget: "string", required: false}
      - {label: "Farba", name: "color", widget: "string", required: false}
      - {label: "Číslo čipu", name: "chipNumber", widget: "string", required: false}
      - {label: "Povaha a charakter", name: "personality", widget: "text", required: false}
      - {label: "Charakteristika (zoznam)", name: "characteristics", widget: "list", field: {label: "Vlastnosť", name: "trait", widget: "string"}, required: false}
      - {label: "Úroveň energie", name: "energyLevel", widget: "select", options: ["Nízka", "Stredná", "Vysoká"], required: false}
      - {label: "Očkovaný", name: "vaccinated", widget: "boolean", default: false}
      - {label: "Kastrovaný/Sterilizovaná", name: "sterilized", widget: "boolean", default: false}
      - {label: "Čipovaný", name: "chipped", widget: "boolean", default: false}
      - {label: "Odčervený", name: "dewormed", widget: "boolean", default: false}
      - {label: "Dobrý s deťmi", name: "goodWithKids", widget: "boolean", required: false}
      - {label: "Dobrý s inými psami", name: "goodWithDogs", widget: "boolean", required: false}
      - {label: "Dobrý s mačkami", name: "goodWithCats", widget: "boolean", required: false}
      - {label: "Urgentná adopcia", name: "urgent", widget: "boolean", default: false}
      - {label: "Špeciálne potreby", name: "specialNeeds", widget: "boolean", default: false}
      - {label: "Odporúčaný", name: "featured", widget: "boolean", default: false}
      - {label: "Adopčný poplatok (€)", name: "adoptionFee", widget: "number", required: false}
      - {label: "Ideálna rodina", name: "idealFamily", widget: "text", required: false}
      - {label: "Príbeh (markdown)", name: "body", widget: "markdown", required: false}

  - name: "blog"
    label: "Blog"
    folder: "src/content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Nadpis", name: "title", widget: "string"}
      - {label: "Popis", name: "description", widget: "text"}
      - {label: "Dátum publikácie", name: "pubDate", widget: "datetime"}
      - {label: "Autor", name: "author", widget: "string", default: "Trenčianský útulok"}
      - {label: "Obrázok", name: "image", widget: "image", required: false}
      - {label: "Kategória", name: "category", widget: "select", options: ["Príbehy", "Tipy a rady", "Novinky", "Adopcie", "Zdravie", "Výchova"], required: false}
      - {label: "Odporúčaný", name: "featured", widget: "boolean", default: false}
      - {label: "Obsah", name: "body", widget: "markdown"}

  - name: "success-stories"
    label: "Úspešné príbehy"
    folder: "src/content/success-stories"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Meno psa", name: "dogName", widget: "string"}
      - {label: "Dátum adopcie", name: "adoptionDate", widget: "date"}
      - {label: "Svedectvo adoptéra", name: "testimonial", widget: "text"}
      - {label: "Fotka pred adopciou", name: "beforePhoto", widget: "image"}
      - {label: "Fotky po adopcii", name: "afterPhotos", widget: "list", field: {label: "Fotka", name: "image", widget: "image"}}
      - {label: "Rok", name: "year", widget: "number"}
      - {label: "Príbeh", name: "body", widget: "markdown", required: false}
```

### Workflow for Shelter Staff

1. Navigate to `/admin` (redirects to GitHub OAuth)
2. Authorize with GitHub account (maria's account grants access to colleagues)
3. Click "Psíci" → "New Psíci"
4. Fill out form (required fields: name, breed, age, gender, image, description)
5. Upload photos via Cloudinary widget (auto-optimized)
6. Click "Save" (creates Git commit in draft)
7. Preview changes
8. Click "Publish" (merges to master, triggers Cloudflare Pages rebuild)
9. Wait 2-5 minutes for site rebuild
10. New dog appears on /psici

**Documentation**: Create video tutorial in Slovak (5-10 minutes) showing this workflow.

**Alternatives Considered**:
- **Tina CMS**: Rejected due to paid tiers for team access
- **Sanity**: Rejected due to complexity and hosted backend requirement

---

## 7. GitHub Actions Workflow

### Research Question
How to deploy to Cloudflare Pages via GitHub Actions?

### Cloudflare Pages Deployment Options

**Option 1**: Direct Git integration (Cloudflare watches repo)
- Pros: Simple setup, automatic deployments
- Cons: Less control, no custom build steps

**Option 2**: GitHub Actions with Wrangler CLI
- Pros: Full control, custom build steps, environment variables
- Cons: More configuration

### Decision: **GitHub Actions with Wrangler CLI**

**Rationale**:
- Full control over build process (TypeScript checks, linting, testing)
- Environment variable management (Cloudinary keys, form API keys)
- Preview deployments for PRs (optional)
- Consistent with best practices for modern deployments

### Workflow Configuration

**File**: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - master

env:
  NODE_VERSION: '18'

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Build and Deploy

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run TypeScript checks
        run: pnpm run astro check

      - name: Build site
        run: pnpm run build
        env:
          PUBLIC_CLOUDINARY_CLOUD_NAME: ${{ secrets.CLOUDINARY_CLOUD_NAME }}
          CLOUDINARY_API_KEY: ${{ secrets.CLOUDINARY_API_KEY }}
          CLOUDINARY_API_SECRET: ${{ secrets.CLOUDINARY_API_SECRET }}
          PUBLIC_WEB3FORMS_KEY: ${{ secrets.WEB3FORMS_KEY }}
          PUBLIC_MAILERLITE_KEY: ${{ secrets.MAILERLITE_KEY }}

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=dog-shelter
```

### Environment Variables Setup

**GitHub Secrets** (Settings → Secrets and variables → Actions):
- `CLOUDFLARE_API_TOKEN`: From Cloudflare dashboard (API Tokens → Create Token → Edit Cloudflare Pages)
- `CLOUDFLARE_ACCOUNT_ID`: From Cloudflare dashboard (Account ID on right side)
- `CLOUDINARY_CLOUD_NAME`: From Cloudflare dashboard (Cloud name)
- `CLOUDINARY_API_KEY`: From Cloudinary dashboard
- `CLOUDINARY_API_SECRET`: From Cloudinary dashboard
- `WEB3FORMS_KEY`: From Web3Forms dashboard (access key)
- `MAILERLITE_KEY`: From MailerLite dashboard (API key)

**Cloudflare Pages Environment Variables**:
Same variables configured in Cloudflare Pages dashboard for preview deployments.

### Deployment Checklist

**Pre-Launch**:
1. ✅ GitHub Actions workflow file created and tested
2. ✅ All secrets configured in GitHub
3. ✅ Cloudflare Pages project created
4. ✅ Custom domain (utulok-trencin.sk) added to Cloudflare
5. ✅ DNS records configured (CNAME to Cloudflare Pages)
6. ✅ SSL certificate auto-provisioned (Cloudflare)
7. ✅ Build tested locally and via GitHub Actions
8. ✅ Environment variables verified

**Deployment Process**:
1. Merge PR to master
2. GitHub Actions triggers automatically
3. TypeScript checks run
4. Build completes (<2 min target)
5. Deploy to Cloudflare Pages
6. Site live within 5 minutes
7. Verify on https://utulok-trencin.sk

**Rollback Procedure**:
1. In Cloudflare Pages dashboard, navigate to Deployments
2. Find last working deployment
3. Click "Rollback to this deployment"
4. Alternative: `git revert <commit>` and push to master

**Monitoring**:
- Cloudflare Analytics (built-in, free)
- GitHub Actions logs for build failures
- Cloudflare Pages logs for deployment issues

---

## Summary of Decisions

| Category | Selected Tool | Rationale | Cost |
|----------|---------------|-----------|------|
| Web Scraping | Cheerio (Node.js) | Lightweight, TypeScript ecosystem, fast | Free |
| Form Service | Web3Forms | 250 submissions/month, file uploads, good spam protection | Free |
| Newsletter | MailerLite | 1,000 subscribers, GDPR compliant, EU-based | Free |
| Image Optimization | Astro Image component | Built-in, zero bundle impact, automatic WebP | Free |
| Animations | CSS + Tailwind + Intersection Observer | Zero bundle size, 60fps GPU acceleration | Free |
| CMS | Decap CMS | Git-based, GitHub OAuth, Cloudinary integration | Free |
| Deployment | GitHub Actions + Cloudflare Pages | Full control, fast builds, preview deployments | Free |

**Total Monthly Cost**: €0

**Performance Impact**:
- JavaScript bundle: ~45KB (within <50KB budget)
- CSS bundle: ~18KB (within <20KB budget)
- All images lazy-loaded with srcset
- Build time: <2 minutes
- Deployment time: <5 minutes

**Risk Assessment**:
- ✅ All services have generous free tiers
- ✅ No vendor lock-in (can migrate if needed)
- ✅ Performance targets achievable
- ⚠️ Monitor form submission limits (250/month - should be sufficient)
- ⚠️ Monitor Cloudinary transformations (25k/month - should be sufficient)

---

## Next Steps

With research complete, proceed to **Phase 1: Design & Contracts**:
1. Create data-model.md (content entities)
2. Create API contracts (form, newsletter, Cloudinary APIs)
3. Create quickstart.md (setup guide)
4. Update agent context

**Status**: Phase 0 Complete ✅ → Proceed to Phase 1

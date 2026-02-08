# Implementation Plan: Dog Shelter Website MVP Completion

**Branch**: `01-frontend` | **Date**: 2025-12-27 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/01-frontend/spec.md`

## Summary

Complete the remaining 40% of the dog shelter website to reach production-ready state. Primary requirements include: (1) Content migration - scrape 20-40 dog profiles from utulok-trencin.sk; (2) CMS setup - implement Decap CMS with Cloudinary for shelter staff independence; (3) Forms - add contact, adoption inquiry, volunteer, and newsletter forms; (4) Performance optimization - lazy loading, responsive images, animations at 60fps; (5) SEO enhancement - sitemap, robots.txt, Schema.org structured data; (6) New pages - virtual adoption and success stories sections; (7) Deployment - Cloudflare Pages with GitHub Actions CI/CD.

**Technical Approach**: Leverage existing Astro 5.x + React 19.x + TypeScript stack (60% complete). Use Task tool with Explore agent for web scraping dog data. Integrate Decap CMS as Git-based CMS with GitHub OAuth. Connect Cloudinary for media optimization. Implement forms with Formspree or Web3Forms free tier. Add Astro Image component for performance. Configure GitHub Actions for continuous deployment to Cloudflare Pages. All changes align with constitution principles (mobile-first, WCAG AA, performance targets).

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode) with Astro 5.x framework
**Primary Dependencies**: Astro 5.x, React 19.x, Tailwind CSS 4.x, shadcn/ui, Decap CMS, @astrojs/image, Cloudinary SDK
**Storage**: Git repository (markdown files for content), Cloudinary (images/videos), no database
**Testing**: Manual testing (Chrome, Firefox, Safari, mobile devices), Lighthouse audits, accessibility checks (axe DevTools)
**Target Platform**: Static web (mobile-first, last 2 versions of modern browsers)
**Project Type**: Web application (static site generation, no backend)
**Performance Goals**: <2s page load on 3G, Lighthouse 90/95/95/100, <500KB page weight, 60fps animations
**Constraints**: €0/month budget (free tiers only), static site only (no SSR), build time <2min, bundle size JS <50KB/CSS <20KB gzipped
**Scale/Scope**: 20-40 dog profiles, 5-10 blog posts, 5-10 success stories, 8 static pages, 2 CMS users (shelter staff)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: User Experience First ✅ PASS
- **Mobile-first approach**: Existing design is mobile-first, all new features will follow same pattern
- **Accessibility compliance**: WCAG AA mandatory (FR-053 to FR-059 in spec)
- **Performance targets**: Explicit requirements for <2s load, Lighthouse 90+ (FR-028 to FR-036)
- **Intuitive navigation**: Dogs findable via /psici, filters, contact within 3 clicks

**Verification**: All user stories prioritize mobile experience, performance requirements are measurable, accessibility is non-negotiable.

### Principle II: Content Management Simplicity ✅ PASS
- **No code required**: Decap CMS provides visual interface for all content (FR-019 to FR-027)
- **Clear workflows**: CMS designed for <5 steps to add dog profile
- **Instant preview**: Decap CMS has built-in preview functionality
- **Error prevention**: CMS form validation for required fields
- **Documentation**: Plan includes Slovak language documentation for staff

**Verification**: FR-020 explicitly requires staff can add dogs without developer assistance. Success criteria SC-003 measures <10 min to add profile.

### Principle III: Performance & Optimization (NON-NEGOTIABLE) ✅ PASS
- **Build time**: Static site, build completes in <2min (existing builds succeed in ~45s)
- **Bundle size**: Explicit requirements FR-034 (JS <50KB) and FR-035 (CSS <20KB)
- **Image optimization**: FR-028 to FR-030 mandate lazy loading, srcset, LQIP
- **Zero runtime errors**: Testing includes console error checks
- **Progressive enhancement**: Core content (dog listings) works without JS (Astro renders static HTML)

**Verification**: Performance metrics are testable success criteria (SC-004 to SC-006). Lighthouse scores are measurable gates.

### Principle IV: Adoption-Focused Design ✅ PASS
- **Emotional connection**: User Story 1 focuses on comprehensive dog profiles with personality descriptions
- **Clear calls-to-action**: Forms on every dog page (FR-008), success stories for social proof
- **Social sharing**: FR-050 to FR-051 mandate Open Graph and Twitter Cards
- **Filtering accuracy**: Existing filters (size, gender, energy, kids) maintained and tested
- **Trust signals**: Success stories section (User Story 8), shelter credentials on homepage

**Verification**: Every user story directly supports adoption goals. Virtual adoption adds additional support channel.

### Principle V: Maintainability & Documentation ✅ PASS
- **Code comments**: TypeScript strict mode enforced, complex logic documented
- **README documentation**: Plan includes quickstart.md for setup/deployment
- **Type safety**: Existing codebase uses TypeScript strict mode, no `any` types
- **Consistent patterns**: Astro + React patterns established, new components follow existing structure
- **Git hygiene**: Feature branch `01-frontend`, conventional commits required

**Verification**: Constitution already enforces these standards. Plan respects existing patterns.

### Technology Constraints ✅ PASS
- **Framework Stack**: Using existing Astro 5.x + React 19.x + TypeScript + Tailwind CSS 4.x + shadcn/ui ✅
- **Content Management**: Implementing Decap CMS + Markdown + Cloudinary as specified ✅
- **Deployment**: Cloudflare Pages + GitHub Actions as specified ✅
- **Budget Constraint**: All services on free tiers (Cloudinary, Formspree/Web3Forms, MailerLite, Cloudflare Pages) ✅

**Verification**: No technology changes from constitution. All new integrations use approved stack.

### Quality Standards Gates

**Testing Requirements**: ✅ Defined in FR-053 to FR-059, manual testing checklist in tasks
**Performance Requirements**: ✅ Lighthouse scores 90/95/95/100 in FR-031, FR-053, FR-052
**Accessibility Requirements**: ✅ WCAG AA compliance mandatory, FR-053 to FR-059
**Content Quality**: ✅ Required fields validation in CMS, proofread Slovak text

**GATE RESULT**: ✅ ALL GATES PASS - Proceed to Phase 0 Research

## Project Structure

### Documentation (this feature)

```text
specs/01-frontend/
├── plan.md              # This file
├── research.md          # Phase 0 output (tool selection research)
├── data-model.md        # Phase 1 output (content entities)
├── quickstart.md        # Phase 1 output (setup guide)
└── contracts/           # Phase 1 output (form submission API contracts)
    ├── form-api.md      # Formspree/Web3Forms API contract
    ├── newsletter-api.md # MailerLite API contract
    └── cloudinary-api.md # Cloudinary upload API contract
```

### Source Code (repository root)

**Existing Structure** (60% complete):

```text
src/
├── components/
│   ├── icons/
│   │   └── Logo.astro
│   ├── layout/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Navbar.tsx
│   │   ├── MobileNav.tsx
│   │   └── ThemeToggle.tsx
│   ├── ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── separator.tsx
│   │   └── sheet.tsx
│   └── Button.astro
├── config/
│   └── site.config.ts
├── content/
│   ├── dogs/            # 7 sample dogs (need 20-40)
│   │   ├── max.md
│   │   ├── bella.md
│   │   ├── raischa.md
│   │   └── ...
│   └── blog/            # 1 sample post (need 5-10)
│       └── cipovanie-psov.md
├── layouts/
│   └── main.astro       # Base layout
├── lib/
│   ├── theme.ts
│   └── utils.ts
├── pages/
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   ├── psici/
│   │   ├── index.astro        # Dog listing
│   │   └── [...slug].astro    # Dog detail
│   ├── index.astro            # Homepage
│   ├── adopcia.astro
│   ├── ako-pomoct.astro
│   ├── kontakt.astro
│   ├── o-nas.astro
│   └── 404.astro
├── styles/
│   └── global.css
└── content.config.ts   # Content collections schema

public/
├── images/
│   ├── dogs/            # Dog photos (local, to migrate to Cloudinary)
│   └── *.jpg            # General images
├── scripts/
│   └── theme-init.js
├── favicon.svg
└── logo-utulok.png
```

**NEW Structure to Add** (40% remaining):

```text
public/
└── admin/               # Decap CMS configuration
    ├── index.html       # CMS entry point
    └── config.yml       # CMS config (collections, OAuth, Cloudinary)

src/
├── components/
│   ├── forms/           # NEW: Form components
│   │   ├── ContactForm.tsx
│   │   ├── AdoptionInquiryForm.tsx
│   │   ├── VolunteerForm.tsx
│   │   └── NewsletterForm.tsx
│   └── animations/      # NEW: Animation utilities
│       └── ScrollReveal.tsx
├── content/
│   ├── dogs/            # EXPAND: 7 → 20-40 profiles
│   │   └── [scraped-dogs].md
│   ├── blog/            # EXPAND: 1 → 5-10 posts
│   │   └── [new-posts].md
│   └── success-stories/ # NEW: Success stories collection
│       └── [stories].md
├── pages/
│   ├── uspesne-pribehy/        # NEW: Success stories
│   │   ├── index.astro
│   │   └── [...slug].astro
│   └── virtualna-adopcia.astro # NEW: Virtual adoption
└── utils/
    ├── cloudinary.ts    # NEW: Cloudinary helper
    └── scraper.ts       # NEW: Dog scraping script

.github/
└── workflows/           # NEW: CI/CD
    └── deploy.yml       # GitHub Actions workflow

scripts/
└── scrape-dogs.js       # NEW: Dog data scraping script
```

**Structure Decision**: Using existing Astro web application structure. Adding new components (forms, animations), content (scraped dogs, success stories), pages (virtual adoption, success stories), and external integrations (Decap CMS, Cloudflare deployment). No structural changes to existing architecture.

## Complexity Tracking

> No constitution violations - all requirements align with established principles.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | No violations | Constitution gates all passed |

---

## Phase 0: Research & Tool Selection

### Research Tasks

Based on Technical Context unknowns and tool selection decisions needed:

1. **Web Scraping Approach** (NEEDS DECISION)
   - Research: Best practices for scraping utulok-trencin.sk (Cheerio vs BeautifulSoup vs Playwright)
   - Output: Recommended tool, sample code, extraction strategy

2. **Form Service Selection** (NEEDS DECISION)
   - Research: Compare Formspree vs Web3Forms free tiers (submission limits, features, Slovak language support)
   - Output: Selected service, API integration approach, error handling strategy

3. **Newsletter Service Selection** (NEEDS DECISION)
   - Research: Compare MailerLite vs Mailchimp free tiers (subscriber limits, API, GDPR compliance)
   - Output: Selected service, API integration guide, signup flow design

4. **Image Optimization Patterns** (NEEDS BEST PRACTICES)
   - Research: Astro Image component usage, srcset generation, LQIP implementation
   - Output: Component patterns, configuration, performance benchmarks

5. **Animation Library Selection** (NEEDS DECISION)
   - Research: Framer Motion vs CSS animations (bundle size impact, performance, Astro compatibility)
   - Output: Recommended approach, sample implementations, 60fps guidelines

6. **Decap CMS Configuration** (NEEDS BEST PRACTICES)
   - Research: GitHub OAuth setup, Cloudinary widget integration, collection schema design
   - Output: Configuration template, OAuth flow, widget setup guide

7. **GitHub Actions Workflow** (NEEDS BEST PRACTICES)
   - Research: Cloudflare Pages deployment from GitHub Actions, environment variable handling, caching strategies
   - Output: Workflow YAML template, deployment checklist, rollback procedure

### Research Execution

I'll now create research.md with findings for each decision point:


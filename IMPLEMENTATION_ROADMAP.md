# Dog Shelter Website - Implementation Roadmap

**Project**: Trenčiansky útulok Website Redesign
**Status**: Mid-Development → Production Launch
**Last Updated**: December 27, 2025
**Branch**: 01-frontend

---

## Executive Summary

The dog shelter website redesign is approximately **60% complete**. Core architecture, design system, and primary pages are functional. Remaining work focuses on content population, CMS implementation, feature additions, and production deployment.

**Timeline Estimate**: 4-6 weeks to production launch
**Priority Order**: Content → Features → CMS → Polish → Deploy

---

## Current State Analysis

### ✅ COMPLETED (60%)

#### 1. Technical Foundation
- **Framework**: Astro 5.x + React 19.x + TypeScript
- **Styling**: Tailwind CSS 4.x with custom warm color palette
- **Build**: Vite, successful production builds
- **Package Manager**: pnpm
- **Git Structure**: Initialized, on `01-frontend` branch

#### 2. Design System
- **Color Palette**: Warm browns, terracotta (#B65636), sage green (#6B8273)
- **Typography**: DM Sans (body) + Mali (headings)
- **Dark Mode**: Fully implemented with oklch color system
- **Responsive**: Mobile-first breakpoints configured
- **Components**: shadcn/ui integrated (Button, Sheet, Navigation Menu, Separator)

#### 3. Page Structure (5/8 core pages)

**Homepage** (`src/pages/index.astro`)
- ✅ Hero section with background image
- ✅ Gallery grid (4 images)
- ✅ Stats section (500+ adopted, 13 years, 24/7 care)
- ✅ About section (who we are, our mission)
- ✅ Why Adopt section (6 benefit cards)
- ✅ Support section (6 ways to help)
- ✅ Contact preview section
- ✅ Thank you section

**Dog Listing** (`src/pages/psici/index.astro`)
- ✅ Header with description
- ✅ Filter bar (size, gender, energy, kids-friendly, urgent)
- ✅ Grid layout (responsive 1-4 columns)
- ✅ Dog cards with image, basic info, badges
- ✅ Client-side filtering with JavaScript
- ✅ "No results" state
- ✅ CTA section for contact

**Dog Detail** (`src/pages/psici/[...slug].astro`)
- ✅ Comprehensive layout (2-column on desktop)
- ✅ Photo gallery with thumbnails (click to change main image)
- ✅ Video embed support (YouTube/Vimeo)
- ✅ Basic information sidebar (breed, age, gender, size, weight, color, etc.)
- ✅ Health status sidebar (vaccinated, sterilized, chipped, dewormed)
- ✅ Personality & character section
- ✅ Compatibility section (kids, dogs, cats, other pets)
- ✅ Training & skills section (house-trained, leash-trained, commands)
- ✅ Living requirements (exercise, space, time, experience, grooming)
- ✅ Ideal home description
- ✅ Why adopt me section
- ✅ Adoption info (fee, special requirements)
- ✅ CTA section with contact buttons
- ✅ Breadcrumb navigation

**Static Pages**
- ✅ Adoption Guide (`/adopcia`)
- ✅ How to Help (`/ako-pomoct`)
- ✅ Contact (`/kontakt`)
- ✅ About Us (`/o-nas`)
- ✅ 404 Error Page

**Blog System**
- ✅ Blog listing page (`/blog`)
- ✅ Blog post template (`/blog/[...slug]`)
- ✅ Content collection configured
- ✅ 1 sample post (microchipping)

#### 4. Content Collections

**Dogs Collection** (`src/content.config.ts`)
- ✅ Comprehensive schema (40+ fields)
- ✅ Required fields: name, breed, age, gender, image, description
- ✅ Optional fields: health, personality, training, compatibility, etc.
- ✅ 7 sample dogs created (Max, Bella, Buddy, Luna, Rocky, Charlie, Raischa)
- ✅ 1 comprehensive example dog

**Blog Collection**
- ✅ Schema with title, description, pubDate, author, image, category, tags
- ✅ Featured flag, draft status
- ✅ 1 sample post

#### 5. Components

**Layout Components**
- ✅ Header with logo and navigation
- ✅ Footer with links and contact info
- ✅ Main layout with meta tags, Open Graph support
- ✅ Navbar (desktop)
- ✅ MobileNav (mobile menu with sheet/drawer)
- ✅ ThemeToggle (dark mode switch)

**UI Components** (from shadcn/ui)
- ✅ Button
- ✅ Navigation Menu
- ✅ Sheet (mobile drawer)
- ✅ Separator

#### 6. Features Working

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode toggle with theme persistence
- ✅ Client-side dog filtering
- ✅ Image gallery (basic click-to-view)
- ✅ SEO meta tags (title, description, Open Graph, Twitter)
- ✅ Canonical URLs
- ✅ Favicon and touch icons
- ✅ Google Fonts loaded (DM Sans, Mali)

---

### ❌ MISSING / INCOMPLETE (40%)

#### 1. Content (Critical Gap)
- ❌ Only 7/40 target dog profiles
- ❌ Need to scrape 20-40 dogs from utulok-trencin.sk
- ❌ Blog has only 1 post (need 5-10 for launch)
- ❌ Success stories section doesn't exist
- ❌ Virtual adoption content missing
- ❌ Some static pages need more content

#### 2. CMS (Blocker for Staff)
- ❌ No Decap CMS configuration (`/public/admin/config.yml`)
- ❌ No GitHub OAuth setup
- ❌ No admin interface at `/admin`
- ❌ Staff cannot add/edit content independently
- ❌ No content management documentation

#### 3. Media Management
- ❌ No Cloudinary integration
- ❌ Images stored locally (not scalable)
- ❌ No automatic image optimization
- ❌ No responsive image generation (srcset)
- ❌ No lazy loading implemented
- ❌ No blur placeholders (LQIP)
- ❌ Video upload/management not configured

#### 4. Forms (User Engagement)
- ❌ All contact links are mailto: (no embedded forms)
- ❌ No contact form on `/kontakt`
- ❌ No adoption inquiry form on dog detail pages
- ❌ No volunteer form on `/ako-pomoct`
- ❌ No newsletter signup component
- ❌ No form validation
- ❌ No form submission handling (Formspree/Web3Forms)

#### 5. Animations & Polish
- ⚠️ Basic hover effects exist but limited
- ❌ No smooth page transitions
- ❌ No scroll-triggered animations
- ❌ No image gallery transitions (swipe, fade)
- ❌ prefers-reduced-motion not implemented
- ❌ Animations need refinement for 60fps

#### 6. Performance Optimization
- ❌ No image lazy loading
- ❌ No responsive images (srcset)
- ❌ No bundle size optimization
- ❌ No code splitting beyond default
- ❌ No lighthouse audits performed
- ❌ No performance testing

#### 7. SEO & Discoverability
- ⚠️ Basic meta tags in place, but missing:
  - ❌ sitemap.xml
  - ❌ robots.txt
  - ❌ Schema.org structured data (Organization, Pet, LocalBusiness, BreadcrumbList)
  - ❌ Enhanced meta descriptions
  - ❌ Social sharing verification

#### 8. New Pages/Features
- ❌ Virtual Adoption page (`/virtualna-adopcia`)
- ❌ Success Stories page (`/uspesne-pribehy`)
- ❌ Success stories content collection

#### 9. Deployment & CI/CD
- ❌ No Cloudflare Pages configuration
- ❌ No GitHub Actions workflow
- ❌ No deployment documentation
- ❌ No environment variables setup
- ❌ No custom domain configuration
- ❌ No CI/CD pipeline

#### 10. Testing & Quality
- ❌ No unit tests (Vitest configured but unused)
- ❌ No E2E tests (no Playwright setup)
- ❌ No accessibility testing
- ❌ No cross-browser testing documentation
- ❌ No mobile device testing checklist

---

## Target State (Production Launch)

### User Experience Goals

1. **Potential Adopters** can:
   - Browse 20-40 dog profiles with complete information
   - Filter dogs by size, gender, energy level, kid-friendliness
   - View comprehensive dog details with photo galleries
   - Submit adoption inquiries via embedded forms
   - Share dog profiles on social media (Facebook, Instagram)
   - View success stories of adopted dogs
   - Sign up for newsletter updates
   - Contact shelter via multiple channels

2. **Shelter Staff** can:
   - Add new dog profiles via CMS admin interface
   - Edit existing dog information
   - Upload photos and videos through Cloudinary integration
   - Publish blog posts and success stories
   - Update static page content
   - Manage content without developer assistance

3. **Website Visitors** experience:
   - Fast loading (<2 seconds on 3G)
   - Smooth, professional animations
   - Excellent mobile experience
   - Accessible interface (WCAG AA compliance)
   - SEO-optimized pages (discoverable on Google)

### Technical Goals

1. **Performance Metrics**
   - Lighthouse Performance: 90+
   - Lighthouse Accessibility: 95+
   - Lighthouse Best Practices: 95+
   - Lighthouse SEO: 100
   - Page weight: <500KB initial load
   - Time to Interactive: <2.5s

2. **Content Completeness**
   - 20-40 dog profiles with photos
   - 5-10 blog posts
   - 5-10 success stories
   - All static pages fully written

3. **Feature Completeness**
   - Contact forms functional
   - Newsletter signup integrated
   - Virtual adoption page published
   - Success stories section live
   - CMS operational for staff
   - Social sharing working

4. **Production Readiness**
   - Site deployed to utulok-trencin.sk
   - SSL certificate configured
   - GitHub Actions CI/CD operational
   - Environment variables secured
   - Monitoring in place (Cloudflare Analytics)

---

## Implementation Plan

### Phase 1: Content Migration (Week 1-2)

**Goal**: Populate site with real dog profiles and essential content

#### Tasks

1. **Web Scraping Setup** (2-3 days)
   - [ ] Analyze utulok-trencin.sk HTML structure
   - [ ] Write scraping script (Node.js with Cheerio or Python with BeautifulSoup)
   - [ ] Extract dog data: name, breed, age, gender, description, photos
   - [ ] Download all dog images to `/public/images/dogs/[slug]/`
   - [ ] Map extracted data to our 40+ field schema
   - [ ] Handle missing fields with placeholders
   - [ ] Generate markdown files in `/src/content/dogs/`
   - [ ] Test all dog detail pages render correctly

2. **Content Quality Assurance** (1-2 days)
   - [ ] Review all scraped dog profiles
   - [ ] Ensure required fields are populated
   - [ ] Add missing personality descriptions
   - [ ] Verify image quality and orientation
   - [ ] Flag urgent adoption cases
   - [ ] Set featured dogs for homepage

3. **Blog & Static Content** (1-2 days)
   - [ ] Write 5-10 blog posts:
     - Dog care tips
     - Adoption success stories
     - Shelter updates
     - How-to guides (grooming, training)
   - [ ] Complete static page content:
     - Expand `/o-nas` (About Us)
     - Detail `/adopcia` process
     - Elaborate `/ako-pomoct` options
   - [ ] Proofread all Slovak language content

4. **Success Stories Collection** (1 day)
   - [ ] Create `successStories` content collection in `content.config.ts`
   - [ ] Design schema (dog name, adoption date, adopter name, testimonial, photos)
   - [ ] Gather 5-10 success stories from shelter
   - [ ] Write markdown files
   - [ ] Collect before/after photos

**Deliverables**:
- 20-40 dog profiles live
- 5-10 blog posts published
- 5-10 success stories documented
- All static pages content-complete

---

### Phase 2: Feature Development (Week 2-3)

**Goal**: Add missing features to enhance user engagement

#### Tasks

1. **Contact Forms** (2 days)
   - [ ] Choose form service (Formspree or Web3Forms free tier)
   - [ ] Create `ContactForm.tsx` component
   - [ ] Add validation (email format, required fields)
   - [ ] Create 3 form variants:
     - General contact (`/kontakt`)
     - Adoption inquiry (dog detail pages)
     - Volunteer signup (`/ako-pomoct`)
   - [ ] Implement success/error states with user feedback
   - [ ] Test form submissions end-to-end
   - [ ] Replace all mailto: links with form modals/sections

2. **Newsletter Signup** (1 day)
   - [ ] Sign up for MailerLite or Mailchimp free tier
   - [ ] Create `NewsletterForm.tsx` component
   - [ ] Add GDPR consent checkbox
   - [ ] Integrate API (MailerLite/Mailchimp)
   - [ ] Add to Footer (site-wide)
   - [ ] Add to Homepage (dedicated section)
   - [ ] Add to Blog pages
   - [ ] Configure confirmation email flow

3. **Virtual Adoption Page** (1-2 days)
   - [ ] Create `/src/pages/virtualna-adopcia.astro`
   - [ ] Write content:
     - What is virtual adoption
     - Benefits (support dog care, updates, tax deductible)
     - Pricing tiers (€5, €10, €20/month)
     - How it works
   - [ ] List dogs available for virtual adoption (pull from dogs collection)
   - [ ] Add contact form CTA (payment integration in Phase 2)
   - [ ] Design layout matching site aesthetic

4. **Success Stories Section** (1-2 days)
   - [ ] Create `/src/pages/uspesne-pribehy/index.astro` (listing)
   - [ ] Create `/src/pages/uspesne-pribehy/[...slug].astro` (detail)
   - [ ] Design card component for story grid
   - [ ] Implement filter by year
   - [ ] Add social sharing buttons
   - [ ] Create CTA on homepage linking to success stories

5. **Animations & Transitions** (2 days)
   - [ ] Install Framer Motion or use CSS animations
   - [ ] Add smooth page transitions (View Transitions API)
   - [ ] Enhance card hover effects (lift, shadow, scale)
   - [ ] Add scroll-triggered animations:
     - Fade in for sections
     - Slide up for cards
     - Stagger for grids
   - [ ] Implement `prefers-reduced-motion` media query
   - [ ] Test performance (60fps target)
   - [ ] Keep animations subtle and professional

6. **Image Optimization** (1-2 days)
   - [ ] Replace `<img>` tags with Astro `<Image>` component
   - [ ] Add `loading="lazy"` to below-fold images
   - [ ] Generate responsive images with srcset
   - [ ] Add blur placeholders (LQIP) using Astro Image
   - [ ] Optimize existing dog images (compress, resize)
   - [ ] Test page weight (<500KB target)
   - [ ] Verify lazy loading works correctly

**Deliverables**:
- All forms functional and tested
- Newsletter signup operational
- Virtual adoption page live
- Success stories section published
- Smooth animations implemented
- Images optimized with lazy loading

---

### Phase 3: CMS & Media Management (Week 3-4)

**Goal**: Enable shelter staff to manage content independently

#### Tasks

1. **Cloudinary Setup** (0.5 day)
   - [ ] Create Cloudinary free tier account
   - [ ] Configure upload presets
   - [ ] Set folder structure: `/dogs/`, `/blog/`, `/success-stories/`
   - [ ] Enable automatic optimization settings
   - [ ] Configure responsive image delivery
   - [ ] Test image and video uploads
   - [ ] Document upload guidelines for staff

2. **Decap CMS Configuration** (2-3 days)
   - [ ] Create `/public/admin/index.html`
   - [ ] Create `/public/admin/config.yml`
   - [ ] Configure GitHub OAuth:
     - Register OAuth app on GitHub
     - Add client ID and secret to config
     - Set authorization callback URL
   - [ ] Define collections:
     - Dogs (map all 40+ fields)
     - Blog posts
     - Success stories
     - Static pages (about, contact, adoption)
   - [ ] Configure Cloudinary media library integration
   - [ ] Create custom preview templates for each collection
   - [ ] Add field validation rules (required fields, formats)
   - [ ] Test CMS locally with `npx decap-server`

3. **CMS Testing & Documentation** (1 day)
   - [ ] Create test dog profile through CMS
   - [ ] Edit existing dog through CMS
   - [ ] Upload images via Cloudinary widget
   - [ ] Publish blog post through CMS
   - [ ] Verify all changes appear on site after rebuild
   - [ ] Write staff documentation:
     - How to access CMS (`/admin`)
     - How to add a new dog
     - How to edit existing content
     - How to upload images
     - Troubleshooting common issues
   - [ ] Create video tutorial (optional, 5-10 min)

4. **Staff Training** (0.5 day)
   - [ ] Schedule training session with 2 shelter administrators
   - [ ] Walk through CMS interface
   - [ ] Practice adding/editing a dog profile
   - [ ] Demonstrate image upload
   - [ ] Answer questions
   - [ ] Provide documentation and support contact

**Deliverables**:
- Cloudinary configured and tested
- Decap CMS fully operational at `/admin`
- Staff trained and able to manage content
- Documentation complete

---

### Phase 4: SEO & Polish (Week 4)

**Goal**: Optimize for search engines and refine user experience

#### Tasks

1. **SEO Enhancements** (1-2 days)
   - [ ] Install `@astrojs/sitemap` integration
   - [ ] Generate `sitemap.xml` automatically
   - [ ] Create `/public/robots.txt`:
     ```
     User-agent: *
     Allow: /
     Disallow: /admin/
     Sitemap: https://utulok-trencin.sk/sitemap.xml
     ```
   - [ ] Add Schema.org structured data:
     - Organization schema (homepage)
     - Pet schema (dog detail pages)
     - BreadcrumbList (navigation)
     - LocalBusiness schema (contact page)
   - [ ] Improve meta descriptions (unique for each page)
   - [ ] Verify Open Graph images:
     - Generate OG images for dog profiles
     - Test Facebook/Instagram sharing
   - [ ] Submit sitemap to Google Search Console

2. **Accessibility Audit** (1 day)
   - [ ] Run axe DevTools on all pages
   - [ ] Fix color contrast issues (if any)
   - [ ] Add ARIA labels where needed
   - [ ] Verify keyboard navigation (Tab, Enter, Esc)
   - [ ] Test with screen reader (NVDA or JAWS)
   - [ ] Ensure all images have descriptive alt text
   - [ ] Verify form labels and error messages
   - [ ] Check touch target sizes (44×44px minimum)

3. **Performance Optimization** (1-2 days)
   - [ ] Run Lighthouse audits on all pages
   - [ ] Optimize JavaScript bundle:
     - Remove unused dependencies
     - Code split by route
     - Minimize React components
   - [ ] Optimize CSS:
     - Purge unused Tailwind classes
     - Inline critical CSS
     - Defer non-critical CSS
   - [ ] Configure caching headers (Cloudflare)
   - [ ] Optimize font loading (preload, font-display)
   - [ ] Test on slow 3G connection
   - [ ] Achieve target scores:
     - Performance: 90+
     - Accessibility: 95+
     - Best Practices: 95+
     - SEO: 100

4. **Cross-Browser & Device Testing** (0.5 day)
   - [ ] Test on Chrome, Firefox, Safari, Edge (last 2 versions)
   - [ ] Test on mobile devices:
     - iOS (Safari)
     - Android (Chrome)
   - [ ] Verify dark mode on all browsers
   - [ ] Test forms on mobile
   - [ ] Check responsive breakpoints
   - [ ] Document any browser-specific issues

**Deliverables**:
- SEO fully optimized
- Accessibility compliant (WCAG AA)
- Performance targets met
- Cross-browser compatibility verified

---

### Phase 5: Deployment (Week 4-5)

**Goal**: Deploy to production at utulok-trencin.sk

#### Tasks

1. **Cloudflare Pages Setup** (0.5 day)
   - [ ] Create Cloudflare account (free tier)
   - [ ] Connect GitHub repository
   - [ ] Configure build settings:
     - Build command: `npm run build`
     - Output directory: `dist`
     - Node version: 18
   - [ ] Add environment variables:
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
     - `FORM_SERVICE_API_KEY` (Formspree/Web3Forms)
     - `NEWSLETTER_API_KEY` (MailerLite/Mailchimp)
   - [ ] Test preview deployment

2. **Domain Configuration** (0.5 day)
   - [ ] Add custom domain: utulok-trencin.sk
   - [ ] Configure DNS records (CNAME or A record)
   - [ ] Verify SSL certificate
   - [ ] Test HTTPS redirection
   - [ ] Configure www redirect (www → non-www or vice versa)

3. **GitHub Actions CI/CD** (1 day)
   - [ ] Create `.github/workflows/deploy.yml`
   - [ ] Configure workflow:
     - Trigger on push to `main` branch
     - Run TypeScript checks
     - Run build
     - Deploy to Cloudflare Pages
     - Run smoke tests (check homepage loads)
   - [ ] Set up preview deployments for PRs
   - [ ] Add status badge to README
   - [ ] Test workflow end-to-end

4. **Pre-Launch Checklist** (0.5 day)
   - [ ] Final content review (typos, broken links)
   - [ ] Verify all forms work in production
   - [ ] Test CMS on production domain
   - [ ] Check Cloudinary images load correctly
   - [ ] Verify newsletter signup works
   - [ ] Test social sharing (Facebook, Instagram)
   - [ ] Run final Lighthouse audit
   - [ ] Backup current utulok-trencin.sk site (if applicable)

5. **Launch & Monitoring** (1 day)
   - [ ] Deploy to production (merge to main, trigger CI/CD)
   - [ ] Monitor deployment logs
   - [ ] Verify site is live at utulok-trencin.sk
   - [ ] Test all critical user flows:
     - Browse dogs → View detail → Submit inquiry
     - Sign up for newsletter
     - Submit contact form
     - Share dog on social media
   - [ ] Set up Cloudflare Analytics
   - [ ] Configure error tracking (optional: Sentry)
   - [ ] Announce launch to shelter and supporters

**Deliverables**:
- Site live at utulok-trencin.sk
- CI/CD pipeline operational
- Monitoring configured
- Launch successful

---

## Priority Matrix

| Task | Impact | Effort | Priority | Phase |
|------|--------|--------|----------|-------|
| Scrape dog content | High | Medium | P0 | 1 |
| Contact forms | High | Low | P0 | 2 |
| Image optimization | High | Medium | P1 | 2 |
| Decap CMS setup | High | Medium | P1 | 3 |
| Cloudinary integration | High | Low | P1 | 3 |
| Newsletter signup | Medium | Low | P1 | 2 |
| Success stories page | Medium | Medium | P1 | 2 |
| Virtual adoption page | Medium | Low | P1 | 2 |
| Animations | Medium | Medium | P2 | 2 |
| SEO enhancements | High | Low | P2 | 4 |
| Performance optimization | High | Medium | P2 | 4 |
| Deployment setup | High | Low | P2 | 5 |
| Accessibility audit | Medium | Low | P2 | 4 |
| GitHub Actions CI/CD | Medium | Low | P2 | 5 |

**Priority Levels**:
- **P0**: Critical for MVP, blocks other work
- **P1**: Important for launch, can be done in parallel
- **P2**: Quality improvements, can be done after P1

---

## Risk Assessment

### High Risk

1. **Content Migration Complexity**
   - **Risk**: Scraping may fail if utulok-trencin.sk structure is complex
   - **Mitigation**: Start with manual scraping of 5 dogs, then automate. Fallback to manual data entry if needed.

2. **CMS Learning Curve**
   - **Risk**: Shelter staff struggle with Decap CMS
   - **Mitigation**: Create comprehensive documentation, video tutorial, and offer ongoing support.

3. **Timeline Pressure**
   - **Risk**: 4-6 weeks may be optimistic
   - **Mitigation**: Prioritize P0 tasks, defer nice-to-haves to Phase 2.

### Medium Risk

1. **Free Tier Limitations**
   - **Risk**: Cloudinary/Cloudflare/Form services hit limits
   - **Mitigation**: Monitor usage closely, have upgrade path documented.

2. **Performance on Low-End Devices**
   - **Risk**: Animations/images may lag on old phones
   - **Mitigation**: Test early on real devices, use prefers-reduced-motion.

3. **Social Sharing Issues**
   - **Risk**: Open Graph images don't display correctly
   - **Mitigation**: Test sharing on Facebook/Instagram early, iterate.

### Low Risk

1. **Browser Compatibility**
   - **Risk**: Features break on older browsers
   - **Mitigation**: Progressive enhancement, test on target browsers.

2. **Deployment Issues**
   - **Risk**: Cloudflare Pages deployment fails
   - **Mitigation**: Use well-documented setup, test preview deployments first.

---

## Success Metrics

### Quantitative Metrics (Post-Launch)

1. **Performance**
   - Lighthouse Performance Score: 90+ ✅
   - Page Load Time (3G): <2 seconds ✅
   - Time to Interactive: <2.5 seconds ✅

2. **Content**
   - Dog Profiles: 20-40 ✅
   - Blog Posts: 5-10 ✅
   - Success Stories: 5-10 ✅

3. **Engagement** (30 days post-launch)
   - Adoption Inquiries: 10+ per month
   - Newsletter Signups: 50+ per month
   - Page Views: 1000+ per month

### Qualitative Metrics

1. **User Experience**
   - Shelter staff can add/edit dogs via CMS ✅
   - Forms submit successfully ✅
   - Site is accessible on mobile ✅
   - Animations are smooth, not janky ✅

2. **Stakeholder Satisfaction**
   - Shelter approves design and content ✅
   - Staff comfortable using CMS ✅
   - Positive feedback from potential adopters

---

## Out of Scope (Phase 2)

The following features are intentionally deferred to post-launch:

1. **Payment Processing**
   - Online donations
   - Virtual adoption payments
   - Monthly sponsorships
   - **Why deferred**: Requires legal compliance, payment gateway setup, security considerations

2. **Multi-Language Support**
   - English translation
   - Language switcher
   - **Why deferred**: Low priority for local shelter, can add based on demand

3. **User Accounts**
   - Adopter accounts
   - Volunteer portal
   - Authentication system
   - **Why deferred**: Not needed for MVP, adds complexity

4. **Advanced Features**
   - Mobile app
   - Instagram feed integration
   - Volunteer management system
   - Analytics dashboard for staff
   - **Why deferred**: Nice-to-have, not critical for adoption goals

5. **Testing Infrastructure**
   - Unit tests
   - E2E tests with Playwright
   - Visual regression tests
   - **Why deferred**: Time constraints, manual testing sufficient for MVP

---

## Next Steps (Immediate Actions)

1. **This Week**:
   - [ ] Analyze utulok-trencin.sk HTML structure
   - [ ] Write scraping script (or start manual data entry)
   - [ ] Scrape first 5 dog profiles
   - [ ] Test dog detail pages render correctly

2. **Next Week**:
   - [ ] Complete dog content migration (20+ dogs)
   - [ ] Start contact form implementation
   - [ ] Begin image optimization work

3. **Week 3**:
   - [ ] Implement all forms
   - [ ] Add success stories and virtual adoption pages
   - [ ] Begin CMS setup

4. **Week 4**:
   - [ ] Complete CMS and train staff
   - [ ] SEO optimization
   - [ ] Performance testing

5. **Week 5**:
   - [ ] Deployment
   - [ ] Final testing
   - [ ] Launch! 🚀

---

## Resources & References

### Documentation
- [Astro Docs](https://docs.astro.build)
- [Decap CMS Docs](https://decapcms.org/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools
- **Scraping**: Cheerio (Node.js) or BeautifulSoup (Python)
- **Forms**: Formspree or Web3Forms
- **Newsletter**: MailerLite or Mailchimp
- **Animations**: Framer Motion or CSS animations
- **Testing**: Chrome DevTools, Lighthouse, axe DevTools

### Design Reference
- Original spec colors: Terracotta (#E87461), Cream (#F5EBE0), Green (#4A6B5C)
- Current colors: Browns, Terracotta (#B65636), Sage (#6B8273)
- Fonts: DM Sans (body), Mali (headings)

---

## Appendix: File Structure

```
dog-shelter-website/
├── .ideas/                        # Project planning docs (gitignored)
│   ├── PROJECT_BRIEF.md
│   ├── TECHNICAL_SPEC.md
│   ├── DEVELOPMENT_PLAN.md
│   └── DESIGN_SYSTEM.md
├── public/
│   ├── admin/                     # TO ADD: Decap CMS config
│   │   ├── index.html
│   │   └── config.yml
│   ├── images/
│   │   ├── dogs/[slug]/          # Dog photos by slug
│   │   └── *.jpg                 # General images
│   ├── scripts/
│   │   └── theme-init.js         # Dark mode initialization
│   ├── favicon.svg
│   └── logo-utulok.png
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   └── Logo.astro
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── ThemeToggle.tsx
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── separator.tsx
│   │   │   └── sheet.tsx
│   │   └── Button.astro
│   ├── config/
│   │   └── site.config.ts         # Site metadata, navigation
│   ├── content/
│   │   ├── dogs/                  # Dog profiles (7 currently)
│   │   │   ├── max.md
│   │   │   ├── bella.md
│   │   │   ├── raischa.md
│   │   │   └── ...
│   │   └── blog/                  # Blog posts (1 currently)
│   │       └── cipovanie-psov.md
│   ├── layouts/
│   │   └── main.astro             # Base layout with meta tags
│   ├── lib/
│   │   ├── theme.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.astro        # Blog listing
│   │   │   └── [...slug].astro   # Blog post detail
│   │   ├── psici/
│   │   │   ├── index.astro        # Dog listing
│   │   │   └── [...slug].astro   # Dog detail
│   │   ├── index.astro            # Homepage
│   │   ├── adopcia.astro          # Adoption guide
│   │   ├── ako-pomoct.astro       # How to help
│   │   ├── kontakt.astro          # Contact
│   │   ├── o-nas.astro            # About us
│   │   └── 404.astro              # Error page
│   ├── styles/
│   │   └── global.css             # Tailwind + theme variables
│   └── content.config.ts          # Content collections schema
├── .gitignore
├── astro.config.mjs
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── IMPLEMENTATION_ROADMAP.md      # This file

TO ADD:
├── .github/
│   └── workflows/
│       └── deploy.yml             # CI/CD workflow
├── public/
│   ├── sitemap.xml                # Auto-generated
│   └── robots.txt
└── src/
    ├── components/
    │   ├── ContactForm.tsx
    │   ├── NewsletterForm.tsx
    │   └── DogCard.tsx (enhanced)
    └── pages/
        ├── virtualna-adopcia.astro
        └── uspesne-pribehy/
            ├── index.astro
            └── [...slug].astro
```

---

**Document Status**: Living document, update as implementation progresses
**Owner**: Maria (Developer)
**Stakeholder**: Trenčiansky útulok (Shelter Staff)
**Review Cadence**: Weekly during development
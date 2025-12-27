# Tasks: Dog Shelter Website MVP Completion

**Input**: Design documents from `/specs/01-frontend/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/
**Branch**: `01-frontend`
**Status**: Ready for Implementation

**Tests**: No automated tests requested in specification. Manual testing will be performed per quickstart.md.

**Organization**: Tasks grouped by user story to enable independent implementation and testing. Each story can be delivered as an incremental MVP.

---

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1-US8)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, environment configuration, and external service setup

### Environment & Dependencies

- [ ] T001 Create `.env` file in project root with all required environment variables per quickstart.md
- [ ] T002 [P] Create Cloudinary account and obtain cloud_name, api_key, api_secret credentials
- [ ] T003 [P] Create Web3Forms account and obtain access key for form submissions
- [ ] T004 [P] Create MailerLite account and obtain API key for newsletter subscriptions
- [ ] T005 [P] Configure Cloudinary upload presets: dog_profiles, blog_images, success_stories per contracts/cloudinary-api.md
- [ ] T006 [P] Configure MailerLite custom fields (consent, source, signup_date) and double opt-in per contracts/newsletter-api.md
- [ ] T007 Add PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env
- [ ] T008 Add PUBLIC_WEB3FORMS_KEY to .env
- [ ] T009 Add PUBLIC_MAILERLITE_KEY to .env

### Utility Functions

- [ ] T010 [P] Create src/utils/cloudinary.ts with helper functions (getCloudinaryUrl, getCloudinaryImageSrcset, extractPublicId) per contracts/cloudinary-api.md
- [ ] T011 [P] Create src/utils/formValidation.ts with validation functions (validateEmail, validatePhone, validateName, validateMessage) per contracts/form-api.md
- [ ] T012 [P] Create src/utils/newsletterValidation.ts with validation functions (validateEmail, validateConsent) per contracts/newsletter-api.md

### CMS Configuration

- [ ] T013 Create public/admin/index.html as Decap CMS entry point per research.md
- [ ] T014 Create public/admin/config.yml with GitHub OAuth backend configuration per research.md
- [ ] T015 Add dog collection to public/admin/config.yml with all 40+ fields in Slovak labels per data-model.md
- [ ] T016 Add blog collection to public/admin/config.yml per data-model.md
- [ ] T017 Add success-stories collection to public/admin/config.yml per data-model.md
- [ ] T018 Configure Cloudinary media library integration in public/admin/config.yml
- [ ] T019 Register GitHub OAuth app for Decap CMS authentication per quickstart.md
- [ ] T020 Configure Netlify OAuth gateway or Cloudflare Workers OAuth per quickstart.md

**Checkpoint**: Setup complete - external services configured, utilities ready, CMS configured

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story implementation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Content Collections Schema

- [ ] T021 Update src/content.config.ts to add success-stories collection schema per data-model.md
- [ ] T022 Verify dogs collection schema includes all 40+ fields per data-model.md
- [ ] T023 Verify blog collection schema matches data-model.md requirements

### SEO & Performance Foundations

- [ ] T024 Create src/components/SEO.astro component for meta tags, Open Graph, Twitter Cards per FR-049 to FR-051
- [ ] T025 Configure astro.config.mjs image optimization settings (Sharp, Cloudinary domains) per research.md
- [ ] T026 Update src/layouts/main.astro to include SEO component with dynamic meta tags
- [ ] T027 Create public/robots.txt allowing all public pages, disallowing /admin per FR-044

### Animation Utilities

- [ ] T028 [P] Create src/components/animations/ScrollReveal.tsx for scroll-triggered animations per research.md
- [ ] T029 [P] Add CSS animation utilities to src/styles/global.css (card-hover, fade-in, slide-up) per research.md

### Deployment Infrastructure

- [ ] T030 Create .github/workflows/deploy.yml for GitHub Actions CI/CD per research.md workflow configuration
- [ ] T031 Add GitHub repository secrets (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, WEB3FORMS_KEY, MAILERLITE_KEY) per quickstart.md
- [ ] T032 Create Cloudflare Pages project and configure build settings (build command: pnpm run build, output: dist) per quickstart.md
- [ ] T033 Add environment variables to Cloudflare Pages dashboard per quickstart.md

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Complete Dog Catalog (Priority: P1) 🎯 MVP

**Goal**: Provide 20-40 dog profiles with complete information, photos, and filtering to enable potential adopters to find their ideal companion

**Independent Test**: Navigate to /psici, filter by size "Stredný" and gender "Suka", verify 5+ results display with complete information (photo, name, age, personality). Click a dog to view full profile with gallery.

### Dog Content Migration

- [ ] T034 [US1] Create scripts/scrape-dogs.js to scrape dog profiles from utulok-trencin.sk using Cheerio per research.md
- [ ] T035 [US1] Run scripts/scrape-dogs.js to extract 20-40 dog profiles (name, breed, age, gender, description, images) per FR-001
- [ ] T036 [US1] Convert scraped dog data to markdown files in src/content/dogs/ with frontmatter matching data-model.md schema
- [ ] T037 [US1] Download dog images and upload to Cloudinary /dogs/ folder using upload preset dog_profiles per contracts/cloudinary-api.md
- [ ] T038 [US1] Update dog markdown frontmatter with Cloudinary image URLs replacing local paths
- [ ] T039 [US1] Verify all dog profiles have required fields (name, breed, age, gender, image, description) per FR-001

### Dog Listing Page Enhancements

- [ ] T040 [P] [US1] Update src/pages/psici/index.astro to use Cloudinary URLs for dog images with lazy loading per FR-028
- [ ] T041 [P] [US1] Add responsive srcset generation to dog cards in src/pages/psici/index.astro using getCloudinaryImageSrcset utility per FR-029
- [ ] T042 [P] [US1] Apply card-hover CSS animation class to dog cards in src/pages/psici/index.astro per FR-037
- [ ] T043 [US1] Verify urgent adoption badge displays correctly on listing page per FR-004

### Dog Detail Page Enhancements

- [ ] T044 [P] [US1] Update src/pages/psici/[...slug].astro to use Cloudinary URLs for all dog images (main + gallery) per FR-002
- [ ] T045 [P] [US1] Implement responsive image optimization with srcset in dog detail template using Cloudinary transformations per FR-029
- [ ] T046 [P] [US1] Add lazy loading (loading="lazy") to below-fold images in dog detail template per FR-028
- [ ] T047 [P] [US1] Implement smooth gallery transitions when clicking thumbnails in dog detail template per FR-041
- [ ] T048 [US1] Add Pet Schema.org structured data to dog detail template (breed, age, gender) per FR-047
- [ ] T049 [US1] Add BreadcrumbList Schema.org structured data to dog detail template per FR-048
- [ ] T050 [US1] Configure unique Open Graph tags for each dog (photo, name, personality) per FR-050
- [ ] T051 [US1] Add Twitter Card tags to dog detail template per FR-051
- [ ] T052 [US1] Verify all dog detail pages have unique meta titles and descriptions per FR-049

### SEO & Discoverability

- [ ] T053 [P] [US1] Create src/pages/sitemap.xml.ts to auto-generate sitemap including all dog profiles per FR-043
- [ ] T054 [P] [US1] Add Organization Schema.org structured data to src/pages/index.astro (shelter name, address, phone, hours) per FR-045

**Checkpoint**: User Story 1 complete - 20-40 dog profiles browsable with filters, complete information, and SEO optimization

---

## Phase 4: User Story 2 - Submit Adoption Inquiries (Priority: P1) 🎯 MVP

**Goal**: Replace mailto links with embedded forms to reduce friction and increase adoption inquiry conversion rates

**Independent Test**: Navigate to any dog detail page, fill out adoption inquiry form with valid data, submit, verify success message appears. Check Web3Forms dashboard for submission received.

### Form Components

- [ ] T055 [P] [US2] Create src/components/forms/ContactForm.tsx with Web3Forms integration per contracts/form-api.md
- [ ] T056 [P] [US2] Create src/components/forms/AdoptionInquiryForm.tsx with dog-specific fields (dogName, dogSlug) per contracts/form-api.md
- [ ] T057 [P] [US2] Create src/components/forms/VolunteerForm.tsx with availability field per contracts/form-api.md
- [ ] T058 [US2] Implement client-side validation in all form components using validateContactForm from src/utils/formValidation.ts per FR-011, FR-012
- [ ] T059 [US2] Implement success/error state handling in all form components per FR-013, FR-014
- [ ] T060 [US2] Configure form honeypot field (botcheck) for spam protection per contracts/form-api.md

### Form Integration

- [ ] T061 [P] [US2] Integrate ContactForm component into src/pages/kontakt.astro replacing mailto link per FR-009
- [ ] T062 [P] [US2] Integrate AdoptionInquiryForm component into src/pages/psici/[...slug].astro replacing mailto link per FR-008
- [ ] T063 [P] [US2] Integrate VolunteerForm component into src/pages/ako-pomoct.astro replacing mailto link per FR-010
- [ ] T064 [US2] Test form submissions end-to-end (fill, validate, submit, verify email delivery) per SC-015

**Checkpoint**: User Story 2 complete - all forms functional, validated, and submitting to Web3Forms

---

## Phase 5: User Story 3 - Access via CMS (Priority: P1) 🎯 MVP

**Goal**: Enable shelter staff to independently manage content (dogs, blog, success stories) without developer assistance

**Independent Test**: Log in to /admin with GitHub credentials, create new dog profile with photos uploaded via Cloudinary, preview changes, publish. Verify new dog appears on public site after build completes.

### CMS Testing & Documentation

- [ ] T065 [US3] Test CMS login flow with GitHub OAuth per FR-019
- [ ] T066 [US3] Test adding new dog profile via CMS with all required fields per FR-020
- [ ] T067 [US3] Test uploading images to Cloudinary via CMS media widget per FR-022
- [ ] T068 [US3] Test editing existing dog profile via CMS per FR-021
- [ ] T069 [US3] Test CMS preview functionality before publishing per FR-024
- [ ] T070 [US3] Test CMS publish triggers Git commit and site rebuild per FR-025, FR-027
- [ ] T071 [US3] Verify CMS field validation prevents publishing incomplete profiles per FR-026
- [ ] T072 [US3] Create Slovak language documentation for shelter staff on using CMS per quickstart.md (screenshots, step-by-step)

**Checkpoint**: User Story 3 complete - CMS fully functional, staff can manage content independently

---

## Phase 6: User Story 4 - Experience Fast, Optimized Pages (Priority: P2)

**Goal**: Ensure fast page loads (<2s on 3G), smooth 60fps animations, and optimized images for excellent mobile experience

**Independent Test**: Run Lighthouse audit on /psici and dog detail pages. Verify Performance 90+, Accessibility 95+. Test on simulated 3G connection and measure Time to Interactive <2.5s.

### Image Optimization

- [ ] T073 [P] [US4] Audit all images in project and ensure lazy loading (loading="lazy") on below-fold images per FR-028
- [ ] T074 [P] [US4] Implement LQIP (blur placeholders) for images using CSS blur technique per research.md
- [ ] T075 [P] [US4] Optimize Cloudinary transformations (f_auto, q_auto) on all image URLs per contracts/cloudinary-api.md
- [ ] T076 [US4] Verify responsive srcset is correctly generated for mobile/tablet/desktop per FR-029

### Animation Performance

- [ ] T077 [P] [US4] Implement scroll-triggered fade-in animations using ScrollReveal component on homepage sections per FR-038
- [ ] T078 [P] [US4] Test animations respect prefers-reduced-motion media query per FR-039
- [ ] T079 [US4] Profile animation performance with browser DevTools, ensure 60fps on all interactions per FR-040

### Performance Auditing

- [ ] T080 [US4] Run Lighthouse audit on homepage, verify Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100 per FR-031, FR-052, FR-053
- [ ] T081 [US4] Run Lighthouse audit on /psici listing page, verify same scores per FR-031
- [ ] T082 [US4] Run Lighthouse audit on dog detail page, verify same scores per FR-031
- [ ] T083 [US4] Test page load on simulated 3G connection, verify Time to Interactive <2.5s per FR-032, FR-033
- [ ] T084 [US4] Verify JavaScript bundle size <50KB gzipped per FR-034
- [ ] T085 [US4] Verify CSS bundle size <20KB gzipped per FR-035
- [ ] T086 [US4] Verify total page weight <500KB for initial load per FR-036

**Checkpoint**: User Story 4 complete - all pages meet performance targets, animations smooth

---

## Phase 7: User Story 5 - Find Dogs via Search Engines (Priority: P2)

**Goal**: Enable organic discovery of dog profiles and shelter via Google search with rich previews

**Independent Test**: Search "adoptovať psa Trenčín" on Google (after indexing), verify site appears in results. Share dog profile link on Facebook, verify Open Graph preview shows dog photo, name, description.

### Structured Data

- [ ] T087 [P] [US5] Verify sitemap.xml includes all public pages (dogs, blog, success stories, static) per FR-043
- [ ] T088 [P] [US5] Add LocalBusiness Schema.org structured data to src/pages/kontakt.astro per FR-046
- [ ] T089 [US5] Test Open Graph preview for dog profiles using Facebook Sharing Debugger per FR-050
- [ ] T090 [US5] Test Twitter Card preview for dog profiles using Twitter Card Validator per FR-051
- [ ] T091 [US5] Verify all pages have unique, SEO-optimized meta descriptions per FR-049
- [ ] T092 [US5] Submit sitemap to Google Search Console for indexing

**Checkpoint**: User Story 5 complete - SEO optimized, structured data implemented, ready for search indexing

---

## Phase 8: User Story 6 - Subscribe to Updates (Priority: P3)

**Goal**: Enable newsletter signups to build engaged community and re-engage visitors

**Independent Test**: Fill out newsletter form in footer with valid email, submit, verify success message. Check MailerLite dashboard shows new subscriber added.

### Newsletter Component

- [ ] T093 [P] [US6] Create src/components/forms/NewsletterForm.tsx with MailerLite API integration per contracts/newsletter-api.md
- [ ] T094 [US6] Implement client-side validation (email, GDPR consent) using validateNewsletterForm per FR-011, FR-017
- [ ] T095 [US6] Implement success/error state handling with Slovak language messages per contracts/newsletter-api.md
- [ ] T096 [US6] Add GDPR consent checkbox with link to privacy policy per FR-017

### Newsletter Integration

- [ ] T097 [P] [US6] Add NewsletterForm to src/components/layout/Footer.astro (site-wide) per FR-016
- [ ] T098 [P] [US6] Add NewsletterForm to homepage src/pages/index.astro in dedicated section per FR-016
- [ ] T099 [P] [US6] Add NewsletterForm to blog post template src/pages/blog/[...slug].astro per FR-016
- [ ] T100 [US6] Test newsletter signup end-to-end (submit, verify double opt-in email, confirm subscription) per SC-009

**Checkpoint**: User Story 6 complete - newsletter signups functional across site

---

## Phase 9: User Story 7 - Learn About Virtual Adoption (Priority: P3)

**Goal**: Provide information about virtual adoption program and enable visitors to express sponsorship interest

**Independent Test**: Navigate to /virtualna-adopcia, read program explanation, view eligible dogs, click contact CTA to express interest.

### Virtual Adoption Page

- [ ] T101 [US7] Create src/pages/virtualna-adopcia.astro with program explanation and benefits per FR-007
- [ ] T102 [US7] Add pricing tier information (€5, €10, €20/month) to virtual adoption page per FR-007
- [ ] T103 [US7] Add "How it works" section explaining sponsorship process per User Story 7 acceptance scenarios
- [ ] T104 [US7] List dogs available for virtual adoption (filter dogs where virtualAdoptionAvailable=true) per FR-007
- [ ] T105 [US7] Add contact form CTA for virtual adoption inquiries (reuse ContactForm component)
- [ ] T106 [US7] Add virtual adoption section to homepage with link to /virtualna-adopcia page

**Checkpoint**: User Story 7 complete - virtual adoption program explained, dogs listed, contact enabled

---

## Phase 10: User Story 8 - View Success Stories (Priority: P3)

**Goal**: Build trust and inspire potential adopters through success stories with before/after photos and testimonials

**Independent Test**: Navigate to /uspesne-pribehy, filter stories by year, click story to read full testimonial with photos.

### Success Stories Content

- [ ] T107 [US8] Create 5-10 sample success story markdown files in src/content/success-stories/ per data-model.md schema
- [ ] T108 [US8] Upload success story photos to Cloudinary /success-stories/ folder per contracts/cloudinary-api.md
- [ ] T109 [US8] Update success story markdown with Cloudinary image URLs

### Success Stories Pages

- [ ] T110 [P] [US8] Create src/pages/uspesne-pribehy/index.astro listing page with grid layout per FR-006
- [ ] T111 [P] [US8] Create src/pages/uspesne-pribehy/[...slug].astro detail page template per FR-006
- [ ] T112 [US8] Implement year filter on success stories listing page per User Story 8 acceptance scenarios
- [ ] T113 [US8] Add social sharing buttons to success story detail pages per User Story 8 acceptance scenarios
- [ ] T114 [US8] Add featured success stories section to homepage with link to /uspesne-pribehy per User Story 8 acceptance scenarios

**Checkpoint**: User Story 8 complete - success stories published, filterable, shareable

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements affecting multiple user stories, production readiness

### Accessibility Compliance

- [ ] T115 [P] Audit all images for descriptive alt text (dog photos: "Meno - Plemeno") per FR-054
- [ ] T116 [P] Verify color contrast ratios meet WCAG AA (4.5:1 text, 3:1 UI) using axe DevTools per FR-055
- [ ] T117 [P] Test keyboard navigation (Tab, Enter, Escape) on all interactive elements per FR-056
- [ ] T118 [P] Verify touch targets are minimum 44×44px on mobile per FR-057
- [ ] T119 [P] Verify visible focus indicators on all interactive elements per FR-058
- [ ] T120 Verify semantic HTML (heading hierarchy, nav, main, footer) per FR-059

### Content Quality

- [ ] T121 [P] Proofread all Slovak language text (static pages, forms, labels) for grammar/spelling per SC-020
- [ ] T122 [P] Test all links across site, verify no 404 errors per SC-021
- [ ] T123 Create 5-10 blog posts in src/content/blog/ with Slovak content per FR-005

### Production Preparation

- [ ] T124 Configure custom domain utulok-trencin.sk in Cloudflare Pages with SSL per FR-061
- [ ] T125 Configure Cloudflare Analytics for monitoring per FR-067
- [ ] T126 Run full quickstart.md validation checklist per Phase N requirements
- [ ] T127 Create privacy policy page at src/pages/ochrana-udajov.astro for GDPR compliance per contracts/newsletter-api.md
- [ ] T128 Test site on iOS Safari and Android Chrome (real devices) per SC-012
- [ ] T129 Verify dark mode works correctly without color contrast violations per SC-023
- [ ] T130 Final end-to-end testing: browse dogs, submit forms, test CMS, verify performance

**Checkpoint**: Site production-ready - all quality gates passed, ready for launch

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phases 3-10)**: All depend on Foundational phase completion
  - User stories CAN proceed in parallel (if staffed)
  - OR sequentially in priority order (P1 → P2 → P3) for solo developer
  - US1, US2, US3 are MVP (P1) - highest priority
- **Polish (Phase 11)**: Depends on desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories ✅
- **User Story 2 (P1)**: Can start after Foundational - No dependencies on other stories ✅
- **User Story 3 (P1)**: Can start after Foundational - No dependencies on other stories ✅
- **User Story 4 (P2)**: Can start after Foundational - Enhances US1 but independent ✅
- **User Story 5 (P2)**: Can start after Foundational - Enhances US1 but independent ✅
- **User Story 6 (P3)**: Can start after Foundational - No dependencies on other stories ✅
- **User Story 7 (P3)**: Can start after Foundational - No dependencies on other stories ✅
- **User Story 8 (P3)**: Can start after Foundational - No dependencies on other stories ✅

### Within Each User Story

- Tasks marked [P] can run in parallel (different files)
- Tasks without [P] have sequential dependencies
- Complete story checkpoint before moving to next priority

### Parallel Opportunities

**Setup Phase (Phase 1)**:
```
T002, T003, T004 (account creation) → parallel
T005, T006 (service configuration) → parallel
T010, T011, T012 (utility files) → parallel
```

**Foundational Phase (Phase 2)**:
```
T028, T029 (animation utilities) → parallel
```

**User Story 1 (Phase 3)**:
```
T040, T041, T042 (listing page updates) → parallel
T044, T045, T046, T047 (detail page updates) → parallel
T053, T054 (SEO structured data) → parallel
```

**User Story 2 (Phase 4)**:
```
T055, T056, T057 (form components) → parallel
T061, T062, T063 (form integration) → parallel
```

**User Story 4 (Phase 6)**:
```
T073, T074, T075 (image optimization) → parallel
T077, T078 (animations) → parallel
```

**User Story 5 (Phase 7)**:
```
T087, T088 (structured data) → parallel
```

**User Story 6 (Phase 8)**:
```
T097, T098, T099 (newsletter integration) → parallel
```

**User Story 8 (Phase 10)**:
```
T110, T111 (success stories pages) → parallel
```

**Polish Phase (Phase 11)**:
```
T115, T116, T117, T118, T119 (accessibility audits) → parallel
T121, T122, T123 (content quality) → parallel
```

---

## Parallel Example: User Story 1 Implementation

```bash
# Step 1: Dog content migration (sequential)
Task: T034 Create scrape-dogs.js script
Task: T035 Run scraper to extract 20-40 profiles
Task: T036 Convert to markdown files
Task: T037 Upload images to Cloudinary
Task: T038 Update markdown with Cloudinary URLs
Task: T039 Verify required fields

# Step 2: Launch listing page updates in parallel
Parallel: T040 Update listing page Cloudinary URLs
Parallel: T041 Add responsive srcset to dog cards
Parallel: T042 Apply card-hover animations

# Step 3: Launch detail page updates in parallel
Parallel: T044 Update detail page Cloudinary URLs
Parallel: T045 Implement responsive image optimization
Parallel: T046 Add lazy loading to below-fold images
Parallel: T047 Implement gallery transitions

# Step 4: Add structured data (sequential, depends on templates)
Task: T048 Add Pet Schema.org to detail template
Task: T049 Add BreadcrumbList Schema.org
Task: T050 Configure Open Graph tags
Task: T051 Add Twitter Card tags
Task: T052 Verify unique meta titles/descriptions

# Step 5: Launch SEO tasks in parallel
Parallel: T053 Create sitemap.xml
Parallel: T054 Add Organization schema to homepage
```

---

## Implementation Strategy

### MVP First (User Stories 1, 2, 3 Only)

**Fastest path to production value**:

1. Complete Phase 1: Setup (T001-T020) → ~2-3 hours
2. Complete Phase 2: Foundational (T021-T033) → ~2-3 hours
3. Complete Phase 3: User Story 1 (T034-T054) → ~6-8 hours
4. Complete Phase 4: User Story 2 (T055-T064) → ~3-4 hours
5. Complete Phase 5: User Story 3 (T065-T072) → ~2-3 hours
6. **STOP and VALIDATE**: Test MVP independently
7. Deploy to production - website is functional!

**MVP delivers**: Browse 20-40 dogs, submit adoption inquiries, staff can manage content via CMS.

**Estimated MVP time**: 15-20 hours (1-2 days for experienced developer)

### Incremental Delivery

**After MVP is live, add features incrementally**:

1. MVP deployed → Foundation ready ✅
2. Add User Story 4 (Performance) → Performance audits pass → Deploy
3. Add User Story 5 (SEO) → Search engine ready → Deploy
4. Add User Story 6 (Newsletter) → Newsletter live → Deploy
5. Add User Story 7 (Virtual Adoption) → Additional revenue stream → Deploy
6. Add User Story 8 (Success Stories) → Social proof live → Deploy
7. Polish phase → Production quality → Final deploy

**Each increment adds value without breaking previous features**

### Parallel Team Strategy

With multiple developers:

1. **Team completes Setup + Foundational together** (T001-T033)
2. Once Foundational is done:
   - **Developer A**: User Story 1 (T034-T054) - Dog catalog
   - **Developer B**: User Story 2 (T055-T064) - Forms
   - **Developer C**: User Story 3 (T065-T072) - CMS testing
3. Stories complete and merge independently
4. **Team reviews**: User Stories 4-8
5. **Team completes**: Polish phase together

---

## Task Execution Tips

### Before Starting

- [ ] Read quickstart.md for service setup instructions
- [ ] Read contracts/*.md for API integration details
- [ ] Read data-model.md for entity schemas
- [ ] Ensure .env file has all required keys
- [ ] Run `pnpm install` to install dependencies
- [ ] Run `pnpm run dev` to verify local development works

### During Implementation

- **Commit frequently**: After each task or logical group
- **Test locally**: Run `pnpm run build && pnpm run preview` before pushing
- **Use [P] tasks**: Launch parallel tasks together to save time
- **Stop at checkpoints**: Validate each user story independently
- **Use Lighthouse**: Run audits frequently to catch performance issues early

### Quality Gates

- **Before marking task complete**:
  - Code builds without errors (`pnpm run build`)
  - TypeScript checks pass (`pnpm run astro check`)
  - Manual testing confirms functionality works
  - Commit pushed to repository

- **Before marking user story complete**:
  - All tasks in story phase complete
  - Independent test criteria passes
  - Lighthouse audits meet targets (if applicable)
  - Ready to deploy or demo

---

## Notes

- **[P] tasks** = different files, no dependencies, can run in parallel
- **[Story] label** maps task to specific user story for traceability
- **Each user story** is independently completable and testable
- **No automated tests** requested in spec - manual testing per quickstart.md
- **Commit after each task** or logical group for safety
- **Stop at any checkpoint** to validate story independently
- **Total tasks**: 130 tasks organized across 11 phases
- **MVP tasks**: T001-T072 (72 tasks for minimum viable product)
- **Parallel opportunities**: ~40 tasks marked [P] can run concurrently

---

## Summary

**Total Task Count**: 130 tasks

**Tasks by User Story**:
- Setup: 20 tasks
- Foundational: 13 tasks
- User Story 1: 21 tasks (Browse dog catalog)
- User Story 2: 10 tasks (Submit adoption inquiries)
- User Story 3: 8 tasks (CMS access)
- User Story 4: 14 tasks (Performance optimization)
- User Story 5: 6 tasks (SEO & search)
- User Story 6: 8 tasks (Newsletter)
- User Story 7: 6 tasks (Virtual adoption)
- User Story 8: 8 tasks (Success stories)
- Polish: 16 tasks (Cross-cutting concerns)

**Parallel Opportunities**: 40+ tasks marked [P] can run concurrently

**MVP Scope** (Recommended): User Stories 1, 2, 3 (Setup + Foundational + US1 + US2 + US3 = 72 tasks)

**Independent Test Criteria**: Each user story has specific test in phase header

**Format Validation**: ✅ All tasks follow checklist format with ID, [P] marker (where applicable), [Story] label (for user story phases), and file paths

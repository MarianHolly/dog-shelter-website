# Feature Specification: Dog Shelter Website MVP Completion

**Feature Branch**: `01-frontend`
**Created**: 2025-12-27
**Status**: In Development (60% Complete)
**Input**: Complete remaining 40% of dog shelter website to reach production-ready state

## User Scenarios & Testing

### User Story 1 - Browse Complete Dog Catalog (Priority: P1)

Potential adopters can browse a full catalog of 20-40 available dogs with complete profiles, photos, and filtering capabilities to find their ideal companion.

**Why this priority**: Without sufficient dog profiles, the website cannot fulfill its primary purpose of facilitating adoptions. This is the core value proposition.

**Independent Test**: Navigate to /psici, filter by size "Stredný" and gender "Suka", verify 5+ results display with complete information (photo, name, age, personality). Click a dog to view full profile with gallery.

**Acceptance Scenarios**:

1. **Given** I visit /psici, **When** I view the dog listing page, **Then** I see 20-40 dogs displayed in a responsive grid with photos and basic information
2. **Given** I am on the dog listing page, **When** I apply filters (size: Veľký, energy: Vysoká, kids: yes), **Then** the list updates immediately to show only matching dogs
3. **Given** I click on a dog card, **When** the detail page loads, **Then** I see comprehensive information including multiple photos, health status, personality, compatibility, and training details
4. **Given** I am viewing a dog detail page, **When** I click on thumbnail images, **Then** the main photo updates smoothly without page reload
5. **Given** I am on a dog detail page on mobile, **When** I swipe the photo gallery, **Then** images transition smoothly and I can view all photos easily

---

### User Story 2 - Submit Adoption Inquiries (Priority: P1)

Potential adopters can submit adoption inquiries directly through embedded contact forms on dog detail pages and the general contact page.

**Why this priority**: Mailto links create friction and reduce conversion. Embedded forms increase inquiry rates and provide better user experience.

**Independent Test**: Navigate to any dog detail page, fill out the adoption inquiry form with valid data, submit, and verify success message appears. Check form submission is received via configured service.

**Acceptance Scenarios**:

1. **Given** I am viewing a dog's detail page, **When** I click "Chcem adoptovať" button, **Then** an adoption inquiry form appears with fields for my name, email, phone, and message
2. **Given** I have filled out the adoption inquiry form, **When** I submit with valid data, **Then** I see a success message confirming my inquiry was sent
3. **Given** I submit the form with invalid email, **When** I click submit, **Then** I see a validation error indicating the email format is incorrect
4. **Given** I am on the /kontakt page, **When** I fill out the general contact form, **Then** I can send a message to the shelter with the same validation and success feedback
5. **Given** I am on /ako-pomoct page, **When** I fill out the volunteer form, **Then** I can express interest in volunteering with appropriate fields

---

### User Story 3 - Access via CMS (Priority: P1)

Shelter staff can independently add, edit, and publish dog profiles, blog posts, and success stories through a visual CMS interface without developer assistance.

**Why this priority**: Staff independence is critical for ongoing operation. Without CMS, every content update requires developer intervention, making the site unsustainable.

**Independent Test**: Log in to /admin with GitHub credentials, create a new dog profile with photos uploaded via Cloudinary, preview changes, and publish. Verify new dog appears on public site after build completes.

**Acceptance Scenarios**:

1. **Given** I navigate to /admin, **When** I log in with authorized GitHub account, **Then** I access the Decap CMS dashboard
2. **Given** I am in the CMS dashboard, **When** I click "New Dog", **Then** I see a form with all 40+ dog profile fields organized clearly
3. **Given** I am creating a dog profile, **When** I upload photos, **Then** images are stored in Cloudinary and optimized automatically
4. **Given** I have filled out required fields (name, breed, age, gender, image, description), **When** I click "Save", **Then** the dog profile is saved as draft in Git repository
5. **Given** I have a draft dog profile, **When** I click "Publish", **Then** the site rebuilds automatically and the new dog appears on /psici within 2 minutes
6. **Given** I am editing an existing dog, **When** I update personality description and save, **Then** changes are version-controlled in Git and deploy correctly
7. **Given** I want to add a blog post, **When** I navigate to Blog collection, **Then** I can create/edit blog posts with title, content, category, and featured image

---

### User Story 4 - Experience Fast, Optimized Pages (Priority: P2)

Website visitors experience fast page loads (<2 seconds on 3G), smooth animations, and optimized images regardless of device or connection speed.

**Why this priority**: Performance directly impacts adoption rates. Slow sites lose visitors. This ensures mobile users (majority of traffic) have excellent experience.

**Independent Test**: Run Lighthouse audit on /psici and dog detail pages. Verify Performance 90+, Accessibility 95+. Test on simulated 3G connection and measure Time to Interactive <2.5s.

**Acceptance Scenarios**:

1. **Given** I visit any page on the site, **When** page loads on 3G connection, **Then** initial content appears in under 2 seconds
2. **Given** I scroll down a page, **When** images come into viewport, **Then** they lazy load smoothly without layout shift
3. **Given** I am on a dog listing page, **When** I hover over a dog card, **Then** the card lifts with smooth animation (no jank)
4. **Given** I am browsing on mobile, **When** I scroll through the page, **Then** all animations run at 60fps without stuttering
5. **Given** I have enabled reduced motion in my OS, **When** I visit the site, **Then** animations are minimal or disabled entirely
6. **Given** I view dog detail page, **When** images load, **Then** responsive srcset delivers appropriately sized images for my device
7. **Given** I am on slow connection, **When** page loads, **Then** I see blur placeholders (LQIP) while images load progressively

---

### User Story 5 - Find Dogs via Search Engines (Priority: P2)

Potential adopters discover individual dog profiles and the shelter via Google search with rich previews showing dog photos and descriptions.

**Why this priority**: Organic search drives significant adoption traffic. Proper SEO makes each dog discoverable independently, multiplying reach.

**Independent Test**: Search "adoptovať psa Trenčín" on Google (after indexing), verify site appears in results. Share dog profile link on Facebook, verify Open Graph preview shows dog photo, name, and description.

**Acceptance Scenarios**:

1. **Given** search engines crawl the site, **When** they read sitemap.xml, **Then** all dog profile pages, blog posts, and static pages are indexed
2. **Given** I share a dog profile link on Facebook, **When** the link preview generates, **Then** it displays the dog's photo, name, and personality description
3. **Given** I share a dog profile on Instagram, **When** followers click the link, **Then** they see rich Open Graph preview in bio link
4. **Given** Google crawls a dog detail page, **When** it reads Schema.org markup, **Then** it understands this is a Pet listing with attributes (breed, age, location)
5. **Given** Google crawls the homepage, **When** it reads structured data, **Then** it recognizes the Organization and LocalBusiness schema
6. **Given** I view any page source, **When** I check meta tags, **Then** every page has unique title and description optimized for search
7. **Given** search engines read robots.txt, **When** they follow directives, **Then** /admin is blocked but all public pages are allowed

---

### User Story 6 - Subscribe to Updates (Priority: P3)

Website visitors can sign up for email newsletter updates about new dogs, adoption events, and shelter news.

**Why this priority**: Builds engaged community and provides channel to re-engage visitors who didn't adopt immediately.

**Independent Test**: Fill out newsletter form in footer with valid email, submit, verify success message. Check email service dashboard shows new subscriber added.

**Acceptance Scenarios**:

1. **Given** I am on any page, **When** I scroll to footer, **Then** I see a newsletter signup form
2. **Given** I enter my email in newsletter form, **When** I submit, **Then** I see confirmation message and receive welcome email
3. **Given** I submit newsletter form without consent checkbox, **When** I click subscribe, **Then** I see error requiring GDPR consent
4. **Given** I am on the homepage, **When** I scroll to newsletter section, **Then** I can subscribe with same functionality as footer
5. **Given** I am reading a blog post, **When** I reach the end, **Then** I see newsletter signup CTA

---

### User Story 7 - Learn About Virtual Adoption (Priority: P3)

Website visitors can learn about virtual adoption program (monthly sponsorship) and view dogs available for virtual adoption.

**Why this priority**: Provides support option for people who cannot adopt but want to help. Additional revenue stream for shelter operations.

**Independent Test**: Navigate to /virtualna-adopcia, read program explanation, view list of dogs available for sponsorship, click contact CTA to express interest.

**Acceptance Scenarios**:

1. **Given** I navigate to /virtualna-adopcia, **When** page loads, **Then** I see explanation of virtual adoption program
2. **Given** I am reading about virtual adoption, **When** I review benefits, **Then** I understand monthly sponsorship tiers (€5, €10, €20) and what each includes
3. **Given** I want to see sponsorable dogs, **When** I scroll down, **Then** I see list of dogs available for virtual adoption with their profiles
4. **Given** I want to sponsor a dog, **When** I click contact CTA, **Then** I can express interest via contact form
5. **Given** I am interested in tax benefits, **When** I read program details, **Then** I understand virtual adoption is tax deductible

---

### User Story 8 - View Success Stories (Priority: P3)

Website visitors can view success stories of previously adopted dogs with before/after photos and testimonials from happy adopters.

**Why this priority**: Social proof and emotional resonance. Success stories build trust and inspire potential adopters.

**Independent Test**: Navigate to /uspesne-pribehy, filter stories by year, click on a story to read full testimonial with photos.

**Acceptance Scenarios**:

1. **Given** I navigate to /uspesne-pribehy, **When** page loads, **Then** I see grid of success stories with dog names and photos
2. **Given** I am viewing success stories, **When** I click a story card, **Then** I see full story with adoption date, adopter testimonial, and current life photos
3. **Given** I want to filter stories, **When** I select year 2024, **Then** only stories from that year display
4. **Given** I read an inspiring story, **When** I want to share it, **Then** I can use social sharing buttons to post on Facebook/Instagram
5. **Given** I am on homepage, **When** I scroll to success stories section, **Then** I see featured success stories with link to view all

---

### Edge Cases

- What happens when a dog is marked as "Adoptovaný" (adopted)?
  - Should remain visible in success stories but be removed from /psici listing
  - Detail page should redirect to success story or show "Already adopted" banner

- How does system handle dog profile with missing required fields?
  - CMS validation prevents publishing incomplete profiles
  - Existing profiles with missing data show placeholder text "Informácia nedostupná"

- What happens when shelter has 0 dogs available?
  - /psici page shows message "Momentálne nemáme psíkov na adopciu" with newsletter signup
  - Homepage featured dogs section shows success stories instead

- How does form submission handle service downtime?
  - Display error message "Nepodarilo sa odoslať správu. Prosím skúste neskôr alebo zavolajte +421 915 785 007"
  - Store submission locally for retry (optional enhancement)

- What happens when user shares dog profile that was just adopted?
  - Open Graph preview still works (cached)
  - Detail page shows adopted status when they visit

- How does CMS handle concurrent edits by two staff members?
  - Git conflict resolution workflow
  - Last save wins (Git-based CMS behavior)
  - Staff should coordinate via communication channel

- What happens to old dog images when profile is deleted?
  - Images remain in Cloudinary (manual cleanup task)
  - Consider adding cleanup script in Phase 2

## Requirements

### Functional Requirements

#### Content Management

- **FR-001**: System MUST display 20-40 dog profiles on /psici with complete information (name, breed, age, gender, photo, personality description)
- **FR-002**: System MUST generate dog detail pages at /psici/[slug] with comprehensive information including photo gallery, health status, personality, compatibility, training, living requirements
- **FR-003**: System MUST support filtering dogs by size (Malý, Stredný, Veľký), gender (Pes, Suka), energy level (Nízka, Stredná, Vysoká), and kid-friendliness (true/false)
- **FR-004**: System MUST mark urgent adoption cases with visible badge on listing and detail pages
- **FR-005**: System MUST display 5-10 blog posts on /blog with category, tags, and featured image support
- **FR-006**: System MUST display 5-10 success stories on /uspesne-pribehy with adoption date, testimonial, and photos
- **FR-007**: System MUST provide virtual adoption program page at /virtualna-adopcia with pricing tiers (€5, €10, €20/month) and eligible dogs

#### Forms & User Interaction

- **FR-008**: System MUST provide adoption inquiry form on each dog detail page with fields: name, email, phone, message
- **FR-009**: System MUST provide general contact form on /kontakt page with same fields
- **FR-010**: System MUST provide volunteer signup form on /ako-pomoct page
- **FR-011**: System MUST validate email format client-side before submission
- **FR-012**: System MUST validate required fields (name, email, message) before submission
- **FR-013**: System MUST display success message "Správa bola odoslaná. Ozveme sa vám čoskoro!" after successful form submission
- **FR-014**: System MUST display error message if form submission fails
- **FR-015**: System MUST submit forms via Formspree or Web3Forms free tier service
- **FR-016**: System MUST provide newsletter signup form in footer (site-wide), homepage section, and blog pages
- **FR-017**: System MUST require GDPR consent checkbox on newsletter form with text "Súhlasím so spracovaním osobných údajov"
- **FR-018**: System MUST integrate newsletter form with MailerLite or Mailchimp free tier API

#### CMS & Content Management

- **FR-019**: System MUST provide CMS admin interface at /admin accessible via GitHub OAuth authentication
- **FR-020**: System MUST allow authorized users (shelter staff GitHub accounts) to add new dog profiles via CMS
- **FR-021**: System MUST allow authorized users to edit existing dog profiles, blog posts, success stories, and static pages
- **FR-022**: System MUST integrate Cloudinary for image and video uploads with automatic optimization
- **FR-023**: System MUST organize Cloudinary uploads into folders: /dogs/, /blog/, /success-stories/
- **FR-024**: System MUST provide preview functionality in CMS before publishing changes
- **FR-025**: System MUST trigger automatic site rebuild when content is published via CMS (Git commit + Cloudflare Pages deployment)
- **FR-026**: System MUST validate required fields in CMS forms (dog profiles require: name, breed, age, gender, image, description)
- **FR-027**: System MUST save CMS changes as Git commits with meaningful commit messages

#### Performance & Optimization

- **FR-028**: System MUST lazy load all below-fold images with loading="lazy" attribute
- **FR-029**: System MUST generate responsive images with srcset for mobile, tablet, and desktop viewports
- **FR-030**: System MUST provide blur placeholders (LQIP) while images load
- **FR-031**: System MUST achieve Lighthouse Performance score 90+ on all pages
- **FR-032**: System MUST achieve page load time <2 seconds on simulated 3G connection
- **FR-033**: System MUST achieve Time to Interactive <2.5 seconds
- **FR-034**: System MUST keep JavaScript bundle size <50KB gzipped per page
- **FR-035**: System MUST keep CSS bundle size <20KB gzipped per page
- **FR-036**: System MUST achieve total page weight <500KB for initial load

#### Animations & User Experience

- **FR-037**: System MUST provide smooth hover animations on cards with lift effect (translateY -4px) and shadow
- **FR-038**: System MUST provide scroll-triggered animations for sections (fade in, slide up)
- **FR-039**: System MUST respect prefers-reduced-motion media query and disable/minimize animations when enabled
- **FR-040**: System MUST ensure all animations run at 60fps without jank
- **FR-041**: System MUST provide smooth image gallery transitions when clicking thumbnails
- **FR-042**: System MUST provide smooth page transitions (optional enhancement using View Transitions API)

#### SEO & Discoverability

- **FR-043**: System MUST generate sitemap.xml automatically including all dog profiles, blog posts, success stories, and static pages
- **FR-044**: System MUST provide robots.txt allowing all public pages and disallowing /admin
- **FR-045**: System MUST include Organization Schema.org structured data on homepage with shelter name, address, phone, hours
- **FR-046**: System MUST include LocalBusiness Schema.org structured data on /kontakt page
- **FR-047**: System MUST include Pet Schema.org structured data on each dog detail page with breed, age, gender attributes
- **FR-048**: System MUST include BreadcrumbList Schema.org structured data on all pages for navigation
- **FR-049**: System MUST provide unique meta title and description for every page optimized for search
- **FR-050**: System MUST include Open Graph tags on dog detail pages with dog photo, name, and personality preview
- **FR-051**: System MUST include Twitter Card tags for social sharing
- **FR-052**: System MUST achieve Lighthouse SEO score 100

#### Accessibility

- **FR-053**: System MUST achieve Lighthouse Accessibility score 95+
- **FR-054**: System MUST provide descriptive alt text for all images (dog photos: "Meno - Plemeno, opis")
- **FR-055**: System MUST maintain color contrast ratios meeting WCAG AA standards (4.5:1 for text, 3:1 for UI elements)
- **FR-056**: System MUST ensure all interactive elements are keyboard accessible (Tab, Enter, Escape)
- **FR-057**: System MUST ensure touch targets are minimum 44×44px on mobile devices
- **FR-058**: System MUST provide visible focus indicators on all interactive elements
- **FR-059**: System MUST use semantic HTML (proper heading hierarchy, nav, main, footer elements)

#### Deployment & DevOps

- **FR-060**: System MUST deploy to Cloudflare Pages free tier from main branch
- **FR-061**: System MUST configure custom domain utulok-trencin.sk with SSL certificate
- **FR-062**: System MUST provide GitHub Actions CI/CD workflow that runs on push to main branch
- **FR-063**: System MUST run TypeScript checks in CI/CD pipeline before deployment
- **FR-064**: System MUST run build process in CI/CD pipeline and deploy to Cloudflare Pages
- **FR-065**: System MUST set up environment variables for: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, FORM_SERVICE_API_KEY, NEWSLETTER_API_KEY
- **FR-066**: System MUST provide preview deployments for pull requests (optional)
- **FR-067**: System MUST configure Cloudflare Analytics for monitoring page views and performance

### Key Entities

#### Dog Profile
Core entity representing an adoptable dog. Attributes: name, breed, age, gender, size (Malý/Stredný/Veľký), weight, color, image (main photo), images (gallery array), videoUrl (optional), chipNumber, arrivalDate, description (short), personality (long), characteristics (array), energyLevel (Nízka/Stredná/Vysoká), temperament, story (background), vaccinated, sterilized, chipped, dewormed, health, healthIssues, medications (array), dietaryNeeds, goodWithKids, kidsAgeRecommendation, goodWithDogs, goodWithCats, goodWithOtherPets, houseTrained, leashTrained, commands (array), trainingNeeds, exerciseNeeds, spaceNeeds, timeCommitment, experienceRequired (Začiatočník/Stredne pokročilý/Skúsený), aloneTimeTolerance, groomingNeeds, idealFamily, whyAdoptMe (array), adoptionFee (number), specialRequirements (array), adoptionStatus (Dostupný/Rezervovaný/Adoptovaný), urgent (boolean), specialNeeds (boolean), featured (boolean).

#### Blog Post
Content entity for shelter news and educational articles. Attributes: title, description (excerpt), pubDate, author (default "Trenčianský útulok"), image (featured), imageAlt, category (Príbehy/Tipy a rady/Novinky/Adopcie/Zdravie/Výchova/Dobrovoľníctvo/Udalosti), tags (array), featured (boolean), draft (boolean), body (markdown content).

#### Success Story
Entity representing adopted dog success story. Attributes: dogName, originalProfileLink (optional), adoptionDate, adopterName (optional), adopterLocation (optional), testimonial (text), beforePhoto, afterPhotos (array), currentLifePhotos (array), story (markdown), featured (boolean), year (for filtering).

#### Newsletter Subscriber
User who signed up for email updates. Attributes: email, subscribeDate, source (footer/homepage/blog), consentGiven (boolean), active (boolean).

#### Form Submission
Record of contact form submission. Attributes: type (adoption/contact/volunteer), dogSlug (if adoption inquiry), name, email, phone, message, submittedDate, status (pending/responded).

## Success Criteria

### Measurable Outcomes

- **SC-001**: Website visitors can find and view 20-40 dog profiles with complete information including photos, personality, and health status
- **SC-002**: Potential adopters can submit adoption inquiries via embedded forms with <5 seconds to completion and receive immediate confirmation
- **SC-003**: Shelter staff can add new dog profile via CMS in <10 minutes including photo uploads without developer assistance
- **SC-004**: All pages achieve Lighthouse Performance score 90+, Accessibility 95+, Best Practices 95+, SEO 100
- **SC-005**: Dog detail pages load in <2 seconds on simulated 3G connection (Time to Interactive <2.5s)
- **SC-006**: All images are lazy loaded and use responsive srcset, reducing initial page weight to <500KB
- **SC-007**: Dog profiles are discoverable on Google search within 2 weeks of launch with rich previews
- **SC-008**: Dog profile links shared on Facebook/Instagram display correct Open Graph preview (photo + name + description)
- **SC-009**: Newsletter signup forms achieve <3% error rate (validation + successful API integration)
- **SC-010**: Site deploys automatically to production within 5 minutes of merging to main branch
- **SC-011**: 100% of interactive elements are keyboard accessible and meet WCAG AA color contrast standards
- **SC-012**: Mobile users (tested on iOS Safari and Android Chrome) can complete all critical tasks (browse dogs, filter, submit inquiry) without issues
- **SC-013**: Virtual adoption page receives >10 views per week within first month (indicating discovery and interest)
- **SC-014**: Success stories section builds trust with >5 stories published showcasing happy outcomes
- **SC-015**: Form submission success rate >95% (accounting for validation errors as expected failures)
- **SC-016**: CMS publishing workflow completes end-to-end (edit → save → publish → deploy → live) in <5 minutes

### Quality Outcomes

- **SC-017**: Shelter staff rate CMS ease of use as "easy" or "very easy" (no code knowledge required)
- **SC-018**: All animations appear smooth and professional without jank or stuttering
- **SC-019**: Site design feels warm, professional, and emotionally engaging (subjective but verified by stakeholder approval)
- **SC-020**: Content is grammatically correct in Slovak language (all static pages, forms, labels proofread)
- **SC-021**: No broken links, 404 errors, or missing images on production site
- **SC-022**: Mobile experience is excellent (touch targets adequate, text readable, forms usable)
- **SC-023**: Dark mode implementation works correctly on all pages without color contrast violations
- **SC-024**: Social sharing creates emotional resonance (photo + story preview inspires sharing)

## Assumptions

1. **Content Availability**: utulok-trencin.sk website is accessible and contains 20+ dog profiles that can be scraped
2. **Image Quality**: Shelter has or will provide reasonable quality photos for all dogs (can be optimized but need baseline quality)
3. **Staff Availability**: 2 shelter administrators available for CMS testing and training (basic computer skills, can use visual interface)
4. **GitHub Access**: Shelter staff have or can create GitHub accounts for OAuth authentication
5. **Free Tier Limits**: Project stays within free tier limits:
   - Cloudflare Pages: 500 builds/month, unlimited bandwidth
   - Cloudinary: 25GB storage, 25k transformations/month
   - Formspree/Web3Forms: 50-100 submissions/month
   - MailerLite/Mailchimp: 1000 subscribers, 12k emails/month
6. **Browser Support**: Target modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
7. **Build Time**: Site rebuild completes in <2 minutes (achievable with static site generator)
8. **Domain Access**: Have access to DNS settings for utulok-trencin.sk domain
9. **Content Ownership**: Shelter owns all photos and content, grants permission for website use
10. **Slovak Language**: All user-facing text in Slovak (no multi-language support in Phase 1)

## Out of Scope (Phase 2)

- Payment processing for donations or virtual adoption payments
- Online adoption application workflow (digital forms with approval process)
- Multi-language support (English translation)
- User accounts for adopters
- Advanced search (keywords, advanced filters)
- Instagram feed integration
- Mobile native apps
- Automated email campaigns
- Analytics dashboard for staff
- Volunteer management system
- Event calendar
- Live chat support
- Video consultation scheduling

## Dependencies

- **External Services**: Cloudinary (image hosting), Formspree/Web3Forms (form handling), MailerLite/Mailchimp (newsletter), GitHub (OAuth + hosting), Cloudflare Pages (deployment)
- **Content Source**: utulok-trencin.sk website (for dog data scraping)
- **Staff Coordination**: Shelter administrators for CMS testing, content review, launch approval
- **Existing Codebase**: 60% complete Astro + React + TypeScript project with design system, content schema, and basic pages already implemented

## Technical Constraints (from Constitution)

- **Framework Stack**: Astro 5.x + React 19.x + TypeScript (strict mode) + Tailwind CSS 4.x + shadcn/ui
- **CMS**: Decap CMS (Git-based, no database)
- **Media**: Cloudinary (free tier)
- **Hosting**: Cloudflare Pages (free tier, €0/month budget)
- **CI/CD**: GitHub Actions
- **Package Manager**: pnpm
- **Static Site Only**: No server-side rendering, no runtime database
- **Performance Targets**: Lighthouse 90/95/95/100, <2s load on 3G, <500KB page weight
- **Accessibility**: WCAG AA compliance mandatory
- **Mobile-First**: Design and test mobile first, enhance for desktop

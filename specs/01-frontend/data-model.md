# Data Model: Dog Shelter Website

**Date**: 2025-12-27
**Phase**: 1 - Design
**Status**: Complete

## Overview

This document defines the content entities for the dog shelter website. All entities are stored as Markdown files with YAML frontmatter in the Git repository (no database). Content is managed via Decap CMS by shelter staff and rendered statically by Astro at build time.

---

## Entity: Dog Profile

**Purpose**: Represents an adoptable dog with comprehensive information for potential adopters.

**Storage**: `/src/content/dogs/[slug].md`

**Schema** (from `src/content.config.ts`):

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | string | Dog's name | "Max" |
| `breed` | string | Breed or mix | "Labrador Retriever" or "Mešťanček" |
| `age` | string | Age description | "2 roky", "5 mesiacov", "Senior" |
| `gender` | enum | Gender | "Pes" or "Suka" |
| `image` | string | Main profile photo path | "/images/dogs/max/profile.jpg" |
| `description` | string | Short 1-2 sentence description | "Milý a energický pes vhodný do aktívnej rodiny." |

### Status Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `adoptionStatus` | enum | "Dostupný" | "Dostupný", "Rezervovaný", "Adoptovaný" |
| `urgent` | boolean | false | Urgent adoption needed (health/age/shelter capacity) |
| `specialNeeds` | boolean | false | Has special needs (medical, behavioral) |
| `featured` | boolean | false | Featured on homepage |

### Physical Attributes (Optional)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `size` | enum | "Malý", "Stredný", "Veľký" | "Stredný" |
| `weight` | string | Weight description | "25 kg" or "Mierne pod kolená" |
| `color` | string | Coat color | "Hnedý", "Čierno-biely" |

### Media (Optional)

| Field | Type | Description |
|-------|------|-------------|
| `images` | array[string] | Photo gallery (multiple URLs) |
| `videoUrl` | string | YouTube/Vimeo embed URL |

### Health & Care (Optional)

| Field | Type | Description |
|-------|------|-------------|
| `vaccinated` | boolean | Vaccinated status |
| `sterilized` | boolean | Spayed/neutered status |
| `chipped` | boolean | Microchipped |
| `dewormed` | boolean | Dewormed |
| `chipNumber` | string | Microchip number (for records) |
| `arrivalDate` | string | Date arrived at shelter |
| `health` | string | General health description |
| `healthIssues` | string | Any health problems |
| `medications` | array[string] | Current medications |
| `dietaryNeeds` | string | Special dietary requirements |

### Personality & Behavior (Optional)

| Field | Type | Description |
|-------|------|-------------|
| `personality` | string | Detailed personality description (paragraph) |
| `characteristics` | array[string] | Quick traits list (["Priateľský", "Energický"]) |
| `energyLevel` | enum | "Nízka", "Stredná", "Vysoká" |
| `temperament` | string | Temperament description |
| `story` | string | Background story (markdown in body) |

### Compatibility (Optional)

| Field | Type | Description |
|-------|------|-------------|
| `goodWithKids` | boolean | Good with children |
| `kidsAgeRecommendation` | string | "10+ rokov" |
| `goodWithDogs` | boolean | Good with other dogs |
| `goodWithCats` | boolean | Good with cats |
| `goodWithOtherPets` | boolean | Good with other animals |

### Training & Skills (Optional)

| Field | Type | Description |
|-------|------|-------------|
| `houseTrained` | boolean | House/potty trained |
| `leashTrained` | boolean | Walks well on leash |
| `commands` | array[string] | Known commands (["Sed", "Ľahni"]) |
| `trainingNeeds` | string | Training requirements |

### Living Requirements (Optional)

| Field | Type | Description |
|-------|------|-------------|
| `exerciseNeeds` | string | Exercise requirements ("2 hodiny denne") |
| `spaceNeeds` | enum | "Byt", "Dom so záhradou", "Veľká záhrada", "Nevadí" |
| `timeCommitment` | string | Time commitment needed |
| `experienceRequired` | enum | "Začiatočník", "Stredne pokročilý", "Skúsený" |
| `aloneTimeTolerance` | string | How long can be left alone |
| `groomingNeeds` | string | Grooming requirements |

### Adoption Info (Optional)

| Field | Type | Description |
|-------|------|-------------|
| `idealFamily` | string | Description of ideal home/family |
| `whyAdoptMe` | array[string] | Reasons to adopt this dog |
| `adoptionFee` | number | Adoption fee in euros |
| `specialRequirements` | array[string] | Special adoption requirements |

### Example Dog Profile (Markdown)

```markdown
---
# Required
name: Max
breed: Labrador Retriever
age: 2 roky
gender: Pes
image: /images/dogs/max/profile.jpg
description: Energický a priateľský labrador hľadá aktívnu rodinu, ktorá mu poskytne dostatok pohybu a lásky.

# Status
adoptionStatus: Dostupný
urgent: false
specialNeeds: false
featured: true

# Physical
size: Veľký
weight: 30 kg
color: Zlatistý

# Media
images:
  - /images/dogs/max/profile.jpg
  - /images/dogs/max/playing.jpg
  - /images/dogs/max/portrait.jpg
videoUrl: https://www.youtube.com/embed/xxx

# Health
vaccinated: true
sterilized: true
chipped: true
dewormed: true
chipNumber: "123456789012345"
health: Výborné zdravie, žiadne známe problémy
arrivalDate: "2024-10-15"

# Personality
personality: Max je neuveriteľne priateľský a energický labrador, ktorý miluje ľudí a iných psov. Obľubuje aportovanie, plávanie a dlhé prechádzky. Je veľmi hravý a potrebuje aktívnu rodinu.
characteristics:
  - Priateľský
  - Energický
  - Inteligentný
  - Miluje vodu
  - Dobrý s deťmi
energyLevel: Vysoká

# Compatibility
goodWithKids: true
kidsAgeRecommendation: "Všetky vekové kategórie"
goodWithDogs: true
goodWithCats: false

# Training
houseTrained: true
leashTrained: true
commands:
  - Sed
  - Ľahni
  - Poď
  - Zober
trainingNeeds: Potrebuje pokračovať v tréningu základných povel

# Living Requirements
exerciseNeeds: Minimálne 2 hodiny dennej aktivity
spaceNeeds: Dom so záhradou
experienceRequired: Začiatočník
aloneTimeTolerance: Maximálne 4 hodiny denne
groomingNeeds: Minimálne - pravidelné česanie srsti

# Adoption
idealFamily: Aktívna rodina s deťmi, záhradou a časom na dlhé prechádzky a hry. Ideálne domácnosť blízko prírody alebo s prístupom k vode na plávanie.
whyAdoptMe:
  - Som veľmi priateľský a milujúci
  - Milujem deti a rád sa s nimi hrám
  - Som inteligentný a rýchlo sa učím
  - Budem vášmu životu prinášať radosť každý deň
adoptionFee: 150
specialRequirements:
  - Prístup k záhrade
  - Aktívny životný štýl
---

# Maxov príbeh

Max prišiel do útulku ako šteniatko, keď ho predchádzajúci majiteľ nemohol udržať kvôli presťahovaniu. Od tej doby s nami žije a ukázal sa ako úžasný pes s neuveriteľnou energiou a láskavou povahou.

Miluje vodu viac ako čokoľvek iné. Kedykoľvek vidí rieku, jazero alebo aj len kaluž, nemôže odolať a musí si zaplávať. Je to skvelý plavec a jeho najobľúbenejšou hračkou je aportovacia hračka, ktorú môže nosiť vo vode.

## Denný režim

Max začína každé ráno s radosťou a energiou. Po rannej prechádzke a hrách je pripravený si oddýchnuť, ale vždy je pripravený na ďalšie dobrodružstvo. Večer rád leží pri nohách svojho milovaného človeka a užíva si hladkanie.

## Vyhľadávame

Hľadáme rodinu, ktorá pochopí Maxovu potrebu pohybu a aktivity. Ideálny je dom so záhradou, kde môže behať a hrať sa. Ak máte radi prírodu, turistiku a aktívny život vonku, Max je pre vás ideálny spoločník!
```

**Relationships**:
- Dog Profile → Success Story (after adoption via `originalProfileLink`)
- Dog Profile → Blog Post (can be mentioned in posts)

**Derived/Computed Fields** (calculated at render time):
- `age_in_years`: Parse age string to numeric value for sorting
- `days_in_shelter`: Calculate from arrivalDate to current date
- `age_category`: "Šteniatko" (<1 year), "Mladý" (1-3), "Dospelý" (3-8), "Senior" (8+)

---

## Entity: Blog Post

**Purpose**: Educational content, shelter news, adoption stories, and dog care tips.

**Storage**: `/src/content/blog/[slug].md`

**Schema**:

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Post title | "Ako pripraviť dom na nového psíka" |
| `description` | string | Short excerpt | "Praktické tipy na prípravu domácnosti..." |
| `pubDate` | date | Publication date | 2024-12-20 |
| `author` | string | Author name | "Trenčianský útulok" (default) |
| `body` | markdown | Post content | (in markdown body) |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `image` | string | Featured image | "/images/blog/preparing-home.jpg" |
| `imageAlt` | string | Image alt text | "Pes v novom domove" |
| `category` | enum | "Príbehy", "Tipy a rady", "Novinky", "Adopcie", "Zdravie", "Výchova", "Dobrovoľníctvo", "Udalosti" |
| `tags` | array[string] | Topic tags | ["adopcia", "starostlivosť"] |
| `featured` | boolean | Featured post | false (default) |
| `draft` | boolean | Draft status | false (default) |
| `updatedDate` | date | Last update | 2024-12-25 |

**Example**:
```markdown
---
title: Čipovanie psov - Prečo je dôležité?
description: Všetko čo potrebujete vedieť o čipovaní psov a prečo je to dôležité pre bezpečnosť vášho miláčika.
pubDate: 2024-12-01
author: Trenčianský útulok
image: /images/blog/microchipping.jpg
category: Zdravie
tags: [čip, zdravie, legislatíva]
featured: true
---

# Prečo je čipovanie dôležité?

Čipovanie je zákonná povinnosť pre všetkých majiteľov psov na Slovensku...

[Rest of content]
```

---

## Entity: Success Story

**Purpose**: Showcase adopted dogs living happy lives to inspire potential adopters and build trust.

**Storage**: `/src/content/success-stories/[slug].md`

**Schema**:

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `dogName` | string | Dog's name | "Bella" |
| `adoptionDate` | date | When adopted | 2024-06-15 |
| `testimonial` | string | Adopter's testimonial | "Bella changed our lives..." |
| `beforePhoto` | string | Photo from shelter | "/images/success/bella-before.jpg" |
| `afterPhotos` | array[string] | Photos in new home | ["/images/success/bella-after-1.jpg"] |
| `year` | number | Year for filtering | 2024 |
| `body` | markdown | Full story | (in markdown body) |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `originalProfileLink` | string | Link to original dog profile | "/psici/bella" |
| `adopterName` | string | Adopter's name | "Jana" (first name only) |
| `adopterLocation` | string | General location | "Trenčín" |
| `currentLifePhotos` | array[string] | Additional photos | [...] |
| `featured` | boolean | Featured story | false |

**Example**:
```markdown
---
dogName: Bella
adoptionDate: 2024-06-15
testimonial: Bella zmenila náš život. Je úžasnou súčasťou našej rodiny a naše deti ju milujú. Ďakujeme útulku za túto úžasnú príležitosť!
beforePhoto: /images/success/bella-before.jpg
afterPhotos:
  - /images/success/bella-after-1.jpg
  - /images/success/bella-after-2.jpg
  - /images/success/bella-after-3.jpg
year: 2024
featured: true
---

# Bellin príbeh šťastného domova

Bella prišla do nášho útulku ako uplakané šteniatko...

[Full story in markdown]
```

---

## Entity: Newsletter Subscriber

**Purpose**: Track email subscribers for shelter newsletters.

**Storage**: External (MailerLite API), not in Git repository

**Schema** (MailerLite API):

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `email` | string | Subscriber email | Yes |
| `fields.consent` | boolean | GDPR consent given | Yes |
| `fields.source` | string | Signup source ("footer", "homepage", "blog") | No |
| `subscribed_at` | datetime | Signup timestamp | Auto |
| `status` | string | "active", "unsubscribed", "bounced" | Auto |

**API Interaction**: See `contracts/newsletter-api.md`

---

## Entity: Form Submission

**Purpose**: Track contact form submissions (adoption inquiries, general contact, volunteer signups).

**Storage**: External (Web3Forms API), optionally stored in email/CRM

**Schema** (Web3Forms payload):

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `access_key` | string | Web3Forms API key | Yes |
| `name` | string | Sender's name | Yes |
| `email` | string | Sender's email | Yes |
| `phone` | string | Sender's phone | No |
| `message` | string | Message content | Yes |
| `subject` | string | Email subject | No |
| `dog_slug` | string | Dog profile (if adoption inquiry) | No |
| `form_type` | string | "adoption", "contact", "volunteer" | No |
| `botcheck` | boolean | Honeypot field | No (must be false) |

**API Interaction**: See `contracts/form-api.md`

---

## Data Relationships

```
┌──────────────┐
│  Dog Profile │────┐
│   (Active)   │    │
└──────────────┘    │
                    │
                    │ After Adoption
                    │
                    ▼
┌──────────────┐  ┌──────────────────┐
│  Blog Post   │  │ Success Story    │
│ (References) │  │ (References Dog) │
└──────────────┘  └──────────────────┘
                    │
                    │ testimonial + photos
                    │
                    ▼
              ┌──────────────────┐
              │  Social Sharing  │
              │ (Open Graph)     │
              └──────────────────┘

External Entities:
┌──────────────────┐   ┌──────────────────┐
│ Newsletter Sub   │   │ Form Submission  │
│ (MailerLite)     │   │ (Web3Forms)      │
└──────────────────┘   └──────────────────┘
```

---

## Content Volume Estimates

| Entity | Current | Target | Growth |
|--------|---------|--------|--------|
| Dog Profiles | 7 | 20-40 | +30/year (turnover) |
| Blog Posts | 1 | 5-10 | +2/month |
| Success Stories | 0 | 5-10 | +10/year |
| Newsletter Subscribers | 0 | 50-200 | Organic growth |
| Form Submissions | 0 | 10-50/month | Based on traffic |

---

## Data Migration Strategy

### Phase 1: Scrape Dogs from utulok-trencin.sk
1. Extract HTML from https://utulok-trencin.sk/psici
2. Parse dog cards with Cheerio
3. Map to our schema (required fields + best-effort optional fields)
4. Download images to `/public/images/dogs/[slug]/`
5. Generate markdown files with YAML frontmatter
6. Manual review and enhancement (add personality, characteristics)

### Phase 2: Create Success Stories
1. Identify adopted dogs from shelter's Facebook/records
2. Request photos and testimonials from adopters
3. Create markdown files manually (10 stories × 10 min = 100 min)

### Phase 3: Write Blog Content
1. Repurpose existing shelter content (Facebook posts, flyers)
2. Write educational articles (5-10 posts × 30 min = 150-300 min)
3. Shelter staff contribute over time via CMS

---

## Validation Rules

**Dog Profile**:
- name: 2-50 characters
- breed: 3-100 characters
- age: 1-50 characters (flexible format)
- gender: Must be "Pes" or "Suka"
- image: Valid image path/URL
- description: 50-500 characters
- size: Must be "Malý", "Stredný", or "Veľký" (if provided)
- energyLevel: Must be "Nízka", "Stredná", or "Vysoká" (if provided)

**Blog Post**:
- title: 10-200 characters
- description: 50-300 characters
- pubDate: Valid date
- body: Minimum 100 characters

**Success Story**:
- dogName: 2-50 characters
- adoptionDate: Valid date
- testimonial: 50-1000 characters
- year: 2011-current year
- beforePhoto: Valid image path
- afterPhotos: Array with at least 1 image

---

## Status**: Phase 1 Complete ✅ → Proceed to API Contracts

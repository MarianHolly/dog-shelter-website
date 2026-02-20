# Trenčianský útulok — Dog Shelter Website

Website for **Trenčianský útulok**, a dog shelter in Trenčín, Slovakia, operating since 2011. The site helps abandoned and abused dogs find new homes by letting visitors browse dog profiles, learn about adoption, and get in touch with the shelter.

> **"Nekupuj, adoptuj si psíka od nás"** — Don't buy, adopt a dog from us.

---

## What the site does

- **Browse dogs** — Filterable listing of dogs available for adoption, each with a full profile (photos, personality, health status, compatibility with kids/other pets)
- **Adoption guide** — Step-by-step process for adopting a dog
- **How to help** — Ways to support the shelter: donations, 2% tax contributions, volunteering, virtual adoption
- **Blog** — Articles on dog care, shelter news, and adoption stories
- **Contact** — Get in touch with the shelter team

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Astro 5.x](https://astro.build) — fast static site generation |
| UI components | [React 18](https://react.dev) + [shadcn/ui](https://ui.shadcn.com) |
| Styling | [Tailwind CSS 4.x](https://tailwindcss.com) |
| Language | TypeScript 5.x (strict mode) |
| Content | Markdown files via Astro Content Collections |
| CMS | [Decap CMS](https://decapcms.org) — lets shelter staff manage content without code |
| Media | [Cloudinary](https://cloudinary.com) — image hosting and optimization |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Package manager | pnpm |
| Tests | Vitest |

---

## Getting started

**Prerequisites**: Node.js 18+ and [pnpm](https://pnpm.io)

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start with CMS admin panel
pnpm dev:cms
```

The site runs at `http://localhost:4321`. The CMS admin panel is at `/admin`.

### Other commands

```bash
pnpm build       # Build for production
pnpm preview     # Preview production build locally
pnpm test        # Run tests
pnpm lint        # Lint code
```

---

## Project structure

```
src/
├── components/       # Reusable UI components (Navbar, Footer, forms, cards…)
├── content/
│   ├── dogs/         # Dog profiles as Markdown files
│   └── blog/         # Blog posts as Markdown files
├── pages/            # One file per route
│   ├── index.astro       # Homepage
│   ├── psici/            # Dog listing and detail pages
│   ├── adopcia.astro     # Adoption guide
│   ├── ako-pomoct.astro  # How to help
│   ├── o-nas.astro       # About us
│   ├── kontakt.astro     # Contact
│   └── blog/             # Blog listing and posts
├── layouts/          # Base page layout
├── config/           # Site metadata and navigation config
└── lib/              # Shared utilities
```

---

## Content management

Shelter staff can manage dog profiles, blog posts, and static content through the Decap CMS admin interface at `/admin` — no coding required.

Dog profiles support 40+ fields including breed, age, health status (vaccinated, chipped, sterilized), personality traits, compatibility with children and other animals, and photo galleries.

---

## Design

- **Colors**: Warm browns, terracotta (`#B65636`), sage green (`#6B8273`)
- **Fonts**: DM Sans (body text), Mali (headings)
- **Dark mode**: Fully supported, preference is saved
- **Responsive**: Mobile-first design, tested on all screen sizes

---

## Status

The project is currently in active development (~60% complete). Core pages and architecture are functional. Remaining work includes full content migration, CMS setup, contact forms, and production deployment to [utulok-trencin.sk](https://utulok-trencin.sk).

See [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) for the full development plan.

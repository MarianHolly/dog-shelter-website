# 🚀 Quick Start Guide

## Local Development with CMS

```bash
# Start dev server + CMS
pnpm run dev:cms

# Then open:
# - Website: http://localhost:4321
# - CMS Admin: http://localhost:4321/admin
```

## Adding Content via CMS

1. Go to `http://localhost:4321/admin`
2. Click collection (Psíci, Blog, or Referencie)
3. Click "New Psíci" (or Blog/Referencie)
4. Fill in fields
5. Upload images
6. Click "Publish"
7. Content saved to `src/content/`

## Image Components Cheat Sheet

### Dog Photos (CMS Uploads)
```astro
<DogImage
  src="/images/dogs/rex.jpg"
  alt="Rex the dog"
  aspectRatio="4/3"
  loading="lazy"
/>
```

### Hero Images (High Priority)
```astro
<DogImage
  src="/images/hero.jpg"
  alt="Hero"
  priority={true}
  aspectRatio="16/9"
  loading="eager"
/>
```

### Gallery Thumbnails
```astro
<DogImage
  src="/images/thumb.jpg"
  alt="Thumbnail"
  aspectRatio="1/1"
  loading="lazy"
/>
```

## Migration Pattern

**Before:**
```astro
<img
  src={dog.image}
  alt={dog.name}
  width="800"
  height="600"
  loading="lazy"
/>
```

**After:**
```astro
import DogImage from '@/components/DogImage.astro';

<DogImage
  src={dog.image}
  alt={dog.name}
  aspectRatio="4/3"
  loading="lazy"
/>
```

## Deploy to Cloudflare Pages

1. Push to GitHub
2. Connect Cloudflare Pages
3. Build command: `pnpm build`
4. Output: `dist`
5. Auto-deploy on push

## Common Commands

```bash
pnpm run dev         # Dev server only
pnpm run dev:cms     # Dev + CMS together
pnpm run cms         # CMS backend only
pnpm run build       # Production build
pnpm run preview     # Preview build
pnpm test            # Run tests
```

## Need More Info?

- Full guide: `CMS_SETUP.md`
- Project roadmap: `IMPLEMENTATION_ROADMAP.md`
- Project rules: `CLAUDE.md`

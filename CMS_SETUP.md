# Decap CMS & Image Optimization Setup Guide

## ✅ What's Been Set Up

### 1. Decap CMS
- ✅ Admin interface at `/admin`
- ✅ Configuration for Dogs, Blog, and Testimonials collections
- ✅ Slovak language labels
- ✅ Local development support
- ✅ Image upload to `public/images/dogs/`
- ✅ Auto-sync config on build (main config: `public/admin/config.yml`)

### 2. Image Optimization
- ✅ Sharp installed for image processing
- ✅ Astro image service configured
- ✅ WebP/AVIF format support
- ✅ Responsive image components created
- ✅ Ready for Cloudflare Pages automatic optimization

---

## 🚀 How to Use Decap CMS

### Local Development (Testing)

1. **Start the development server with CMS:**
   ```bash
   pnpm run dev:cms
   ```
   Or run separately:
   ```bash
   # Terminal 1
   pnpm run dev

   # Terminal 2
   pnpm run cms
   ```

2. **Access the CMS:**
   - Open browser: `http://localhost:4321/admin`
   - You can edit content locally without authentication

3. **Add/Edit Content:**
   - Click "Psíci" to manage dogs
   - Click "Blog" to manage blog posts
   - Click "Referencie" to manage testimonials

4. **Save Changes:**
   - Changes are saved directly to your local files in `src/content/`
   - Commit and push to GitHub when ready

### Production (After Deployment)

The CMS backend is `git-gateway`, which needs Netlify Identity to issue auth
tokens. This site is hosted on **Cloudflare Pages**, not Netlify, so Identity
and Git Gateway run on a second, otherwise-empty Netlify site created only
for that purpose. The `/admin` page (`src/pages/admin.astro`) already loads
the Netlify Identity widget and points it at that site via the
`PUBLIC_NETLIFY_IDENTITY_URL` env var — only the Netlify-side setup below is
a manual one-time step.

1. **Create the identity site on Netlify (free):**
   - Create a new site on [Netlify](https://app.netlify.com) — it doesn't need
     to serve anything; an empty repo or "Deploy manually" placeholder is fine.
   - Site settings → **Identity** → Enable Identity.
   - Identity → **Services** → Enable **Git Gateway**, authorize it against
     this GitHub repo.
   - Identity → **Invite users** to grant CMS access.

2. **Point this site at it:**
   - Set `PUBLIC_NETLIFY_IDENTITY_URL` in the Cloudflare Pages project's
     environment variables to that Netlify site's URL
     (e.g. `https://your-utulok-identity.netlify.app`).
   - Update `backend.repo` in `public/admin/config.yml` if it isn't already
     set to `owner/repo`.
   - Redeploy.

3. **Access Production CMS:**
   - Go to `https://your-site.com/admin`
   - Log in with the Netlify Identity credentials from step 1
   - Changes commit to the repo and trigger a normal Cloudflare Pages rebuild

---

## 🖼️ Image Optimization Usage

### For Dog Photos (CMS Uploads)

Use the `<DogImage>` component:

```astro
---
import DogImage from '@/components/DogImage.astro';
---

<DogImage
  src={dog.image}
  alt={dog.name}
  aspectRatio="4/3"
  loading="lazy"
  class="rounded-lg"
/>
```

**Props:**
- `src` - Image path (from CMS or local)
- `alt` - Alt text (required for accessibility)
- `aspectRatio` - `"1/1"`, `"4/3"`, `"16/9"`, `"3/2"` (default: `"4/3"`)
- `loading` - `"lazy"` or `"eager"` (default: `"lazy"`)
- `priority` - Set `true` for above-the-fold images (default: `false`)
- `sizes` - Responsive sizes (optional)
- `class` - Additional CSS classes

### For Static Images

Use Astro's `<Image>` component:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '@/assets/hero.jpg';
---

<Image
  src={heroImage}
  alt="Hero image"
  width={1200}
  height={600}
  format="webp"
  quality={80}
/>
```

---

## 📁 File Structure

```
public/
  admin/
    index.html          # Decap CMS admin interface
    config.yml          # CMS configuration
  images/
    dogs/               # Dog photos uploaded via CMS
    *.jpg               # Existing static images

src/
  content/
    dogs/               # Dog markdown files (CMS managed)
    blog/               # Blog post markdown files
    testimonials/       # Testimonial markdown files
  components/
    DogImage.astro      # Optimized image component for dogs
    OptimizedImage.astro # General optimized image component
```

---

## 🔧 Decap CMS Configuration

Edit `public/admin/config.yml` to customize:

### Add New Fields

```yaml
fields:
  - { label: "Weight", name: "weight", widget: "string", required: false }
```

### Change Upload Folder

```yaml
media_folder: "public/images/custom-folder"
public_folder: "/images/custom-folder"
```

### Add New Collection

```yaml
collections:
  - name: "pages"
    label: "Pages"
    folder: "src/content/pages"
    create: true
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Content", name: "body", widget: "markdown" }
```

---

## 🚀 Deployment to Cloudflare Pages

### First-Time Setup

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Decap CMS and image optimization"
   git push
   ```

2. **Connect Cloudflare Pages:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect your GitHub repository
   - **Build settings:**
     - Framework: `Astro`
     - Build command: `pnpm build`
     - Output directory: `dist`
   - Click "Save and Deploy"

3. **Enable Netlify Identity (for CMS auth):**
   - Create free Netlify account
   - Create new site (can be empty)
   - Enable Identity & Git Gateway
   - Update `public/admin/config.yml`:
     ```yaml
     backend:
       name: git-gateway
       branch: master
       repo: your-username/your-repo
     ```

### Auto-Deploy

- Every push to `master` branch auto-deploys
- CMS edits create commits → auto-deploy

---

## ⚡ Performance Benefits

### Before (Unoptimized)
- 19 JPG images in `public/images/`
- Total size: ~15-20 MB
- Load time: 5-10 seconds on 3G

### After (Optimized)
- Responsive images with `srcset`
- WebP format (60-80% smaller)
- Cloudflare CDN + compression
- Total size: ~3-5 MB
- Load time: 1-2 seconds on 3G

---

## 🐛 Troubleshooting

### CMS doesn't load locally
- Make sure `npx decap-server` is running
- Check browser console for errors
- Try clearing browser cache

### Images not optimizing
- Verify Sharp is installed: `pnpm list sharp`
- Check `astro.config.mjs` has image config
- Restart dev server

### CMS changes not saving
- Check file permissions in `src/content/`
- Make sure Git is initialized
- Check browser console for errors

### Authentication issues in production
- Verify Netlify Identity is enabled on the identity site
- Check Git Gateway is configured and authorized against this repo
- Ensure users are invited via that Netlify site's Identity panel
- Verify `PUBLIC_NETLIFY_IDENTITY_URL` is set in Cloudflare Pages and matches
  the identity site's URL exactly
- Check the browser console for CSP violations — `/admin`'s policy in
  `public/_headers` must allow `https://identity.netlify.com` (script) and
  `https://*.netlify.app` (connect)

---

## 📖 Additional Resources

- [Decap CMS Docs](https://decapcms.org/docs/)
- [Astro Images Guide](https://docs.astro.build/en/guides/images/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Netlify Identity Setup](https://docs.netlify.com/visitor-access/identity/)

---

## 🎯 Next Steps

1. ✅ Test CMS locally: `pnpm run dev:cms`
2. ✅ Add your first dog via CMS
3. ✅ Optimize existing images (migrate to DogImage component)
4. ⏳ Set up Cloudflare Pages deployment
5. ⏳ Create the Netlify identity site, enable Identity + Git Gateway, and set
   `PUBLIC_NETLIFY_IDENTITY_URL` in Cloudflare Pages (code side is already wired)
6. ⏳ Invite non-technical users to CMS

---

**Need help?** Check the troubleshooting section or open an issue.

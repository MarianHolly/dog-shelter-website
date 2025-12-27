# Dog Shelter Website - Quickstart Guide

**Version**: 1.0.0
**Last Updated**: 2025-12-27
**Estimated Setup Time**: 30-60 minutes

This guide will help you set up the dog shelter website locally and deploy it to production.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Environment Variables](#environment-variables)
4. [Service Configuration](#service-configuration)
5. [Local Development](#local-development)
6. [Deployment](#deployment)
7. [CMS Access](#cms-access)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

- **Node.js**: v18 or later ([Download](https://nodejs.org/))
- **pnpm**: v8 or later (Install: `npm install -g pnpm`)
- **Git**: Latest version ([Download](https://git-scm.com/))
- **Code Editor**: VS Code recommended ([Download](https://code.visualstudio.com/))

### Required Accounts (All Free Tier)

- **GitHub Account**: For repository and OAuth
- **Cloudflare Account**: For hosting (Pages)
- **Cloudinary Account**: For media storage
- **Web3Forms Account**: For contact forms
- **MailerLite Account**: For newsletter

### Verify Installation

```bash
# Check Node.js version (should be 18+)
node --version

# Check pnpm version (should be 8+)
pnpm --version

# Check Git version
git --version
```

---

## Project Setup

### 1. Clone Repository

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/dog-shelter-website.git

# Navigate to project directory
cd dog-shelter-website

# Switch to development branch (if working on features)
git checkout 01-frontend
```

### 2. Install Dependencies

```bash
# Install all project dependencies
pnpm install

# This will install:
# - Astro 5.x
# - React 19.x
# - TypeScript
# - Tailwind CSS 4.x
# - shadcn/ui components
# - And all other dependencies
```

**Expected Output**:
```
Packages: +XXX
Progress: resolved XXX, reused XXX, downloaded 0, added XXX, done
```

### 3. Verify Installation

```bash
# Run TypeScript checks
pnpm run astro check

# Expected output: "0 errors"
```

---

## Environment Variables

### 1. Create Environment File

```bash
# Create .env file in project root
touch .env
```

### 2. Add Environment Variables

Open `.env` in your code editor and add:

```env
# Cloudinary Configuration
PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Web3Forms Configuration
PUBLIC_WEB3FORMS_KEY=your_access_key

# MailerLite Configuration
PUBLIC_MAILERLITE_KEY=your_api_key

# Site Configuration (Optional)
SITE_URL=https://utulok-trencin.sk
```

**Note**: Replace `your_*` placeholders with actual values (see Service Configuration section below).

### 3. Environment Variable Naming

- `PUBLIC_*` variables are exposed to client-side code
- Variables without `PUBLIC_` prefix are server-side only
- Never commit `.env` file to Git (already in `.gitignore`)

---

## Service Configuration

### 1. Cloudinary Setup

**Purpose**: Media storage and optimization for dog photos, blog images

**Steps**:

1. **Create Account**:
   - Go to https://cloudinary.com/users/register_free
   - Sign up with email or GitHub
   - Verify email

2. **Get Credentials**:
   - Log in to https://cloudinary.com/console
   - Dashboard → Account Details (top-right corner)
   - Copy:
     - **Cloud Name**: e.g., `trenciansky-utulok`
     - **API Key**: e.g., `123456789012345`
     - **API Secret**: e.g., `abcdefghijklmnopqrstuvwxyz123`

3. **Add to `.env`**:
   ```env
   PUBLIC_CLOUDINARY_CLOUD_NAME=trenciansky-utulok
   CLOUDINARY_API_KEY=123456789012345
   CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123
   ```

4. **Create Upload Presets**:
   - Go to Settings → Upload → Upload presets
   - Click "Add upload preset"
   - Create three presets:

   **Preset 1: Dog Profiles**
   ```
   Preset Name: dog_profiles
   Signing Mode: Unsigned
   Folder: dogs
   Allowed Formats: jpg, png, webp
   Max File Size: 10 MB
   Tags: dog-profile
   ```

   **Preset 2: Blog Images**
   ```
   Preset Name: blog_images
   Signing Mode: Unsigned
   Folder: blog
   Allowed Formats: jpg, png, webp
   Max File Size: 5 MB
   Tags: blog
   ```

   **Preset 3: Success Stories**
   ```
   Preset Name: success_stories
   Signing Mode: Unsigned
   Folder: success-stories
   Allowed Formats: jpg, png, webp
   Max File Size: 5 MB
   Tags: success-story
   ```

5. **Save Presets**

---

### 2. Web3Forms Setup

**Purpose**: Contact form submissions (general contact, adoption inquiries, volunteer applications)

**Steps**:

1. **Create Account**:
   - Go to https://web3forms.com/
   - Click "Get Started Free"
   - Sign up with email

2. **Create Access Key**:
   - Log in to https://web3forms.com/dashboard
   - Click "Create New Access Key"
   - Name: "Dog Shelter Website"
   - Email Destination: `shelter@utulok-trencin.sk` (or your email)
   - Click "Create"

3. **Copy Access Key**:
   - Copy the generated access key (e.g., `abcd1234-5678-90ef-ghij-klmnopqrstuv`)

4. **Add to `.env`**:
   ```env
   PUBLIC_WEB3FORMS_KEY=abcd1234-5678-90ef-ghij-klmnopqrstuv
   ```

5. **Configure Domain** (Optional):
   - Dashboard → Settings → Allowed Domains
   - Add: `utulok-trencin.sk`
   - This prevents unauthorized use of your access key

6. **Test Submission**:
   - Dashboard → Test Form
   - Submit test to verify email delivery

---

### 3. MailerLite Setup

**Purpose**: Newsletter subscription management

**Steps**:

1. **Create Account**:
   - Go to https://www.mailerlite.com/
   - Click "Start Free"
   - Sign up with email (EU-based company, GDPR compliant)

2. **Verify Email**:
   - Check inbox and verify your email address

3. **Get API Key**:
   - Log in to https://dashboard.mailerlite.com/
   - Click your profile (bottom-left) → Integrations
   - Click "Developer API"
   - Click "Generate new token"
   - Copy API key (e.g., `eyJ0eXAiOiJKV1QiLCJhbGc...`)

4. **Add to `.env`**:
   ```env
   PUBLIC_MAILERLITE_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...
   ```

5. **Create Custom Fields**:
   - Go to Subscribers → Fields
   - Click "Create field"
   - Create three fields:

   **Field 1: Consent**
   ```
   Field Name: consent
   Field Type: Boolean
   Default Value: false
   ```

   **Field 2: Source**
   ```
   Field Name: source
   Field Type: Text
   Default Value: (empty)
   ```

   **Field 3: Signup Date**
   ```
   Field Name: signup_date
   Field Type: Date
   Default Value: (empty)
   ```

6. **Configure Double Opt-In**:
   - Go to Forms → Signup forms
   - Create new form: "Website Newsletter"
   - Enable "Double opt-in"
   - Customize confirmation email (Slovak language):
     ```
     Subject: Potvrďte prihlásenie na odber
     Body: Vitajte! Kliknite na tlačidlo nižšie pre potvrdenie prihlásenia.
     ```

7. **Create Group** (Optional):
   - Go to Subscribers → Groups
   - Create group: "Website Signups"
   - Use for segmentation

---

### 4. GitHub OAuth Setup (for Decap CMS)

**Purpose**: Allow shelter staff to log in to CMS with GitHub account

**Steps**:

1. **Register OAuth App**:
   - Go to https://github.com/settings/developers
   - Click "OAuth Apps" → "New OAuth App"
   - Fill in:
     ```
     Application name: Trenčianský útulok CMS
     Homepage URL: https://utulok-trencin.sk
     Authorization callback URL: https://api.netlify.com/auth/done
     ```
   - Click "Register application"

2. **Get Client ID and Secret**:
   - Copy **Client ID**
   - Click "Generate a new client secret"
   - Copy **Client Secret** (save securely, won't be shown again)

3. **Update Decap CMS Config**:
   - Edit `/public/admin/config.yml`
   - Update backend section:
     ```yaml
     backend:
       name: github
       repo: YOUR_USERNAME/dog-shelter-website
       branch: master
       base_url: https://api.netlify.com
       auth_endpoint: auth
     ```

4. **Netlify OAuth Gateway** (Free):
   - Go to https://www.netlify.com/
   - Sign up / Log in
   - Go to Site settings → Access control → OAuth
   - Click "Install provider"
   - Select "GitHub"
   - Paste Client ID and Client Secret
   - Save

**Alternative: Cloudflare Workers OAuth** (Advanced):
- See `/docs/cloudflare-oauth-setup.md` for custom OAuth implementation
- Use if you prefer not to use Netlify's free gateway

---

### 5. Cloudflare Pages Setup

**Purpose**: Production hosting and deployment

**Steps**:

1. **Create Cloudflare Account**:
   - Go to https://dash.cloudflare.com/sign-up
   - Sign up with email
   - Verify email

2. **Get API Token**:
   - Log in to https://dash.cloudflare.com/
   - My Profile → API Tokens
   - Click "Create Token"
   - Use template: "Edit Cloudflare Workers"
   - Permissions:
     - Account → Cloudflare Pages → Edit
   - Continue to summary → Create Token
   - Copy token (save securely)

3. **Get Account ID**:
   - Dashboard → Select any site (or Workers)
   - Account ID is visible on right sidebar
   - Copy Account ID (e.g., `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

4. **Create Cloudflare Pages Project**:
   - Go to Pages → Create a project
   - Connect to Git → Select your repository
   - Build settings:
     ```
     Framework preset: Astro
     Build command: pnpm run build
     Build output directory: dist
     ```
   - Environment variables: (add from .env file)
     ```
     PUBLIC_CLOUDINARY_CLOUD_NAME=...
     CLOUDINARY_API_KEY=...
     CLOUDINARY_API_SECRET=...
     PUBLIC_WEB3FORMS_KEY=...
     PUBLIC_MAILERLITE_KEY=...
     ```
   - Click "Save and Deploy"

5. **Configure Custom Domain** (Optional):
   - Pages → Your Project → Custom domains
   - Add custom domain: `utulok-trencin.sk`
   - Add DNS records (CNAME):
     ```
     Type: CNAME
     Name: @
     Target: your-project.pages.dev
     ```
   - Wait for SSL certificate (automatic, 1-5 minutes)

---

## Local Development

### 1. Start Development Server

```bash
# Start Astro dev server
pnpm run dev

# Expected output:
# 🚀  astro  v5.x.x started in XXms
# ┃ Local    http://localhost:4321/
# ┃ Network  use --host to expose
```

### 2. Open Browser

- Navigate to http://localhost:4321/
- You should see the homepage

### 3. Hot Reload

- Edit files in `/src/`
- Browser automatically refreshes
- Changes appear instantly

### 4. Access CMS Locally

- Navigate to http://localhost:4321/admin/
- Click "Login with GitHub"
- Authorize OAuth app
- You can now edit content

**Note**: CMS requires Git backend, so you must have committed changes and pushed to GitHub.

### 5. Build for Production (Local Test)

```bash
# Build static site
pnpm run build

# Expected output:
# ✓ Built in XXXms

# Preview production build
pnpm run preview

# Open http://localhost:4321/ to test production build
```

### 6. TypeScript Checks

```bash
# Run TypeScript type checking
pnpm run astro check

# Expected output: "0 errors"
```

### 7. Linting (Optional)

```bash
# If ESLint is configured
pnpm run lint
```

---

## Deployment

### Option 1: Automatic Deployment (GitHub Actions)

**Setup** (One-time):

1. **Add GitHub Secrets**:
   - Go to Repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Add secrets:
     ```
     CLOUDFLARE_API_TOKEN=your_token_here
     CLOUDFLARE_ACCOUNT_ID=your_account_id_here
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     WEB3FORMS_KEY=your_web3forms_key
     MAILERLITE_KEY=your_mailerlite_key
     ```

2. **Workflow File** (Already exists):
   - `.github/workflows/deploy.yml` is already configured
   - Triggers on push to `master` branch

**Deploy**:

```bash
# Commit changes
git add .
git commit -m "feat: add new dog profile"

# Push to master (triggers deployment)
git push origin master

# GitHub Actions will:
# 1. Run TypeScript checks
# 2. Build site
# 3. Deploy to Cloudflare Pages
# 4. Post deployment notification
```

**Monitor Deployment**:
- Go to Repository → Actions tab
- View workflow run progress
- Deployment takes ~2-5 minutes

---

### Option 2: Manual Deployment (Wrangler CLI)

**Setup** (One-time):

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login
# Opens browser, authorize Wrangler
```

**Deploy**:

```bash
# Build site
pnpm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=dog-shelter

# Expected output:
# ✨ Success! Deployed to https://dog-shelter.pages.dev
```

---

### Option 3: Cloudflare Dashboard (Drag & Drop)

1. Build locally: `pnpm run build`
2. Go to Cloudflare Pages dashboard
3. Select your project
4. Click "Upload assets"
5. Drag `/dist` folder
6. Wait for deployment (~1 minute)

**Note**: This doesn't set environment variables. Use GitHub Actions or Wrangler CLI for production.

---

## CMS Access

### For Shelter Staff

**Accessing the CMS**:

1. Navigate to https://utulok-trencin.sk/admin/
2. Click "Login with GitHub"
3. Authorize app (first time only)
4. You're now logged in to the CMS

**Adding a New Dog**:

1. Click "Psíci" (Dogs) in sidebar
2. Click "New Psíci" button
3. Fill in required fields:
   - Meno (Name)
   - Plemeno (Breed)
   - Vek (Age)
   - Pohlavie (Gender)
   - Hlavná fotka (Main photo) - click Upload, select file
   - Krátky popis (Short description)
4. Fill in optional fields (health, personality, compatibility)
5. Click "Publish" → "Publish now"
6. Changes are committed to Git
7. Site rebuilds automatically (2-5 minutes)

**Editing Existing Dog**:

1. Click "Psíci" in sidebar
2. Click on dog name to edit
3. Make changes
4. Click "Publish" → "Publish now"
5. Site rebuilds

**Adding Blog Post**:

1. Click "Blog" in sidebar
2. Click "New Blog" button
3. Fill in fields (title, description, date, author, image, body)
4. Click "Publish"

**Publishing Success Story**:

1. Click "Uspešné príbehy" (Success Stories) in sidebar
2. Click "New Uspešné príbehy"
3. Fill in fields
4. Upload before/after photos
5. Click "Publish"

---

## Troubleshooting

### Build Errors

**Error**: `Cannot find module 'astro'`
```bash
# Solution: Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Error**: `TypeScript errors found`
```bash
# Solution: Run type check to see errors
pnpm run astro check

# Fix TypeScript errors in reported files
```

**Error**: `Image optimization failed`
```bash
# Solution: Install Sharp (image optimization library)
pnpm add sharp

# Or use system package manager
# macOS: brew install vips
# Linux: apt-get install libvips
```

---

### CMS Issues

**Error**: `Failed to load entries`
```bash
# Solution: Check GitHub OAuth configuration
# 1. Verify callback URL: https://api.netlify.com/auth/done
# 2. Check repo name in /public/admin/config.yml
# 3. Ensure you have write access to repository
```

**Error**: `Image upload failed`
```bash
# Solution: Check Cloudinary configuration
# 1. Verify API key in .env
# 2. Check upload preset exists (dog_profiles)
# 3. Verify preset is "Unsigned" in Cloudinary dashboard
```

**Error**: `Cannot publish changes`
```bash
# Solution: Check GitHub permissions
# 1. Ensure you're logged in with GitHub account
# 2. Verify you have write access to repository
# 3. Check if branch is protected (Settings → Branches)
```

---

### Form Issues

**Error**: `Form submission failed`
```bash
# Solution: Check Web3Forms configuration
# 1. Verify access key in .env
# 2. Test access key at https://web3forms.com/dashboard
# 3. Check browser console for CORS errors
# 4. Verify domain is whitelisted in Web3Forms settings
```

**Error**: `Newsletter signup failed`
```bash
# Solution: Check MailerLite configuration
# 1. Verify API key in .env
# 2. Test API key with curl:
curl -H "X-MailerLite-ApiKey: YOUR_KEY" \
  https://api.mailerlite.com/api/v2/subscribers

# 3. Check custom fields exist (consent, source, signup_date)
# 4. Verify double opt-in is configured
```

---

### Deployment Issues

**Error**: `Deployment failed - TypeScript errors`
```bash
# Solution: Run checks locally first
pnpm run astro check

# Fix errors, then redeploy
```

**Error**: `Environment variables not set`
```bash
# Solution: Add environment variables
# GitHub Actions: Add to Repository Secrets
# Cloudflare Pages: Add in dashboard → Settings → Environment variables
# Local: Add to .env file
```

**Error**: `Cloudflare API token invalid`
```bash
# Solution: Regenerate API token
# 1. Cloudflare dashboard → My Profile → API Tokens
# 2. Revoke old token
# 3. Create new token with "Edit Cloudflare Workers" permissions
# 4. Update GitHub secret: CLOUDFLARE_API_TOKEN
```

---

### Performance Issues

**Error**: `Images loading slowly`
```bash
# Solution: Verify Cloudinary optimization
# 1. Check image URLs include transformations (f_auto, q_auto)
# 2. Verify srcset is generated correctly
# 3. Check lazy loading is enabled (loading="lazy")
# 4. Use browser DevTools Network tab to inspect image sizes
```

**Error**: `Lighthouse score below 90`
```bash
# Solution: Run local Lighthouse audit
# 1. Build site: pnpm run build
# 2. Preview: pnpm run preview
# 3. Open Chrome DevTools → Lighthouse tab
# 4. Run audit, review suggestions
# 5. Common fixes:
#    - Add lazy loading to images
#    - Preload hero images
#    - Minimize JavaScript
#    - Use Cloudinary auto-optimization
```

---

## Common Commands

```bash
# Development
pnpm run dev              # Start dev server
pnpm run build            # Build for production
pnpm run preview          # Preview production build
pnpm run astro check      # TypeScript type checking

# Git
git status                # Check file changes
git add .                 # Stage all changes
git commit -m "message"   # Commit with message
git push origin master    # Push to remote (triggers deployment)

# Deployment
wrangler login            # Login to Cloudflare
wrangler pages deploy dist --project-name=dog-shelter  # Manual deploy

# Debugging
pnpm run astro info       # Show Astro version and config
node --version            # Check Node.js version
pnpm --version            # Check pnpm version
```

---

## Next Steps

After completing setup:

1. ✅ Verify all services are configured correctly
2. ✅ Test CMS locally (add/edit dog profile)
3. ✅ Test forms locally (contact, newsletter)
4. ✅ Build and preview production site
5. ✅ Deploy to Cloudflare Pages
6. ✅ Verify deployed site works
7. ✅ Train shelter staff on CMS usage
8. ✅ Monitor usage of free tier services
9. ✅ Set up analytics (Google Analytics, Plausible, etc.)
10. ✅ Configure custom domain (utulok-trencin.sk)

---

## Support & Resources

### Documentation

- **Astro Docs**: https://docs.astro.build/
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Decap CMS**: https://decapcms.org/docs/
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Web3Forms Docs**: https://docs.web3forms.com/
- **MailerLite Docs**: https://developers.mailerlite.com/

### Community

- **Astro Discord**: https://astro.build/chat
- **Decap CMS Forum**: https://github.com/decaporg/decap-cms/discussions

### Getting Help

- **Issues**: https://github.com/YOUR_USERNAME/dog-shelter-website/issues
- **Email**: developer@utulok-trencin.sk

---

**Last Updated**: 2025-12-27
**Status**: Production Ready ✅
**Estimated Setup Time**: 30-60 minutes (first time)

---

## Changelog

### v1.0.0 (2025-12-27)
- Initial quickstart guide
- Complete setup instructions for all services
- Deployment guide for GitHub Actions and manual deployment
- Troubleshooting section
- CMS usage guide for shelter staff

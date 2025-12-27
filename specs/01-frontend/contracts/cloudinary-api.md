# Cloudinary API Contract

**Service**: Cloudinary
**Purpose**: Media management (images, videos) for dog profiles, blog posts, success stories
**Documentation**: https://cloudinary.com/documentation
**Free Tier**: 25GB storage, 25GB bandwidth/month, 25k transformations/month
**Cost**: €0/month within free tier limits

---

## Overview

Cloudinary provides:
1. **Media Storage**: Cloud-based image/video hosting
2. **Automatic Optimization**: Format conversion (WebP, AVIF), compression
3. **Responsive Images**: Dynamic image resizing via URL parameters
4. **Transformations**: Crop, resize, filters, overlays (25k/month free)
5. **CMS Integration**: Upload widget for Decap CMS

---

## Authentication

### API Credentials

- **Cloud Name**: Public identifier (e.g., `trenciansky-utulok`)
- **API Key**: Public key for uploads
- **API Secret**: Private key (server-side only, NOT exposed to client)

**Storage**:
- `PUBLIC_CLOUDINARY_CLOUD_NAME`: Public (used in URLs)
- `CLOUDINARY_API_KEY`: Public (used in upload widget)
- `CLOUDINARY_API_SECRET`: Server-side only (NOT in client code)

### Where to Find Credentials

1. Log in to https://cloudinary.com/console
2. Dashboard → Account Details (top-right)
3. Copy Cloud Name, API Key, API Secret

---

## Image Delivery (Read)

### Base URL Format

```
https://res.cloudinary.com/{cloud_name}/{resource_type}/{delivery_type}/{transformations}/{version}/{public_id}.{format}
```

### Example URLs

**Original Image**:
```
https://res.cloudinary.com/trenciansky-utulok/image/upload/dogs/max/photo.jpg
```

**Optimized WebP (800px width)**:
```
https://res.cloudinary.com/trenciansky-utulok/image/upload/w_800,f_webp,q_auto/dogs/max/photo.jpg
```

**Responsive Srcset**:
```
https://res.cloudinary.com/trenciansky-utulok/image/upload/w_400,f_webp,q_auto/dogs/max/photo.jpg 400w
https://res.cloudinary.com/trenciansky-utulok/image/upload/w_800,f_webp,q_auto/dogs/max/photo.jpg 800w
https://res.cloudinary.com/trenciansky-utulok/image/upload/w_1200,f_webp,q_auto/dogs/max/photo.jpg 1200w
```

---

## URL Transformation Parameters

### Common Parameters

| Parameter | Description | Example |
|-----------|-------------|---------|
| `w_400` | Width 400px | `w_400` |
| `h_300` | Height 300px | `h_300` |
| `c_fill` | Crop to fill dimensions | `c_fill,w_400,h_300` |
| `c_fit` | Fit within dimensions | `c_fit,w_400` |
| `f_auto` | Auto format (WebP, AVIF) | `f_auto` |
| `f_webp` | Force WebP format | `f_webp` |
| `q_auto` | Auto quality | `q_auto` |
| `q_85` | Quality 85% | `q_85` |
| `ar_16:9` | Aspect ratio 16:9 | `ar_16:9,c_fill` |
| `g_face` | Gravity face (crop focus) | `c_fill,g_face,w_400,h_400` |

### Chaining Transformations

Combine multiple transformations with commas:

```
https://res.cloudinary.com/trenciansky-utulok/image/upload/w_800,h_600,c_fill,g_face,f_webp,q_auto/dogs/max/photo.jpg
```

**Result**: 800x600px, cropped to fill, focused on face, WebP format, auto quality

---

## Upload API (Write)

### Upload Endpoint

**URL**: `https://api.cloudinary.com/v1_1/{cloud_name}/image/upload`
**Method**: `POST`
**Content-Type**: `multipart/form-data`

### Upload Request

```javascript
const formData = new FormData();
formData.append('file', imageFile); // File object or Base64 data URI
formData.append('upload_preset', 'dog_profiles'); // Unsigned preset name
formData.append('folder', 'dogs/max'); // Cloudinary folder path
formData.append('public_id', 'photo-1'); // Optional custom filename
formData.append('tags', 'dog,max,labrador'); // Optional tags

const response = await fetch(
  'https://api.cloudinary.com/v1_1/trenciansky-utulok/image/upload',
  {
    method: 'POST',
    body: formData,
  }
);

const result = await response.json();
```

### Upload Response

**Success** (200 OK):

```json
{
  "public_id": "dogs/max/photo-1",
  "version": 1735300800,
  "signature": "abcdef1234567890",
  "width": 1920,
  "height": 1080,
  "format": "jpg",
  "resource_type": "image",
  "created_at": "2025-12-27T10:00:00Z",
  "bytes": 524288,
  "type": "upload",
  "url": "http://res.cloudinary.com/trenciansky-utulok/image/upload/v1735300800/dogs/max/photo-1.jpg",
  "secure_url": "https://res.cloudinary.com/trenciansky-utulok/image/upload/v1735300800/dogs/max/photo-1.jpg"
}
```

**Error** (400 Bad Request):

```json
{
  "error": {
    "message": "Upload preset not found"
  }
}
```

---

## Upload Presets

### What are Upload Presets?

Upload presets are pre-configured upload settings (unsigned or signed) that allow client-side uploads without exposing API secret.

### Creating Upload Preset

1. Go to Settings → Upload → Upload presets
2. Click "Add upload preset"
3. Configure:
   - **Preset name**: `dog_profiles`
   - **Signing mode**: Unsigned (allows client-side uploads)
   - **Folder**: `dogs` (default folder, can override per upload)
   - **Allowed formats**: jpg, png, webp
   - **Max file size**: 10 MB
   - **Transformations**: Auto-optimize (f_auto, q_auto)
   - **Tags**: Auto-tag with upload source

4. Save preset

### Upload Preset Examples

**Dog Profiles Preset**:
```yaml
Preset Name: dog_profiles
Signing Mode: Unsigned
Folder: dogs
Formats: jpg, png, webp
Max Size: 10 MB
Auto-tag: dog-profile
Transformations: f_auto,q_auto
```

**Blog Images Preset**:
```yaml
Preset Name: blog_images
Signing Mode: Unsigned
Folder: blog
Formats: jpg, png, webp
Max Size: 5 MB
Auto-tag: blog
Transformations: f_auto,q_auto
```

**Success Stories Preset**:
```yaml
Preset Name: success_stories
Signing Mode: Unsigned
Folder: success-stories
Formats: jpg, png, webp
Max Size: 5 MB
Auto-tag: success-story
Transformations: f_auto,q_auto
```

---

## Folder Structure

Organize media in logical folders:

```
/dogs/
  /max/
    photo-1.jpg
    photo-2.jpg
    gallery-1.jpg
  /bella/
    photo-1.jpg
    gallery-1.jpg
/blog/
  cipovanie-psov-hero.jpg
  adopcia-tipy-hero.jpg
/success-stories/
  rex-before.jpg
  rex-after.jpg
/general/
  logo.png
  hero-background.jpg
```

**Naming Convention**:
- Lowercase, kebab-case
- Descriptive names: `max-portrait.jpg` not `IMG_1234.jpg`
- Use folders to organize by dog/post

---

## Decap CMS Integration

### Cloudinary Widget Configuration

In `/public/admin/config.yml`:

```yaml
media_library:
  name: cloudinary
  config:
    cloud_name: trenciansky-utulok
    api_key: 123456789012345 # Your API key
    multiple: true # Allow multiple file selection
    default_transformations:
      - - fetch_format: auto
          quality: auto
```

### Upload Widget in CMS

When shelter staff upload images via Decap CMS:
1. Click "Upload" on image field
2. Cloudinary widget opens
3. Select files from computer
4. Widget uploads to Cloudinary using `dog_profiles` preset
5. Returns Cloudinary URL
6. CMS saves URL in markdown frontmatter

**Example Markdown**:

```markdown
---
name: Max
image: https://res.cloudinary.com/trenciansky-utulok/image/upload/dogs/max/photo-1.jpg
images:
  - https://res.cloudinary.com/trenciansky-utulok/image/upload/dogs/max/gallery-1.jpg
  - https://res.cloudinary.com/trenciansky-utulok/image/upload/dogs/max/gallery-2.jpg
---
```

---

## Implementation Helpers

### Cloudinary Helper Utility

```typescript
// src/utils/cloudinary.ts

export interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
}

export const cloudinaryConfig: CloudinaryConfig = {
  cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'trenciansky-utulok',
  apiKey: import.meta.env.CLOUDINARY_API_KEY || '',
};

/**
 * Generate Cloudinary URL with transformations
 */
export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'scale' | 'crop';
    gravity?: 'face' | 'center' | 'auto';
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
    quality?: 'auto' | number;
  }
): string {
  const { cloudName } = cloudinaryConfig;
  const transformations: string[] = [];

  if (options?.width) transformations.push(`w_${options.width}`);
  if (options?.height) transformations.push(`h_${options.height}`);
  if (options?.crop) transformations.push(`c_${options.crop}`);
  if (options?.gravity) transformations.push(`g_${options.gravity}`);
  if (options?.format) transformations.push(`f_${options.format}`);
  if (options?.quality) transformations.push(`q_${options.quality}`);

  const transformString = transformations.length > 0
    ? transformations.join(',') + '/'
    : '';

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}${publicId}`;
}

/**
 * Generate responsive srcset for Astro Image component
 */
export function getCloudinaryImageSrcset(
  publicId: string,
  widths: number[] = [400, 800, 1200]
): string {
  return widths
    .map(width => {
      const url = getCloudinaryUrl(publicId, {
        width,
        format: 'webp',
        quality: 'auto',
      });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Extract public_id from Cloudinary URL
 * https://res.cloudinary.com/cloud/image/upload/v123/dogs/max/photo.jpg → dogs/max/photo
 */
export function extractPublicId(cloudinaryUrl: string): string {
  const match = cloudinaryUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
  return match ? match[1] : cloudinaryUrl;
}
```

### Usage in Astro Components

```astro
---
// src/pages/psici/[...slug].astro
import { Image } from 'astro:assets';
import { getCloudinaryUrl, extractPublicId } from '@/utils/cloudinary';

const dog = await getEntry('dogs', slug);
const publicId = extractPublicId(dog.data.image);
---

<!-- Optimized image with lazy loading -->
<Image
  src={getCloudinaryUrl(publicId, { width: 800, format: 'webp', quality: 'auto' })}
  alt={`${dog.data.name} - ${dog.data.breed}`}
  width={800}
  height={600}
  loading="lazy"
  decoding="async"
/>

<!-- Responsive image with srcset -->
<img
  src={getCloudinaryUrl(publicId, { width: 800, format: 'webp' })}
  srcset={`
    ${getCloudinaryUrl(publicId, { width: 400, format: 'webp' })} 400w,
    ${getCloudinaryUrl(publicId, { width: 800, format: 'webp' })} 800w,
    ${getCloudinaryUrl(publicId, { width: 1200, format: 'webp' })} 1200w
  `}
  sizes="(max-width: 768px) 100vw, 800px"
  alt={`${dog.data.name} - ${dog.data.breed}`}
  loading="lazy"
/>
```

---

## Performance Optimization

### Best Practices

1. **Use Auto Format**: `f_auto` serves WebP to modern browsers, JPEG to legacy
2. **Use Auto Quality**: `q_auto` balances quality and file size
3. **Lazy Loading**: Add `loading="lazy"` to below-fold images
4. **Responsive Images**: Use srcset with 3 sizes (400px, 800px, 1200px)
5. **Preload Hero Images**: Add `<link rel="preload" as="image">` for above-fold images
6. **Use Correct Crop Mode**: `c_fill` for thumbnails, `c_fit` for full images

### Example Optimizations

**Hero Image** (above-fold, preload):
```astro
---
const heroUrl = getCloudinaryUrl('general/hero-background', {
  width: 1920,
  format: 'webp',
  quality: 80,
});
---

<link rel="preload" as="image" href={heroUrl} />
<img src={heroUrl} alt="Hero" />
```

**Thumbnail Grid** (lazy-loaded, cropped):
```astro
{dogs.map(dog => (
  <img
    src={getCloudinaryUrl(extractPublicId(dog.data.image), {
      width: 400,
      height: 400,
      crop: 'fill',
      gravity: 'face',
      format: 'webp',
      quality: 'auto',
    })}
    alt={dog.data.name}
    loading="lazy"
  />
))}
```

---

## Transformation Budget

Free tier allows **25,000 transformations/month**.

### What Counts as a Transformation?

Each unique URL with transformations counts as 1 transformation:
- `w_400,f_webp` = 1 transformation
- `w_800,f_webp` = 1 transformation (different from above)
- Repeated requests use cached version (no additional transformation)

### Calculating Usage

**Assumptions**:
- 30 dog profiles × 3 images each = 90 images
- 3 srcset sizes (400px, 800px, 1200px) = 3 transformations per image
- 10 blog posts × 1 image each = 10 images
- 10 success stories × 2 images each = 20 images

**Total Transformations**:
- Dogs: 90 images × 3 sizes = 270
- Blog: 10 images × 3 sizes = 30
- Success: 20 images × 3 sizes = 60
- General: ~20 images × 3 sizes = 60

**Total**: ~420 unique transformations (well within 25k limit)

**Monthly Traffic Estimate**:
- 1,000 page views/month
- Cached transformations serve repeated requests
- Actual transformations: 420 (build time) + minimal runtime

**Conclusion**: Free tier is sufficient for MVP. Monitor usage in Cloudinary dashboard.

---

## Monitoring & Limits

### Free Tier Limits

- **25 GB storage**: ~25,000 images at 1MB each (generous)
- **25 GB bandwidth/month**: ~25,000 image requests at 1MB each
- **25k transformations/month**: Enough for 8,000+ unique transformation URLs

### Usage Monitoring

**Cloudflare Dashboard**:
1. Log in to https://cloudinary.com/console
2. Dashboard → Usage
3. Check Storage, Bandwidth, Transformations

**Set Alerts**:
- Settings → Usage → Set alerts at 80% for storage and bandwidth

### Upgrade Path (if needed)

- **Plus Plan**: $99/month for 87 GB storage, 87 GB bandwidth, 100k transformations
- **Not needed for MVP**: Free tier should suffice for 20-40 dogs

---

## Security Considerations

1. **Upload Presets**: Use unsigned presets for Decap CMS uploads (secure enough for low-risk content)
2. **API Secret**: NEVER expose API secret in client-side code (only API Key is public)
3. **File Size Limits**: Configure max 10MB per upload preset to prevent abuse
4. **Allowed Formats**: Restrict to jpg, png, webp only
5. **Content Moderation**: Review uploaded images in Cloudinary dashboard periodically

---

## Testing

### Manual Testing Checklist

- [ ] Upload image via Decap CMS → image appears in Cloudinary dashboard
- [ ] Image URL works in browser
- [ ] Transformed URL (w_400,f_webp) loads correctly
- [ ] Responsive srcset loads appropriate size on mobile/desktop
- [ ] Lazy loading delays below-fold image load
- [ ] Verify Cloudinary dashboard shows correct folder structure
- [ ] Check transformation count in usage dashboard
- [ ] Test upload preset with 10MB+ file → rejected

### Test Upload

```bash
# Test upload via curl
curl -X POST \
  https://api.cloudinary.com/v1_1/trenciansky-utulok/image/upload \
  -F "file=@/path/to/test-image.jpg" \
  -F "upload_preset=dog_profiles" \
  -F "folder=test" \
  -F "public_id=test-upload"
```

**Expected Result**: JSON response with `secure_url` field

---

## Migration Strategy

### Migrating Existing Local Images

**Current State**: Images in `/public/images/dogs/`
**Target State**: Images on Cloudinary

**Migration Steps**:

1. **Bulk Upload Script**:

```javascript
// scripts/upload-to-cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImagesFromFolder(localFolder, cloudinaryFolder) {
  const files = fs.readdirSync(localFolder);

  for (const file of files) {
    if (!/\.(jpg|jpeg|png|webp)$/i.test(file)) continue;

    const filePath = path.join(localFolder, file);
    const publicId = path.join(cloudinaryFolder, path.parse(file).name);

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        folder: cloudinaryFolder,
        resource_type: 'image',
      });

      console.log(`✅ Uploaded: ${publicId} → ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ Failed: ${file}`, error.message);
    }
  }
}

// Upload all dog images
uploadImagesFromFolder('./public/images/dogs', 'dogs');
```

2. **Update Markdown Files**:

Replace local paths with Cloudinary URLs:

```bash
# Before
image: /images/dogs/max/photo.jpg

# After
image: https://res.cloudinary.com/trenciansky-utulok/image/upload/dogs/max/photo.jpg
```

3. **Run script**:

```bash
node scripts/upload-to-cloudinary.js
```

4. **Verify in Cloudinary dashboard**

5. **Update content collection frontmatter** (manual or scripted)

---

## Rollback Plan

If Cloudinary fails or hits limits:

1. **Fallback to Local Images**: Revert to `/public/images/` folder
2. **Switch to imgix**: Similar service, different pricing
3. **Use Cloudflare Images**: $5/month for 100k images (requires Cloudflare Workers)
4. **Self-hosted CDN**: Upload to Cloudflare R2 (S3-compatible storage)

**Note**: Local images work fine for MVP. Cloudinary is optimization, not requirement.

---

**Status**: Ready for Implementation ✅
**Last Updated**: 2025-12-27
**Next Steps**:
1. Create Cloudinary account (free tier)
2. Configure upload presets (dog_profiles, blog_images, success_stories)
3. Add Cloudinary credentials to environment variables
4. Configure Decap CMS with Cloudinary widget
5. Create cloudinary.ts utility helper
6. Migrate existing images (optional, can use local images initially)
7. Update Astro Image components to use Cloudinary URLs

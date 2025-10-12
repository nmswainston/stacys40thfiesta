# Image Optimization Guide

## Overview

This guide explains how to optimize images for faster loading on mobile and desktop devices.

## Current Status

The site now includes:
- ✅ `ResponsiveImage` component with WEBP support and `srcSet`
- ✅ Lazy loading on gallery images and memory feed
- ✅ Proper `sizes` attributes for mobile-first responsive loading
- ⏳ **Need to convert JPG/JPEG images to WEBP format**

## Image Optimization Strategy

### 1. Format Conversion (WEBP)

WEBP provides 25-35% smaller file sizes compared to JPEG with same quality.

**Before optimization:**
- `1 hero.jpg`: ~475KB
- Gallery images: ~150-300KB each

**After optimization (expected):**
- `1 hero-480w.webp`: ~40KB (mobile)
- `1 hero-768w.webp`: ~90KB (tablet)
- `1 hero-1200w.webp`: ~200KB (desktop)

### 2. Responsive Loading

The `ResponsiveImage` component automatically serves the right image size based on device:

```tsx
<ResponsiveImage 
  src="/assets/airbnb/1 hero.jpg"
  alt="Airbnb hero view"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
  lazy={false}
/>
```

### 3. Lazy Loading

- **Hero image on Stay page**: `lazy={false}` (loads immediately, above the fold)
- **Gallery images**: `lazy={true}` (loads when user scrolls near them)
- **Memory feed images**: `loading="lazy"` (user-uploaded content)

## How to Convert Images

### Option A: Automated Script (Recommended)

We've provided a Node.js script to convert all images automatically.

**Step 1: Install Sharp**
```bash
npm install --save-dev sharp
```

**Step 2: Run the conversion script**
```bash
node scripts/convert-images-to-webp.js
```

This will create:
- WEBP versions at 480px, 768px, and 1200px widths
- JPG fallback versions at the same sizes
- Preserves original images

**Expected output:**
```
🖼️  Image Optimization Script
================================

Found 13 images to convert:

Processing: 1 hero.jpg
  ✓ Created 1 hero-480w.webp (42KB)
  ✓ Created 1 hero-480w.jpg (68KB)
  ✓ Created 1 hero-768w.webp (89KB)
  ✓ Created 1 hero-768w.jpg (145KB)
  ✓ Created 1 hero-1200w.webp (198KB)
  ✓ Created 1 hero-1200w.jpg (310KB)

...

✅ All images processed successfully!
```

### Option B: Online Tools (No Installation)

If you prefer not to install dependencies:

1. **Squoosh.app** (Google's tool)
   - Visit: https://squoosh.app
   - Upload each image
   - Set resize width: 480px, 768px, 1200px
   - Choose WEBP format, 85% quality
   - Download and rename with appropriate suffix

2. **TinyPNG/TinyJPG**
   - Visit: https://tinypng.com
   - Drag and drop images
   - Download optimized versions

### Option C: Command Line (ImageMagick/cwebp)

If you have ImageMagick or cwebp installed:

```bash
# For each image, generate 3 sizes in WEBP
for img in public/assets/airbnb/*.jpg; do
  filename=$(basename "$img" .jpg)
  cwebp -q 85 -resize 480 0 "$img" -o "public/assets/airbnb/${filename}-480w.webp"
  cwebp -q 85 -resize 768 0 "$img" -o "public/assets/airbnb/${filename}-768w.webp"
  cwebp -q 85 -resize 1200 0 "$img" -o "public/assets/airbnb/${filename}-1200w.webp"
done
```

## File Naming Convention

The `ResponsiveImage` component expects this naming pattern:

```
Original file:
  public/assets/airbnb/1 hero.jpg

Generated files:
  public/assets/airbnb/1 hero-480w.webp   (mobile)
  public/assets/airbnb/1 hero-480w.jpg    (mobile fallback)
  public/assets/airbnb/1 hero-768w.webp   (tablet)
  public/assets/airbnb/1 hero-768w.jpg    (tablet fallback)
  public/assets/airbnb/1 hero-1200w.webp  (desktop)
  public/assets/airbnb/1 hero-1200w.jpg   (desktop fallback)
```

## Verification

After converting images:

1. **Test in browser:**
   - Open DevTools → Network tab
   - Filter by "Img"
   - Reload the Stay page
   - Verify WEBP images are loading on Chrome/Edge/Firefox
   - Check file sizes are significantly smaller

2. **Check responsive loading:**
   - Resize browser window
   - Different image sizes should load at different breakpoints

3. **Run Lighthouse:**
   ```bash
   npm run build
   npm run preview
   # Open in browser, run Lighthouse
   ```
   
   Expected improvements:
   - Performance score: +10-20 points
   - "Properly size images": ✅ Passed
   - "Serve images in next-gen formats": ✅ Passed
   - "Defer offscreen images": ✅ Passed

## Image Component Usage Examples

### Gallery images (lazy loaded):
```tsx
<ResponsiveImage 
  src="/assets/airbnb/2.jpg"
  alt="Property view 2"
  className="h-full w-full object-cover"
  lazy={true}
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
/>
```

### Hero images (eager loaded):
```tsx
<ResponsiveImage 
  src="/assets/airbnb/1 hero.jpg"
  alt="Airbnb hero view"
  className="w-full object-cover"
  lazy={false}
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
/>
```

### User-uploaded images (simple lazy loading):
```tsx
<img 
  src={memory.photoUrl}
  alt="User uploaded memory"
  loading="lazy"
  decoding="async"
/>
```

## Performance Impact

Expected improvements after optimization:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total image size (Stay page) | ~3.5MB | ~800KB | -77% |
| Mobile image size | ~3.5MB | ~400KB | -88% |
| LCP (Largest Contentful Paint) | 3.2s | 1.8s | -44% |
| Page load time (3G) | 8.5s | 4.2s | -51% |

## Troubleshooting

### Images not loading?

Check browser console for errors. Common issues:
- File names with spaces (should work, but verify)
- Missing fallback JPG files
- Incorrect path in `src` prop

### Large images still loading?

Verify the `ResponsiveImage` component is being used:
```tsx
// ❌ Old way
<img src="/assets/airbnb/1 hero.jpg" />

// ✅ New way
<ResponsiveImage src="/assets/airbnb/1 hero.jpg" />
```

### WEBP not supported on old browsers?

The component includes JPG fallbacks automatically. Safari 14+, Chrome 23+, Firefox 65+, and Edge 18+ all support WEBP.

## Further Optimization

After completing the above:

1. **Add blur placeholders:**
   - Generate tiny (20px wide) base64-encoded versions
   - Show while full image loads

2. **Consider CDN:**
   - Cloudinary or Imgix for dynamic resizing
   - Automatic format selection

3. **Compress SVGs:**
   - Run SVGO on icon SVGs
   - Remove unnecessary metadata

## Resources

- [web.dev - Serve responsive images](https://web.dev/serve-responsive-images/)
- [web.dev - Use WebP images](https://web.dev/serve-images-webp/)
- [Sharp documentation](https://sharp.pixelplumbing.com/)
- [Can I Use - WebP](https://caniuse.com/webp)


# Quick Reference: Optimized Image Usage

## For Developers

### Adding New Images to the Site

#### 1. Generate WebP Versions

Use the following command to create responsive WebP images:

```bash
# Install cwebp (if not already installed)
# Ubuntu/Debian: sudo apt install webp
# macOS: brew install webp
# Windows: Download from https://developers.google.com/speed/webp/download

# Generate WebP versions
cwebp -q 80 your-image.jpg -o /public_optimized/your-image.webp
cwebp -resize 400 0 -q 80 your-image.jpg -o /public_optimized/your-image-400.webp
cwebp -resize 800 0 -q 80 your-image.jpg -o /public_optimized/your-image-800.webp
cwebp -resize 1200 0 -q 80 your-image.jpg -o /public_optimized/your-image-1200.webp
```

#### 2. HTML Template for Portfolio/Content Images

```html
<picture>
    <source
        type="image/webp"
        srcset="/public_optimized/your-image-400.webp 400w,
                /public_optimized/your-image-800.webp 800w,
                /public_optimized/your-image-1200.webp 1200w"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px">
    <img
        src="your-image.jpg"
        alt="Descriptive alt text for accessibility"
        width="800"
        height="600"
        loading="lazy"
        decoding="async">
</picture>
```

#### 3. HTML Template for Hero/LCP Images

```html
<picture>
    <source
        type="image/webp"
        srcset="/public_optimized/hero-image-400.webp 400w,
                /public_optimized/hero-image-800.webp 800w,
                /public_optimized/hero-image-1200.webp 1200w"
        sizes="(max-width: 768px) 100vw, 50vw">
    <img
        src="hero-image.jpg"
        alt="Hero image description"
        width="1200"
        height="900"
        fetchpriority="high"
        decoding="async">
</picture>
```

**Note:** Do NOT use `loading="lazy"` on hero/LCP images!

#### 4. HTML Template for Small Icons/Logos

```html
<picture>
    <source
        type="image/webp"
        srcset="/public_optimized/logo-400.webp 400w,
                /public_optimized/logo-800.webp 800w"
        sizes="64px">
    <img
        src="logo.png"
        alt="Company logo"
        width="64"
        height="64"
        loading="lazy"
        decoding="async">
</picture>
```

---

## Key Attributes Explained

| Attribute | Purpose | When to Use |
|-----------|---------|-------------|
| `fetchpriority="high"` | Prioritizes download | Only for LCP (hero) images |
| `loading="lazy"` | Defers loading until needed | All images except LCP |
| `decoding="async"` | Non-blocking decode | All images |
| `width` / `height` | Prevents layout shift | **Always required** |
| `sizes` | Tells browser which size to download | All responsive images |
| `srcset` | Provides multiple image versions | All images with WebP |

---

## Sizes Attribute Guide

### Portfolio Cards / Content Images:
```html
sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
```
- Mobile: Full width
- Tablet: Half width
- Desktop: 400px fixed

### Hero Images:
```html
sizes="(max-width: 768px) 100vw, 50vw"
```
- Mobile: Full width
- Desktop: Half viewport

### Small Icons (64-96px):
```html
sizes="64px"
```
- Fixed size across all devices

---

## Common Mistakes to Avoid

❌ **DON'T:**
- Use `loading="lazy"` on LCP/hero images
- Forget width/height attributes (causes layout shift)
- Use only one image size (wastes bandwidth)
- Skip WebP format (misses 60-80% size reduction)

✅ **DO:**
- Use `fetchpriority="high"` ONLY for LCP images
- Always provide fallback src for old browsers
- Test on mobile devices
- Verify WebP files exist in `/public_optimized/`

---

## Testing Checklist

After adding new images:

1. **Visual Check:**
   - [ ] Image displays correctly on mobile
   - [ ] Image displays correctly on tablet
   - [ ] Image displays correctly on desktop
   - [ ] No broken images

2. **DevTools Network Tab:**
   - [ ] WebP version is served (not JPG/PNG)
   - [ ] Correct size is downloaded for viewport
   - [ ] Cache headers are present
   - [ ] Images below fold load lazily

3. **Performance:**
   - [ ] Run Lighthouse test
   - [ ] Check LCP is < 2.5s
   - [ ] Verify CLS is 0
   - [ ] No layout shift on image load

---

## File Structure

```
/public_optimized/
  ├── image-name.webp         (Original size)
  ├── image-name-400.webp     (Mobile)
  ├── image-name-800.webp     (Tablet)
  └── image-name-1200.webp    (Desktop)
```

**Keep original images** in root directory as fallback.

---

## Browser Support

| Format | Chrome | Firefox | Safari | Edge |
|--------|--------|---------|--------|------|
| WebP | ✅ | ✅ | ✅ 14+ | ✅ |
| JPG/PNG Fallback | ✅ | ✅ | ✅ | ✅ |

All browsers supported via `<picture>` element fallback!

---

## Performance Impact

| Image Type | Before | After | Savings |
|------------|--------|-------|---------|
| Hero (1200px) | ~800KB | ~120KB | 85% |
| Portfolio (800px) | ~400KB | ~60KB | 85% |
| Team Photo (1200px) | ~1.2MB | ~180KB | 85% |
| Profile (400px) | ~150KB | ~20KB | 87% |

**Total page weight reduction: 76% (5MB → 1.2MB)**

---

## Quick Commands

### Batch convert all JPG images:
```bash
for img in *.jpg; do
  cwebp -q 80 "$img" -o "/public_optimized/${img%.jpg}.webp"
  cwebp -resize 400 0 -q 80 "$img" -o "/public_optimized/${img%.jpg}-400.webp"
  cwebp -resize 800 0 -q 80 "$img" -o "/public_optimized/${img%.jpg}-800.webp"
  cwebp -resize 1200 0 -q 80 "$img" -o "/public_optimized/${img%.jpg}-1200.webp"
done
```

### Test WebP support in browser console:
```javascript
document.createElement('canvas')
  .toDataURL('image/webp')
  .indexOf('data:image/webp') === 0
```

### Check cache headers (cURL):
```bash
curl -I https://codenest.hu/public_optimized/hero-image.webp
```

Look for:
```
Cache-Control: public, max-age=31536000, immutable
Content-Type: image/webp
```

---

## Support & Questions

For questions or issues:
- See: `IMAGE-OPTIMIZATION-REPORT.md` for detailed documentation
- Check: `.htaccess` or `nginx.conf` for server configuration
- Test: Run Lighthouse in Chrome DevTools

**Last Updated:** 2026-01-17

# Deployment Checklist - Image Optimization

## Pre-Deployment Verification

### 1. File Structure Check
- [ ] `/public_optimized/` directory exists
- [ ] All WebP files are present (80+ files)
- [ ] Original JPG/PNG files remain in place as fallbacks
- [ ] `.htaccess` file is in root directory
- [ ] All files have correct permissions (644 for files, 755 for dirs)

### 2. HTML Validation
- [ ] All `<picture>` elements are properly formed
- [ ] All `<img>` tags have `width` and `height` attributes
- [ ] Hero image has `fetchpriority="high"`
- [ ] Hero image does NOT have `loading="lazy"`
- [ ] All other images have `loading="lazy"` and `decoding="async"`
- [ ] All `srcset` paths point to `/public_optimized/` directory

### 3. JavaScript Check
- [ ] `script.js` has `defer` attribute
- [ ] `cookie-consent.js` has `defer` attribute
- [ ] `emailjs` CDN has `defer` attribute

---

## Deployment Steps

### For Apache Servers:

1. **Upload Files:**
   ```bash
   # Upload .htaccess to root
   scp .htaccess user@server:/var/www/html/
   
   # Upload updated index.html
   scp index.html user@server:/var/www/html/
   
   # Upload /public_optimized/ directory
   scp -r public_optimized/ user@server:/var/www/html/
   ```

2. **Enable Apache Modules:**
   ```bash
   sudo a2enmod expires
   sudo a2enmod headers
   sudo a2enmod deflate
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

3. **Test Configuration:**
   ```bash
   apache2ctl configtest
   ```

### For Nginx Servers:

1. **Update Nginx Configuration:**
   ```bash
   # Edit your server block
   sudo nano /etc/nginx/sites-available/codenest.hu
   
   # Add content from nginx.conf
   # (or include the file)
   ```

2. **Test & Reload:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## Post-Deployment Testing

### 1. Visual Verification (Manual)
- [ ] Visit https://codenest.hu on desktop
- [ ] Check all images load correctly
- [ ] No broken images or layout issues
- [ ] Visit on mobile device
- [ ] Verify responsive behavior
- [ ] Check in different browsers (Chrome, Firefox, Safari)

### 2. Network Analysis (Chrome DevTools)

**Open DevTools → Network Tab:**
- [ ] WebP images are served (check file names end in .webp)
- [ ] Image sizes are appropriate for viewport
- [ ] Cache headers are present:
  ```
  Cache-Control: public, max-age=31536000, immutable
  ```
- [ ] GZIP compression is active (check Content-Encoding header)
- [ ] JavaScript loads after HTML (check waterfall chart)

**Commands to verify:**
```bash
# Check WebP is served
curl -H "Accept: image/webp" https://codenest.hu/public_optimized/hero-image.webp -I

# Check cache headers
curl -I https://codenest.hu/public_optimized/logo_png.webp

# Check GZIP compression
curl -H "Accept-Encoding: gzip" -I https://codenest.hu/styles.css
```

### 3. Performance Testing

**A. Google PageSpeed Insights:**
```
https://pagespeed.web.dev/analysis?url=https://codenest.hu
```

**Expected scores:**
- [ ] Performance: 95-100 (Mobile)
- [ ] Performance: 98-100 (Desktop)
- [ ] LCP: < 2.5 seconds
- [ ] CLS: 0.0
- [ ] FCP: < 1.8 seconds

**B. Lighthouse (Chrome DevTools):**
```
DevTools → Lighthouse → Generate Report
```

**C. WebPageTest:**
```
https://www.webpagetest.org/
```

### 4. Core Web Vitals Check

**Expected Metrics:**
| Metric | Target | Status |
|--------|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | ✅ |
| FID (First Input Delay) | < 100ms | ✅ |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ |
| FCP (First Contentful Paint) | < 1.8s | ✅ |
| TTI (Time to Interactive) | < 3.8s | ✅ |

---

## Troubleshooting Guide

### Issue: Images not loading

**Symptoms:** Broken image icons, 404 errors

**Solutions:**
1. Check file paths (case-sensitive):
   ```bash
   ls -la /var/www/html/public_optimized/
   ```
2. Verify permissions:
   ```bash
   chmod 644 /var/www/html/public_optimized/*.webp
   ```
3. Check Apache/Nginx error logs:
   ```bash
   # Apache
   tail -f /var/log/apache2/error.log
   
   # Nginx
   tail -f /var/log/nginx/error.log
   ```

### Issue: Original JPG/PNG served instead of WebP

**Symptoms:** Large file sizes, .jpg extension in Network tab

**Solutions:**
1. Verify browser supports WebP:
   - Open DevTools Console
   - Run: `document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0`
   - Should return `true`

2. Check Content-Type header:
   ```bash
   curl -I https://codenest.hu/public_optimized/hero-image.webp
   ```
   Should show: `Content-Type: image/webp`

3. Add MIME type to server config:
   ```apache
   # Apache (.htaccess)
   AddType image/webp .webp
   ```

### Issue: Cache headers not working

**Symptoms:** No `Cache-Control` header, resources re-download

**Solutions:**
1. Verify Apache modules:
   ```bash
   apache2ctl -M | grep -E 'expires|headers'
   ```

2. Check .htaccess location (must be in root)

3. Clear browser cache:
   - Chrome: Ctrl+Shift+Delete → Clear browsing data
   - Or use Incognito mode

4. Verify with curl:
   ```bash
   curl -I https://codenest.hu/public_optimized/logo.webp | grep Cache-Control
   ```

### Issue: Layout shift still occurring

**Symptoms:** CLS score > 0.1, content jumps when loading

**Solutions:**
1. Verify all images have width/height:
   ```javascript
   // Run in DevTools Console
   document.querySelectorAll('img:not([width])').length
   // Should return 0
   ```

2. Check CSS doesn't override dimensions:
   ```css
   /* Make sure you don't have: */
   img { width: auto; height: auto; }
   ```

3. Add aspect-ratio CSS if needed:
   ```css
   .portfolio-image img {
       aspect-ratio: 4/3;
   }
   ```

### Issue: Slow LCP

**Symptoms:** LCP > 2.5s, hero image loads late

**Solutions:**
1. Verify `fetchpriority="high"` is present on hero image
2. Ensure NO `loading="lazy"` on hero image
3. Check hero image is in viewport on page load
4. Preload hero image in `<head>`:
   ```html
   <link rel="preload" as="image" href="/public_optimized/i_b_l-800.webp" type="image/webp">
   ```

---

## Rollback Plan

If issues occur, follow these steps:

### Quick Rollback (Disable Optimizations):

1. **Rename .htaccess:**
   ```bash
   mv .htaccess .htaccess.backup
   ```

2. **Revert index.html:**
   ```bash
   git checkout HEAD~1 index.html
   # Or restore from backup
   ```

3. **Clear cache:**
   ```bash
   # Apache
   sudo service apache2 restart
   
   # Nginx
   sudo systemctl reload nginx
   ```

### Partial Rollback (Keep some optimizations):

**Keep:** WebP images, picture elements  
**Remove:** Caching headers

```bash
# Comment out Expires and Headers sections in .htaccess
sed -i 's/^ExpiresByType/#ExpiresByType/' .htaccess
sed -i 's/^Header set Cache/#Header set Cache/' .htaccess
```

---

## Monitoring & Maintenance

### Weekly Checks:
- [ ] Run PageSpeed Insights test
- [ ] Check error logs for image 404s
- [ ] Verify cache hit rate (if using CDN)

### Monthly Checks:
- [ ] Review Core Web Vitals in Google Search Console
- [ ] Test on new browser versions
- [ ] Check for new image formats (AVIF, JPEG XL)

### When Adding New Images:
- [ ] Generate WebP versions (see Quick Reference guide)
- [ ] Use `<picture>` template
- [ ] Add width/height attributes
- [ ] Test on mobile and desktop
- [ ] Run Lighthouse after deployment

---

## Support & Documentation

**Primary Documentation:**
- `IMAGE-OPTIMIZATION-REPORT.md` - Detailed technical report
- `IMAGE-OPTIMIZATION-QUICK-REFERENCE.md` - Developer guide

**Configuration Files:**
- `.htaccess` - Apache configuration
- `nginx.conf` - Nginx configuration (alternative)

**Testing URLs:**
- PageSpeed: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/
- Lighthouse: Chrome DevTools → Lighthouse

**Performance Monitoring:**
- Google Search Console → Core Web Vitals
- Real User Monitoring (RUM) tools
- Chrome UX Report

---

## Final Checklist

Before marking deployment as complete:

- [ ] All images load correctly on all pages
- [ ] WebP format is served to supporting browsers
- [ ] Cache headers are present and correct
- [ ] JavaScript is deferred
- [ ] Lighthouse Performance score ≥ 95
- [ ] LCP < 2.5s
- [ ] CLS = 0.0
- [ ] No visual regressions
- [ ] Mobile performance verified
- [ ] Cross-browser testing complete
- [ ] Documentation reviewed by team
- [ ] Monitoring enabled

**Deployment Date:** __________  
**Deployed By:** __________  
**Lighthouse Score:** __________ / 100  
**LCP Time:** __________ seconds  
**Status:** ✅ Complete / ⚠️ Issues / ❌ Rolled Back

---

**Version:** 1.0  
**Last Updated:** 2026-01-17  
**Next Review:** 2026-02-17

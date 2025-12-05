# Testing and Monitoring Guide

## Post-Deployment Testing

After deploying these image optimization changes, follow this testing plan to ensure everything works correctly.

### 1. Visual Regression Testing

**Manual Testing Checklist:**

#### Desktop (1920x1080+)
- [ ] Load homepage - verify hero image quality
- [ ] Scroll through about section - check drumming and nickel images
- [ ] Navigate through photo gallery - verify main band photos
- [ ] Check thumbnail images quality
- [ ] Test image overlay (click to zoom) functionality
- [ ] Verify images load quickly and appear sharp

#### Tablet (768px - 1024px)
- [ ] Repeat all desktop tests
- [ ] Verify responsive sizes kick in appropriately
- [ ] Check layout doesn't break with smaller images
- [ ] Test both portrait and landscape orientations

#### Mobile (320px - 768px)
- [ ] Test on actual devices if possible
- [ ] Verify images load quickly on cellular connection
- [ ] Check that correct image sizes are loaded
- [ ] Test image overlay on touch devices
- [ ] Verify thumbnails are appropriately sized

**Tools for Testing:**
- Chrome DevTools Device Emulation
- Lighthouse Performance Audit
- WebPageTest.org
- Real devices (iOS Safari, Android Chrome)

### 2. Performance Monitoring

**Vercel Analytics Dashboard**

Monitor these metrics **before and after** deployment:

#### Image Cache Metrics (PRIMARY GOAL)
- **Image Cache Reads**: Should drop from 289,600 to near **0**
- **Image Cache Writes**: Should drop from 491,213 to near **0**
- **Timeline**: Monitor for 7-14 days for accurate comparison

#### Performance Metrics
- **Largest Contentful Paint (LCP)**: Should improve or stay the same
- **Cumulative Layout Shift (CLS)**: Should remain stable
- **First Input Delay (FID)**: Should not be affected
- **Time to First Byte (TTFB)**: May improve slightly

#### Bandwidth Usage
- **Total Bandwidth**: May decrease slightly (smaller image sizes)
- **CloudFront Bandwidth**: Should remain similar or increase slightly

### 3. Technical Validation

**Verify Custom Loader is Active:**

```javascript
// In browser DevTools Console, check image URLs
document.querySelectorAll('img').forEach(img => {
  console.log(img.src);
  // Should see CloudFront URLs directly, NOT Vercel image optimization URLs
  // Correct: https://d2qb1jexhp0efc.cloudfront.net/...
  // Incorrect: /_next/image?url=https://...
});
```

**Check Network Tab:**
1. Open Chrome DevTools → Network Tab
2. Filter by "Img"
3. Load a page with images
4. Verify images load from CloudFront URLs directly
5. Check response headers for CloudFront cache headers
6. Verify no redirects or additional processing

**Expected Network Response:**
- Status: `200 OK`
- `x-cache`: `Hit from cloudfront` (on repeat loads)
- No `/_next/image` URLs in the network tab

### 4. Quality Assurance Checklist

**Image Quality:**
- [ ] No visible artifacts or degradation
- [ ] Colors appear accurate
- [ ] Text in images (if any) is readable
- [ ] Dark/shadowy areas maintain detail
- [ ] Bright/highlighted areas don't blow out
- [ ] Compare side-by-side with production if possible

**Functionality:**
- [ ] Image overlay (zoom) works correctly
- [ ] Lazy loading still functions
- [ ] Priority images load first
- [ ] Rotating animation works
- [ ] No broken images or 404s
- [ ] Download functionality still works

**SEO/Meta:**
- [ ] OpenGraph images still load correctly
- [ ] Twitter card images work
- [ ] Image alt tags preserved
- [ ] Proper image dimensions in meta tags

### 5. Monitoring Schedule

**First 24 Hours:**
- Check Vercel Analytics every 4-6 hours
- Monitor error logs for image-related errors
- Track Core Web Vitals in real-time
- Review user feedback/reports

**First Week:**
- Daily check of Image Cache metrics
- Compare performance trends
- Monitor CloudFront costs (should be minimal)
- Review Lighthouse scores

**Ongoing (Monthly):**
- Review Image Cache Reads/Writes trend
- Check for any regression in metrics
- Audit new images added by contributors
- Review and update documentation if needed

### 6. Rollback Plan

If issues arise, here's how to rollback:

**Quick Rollback (Emergency):**
```javascript
// In next.config.mjs, comment out custom loader:
images: {
  // loader: 'custom',
  // loaderFile: './app/lib/cloudfront-loader.ts',
  remotePatterns: [...]
}
```
Then redeploy.

**Full Rollback:**
```bash
git revert <commit-hash>
git push origin main
```

### 7. Success Criteria

The optimization is considered successful if:

✅ **Image Cache Reads drop by >95%** (target: < 15,000/month)
✅ **Image Cache Writes drop by >95%** (target: < 5,000/month)
✅ **No visual degradation** in manual testing
✅ **LCP remains <2.5s** (preferably improves)
✅ **No increase in error rates**
✅ **No negative user feedback** about image quality

### 8. Troubleshooting

**Problem: Images not loading**
- Check CloudFront distribution status
- Verify environment variables set correctly
- Check browser console for CORS errors
- Review Next.js build logs

**Problem: Image quality too low**
- Adjust quality settings in components (85 → 90)
- Check source image resolution
- Verify CloudFront serving correct files

**Problem: Cache metrics still high**
- Verify custom loader is deployed
- Check that image URLs are CloudFront URLs
- Review Network tab for `/_next/image` URLs
- Ensure configuration is correct in production

**Problem: Build errors**
- Verify `cloudfront-loader.ts` path is correct
- Check TypeScript compilation
- Review Next.js version compatibility

### 9. Documentation

After successful deployment and testing:

- [ ] Update main README with deployment notes
- [ ] Document any issues encountered and solutions
- [ ] Share metrics/results with team
- [ ] Update IMAGE_OPTIMIZATION.md if needed
- [ ] Create blog post/case study (optional)

### 10. Long-term Optimization

Future enhancements to consider:

- **WebP/AVIF Support**: Add Lambda@Edge for format conversion
- **Responsive Images**: Pre-generate multiple sizes on S3
- **Image CDN**: Consider Cloudinary/Imgix for advanced features
- **Automated Optimization**: Add image processing pipeline on upload
- **Performance Budget**: Set up alerts for regression

## Metrics Dashboard Template

Create a tracking sheet with these columns:

| Date | Cache Reads | Cache Writes | LCP (p75) | Bandwidth | Notes |
|------|-------------|--------------|-----------|-----------|-------|
| Before | 289,600 | 491,213 | X.XXs | XX GB | Baseline |
| Day 1 | ? | ? | ? | ? | Initial deployment |
| Day 7 | ? | ? | ? | ? | One week check |
| Day 30 | ? | ? | ? | ? | Monthly review |

## Contact

For questions or issues during testing:
- Check IMAGE_OPTIMIZATION.md
- Review this testing guide
- Open GitHub issue with specific details
- Include screenshots/metrics when reporting issues

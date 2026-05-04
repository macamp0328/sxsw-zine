# Image Optimization Guide

## Overview

This project uses Next.js Image with explicit remote allow-lists, accurate `sizes`, and high quality settings so photos stay sharp while browsers receive viewport-appropriate image candidates.

## Architecture

1. **Storage**: Images are stored in AWS S3
2. **CDN**: CloudFront distributes images globally
3. **Optimization**: Next.js Image generates responsive candidates from local, S3, CloudFront, or Vercel Blob sources
4. **Component**: Next.js Image component with optimized settings

## Image Configuration

The project uses the default Next.js image optimizer. Keep `next.config.mjs`
remote patterns aligned with supported storage providers:

Configuration in `next.config.mjs`:
```javascript
images: {
  qualities: [80, 85, 95],
  remotePatterns: [
    // S3, CloudFront, and Vercel Blob hostnames
  ],
}
```

## Best Practices for Contributors

### Image Quality Settings

**Recommended quality levels:**
- **Hero/Featured images**: `quality={85}` (default)
- **Thumbnails**: `quality={80}`
- **Background images**: `quality={75}`

⚠️ **Never use `quality={100}`** - it creates unnecessarily large images and increases cache usage.

### Sizes Attribute

Always provide appropriate `sizes` attribute for responsive images:

```tsx
// Main photo gallery images
sizes="(max-width: 768px) 100vw, 75vw"

// Thumbnails
sizes="(max-width: 640px) 12vw, (max-width: 768px) 16vw, 24vw"

// Hero images
sizes="(max-width: 768px) 100vw, 60vw"

// Split layout images
sizes="(min-width: 768px) 45vw, 100vw"
```

### Adding New Images

When adding images to the project:

1. **Optimize before upload**:
   - Use tools like ImageOptim, Squoosh, or Sharp
   - Target file size: < 500KB for full-size photos
   - Format: JPEG for photos, PNG for graphics/logos

2. **Upload to S3**:
   ```bash
   # Images should be uploaded to the S3 bucket
   # CloudFront will automatically distribute them
   ```

3. **Update database**:
   - Add image metadata to Prisma database
   - Include filename, band, venue information

4. **Use ImageOverlay component**:
   ```tsx
   <ImageOverlay
     src={imageUrl}
     alt="Descriptive alt text"
     sizes="(max-width: 768px) 100vw, 75vw"
     quality={85}
   />
   ```

### Image Component Usage

**DO:**
✅ Use `ImageOverlay` component for all photos
✅ Provide descriptive `alt` text
✅ Set appropriate `sizes` attribute
✅ Use `priority` for above-the-fold images
✅ Use high but reasonable quality settings (85 for most photos, 95 for main gallery/overlay views)

**DON'T:**
❌ Use `quality={100}`
❌ Use generic `sizes="100vw"` everywhere
❌ Skip `alt` attributes
❌ Use regular `<img>` tags
❌ Add `unoptimized` to main gallery photos without a documented reason

### Performance Monitoring

Monitor image performance using:
- Vercel Analytics Dashboard
- Image Cache Reads/Writes metrics
- Lighthouse performance scores
- Core Web Vitals (LCP, CLS)

### Cache Headers

CloudFront is configured with appropriate cache headers:
- Images are cached at the edge
- Long cache duration for static assets
- Proper invalidation on updates

## Troubleshooting

### High Cache Usage

If you notice high cache reads/writes:
1. Check if `quality={100}` is being used
2. Review `sizes` attributes for optimization
3. Confirm main photos are not marked `unoptimized`
4. Ensure remote image hostnames are intentionally listed in `next.config.mjs`

### Image Quality Issues

If images appear degraded:
1. Adjust quality setting (85 is recommended baseline)
2. Check original image resolution
3. Verify CloudFront is serving correct files
4. Test on multiple devices/screen sizes

### Build Errors

If you encounter build errors related to images:
1. Check `next.config.mjs` remote image patterns
2. Confirm the image host is allowed for the active storage mode
3. Ensure all image URLs are valid
4. Review console for specific error messages

## Technical Details

### Why Default Next.js Optimization?

The zine's product rule is that photos should be large, uncropped, and sharp.
The default optimizer gives the browser responsive candidates while preserving
the `object-contain` layout and high quality settings used by `ImageOverlay`.

Supported hosts are listed explicitly in `next.config.mjs` so local sample
photos, S3, CloudFront, and Vercel Blob remain predictable across environments.

### Trade-offs

**Pros:**
- Responsive image candidates for small and large viewports
- Better bandwidth behavior than serving original files everywhere
- Centralized host allow-list for storage modes

**Cons:**
- Uses Vercel Image Optimization for remote assets
- Remote hosts must be kept current in `next.config.mjs`
- Very high quality settings can increase transformed image size

### Future Improvements

Potential enhancements:
- [ ] Implement WebP/AVIF conversion in upload pipeline
- [ ] Add image processing Lambda at CloudFront edge
- [ ] Automated image optimization on S3 upload
- [ ] Integration with Cloudinary or similar service

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Vercel Image Optimization](https://vercel.com/docs/image-optimization)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)

## Questions?

For questions or issues related to image optimization, please:
1. Check this documentation
2. Review `next.config.mjs` image settings
3. Open an issue on GitHub with specific details

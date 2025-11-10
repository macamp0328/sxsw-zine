# Image Optimization Guide

## Overview

This project uses a custom image optimization strategy to minimize Vercel's Image Cache reads/writes while maintaining high-quality visuals. Images are served directly from AWS CloudFront CDN, bypassing Vercel's Image Optimization service.

## Architecture

1. **Storage**: Images are stored in AWS S3
2. **CDN**: CloudFront distributes images globally
3. **Optimization**: Custom loader serves CloudFront images directly
4. **Component**: Next.js Image component with optimized settings

## Custom Image Loader

The project uses a custom image loader (`app/lib/cloudfront-loader.ts`) that:
- Bypasses Vercel's Image Optimization for CloudFront URLs
- Serves images directly from CloudFront
- Reduces cache reads/writes significantly
- Maintains Next.js Image component benefits (lazy loading, placeholder, etc.)

Configuration in `next.config.mjs`:
```javascript
images: {
  loader: 'custom',
  loaderFile: './app/lib/cloudfront-loader.ts',
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
✅ Use reasonable quality settings (75-85)

**DON'T:**
❌ Use `quality={100}`
❌ Use generic `sizes="100vw"` everywhere
❌ Skip `alt` attributes
❌ Use regular `<img>` tags
❌ Bypass the custom loader

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
2. Verify custom loader is active in `next.config.mjs`
3. Ensure images are served from CloudFront URLs
4. Review `sizes` attributes for optimization

### Image Quality Issues

If images appear degraded:
1. Adjust quality setting (85 is recommended baseline)
2. Check original image resolution
3. Verify CloudFront is serving correct files
4. Test on multiple devices/screen sizes

### Build Errors

If you encounter build errors related to images:
1. Verify `cloudfront-loader.ts` exists and is correct
2. Check `next.config.mjs` loader configuration
3. Ensure all image URLs are valid
4. Review console for specific error messages

## Technical Details

### Why Custom Loader?

By default, Next.js Image component uses Vercel's Image Optimization even for remote URLs:
- Generates multiple optimized versions
- Stores them in Vercel's cache
- Results in high cache reads/writes
- Can be expensive at scale

Our custom loader:
- Serves images directly from CloudFront
- Eliminates redundant optimization
- Reduces Vercel costs
- Improves performance

### Trade-offs

**Pros:**
- Drastically reduced cache usage
- Lower Vercel costs
- Faster image delivery (CloudFront edge locations)
- Better control over image serving

**Cons:**
- Manual optimization required before upload
- No automatic format conversion (WebP/AVIF)
- Need to manage CloudFront separately

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
2. Review the code in `app/lib/cloudfront-loader.ts`
3. Open an issue on GitHub with specific details

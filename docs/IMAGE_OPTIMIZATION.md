# Image Optimization Guide

## Architecture

1. **Storage**: Images are stored in AWS S3
2. **CDN**: CloudFront distributes images globally from edge locations
3. **Optimization**: Disabled on Vercel — CloudFront handles delivery
4. **Component**: `ImageOverlay` wraps `next/image` for all gallery photos

## Why `unoptimized: true`?

Vercel's Image Optimization is intentionally disabled (`unoptimized: true` in `next.config.mjs`). The reasons:

- **Free tier limit**: Vercel caps image cache writes at 100,000/month on the free plan. Each photo × each width × each quality level = one write. A gallery with many photos exhausts this quickly.
- **CloudFront already does the job**: Images are served from a global CDN with edge caching. Routing them through Vercel's optimizer adds latency without benefit.
- **Photo quality is paramount**: The gallery prioritizes the largest, sharpest image that fits on screen. Serving originals directly from CloudFront honors this.

`remotePatterns` in `next.config.mjs` still validates that image `src` values come from known, trusted hosts, even with optimization disabled.

## Configuration (`next.config.mjs`)

```javascript
images: {
  unoptimized: true,
  remotePatterns: [
    { protocol: 'https', hostname: 'sxsw-zine-bucket.s3.amazonaws.com' },
    { protocol: 'https', hostname: 'sxsw-zine-bucket.s3.us-east-1.amazonaws.com' },
    { protocol: 'https', hostname: 'd2qb1jexhp0efc.cloudfront.net' },
    { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
  ],
}
```

## For Contributors

### Adding New Images

1. Upload to S3 — CloudFront will distribute automatically
2. Add metadata to the Prisma database (filename, band, venue)
3. Use the `ImageOverlay` component:

```tsx
<ImageOverlay
  src={imageUrl}
  alt="Descriptive alt text"
  sizes="(max-width: 768px) 100vw, 75vw"
/>
```

### `sizes` Attribute

The `sizes` prop is still correct to include — it tells the browser what fraction of the viewport the image occupies, which helps the browser prioritize loading. With `unoptimized: true`, no actual srcset variants are generated, but the attribute causes no harm and documents intent.

```tsx
// Main band photos
sizes="(max-width: 768px) 100vw, 72vw"

// Thumbnails
sizes="(max-width: 640px) 12vw, (max-width: 768px) 16vw, 24vw"

// Hero images
sizes="(max-width: 768px) 100vw, 60vw"
```

### `quality` Prop

The `quality` prop is ignored when `unoptimized: true`. Images are served at their original quality from S3/CloudFront. You may leave existing `quality` props in place — they have no effect.

### DO / DON'T

**DO:**
- Use `ImageOverlay` for all photos
- Provide descriptive `alt` text
- Use `object-contain` for main/overlay photos (`ImageOverlay` defaults to this; thumbnails may pass `object-cover` via `className`)
- Use `priority` for the first visible image on each page

**DON'T:**
- Add `loader` or remove `unoptimized: true` without understanding the cache write implications
- Use regular `<img>` tags — they bypass `remotePatterns` validation
- Remove hostnames from `remotePatterns` that are still in use

## Troubleshooting

### Images not loading in production

1. Confirm the image hostname is in `remotePatterns` in `next.config.mjs`
2. Verify `NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN` and `AWS_CLOUDFRONT_DOMAIN` are set in Vercel env vars
3. Check CloudFront distribution is healthy and the S3 object exists

### Image quality looks poor

Original files served from S3 should be high-quality JPEGs. If they look poor:
1. Check the source file in S3 — it may have been uploaded at low quality
2. Confirm CloudFront is not re-compressing (check CloudFront cache behaviors)
3. Check browser DevTools → Network for the actual file size

### Considering re-enabling Vercel optimization in the future

Don't — unless you upgrade to a paid Vercel plan. If responsive resizing is needed for mobile bandwidth, the right path is to add a CloudFront Function or Lambda@Edge image resizer and pass `?w=<width>` query params through `app/lib/s3.ts` URL construction. That keeps Vercel out of the loop entirely.

## Resources

- [Next.js `unoptimized` prop docs](https://nextjs.org/docs/app/api-reference/components/image#unoptimized)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)

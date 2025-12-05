/**
 * Custom image loader for CloudFront images
 * This bypasses Vercel's Image Optimization and serves images directly from CloudFront
 * Reducing cache reads/writes and improving performance
 *
 * NOTE: The `width` and `quality` parameters are intentionally unused (prefixed with `_`).
 * CloudFront serves pre-optimized images at fixed quality and size, so these parameters
 * don't affect the actual images delivered. The quality and sizes specified in Image
 * component props (e.g., quality={85}, sizes="...") are used by Next.js for other
 * purposes (like generating srcset attributes for responsive images), but the actual
 * image URLs returned from this loader remain unchanged. This is the intended behavior
 * for serving pre-optimized images from external CDNs.
 */

export default function cloudfrontLoader({
  src,
  width: _width,
  quality: _quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // If the src is already a full URL (CloudFront), return it as-is
  // CloudFront already serves optimized images
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }

  // For local images, use default Next.js behavior
  return src;
}

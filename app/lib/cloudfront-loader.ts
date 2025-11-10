/**
 * Custom image loader for CloudFront images
 * This bypasses Vercel's Image Optimization and serves images directly from CloudFront
 * Reducing cache reads/writes and improving performance
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

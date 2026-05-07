/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN:
      process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN,
  },
  images: {
    // Images are served directly from CloudFront (global CDN), so Vercel's
    // image optimization is disabled. This keeps cache writes at zero on the
    // free tier. remotePatterns still validates allowed hostnames at build time.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sxsw-zine-bucket.s3.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sxsw-zine-bucket.s3.us-east-1.amazonaws.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'd2qb1jexhp0efc.cloudfront.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
  // experimental: {
  //   allowedOrigins: ['https://03i2epsncrja4pcn.public.blob.vercel-storage.com'],
  // },
};

export default nextConfig;

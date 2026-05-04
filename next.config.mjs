/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN:
      process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN,
  },
  images: {
    // Keep this ladder intentionally small. Each extra width multiplies Vercel
    // image-cache variants across every photo in the zine.
    deviceSizes: [640, 1080, 1600, 2048, 2560],
    imageSizes: [160, 320, 480],
    qualities: [80, 85, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sxsw-zine-bucket.s3.amazonaws.com',
        port: '',
        // pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'sxsw-zine-bucket.s3.us-east-1.amazonaws.com',
        port: '',
        // pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'd2qb1jexhp0efc.cloudfront.net',
        port: '',
        // pathname: '**',
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

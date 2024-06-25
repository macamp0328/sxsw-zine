/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN:
      process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
  images: {
    unoptimized: false,
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
    ],
  },
  // experimental: {
  //   allowedOrigins: ['https://03i2epsncrja4pcn.public.blob.vercel-storage.com'],
  // },
};

export default nextConfig;

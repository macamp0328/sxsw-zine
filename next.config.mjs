/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '03i2epsncrja4pcn.public.blob.vercel-storage.com',
        port: '',
        // pathname: '**',
      },
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

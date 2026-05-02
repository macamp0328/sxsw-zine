/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN:
      process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN,
  },
  images: {
    // Use custom loader for CloudFront images to bypass Vercel Image Optimization
    // This significantly reduces cache reads/writes
    loader: 'custom',
    loaderFile: './app/lib/cloudfront-loader.ts',
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

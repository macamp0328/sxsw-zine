import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

import HeaderLogo from '@/app/components/header-logo';
import { cutiveMono } from '@/app/lib/fonts';

export const metadata: Metadata = {
  title: "Miles's SXSW: A DIY Zine",
  description:
    'Experience SXSW 2024 through the lens of Miles. This digital zine is a gritty, unfiltered tribute to the energy of live music.',
  openGraph: {
    type: 'website',
    title: "Miles's SXSW: A DIY Zine",
    description:
      'Dive into the raw, unpolished beauty of SXSW 2024. Captured with a small camera, this digital zine is a tribute to the live music and the artists who create it.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/statics/opengraph-meta.jpg`,
        alt: "Cover image for Miles's SXSW 2024 Zine",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Miles's SXSW: A Music Zine",
    description:
      'Join Miles on a journey through SXSW 2024. This digital zine, captured with a Ricoh GR II, is a raw, unfiltered celebration of live music and the artists who bring it to life.',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/statics/opengraph-meta.jpg`,
        alt: "Cover image for Miles's SXSW 2024 Zine",
      },
    ],
  },
};

// const PostHogPageView = dynamic(() => import('./post-hog-page-view'), {
//   ssr: false,
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cutiveMono.className}>
        <HeaderLogo />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

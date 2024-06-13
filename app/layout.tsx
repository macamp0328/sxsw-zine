// app/layout.tsx

import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import HeaderLogo from './components/header-logo';
import { cutiveMono } from './lib/fonts';

export const metadata: Metadata = {
  title: "Miles's SXSW 2024: A DIY Music Zine",
  description:
    'Experience SXSW 2024 through the lens of Miles, a music enthusiast on a quest to catch 50 live sets. This digital zine is a gritty, unfiltered tribute to the vibrant energy of live music.',
  openGraph: {
    type: 'website',
    title: "Miles's SXSW 2024: A DIY Music Zine",
    description:
      'Dive into the raw, unpolished beauty of SXSW 2024. Captured with a small camera, this digital zine is a tribute to the pulsating rhythm of live music and the artists who create it.',
    images: [
      {
        url: 'https://www.campmiles.com/photos/header-miles.jpg',
        alt: "Cover image for Miles's SXSW 2024 Zine",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Miles's SXSW 2024: A DIY Music Zine",
    description:
      'Join Miles on a journey through SXSW 2024. This digital zine, captured with a Ricoh GR II, is a raw, unfiltered celebration of live music and the artists who bring it to life.',
    images: [
      {
        url: 'https://www.campmiles.com/photos/header-miles.jpg',
        alt: "Cover image for Miles's SXSW 2024 Zine",
      },
    ],
  },
};

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
        <SpeedInsights />
      </body>
    </html>
  );
}

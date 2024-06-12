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

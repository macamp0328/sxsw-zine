// app/layout.tsx

import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import HeaderLogo from './components/header-logo';
import { cutiveMono } from './lib/fonts';

export const metadata: Metadata = {
  title: `Miles's SXSW`,
  description:
    'A SXSW journey through my lens. Welcome to my slice of SXSW 2024—a digital zine documenting my quest to catch 50 live sets.',
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

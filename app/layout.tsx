import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import HeaderLogo from './components/header-logo';
import { cutiveMono } from './other/fonts';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    template: `%s | Miles's SXSW`,
    default: `Miles's SXSW`,
  },
  description:
    'a sxsw journey through my lens. Welcome to my slice of SXSW 2024—a digital zine documenting my quest to catch 50 live sets.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={cutiveMono.className}>
        <Providers>
          <HeaderLogo />

          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}

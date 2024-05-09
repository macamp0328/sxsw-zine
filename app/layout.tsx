import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import HeaderLogo from './components/header-logo';
import { cutiveMono } from './other/fonts';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: `Miles's SXSW 2024`,
  description:
    'A musical photo journey of SXSW 2024 through the eyes of Miles.',
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

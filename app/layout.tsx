import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import { cutiveMono } from './components/fonts';
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
          <header className="fixed left-0 top-0 z-50 w-full bg-transparent p-6 text-2xl font-semibold text-main-text">
            <p>Miles&apos;s</p>
            <p>SXSW</p>
          </header>

          {children}
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}

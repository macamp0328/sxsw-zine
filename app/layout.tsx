import './globals.css';

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
          <header
            className={`${cutiveMono.className} fixed left-0 top-0 z-50 w-full bg-transparent p-5 text-xl font-bold text-black`}
          >
            <h2>Miles&apos;s</h2>
            <h2>SXSW</h2>
          </header>

          {children}
        </Providers>
      </body>
    </html>
  );
}

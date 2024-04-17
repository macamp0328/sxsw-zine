import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import WorkInProgressBanner from '@/app/components/wip-banner';

export default async function Home() {
  return (
    <div className="relative">
      <WorkInProgressBanner />
      <div className="mx-auto mt-16 flex flex-col items-center gap-8 p-4">
        <div>
          <h1 className="text-4xl font-bold">Miles&apos;s SXSW 2024</h1>
          <p className="text-lg text-gray-500">
            A musical photo journey of SXSW 2024 through the eyes of Miles.
          </p>
          <Image
            src="/photos/header-miles.jpg"
            width={500}
            height={500}
            alt="picture of miles, the maker of this page"
          />
        </div>
        <hr />

        <Link
          className="text-blue-500 hover:text-blue-700"
          href="/willow-parlo"
        >
          Start, soon to be scrolling
        </Link>
      </div>
    </div>
  );
}

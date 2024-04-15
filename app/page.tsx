import type { Picture } from '@prisma/client';
import React from 'react';

import getZinePictures from '@/app/lib/actions';
import { cutiveMono } from '@/app/ui/fonts';
import PhotoBlock from '@/app/ui/photo-block';
import WorkInProgressBanner from '@/app/ui/wip-banner';

export default async function Home() {
  const zinePictures: Picture[] = await getZinePictures();

  return (
    <div className="relative">
      <WorkInProgressBanner />
      <div
        className={`${cutiveMono.className} fixed left-0 top-0 z-50 w-full bg-transparent p-5 text-xl font-bold text-white xl:text-black`}
      >
        <h2>Miles&apos;s</h2>
        <h2>SXSW</h2>
      </div>
      <div className="mx-auto mt-16 flex flex-col items-center gap-8 p-4">
        {zinePictures.map((picture) => (
          <div key={picture.id} className="w-full max-w-6xl">
            <PhotoBlock {...picture} />
          </div>
        ))}
      </div>
    </div>
  );
}

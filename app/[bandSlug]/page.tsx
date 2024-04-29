import React from 'react';

import BandBonusDetails from '@/app/components/band-bonus-details';
import BandMainDetails from '@/app/components/band-main-details';
import BandPhoto from '@/app/components/band-photo';
import type { PictureWithRelationsAndUrl } from '@/app/lib/actions';

export default function PhotoPage({
  params,
}: {
  params: {
    bandSlug: string;
    pictureDetails: PictureWithRelationsAndUrl;
  };
}) {
  return (
    <div className="flex h-screen w-full snap-start flex-col overflow-hidden md:flex-row md:pt-24">
      <div className="mx-2 mt-24 flex-initial md:hidden">
        <BandMainDetails pictureDetails={params.pictureDetails} />
      </div>
      <div className="w-full flex-1 object-cover md:basis-3/4">
        {/* <div className="relative m-2 w-full flex-1 object-cover"> */}
        <BandPhoto pictureDetails={params.pictureDetails} />
      </div>
      <div className="mx-2 flex flex-1 flex-col justify-center md:h-screen md:basis-1/4">

        <div className="hidden md:flex ">
          <BandMainDetails pictureDetails={params.pictureDetails} />
        </div>

        <BandBonusDetails pictureDetails={params.pictureDetails} />
      </div>
    </div>
  );
}

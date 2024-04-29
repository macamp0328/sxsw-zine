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
    <div className="flex h-svh w-full snap-center flex-col overflow-hidden md:flex-row md:pt-24">
      <div className="mx-2 mt-24 flex-initial md:hidden">
        <BandMainDetails pictureDetails={params.pictureDetails} />
      </div>
      <div className="m-2 w-full flex-1 object-cover md:basis-3/4">
        <BandPhoto pictureDetails={params.pictureDetails} />
      </div>
      <div className="mr-8 flex flex-1 flex-col justify-center md:h-full md:basis-1/4">
        <div className="hidden md:flex ">
          <BandMainDetails pictureDetails={params.pictureDetails} />
        </div>

        <BandBonusDetails pictureDetails={params.pictureDetails} />
      </div>
    </div>
  );
}

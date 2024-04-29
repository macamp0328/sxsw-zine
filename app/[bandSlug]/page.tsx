import React from 'react';

import BandBonusDetails from '@/app/components/band-bonus-details';
import BandMainDetails from '@/app/components/band-main-details';
import BandPhoto from '@/app/components/band-photo';
import ScrollURLUpdater from '@/app/components/scroll-url-updater';
import type { PictureWithRelationsAndUrl } from '@/app/lib/actions';

export default function PhotoPage({
  params,
}: {
  params: {
    pictureDetails: PictureWithRelationsAndUrl;
  };
}) {
  return (
    <div className="flex h-svh w-full snap-center flex-col overflow-hidden md:flex-row md:pt-24">
      <div>
        <ScrollURLUpdater urlSegment={params.pictureDetails.band?.slug} />
      </div>
      <div className="m-1 flex-initial pt-24 md:hidden">
        <BandMainDetails pictureDetails={params.pictureDetails} />
      </div>
      <div className="w-full flex-1 object-cover p-1 md:basis-3/4">
        <BandPhoto pictureDetails={params.pictureDetails} />
      </div>
      <div className="m-1 flex flex-1 flex-col justify-center md:h-full md:basis-1/4 md:pr-8">
        <div className="hidden md:flex ">
          <BandMainDetails pictureDetails={params.pictureDetails} />
        </div>

        <BandBonusDetails pictureDetails={params.pictureDetails} />
      </div>
    </div>
  );
}

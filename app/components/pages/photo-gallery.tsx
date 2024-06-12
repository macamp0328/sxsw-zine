'use client';

import React from 'react';

import BandBonusDetails from '@/app/components/band-bonus-details';
import BandMainDetails from '@/app/components/band-main-details';
import BandPhoto from '@/app/components/band-photo';
import Thumbnails from '@/app/components/thumbnails';
import type { PictureWithRelationsAndUrl } from '@/app/lib/actions';

export default function PhotoGallery({
  zinePicture,
}: {
  zinePicture: PictureWithRelationsAndUrl;
}) {
  return (
    <div
      id={zinePicture.setSlug}
      className="flex h-svh w-full snap-start snap-always flex-col overflow-hidden md:flex-row md:space-x-8 md:pt-24 lg:pt-16"
    >
      <div>
        {/* <ScrollURLUpdater
          urlSegment={zinePicture.setSlug}
          pictureDetails={zinePicture}
        /> */}
      </div>
      <div className="m-1 block shrink-0 pb-4 pt-24 md:hidden">
        <BandMainDetails pictureDetails={zinePicture} />
      </div>
      <div className="relative flex grow flex-col items-center justify-center md:pb-12">
        <div className="mb-8 size-full grow">
          <BandPhoto pictureDetails={zinePicture} />
        </div>
        {zinePicture.band && zinePicture.notZinePictures && (
          <div className="absolute bottom-0 z-10 mb-4">
            <Thumbnails
              notZinePictures={zinePicture.notZinePictures}
              band={zinePicture.band}
            />
          </div>
        )}
      </div>
      <div className="hidden w-1/4 flex-col pb-16 pr-8 md:flex">
        <div className="flex-1">
          <BandMainDetails pictureDetails={zinePicture} />
        </div>
        <div className=" flex-1">
          <BandBonusDetails pictureDetails={zinePicture} />
        </div>
      </div>
      <div className="mx-2 mb-2 mt-auto block shrink-0 p-4 md:hidden">
        <BandBonusDetails pictureDetails={zinePicture} />
      </div>
    </div>
  );
}

'use client';

import React from 'react';

import BandBonusDetails from '@/app/components/band-bonus-details';
import BandMainDetails from '@/app/components/band-main-details';
import BandPhoto from '@/app/components/band-photo';
import Thumbnails from '@/app/components/thumbnails';
import { type PictureWithRelationsAndUrl } from '@/app/lib/actions';
import DownloadBandPicturesButton from '@/app/ui/downloadBandPicturesButton';

import ScrollURLUpdater from '../scroll-url-updater';

export default function PhotoGallery({
  zinePicture,
}: {
  zinePicture: PictureWithRelationsAndUrl;
}) {
  return (
    <div
      id={zinePicture.setSlug}
      className="texture-overlay flex h-svh w-full snap-start snap-always flex-col overflow-hidden md:flex-row md:space-x-8"
    >
      <div>
        <ScrollURLUpdater
          urlSegment={zinePicture.setSlug}
          pictureDetails={zinePicture}
        />
      </div>
      <div className="m-1 block shrink-0 pb-4 pt-24 md:hidden">
        <BandMainDetails pictureDetails={zinePicture} />
      </div>
      <div className="relative flex grow flex-col items-center justify-center md:pb-12 md:pt-24 lg:pt-20">
        <div className="mb-2 size-full grow xs:mb-8">
          <BandPhoto pictureDetails={zinePicture} />
        </div>
        {zinePicture.band && (
          <div className="mb-2 xs:absolute xs:bottom-0 xs:z-10 xs:mb-4">
            {zinePicture.notZinePictures && (
              <Thumbnails
                notZinePictures={zinePicture.notZinePictures}
                band={zinePicture.band}
              />
            )}
            <div className="mt-2 flex justify-center">
              <DownloadBandPicturesButton bandId={zinePicture.band.id} />
            </div>
          </div>
        )}
      </div>
      <div className="hidden w-1/4 flex-col py-12 pr-8 md:flex xl:pr-24">
        <div className="flex-1">
          <BandMainDetails pictureDetails={zinePicture} />
        </div>
        <div className="flex-1">
          <BandBonusDetails pictureDetails={zinePicture} />
        </div>
      </div>
      <div className="mx-2 mb-2 mt-auto block shrink-0 xs:p-4 md:hidden">
        <BandBonusDetails pictureDetails={zinePicture} />
      </div>
    </div>
  );
}

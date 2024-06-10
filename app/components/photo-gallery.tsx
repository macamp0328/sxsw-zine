import BandBonusDetails from '@/app/components/band-bonus-details';
import BandMainDetails from '@/app/components/band-main-details';
import BandPhoto from '@/app/components/band-photo';
import ScrollURLUpdater from '@/app/components/scroll-url-updater';

import { getZinePictures } from '../lib/actions';
import Thumbnails from './thumbnails';

// Slugify function
const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export default async function PhotoGallery() {
  const zinePhotos = await getZinePictures();

  return (
    <>
      {zinePhotos.map((photo) => (
        <div key={photo.id} id={photo.band?.slug}>
          <div className="flex h-svh w-full snap-start snap-always flex-col overflow-hidden md:flex-row md:space-x-8 md:pt-24 lg:pt-16">
            <ScrollURLUpdater
              urlSegment={`${photo.band?.slug}-${slugify(photo.venue?.name || '')}`}
              pictureDetails={photo}
            />

            {/* Mobile Title */}
            <div className="m-1 block shrink-0 pb-4 pt-24 md:hidden">
              <BandMainDetails pictureDetails={photo} />
            </div>

            {/* Image and thumbnails */}
            <div className="relative flex grow flex-col items-center justify-center md:pb-12">
              <div className="mb-8 size-full grow">
                <BandPhoto pictureDetails={photo} />
              </div>
              {photo.band && photo.venue && (
                <div className="absolute bottom-0 z-10 mb-4">
                  <Thumbnails
                    bandId={photo.band.id}
                    venueId={photo.venue?.id}
                  />
                </div>
              )}
            </div>

            {/* Desktop Title and Details */}
            <div className="hidden w-1/4 flex-col pb-16 pr-8 md:flex">
              <div className="flex-1">
                <BandMainDetails pictureDetails={photo} />
              </div>
              <div className=" flex-1">
                <BandBonusDetails pictureDetails={photo} />
              </div>
            </div>

            {/* Mobile Details */}
            <div className="mx-2 mb-2 mt-auto block shrink-0 p-4 md:hidden">
              <BandBonusDetails pictureDetails={photo} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

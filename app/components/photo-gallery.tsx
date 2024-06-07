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
          <div className="flex h-svh w-full snap-center flex-col overflow-hidden md:flex-row md:pt-24">
            <ScrollURLUpdater
              urlSegment={`${photo.band?.slug}-${slugify(photo.venue?.name || '')}`}
            />

            {/* Mobile Title */}
            <div className="m-1 block shrink-0 pb-8 pt-24 md:hidden">
              <BandMainDetails pictureDetails={photo} />
            </div>

            {/* Image and thumbnails */}
            <div className="flex w-full grow flex-col bg-gray-400 md:grow-0 md:items-center md:justify-center md:pb-8">
              <div className="size-full grow md:flex md:h-full md:w-auto md:items-center md:justify-center">
                <BandPhoto pictureDetails={photo} />
              </div>
              {photo.band && photo.venue && (
                <div className="mt-2">
                  <Thumbnails
                    bandId={photo.band.id}
                    venueId={photo.venue?.id}
                  />
                </div>
              )}
            </div>

            {/* Desktop Details */}
            <div className="mx-4 mt-4 hidden shrink-0 flex-col justify-start md:block md:h-full md:justify-center">
              <BandMainDetails pictureDetails={photo} />
              <BandBonusDetails pictureDetails={photo} />
            </div>

            {/* Mobile Details */}
            <div className="mx-4 mb-4 mt-auto block shrink-0 p-4 md:hidden">
              <BandBonusDetails pictureDetails={photo} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

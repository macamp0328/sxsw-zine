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

            <div className="m-1 flex-initial pt-24 md:hidden">
              <BandMainDetails pictureDetails={photo} />
            </div>
            <div className="relative mt-4 flex w-full flex-1 object-cover md:basis-2/3 md:pb-8">
              <BandPhoto pictureDetails={photo} />
              {photo.band && photo.venue && (
                <div className="mx-4 mt-4 flex flex-col justify-center">
                  <Thumbnails
                    bandId={photo.band.id}
                    venueId={photo.venue?.id}
                  />
                </div>
              )}
            </div>
            <div className="mx-4 mt-4 flex flex-1 flex-col justify-start md:h-full md:basis-1/3 md:justify-center md:pr-8">
              <div className="hidden md:flex">
                <BandMainDetails pictureDetails={photo} />
              </div>
              <BandBonusDetails pictureDetails={photo} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

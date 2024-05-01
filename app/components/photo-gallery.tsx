import BandBonusDetails from '@/app/components/band-bonus-details';
import BandMainDetails from '@/app/components/band-main-details';
import BandPhoto from '@/app/components/band-photo';
import ScrollURLUpdater from '@/app/components/scroll-url-updater';

import { getZinePictures } from '../lib/actions';

export default async function PhotoGallery() {
  const zinePhotos = await getZinePictures();

  return (
    <>
      {zinePhotos.map((photo) => (
        <div key={photo.id} id={photo.band?.slug}>
          <div className="flex h-svh w-full snap-center flex-col overflow-hidden md:flex-row md:pt-24">
            <ScrollURLUpdater urlSegment={photo.band?.slug} />

            <div className="m-1 flex-initial pt-24 md:hidden">
              <BandMainDetails pictureDetails={photo} />
            </div>
            <div className="w-full flex-1 object-cover p-1 md:basis-3/4">
              <BandPhoto pictureDetails={photo} />
            </div>
            <div className="m-1 flex flex-1 flex-col justify-center md:h-full md:basis-1/4 md:pr-8">
              <div className="hidden md:flex ">
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

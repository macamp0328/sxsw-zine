import { type Band, type Venue } from '@prisma/client';

import { getBandPictures } from '../lib/actions';
import ImageOverlay from '../ui/image-overlay';

export default async function Thumbnails({
  bandId,
  venueId,
}: {
  bandId: Band['id'];
  venueId: Venue['id'];
}) {
  const bandPhotos = await getBandPictures(bandId, venueId);

  if (!bandPhotos.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2 overflow-x-auto overflow-y-hidden">
      {bandPhotos.slice(0, 8).map((photo) =>
        photo.url ? (
          <div
            key={photo.id}
            className="relative aspect-square size-20 shrink-0 sm:size-32 lg:size-16"
          >
            <ImageOverlay
              src={photo.url}
              alt={`Photo of ${photo.band?.name} taken on ${photo.takenAt}`}
              className="rounded-md object-cover" // Adjusted to cover for thumbnail effect
              isRotate
            />
          </div>
        ) : null,
      )}
    </div>
  );
}

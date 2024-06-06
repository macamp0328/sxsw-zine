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
    <div className="flex flex-col space-y-2">
      {bandPhotos.slice(0, 8).map((photo) =>
        photo.url ? (
          <div key={photo.id} className="thumbnail-item">
            <ImageOverlay
              src={photo.url}
              alt={`Photo of ${photo.band?.name} taken on ${photo.takenAt}`}
              width={100} // Thumbnail width
              height={100} // Thumbnail height
              className="rounded-md object-cover shadow-md" // Adjusted to cover for thumbnail effect
            />
          </div>
        ) : null,
      )}
    </div>
  );
}

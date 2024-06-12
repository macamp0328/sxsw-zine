'use client';

import { type PictureWithRelationsAndUrl } from '../lib/actions';
import ImageOverlay from '../ui/image-overlay';

export default function BandPhoto(params: {
  pictureDetails: PictureWithRelationsAndUrl;
}) {
  if (!params.pictureDetails) {
    return <p>Error loading picture details.</p>;
  }

  return (
    <div className="relative size-full">
      {params.pictureDetails.url ? (
        <ImageOverlay
          src={params.pictureDetails.url}
          alt={`Photo of ${params.pictureDetails.band?.name} taken on ${params.pictureDetails.takenAt}`}
          isRotate
          quality={100}
        />
      ) : (
        <p>Ooops. No photo available.</p>
      )}
    </div>
  );
}

import Image from 'next/image';

import { type PictureWithRelationsAndUrl } from '../lib/actions';

export default async function BandPhoto(params: {
  pictureDetails: PictureWithRelationsAndUrl;
}) {
  if (!params.pictureDetails) {
    return <p>Error loading picture details.</p>;
  }

  return (
    <div className="absolute size-full">
      {params.pictureDetails.url ? (
        <Image
          src={params.pictureDetails.url}
          alt={`Photo of ${params.pictureDetails.band?.name} taken on ${params.pictureDetails.takenAt}`}
          fill
          sizes="100vw"
          style={{ objectFit: 'contain' }}
          loading="lazy"
        />
      ) : (
        <p>Ooops. No photo available.</p>
      )}
    </div>
  );
}

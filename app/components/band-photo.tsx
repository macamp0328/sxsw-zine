import Image from 'next/image';

import { getPictureDetails } from '../lib/actions';

export default async function BandPhoto(params: { bandSlug: string }) {
  const pictureDetails = await getPictureDetails(params.bandSlug, true);

  if (!pictureDetails) {
    return <p>Error loading picture details.</p>; // Handle null or undefined details
  }

  return (
    <div className="absolute size-full">
      {pictureDetails.url ? (
        <Image
          src={pictureDetails.url}
          alt={`Photo of ${pictureDetails.band?.name} taken on ${pictureDetails.takenAt}`}
          fill
          sizes="100vw"
          style={{ objectFit: 'contain' }}
        />
      ) : (
        <p>Ooops. No photo available.</p>
      )}
    </div>
  );
}

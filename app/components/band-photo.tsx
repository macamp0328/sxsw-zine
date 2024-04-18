import Image from 'next/image';

import { getPictureDetails } from '../lib/actions';

export default async function BandPhoto(params: { bandSlug: string }) {
  // call getPictureDetails
  const pictureDetails = await getPictureDetails(params.bandSlug);

  return (
    <div className="size-full">
      {/* className="size-full object-contain" */}
      <Image
        src={pictureDetails.filePath}
        alt={`Photo of ${pictureDetails.band.name} taken on ${pictureDetails.takenAt}`}
        fill
        sizes="100vw"
        style={{
          objectFit: 'contain',
          // height: 'auto',
        }}
      />
    </div>
  );
}

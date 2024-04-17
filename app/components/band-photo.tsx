import Image from 'next/image';

import { getPictureDetails } from '../lib/actions';

export default async function BandPhoto(params: { bandSlug: string }) {
  // call getPictureDetails
  const pictureDetails = await getPictureDetails(params.bandSlug);
  console.log('pictureDetails', pictureDetails);

  return (
    <div>
      <Image
        src={pictureDetails.filePath}
        alt={`Photo of ${pictureDetails.band.name} taken on ${pictureDetails.takenAt}`}
        // style={{ width: '100%', height: 'auto' }}
        width={pictureDetails.width}
        height={pictureDetails.height}
      />
    </div>
  );
}

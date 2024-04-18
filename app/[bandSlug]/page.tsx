import React from 'react';

import BandDetails from '@/app/components/band-details';
import BandPhoto from '@/app/components/band-photo';

export default function PhotoPage({
  params,
}: {
  params: { bandSlug: string };
}) {
  console.log('params', params);
  return (
    <div className="flex h-screen w-full snap-start flex-col items-center justify-evenly overflow-hidden">
      <div className="relative m-2 w-full flex-1 object-cover">
        <BandPhoto bandSlug={params.bandSlug} />
      </div>
      <div className="flex max-h-[10%] min-h-[5%] flex-initial flex-col items-center justify-center p-2 md:max-h-none">
        <BandDetails bandSlug={params.bandSlug} />
      </div>
    </div>
  );
}

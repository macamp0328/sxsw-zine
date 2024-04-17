import React from 'react';

import BandDetails from '@/app/components/band-details';
import BandPhoto from '@/app/components/band-photo';

export default function PhotoPage({
  params,
}: {
  params: { bandSlug: string };
}) {
  // const firstBandNameDefault = 'Willow Parlo';
  console.log(params);
  // if (params.bandName === 'bandname') {
  //   // return <div>loading...</div>;
  //   // set bandName value to default, "Willow Parlo"
  //   router.replace(firstBandNameDefault);
  // }

  // perhaps we can check if slug exists

  return (
    <div>
      <BandPhoto bandSlug={params.bandSlug} />
      <BandDetails bandSlug={params.bandSlug} />
    </div>
  );
}

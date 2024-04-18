import React from 'react';

import { getPictureDetails } from '../lib/actions';

export default async function BandDetails(params: { bandSlug: string }) {
  const pictureDetails = await getPictureDetails(params.bandSlug);
  console.log('pictureDetails', pictureDetails);

  return (
    <div className=" text-center mt-2  bg-blue-200">
      <h1 className="text-xl font-bold">{pictureDetails.band.name}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {pictureDetails.takenAt.toDateString()}
      </p>
      {pictureDetails.venue && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {pictureDetails.venue.name}
        </p>
      )}
    </div>
  );
}

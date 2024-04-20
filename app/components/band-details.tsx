import React from 'react';

import { type PictureWithRelationsAndUrl } from '../lib/actions';

export default async function BandDetails(params: {
  pictureDetails: PictureWithRelationsAndUrl;
}) {
  if (!params.pictureDetails) {
    return <p>Error loading band details.</p>;
  }

  return (
    <div className=" bg-gray-200  p-4 text-center">
      {params.pictureDetails.band ? (
        <div>
          <h1 className="text-xl font-bold">
            {params.pictureDetails.band.name}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {params.pictureDetails.takenAt.toDateString()}
          </p>
          {params.pictureDetails.venue && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {params.pictureDetails.venue.name}
            </p>
          )}
        </div>
      ) : (
        <p>Ooops. No band details available.</p>
      )}
    </div>
  );
}

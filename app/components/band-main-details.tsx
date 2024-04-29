import React from 'react';

import { type PictureWithRelationsAndUrl } from '../lib/actions';

const BandMainDetails = ({
  pictureDetails,
}: {
  pictureDetails: PictureWithRelationsAndUrl;
}) => {
  if (!pictureDetails) {
    return (
      <p className="text-center text-gray-500">Error loading band details.</p>
    );
  }

  return (
    <div className="size-full">
      {pictureDetails.band ? (
        <div className="flex size-full flex-col items-end justify-end">
          <h1 className="py-2 text-end text-3xl font-bold text-main-text">
            {pictureDetails.band.name}
          </h1>
          <p className="pb-2 text-end text-base text-bonus-text md:pb-0">
            {pictureDetails.band.genre || 'Genre not specified'}
          </p>
          <div className="flex w-full justify-between md:flex-col md:text-end">
            {pictureDetails.venue && (
              <p className="text-sm text-sub-text">
                {pictureDetails.venue.name}
              </p>
            )}
            <p className="text-sm text-sub-text">
              {pictureDetails.takenAt.toDateString()}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-sub-text">
          Oops. No band details available.
        </p>
      )}
    </div>
  );
};

export default BandMainDetails;
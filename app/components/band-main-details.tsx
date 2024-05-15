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
        <div className="flex size-full flex-col items-center justify-end">
          <h1 className="py-2 text-center text-3xl font-bold text-main-text">
            {pictureDetails.band.name}
          </h1>
          <p className="pb-2 text-center text-base text-bonus-text md:pb-0">
            {pictureDetails.band.genre || 'Genre not specified'}
          </p>
          <div className="flex w-full flex-wrap justify-between px-4 md:flex-col md:text-center">
            {pictureDetails.venue && (
              <p className="text-sm text-sub-text">
                {pictureDetails.venue.name}
              </p>
            )}
            <p className="text-sm text-sub-text">
              {/* 4:20pm on March 11 */}
              {new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
              })
                .format(pictureDetails.takenAt)
                .toLowerCase()}{' '}
              on{' '}
              {new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
              }).format(pictureDetails.takenAt)}
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

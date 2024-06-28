'use client';

import React from 'react';

import { type PictureWithRelationsAndUrl } from '@/app/lib/actions';

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
        <div className="size-full flex-1 flex-col content-center items-center justify-end">
          <h1 className="text-center text-xl font-bold text-main-text lg:text-3xl">
            {pictureDetails.band.name}
          </h1>
          <p className="mb-4 text-center text-xs text-bonus-text md:pb-0 lg:text-sm">
            {`(${pictureDetails.band.origin})`}
          </p>
          <p className="mb-1 text-center text-sm text-bonus-text md:pb-0">
            {pictureDetails.band.genre?.toLowerCase() ?? 'Genre not specified'}
          </p>
          <div className="flex w-full content-center items-center justify-around pb-2 text-center md:flex-col">
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
                timeZone: 'America/Chicago',
              })
                .format(pictureDetails.takenAt)
                .toLowerCase()}
              {' on '}
              {new Intl.DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
                timeZone: 'America/Chicago',
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

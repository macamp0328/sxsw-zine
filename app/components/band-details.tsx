import React from 'react';

import { type PictureWithRelationsAndUrl } from '../lib/actions';

const BandDetails = ({
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
    <div className="m-4 rounded-lg bg-white p-4 text-center shadow-lg">
      {pictureDetails.band ? (
        <div>
          <h1 className="text-2xl font-bold">{pictureDetails.band.name}</h1>
          <p className="text-sm text-gray-600">
            {pictureDetails.band.genre || 'Genre not specified'}
          </p>
          <p className="text-sm text-gray-600">
            {pictureDetails.band.bio || 'No bio available'}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {pictureDetails.takenAt.toDateString()}
          </p>
          {pictureDetails.venue && (
            <p className="text-sm text-gray-500">
              At {pictureDetails.venue.name}, {pictureDetails.venue.city}
            </p>
          )}
          <div className="mt-2 space-y-1">
            {pictureDetails.band.links?.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="text-blue-500 hover:underline"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          Oops. No band details available.
        </p>
      )}
    </div>
  );
};

export default BandDetails;

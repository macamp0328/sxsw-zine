import React from 'react';

import { type PictureWithRelationsAndUrl } from '../lib/actions';
import { robotoCondensed } from '../other/fonts';

const BandBonusDetails = ({
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
    <div className="w-full">
      {pictureDetails.band ? (
        <div>
          <p
            className={`w-full overflow-y-auto bg-sub-background p-3 text-center text-sm text-bonus-text md:my-5 md:rounded-md md:p-5 ${robotoCondensed.className}`}
          >
            {pictureDetails.band.bio || 'No bio available'}
          </p>
          <div className="mt-2 text-center">
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

export default BandBonusDetails;

import { LinkType } from '@prisma/client';
import React from 'react';

import { type PictureWithRelationsAndUrl } from '../lib/actions';
import { robotoCondensed } from '../other/fonts';
import LinksContextMenuButton from '../ui/linksContextMenuButton';

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
            className={`w-full overflow-y-auto bg-sub-background p-3 text-center text-sm text-bonus-text md:my-5 md:p-5 ${robotoCondensed.className}`}
          >
            {pictureDetails.band.bio || 'No bio available'}
          </p>
          <div className="mt-2 flex justify-around text-center md:justify-between">
            {pictureDetails.band &&
              pictureDetails.band.links.some(
                (link) => link.linkType === LinkType.Socials,
              ) && (
                <LinksContextMenuButton
                  title="Socials"
                  links={pictureDetails.band.links.filter(
                    (link) => link.linkType === LinkType.Socials,
                  )}
                />
              )}

            {pictureDetails.band &&
              pictureDetails.band.links.some(
                (link) => link.linkType === LinkType.Streaming,
              ) && (
                <LinksContextMenuButton
                  title="Streaming"
                  links={pictureDetails.band.links.filter(
                    (link) => link.linkType === LinkType.Streaming,
                  )}
                />
              )}

            {pictureDetails.band &&
              pictureDetails.band.links.some(
                (link) => link.linkType === LinkType.Internet,
              ) && (
                <LinksContextMenuButton
                  title="Internet"
                  links={pictureDetails.band.links.filter(
                    (link) => link.linkType === LinkType.Internet,
                  )}
                />
              )}
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

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

  // If only band.bio OR band.bio2 are populated, display that value.
  // If both band.bio and band.bio2 are populated, then display one at random.
  let bioText = 'No bio available, yet.';
  if (pictureDetails.band) {
    if (pictureDetails.band.bio && pictureDetails.band.bio2) {
      bioText =
        Math.random() > 0.5
          ? pictureDetails.band.bio
          : pictureDetails.band.bio2;
    } else if (pictureDetails.band.bio) {
      bioText = pictureDetails.band.bio;
    } else if (pictureDetails.band.bio2) {
      bioText = pictureDetails.band.bio2;
    }
  }

  return (
    <div className="w-full">
      {pictureDetails.band ? (
        <div>
          <p
            className={`w-full overflow-y-auto bg-sub-background p-3 text-center text-sm text-bonus-text md:my-5 md:p-5 ${robotoCondensed.className}`}
          >
            {bioText}
          </p>
          <div className="mt-8 flex justify-around gap-1 text-center md:justify-between">
            {pictureDetails.band &&
              pictureDetails.band.links.some(
                (link) =>
                  link.linkType === LinkType.Socials ||
                  link.linkType === LinkType.Profile,
              ) && (
                <LinksContextMenuButton
                  title="Socials"
                  links={pictureDetails.band.links.filter(
                    (link) =>
                      link.linkType === LinkType.Socials ||
                      link.linkType === LinkType.Profile,
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

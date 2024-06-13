'use client';

import { LinkType } from '@prisma/client';
import React, { useEffect, useState } from 'react';

import { type PictureWithRelationsAndUrl } from '../lib/actions';
import { robotoCondensed } from '../lib/fonts';
import LinksContextMenuButton from '../ui/linksContextMenuButton';

const BandBonusDetails = ({
  pictureDetails,
}: {
  pictureDetails: PictureWithRelationsAndUrl;
}) => {
  const [bioText, setBioText] = useState('No bio available, yet.');

  useEffect(() => {
    if (pictureDetails?.band) {
      if (pictureDetails.band.bio && pictureDetails.band.bio2) {
        setBioText(
          Math.random() > 0.5
            ? pictureDetails.band.bio
            : pictureDetails.band.bio2,
        );
      } else if (pictureDetails.band.bio) {
        setBioText(pictureDetails.band.bio);
      } else if (pictureDetails.band.bio2) {
        setBioText(pictureDetails.band.bio2);
      }
    }
  }, [pictureDetails]);

  if (!pictureDetails) {
    return (
      <p className="text-center text-gray-500">Error loading band details.</p>
    );
  }

  // Split the bio text into parts, using the band name as the separator
  const bioParts = bioText.split(
    new RegExp(`(${pictureDetails.band?.name})`, 'gi'),
  );

  return (
    <div className="w-full">
      {pictureDetails.band ? (
        <div>
          <div className="squiggle-texture-overlay relative w-full space-y-3 border-4 border-sub-text bg-sub-background p-2 md:my-3 md:p-3">
            <p
              className={`text-center text-sm text-bonus-text ${robotoCondensed.className}`}
            >
              {bioParts.map((part, index) =>
                part.toLowerCase() ===
                pictureDetails.band?.name.toLowerCase() ? (
                  // eslint-disable-next-line react/no-array-index-key
                  <strong key={part + index}>{part}</strong>
                ) : (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={part + index}>{part}</span>
                ),
              )}
            </p>
            <p className="text-center text-sm text-bonus-text">
              listen to: <strong>coming very soon</strong>
            </p>
          </div>
          <div className="mt-6 flex justify-around gap-1 text-center md:flex-col md:gap-3">
            {pictureDetails.band &&
              pictureDetails.band.links.some(
                (link) =>
                  link.linkType === LinkType.Socials ||
                  link.linkType === LinkType.Profile,
              ) && (
                <LinksContextMenuButton
                  title="socials"
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
                  title="streaming"
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
                  title="website"
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

import React, { useEffect, useRef } from 'react';

import type { PictureWithRelationsAndUrl } from '@/app/lib/actions';
import { updateMetadata } from '@/app/lib/metadata-utils';

type ScrollURLUpdaterProps = {
  urlSegment: string;
  pictureDetails?: PictureWithRelationsAndUrl;
  isRootSection?: boolean;
};

const createObserver = (
  timeoutIdRef: React.MutableRefObject<NodeJS.Timeout | null>,
) =>
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const { urlSegment, pictureDetails, isRootSection } = target.dataset;

          if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

          // eslint-disable-next-line no-param-reassign
          timeoutIdRef.current = setTimeout(() => {
            if (urlSegment) {
              const newUrl = isRootSection === 'true' ? '/' : `/${urlSegment}`;
              window.history.pushState(null, '', newUrl);

              if (isRootSection === 'true') {
                // Reset metadata for root sections
                updateMetadata();
              } else if (pictureDetails) {
                updateMetadata(
                  JSON.parse(pictureDetails) as PictureWithRelationsAndUrl,
                );
              }
            }
          }, 500);
        } else if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
      });
    },
    { threshold: 0.5 },
  );

const ScrollURLUpdater: React.FC<ScrollURLUpdaterProps> = ({
  urlSegment,
  pictureDetails,
  isRootSection = false,
}) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = createObserver(timeoutIdRef);
    const element = document.getElementById(urlSegment);

    if (element) {
      element.dataset.urlSegment = urlSegment;
      if (pictureDetails) {
        element.dataset.pictureDetails = JSON.stringify(pictureDetails);
      }
      element.dataset.isRootSection = isRootSection.toString();
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [urlSegment, pictureDetails, isRootSection]);

  return <span id={`updater-${urlSegment}`} />;
};

export default ScrollURLUpdater;

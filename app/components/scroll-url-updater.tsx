import type React from 'react';
import { useEffect, useRef } from 'react';

import type { PictureWithRelationsAndUrl } from '../lib/actions';
import { updateMetadata } from '../lib/metadata-utils';

type ScrollURLUpdaterProps = {
  urlSegment: string;
  pictureDetails: PictureWithRelationsAndUrl;
};

const createObserver = (
  timeoutIdRef: React.MutableRefObject<NodeJS.Timeout | null>,
) =>
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const { urlSegment, pictureDetails } = target.dataset;

          if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

          // eslint-disable-next-line no-param-reassign
          timeoutIdRef.current = setTimeout(() => {
            if (urlSegment && pictureDetails) {
              const newUrl = `${urlSegment}`;
              window.history.pushState(null, '', newUrl);
              updateMetadata(
                JSON.parse(pictureDetails) as PictureWithRelationsAndUrl,
              );
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
}) => {
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = createObserver(timeoutIdRef);
    const element = document.getElementById(urlSegment);

    if (element) {
      element.dataset.urlSegment = urlSegment;
      element.dataset.pictureDetails = JSON.stringify(pictureDetails);
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [urlSegment, pictureDetails]);

  return <span id={`updater-${urlSegment}`} />;
};

export default ScrollURLUpdater;

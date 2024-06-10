'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import type { PictureWithRelationsAndUrl } from '../lib/actions';
import { generatePictureMetadata, updateMetadata } from '../lib/metadata-utils';

interface ScrollURLUpdaterProps {
  urlSegment?: string;
  pictureDetails: PictureWithRelationsAndUrl;
}

const ScrollURLUpdater: React.FC<ScrollURLUpdaterProps> = ({
  urlSegment,
  pictureDetails,
}) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && urlSegment) {
          router.replace(`#${urlSegment}`, {
            scroll: false,
          });

          const metadata = generatePictureMetadata(pictureDetails);
          updateMetadata(metadata);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the component is visible to handle scrolling up and down
      },
    );

    if (currentRef) {
      intersectionObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        intersectionObserver.unobserve(currentRef);
      }
    };
  }, [router, urlSegment, pictureDetails]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove the '#' from the hash
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (!hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Only attach the event listener if there's a URL segment
    if (urlSegment) {
      window.addEventListener('hashchange', handleHashChange);
    }

    // Scroll to the element on component mount if there's a hash in the URL
    const hash = window.location.hash.substring(1);
    const element = document.getElementById(hash);
    if (hash && element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (hash && !element) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return () => {
      if (urlSegment) {
        window.removeEventListener('hashchange', handleHashChange);
      }
    };
  }, [urlSegment]);

  return <span id={urlSegment} ref={ref} />;
};

export default ScrollURLUpdater;

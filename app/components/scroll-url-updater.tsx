'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

import type { PictureWithRelationsAndUrl } from '../lib/actions';
import { updateMetadata } from '../lib/metadata-utils';

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
  const lastUrlSegment = useRef<string | null>(null);

  useEffect(() => {
    const currentRef = ref.current;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && urlSegment !== lastUrlSegment.current) {
          const newUrl = `/${urlSegment}`;
          router.replace(newUrl);
          updateMetadata(pictureDetails);
          lastUrlSegment.current = urlSegment || '';
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [router, urlSegment, pictureDetails]);

  return <div ref={ref} id={urlSegment} />;
};

export default ScrollURLUpdater;

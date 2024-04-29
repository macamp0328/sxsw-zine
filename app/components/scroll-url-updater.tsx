'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

interface RefreshOnVisibleProps {
  urlSegment?: string;
}

const RefreshOnVisible: React.FC<RefreshOnVisibleProps> = ({ urlSegment }) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current; // Capture current ref
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          router.push(`#${urlSegment}`, {
            scroll: false,
          });
        }
      },
      {
        root: null, // Using the viewport as the root
        rootMargin: '0px',
        threshold: 1.0, // Trigger when 100% of the component is visible
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [router, urlSegment]);

  return <div ref={ref} />;
};

export default RefreshOnVisible;

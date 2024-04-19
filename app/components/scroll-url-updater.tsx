'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

interface RefreshOnVisibleProps {
  urlSegment: string;
}

const RefreshOnVisible: React.FC<RefreshOnVisibleProps> = ({ urlSegment }) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('Component is visible');
          router.replace(`/${urlSegment}`, { scroll: false });
          // router.push(`/${urlSegment}`, undefined, { scroll: false });
        }
      },
      {
        root: null, // Using the viewport as the root
        rootMargin: '0px',
        threshold: 1.0, // Trigger when 100% of the component is visible
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [router, urlSegment]);

  return <div ref={ref} style={{ height: '1vh', border: '1px solid black' }} />;
};

export default RefreshOnVisible;

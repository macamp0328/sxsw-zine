'use client';

import React, { useEffect, useRef } from 'react';

import About from '@/app/components/pages/about';
import Footer from '@/app/components/pages/footer';
import Landing from '@/app/components/pages/landing';
import PhotoGallery from '@/app/components/pages/photo-gallery';
import type { PictureWithRelationsAndUrl } from '@/app/lib/actions';

export default function Zine({
  zinePictures,
  initialPicture,
}: {
  zinePictures: PictureWithRelationsAndUrl[];
  initialPicture?: PictureWithRelationsAndUrl;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPicture) {
      const element = document.getElementById(initialPicture.setSlug);
      if (element) {
        element.scrollIntoView({ behavior: 'instant' });
      }
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative h-svh w-full min-w-56 snap-y snap-mandatory overflow-y-scroll bg-neutral-200"
    >
      <Landing />
      <About />
      {zinePictures.map((zinePicture) => (
        <PhotoGallery key={zinePicture.id} zinePicture={zinePicture} />
      ))}
      <Footer />
    </div>
  );
}

export { Zine };

'use client';

import React, { useEffect, useRef } from 'react';

import type { PictureWithRelationsAndUrl } from '../../lib/actions';
import About from './about';
import Footer from './footer';
import Landing from './landing';
import PhotoGallery from './photo-gallery';

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

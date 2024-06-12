'use client';

import React, { useEffect, useRef } from 'react';

import type { PictureWithRelationsAndUrl } from '../lib/actions';
import About from './pages/about';
import Footer from './pages/footer';
import Landing from './pages/landing';
import PhotoGallery from './pages/photo-gallery';

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
      className="h-svh w-full snap-y snap-mandatory overflow-y-scroll bg-neutral-200"
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

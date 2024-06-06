/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

interface ImageOverlayProps extends ImageProps {
  src: string; // Ensuring 'src' is always required
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({ src, alt, ...props }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => setShowOverlay(!showOverlay);

  return (
    <>
      <div
        onClick={toggleOverlay}
        role="button"
        tabIndex={0}
        className="cursor-pointer"
        aria-label={alt}
      >
        <Image src={src} alt={alt} {...props} />
      </div>
      {showOverlay && (
        <div
          onClick={toggleOverlay}
          role="button"
          tabIndex={0}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          aria-label="Close image view"
        >
          <div className="relative size-full max-h-full max-w-full p-4">
            <Image
              src={src}
              alt={`Zoomed in ${alt}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageOverlay;

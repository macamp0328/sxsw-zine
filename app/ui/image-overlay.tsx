/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import clsx from 'clsx';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

interface ImageOverlayProps extends ImageProps {
  src: string; // Ensuring 'src' is always required
  alt: string; // Ensuring 'alt' is always required
  isRotate?: boolean; // Optional rotate flag
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({
  src,
  alt,
  isRotate = false,
  className,
  ...props
}) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => setShowOverlay(!showOverlay);

  const rotationClasses = [
    '-rotate-1',
    '-rotate-1',
    '-rotate-2',
    'rotate-0',
    'rotate-0',
    'rotate-1',
    'rotate-1',
    'rotate-2',
  ];
  const randomRotationClass =
    rotationClasses[Math.floor(Math.random() * rotationClasses.length)];

  const imageClass = clsx('object-contain', className, {
    [randomRotationClass]: isRotate,
  });

  return (
    <>
      <div
        onClick={toggleOverlay}
        role="button"
        tabIndex={0}
        className="relative size-full cursor-pointer"
        aria-label={alt}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={100}
          className={imageClass}
          {...props}
        />
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
              fill
              quality={100}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageOverlay;

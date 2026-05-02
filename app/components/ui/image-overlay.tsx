'use client';

import clsx from 'clsx';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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
  sizes = '100vw',
  quality = 85, // Reduced from 100 to 85 for better cache efficiency
  ...props
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [rotationClass, setRotationClass] = useState('');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isRotate) {
      const rotationClasses = [
        '-rotate-1',
        '-rotate-1',
        '-rotate-2',
        'rotate-0',
        'rotate-1',
        'rotate-1',
        'rotate-2',
      ];
      const randomRotationClass =
        rotationClasses[Math.floor(Math.random() * rotationClasses.length)];
      setRotationClass(randomRotationClass);
    }
  }, [isRotate]);

  useEffect(() => {
    if (!showOverlay) {
      return undefined;
    }

    closeButtonRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowOverlay(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [showOverlay]);

  const toggleOverlay = () => setShowOverlay((current) => !current);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleOverlay();
    }
  };

  const imageClass = clsx('object-contain', className, {
    [rotationClass]: rotationClass,
  });

  return (
    <>
      <button
        type="button"
        onClick={toggleOverlay}
        onKeyDown={handleKeyDown}
        className="relative block size-full cursor-pointer border-0 bg-transparent p-0"
        aria-label={`Open full size image: ${alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={imageClass}
          quality={quality}
          {...props}
        />
      </button>
      {showOverlay && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          aria-label="Full size image view"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={toggleOverlay}
            className="absolute right-4 top-4 z-10 bg-neutral-100 px-3 py-2 text-sm text-main-text underline"
          >
            close
          </button>
          <button
            type="button"
            onClick={toggleOverlay}
            className="relative size-full max-h-full max-w-full border-0 bg-transparent p-4"
            aria-label="Close image view"
          >
            <Image
              src={src}
              alt={`Zoomed in ${alt}`}
              fill
              sizes="100vw"
              quality={95}
              className="object-contain"
            />
          </button>
        </div>
      )}
    </>
  );
};

export default ImageOverlay;

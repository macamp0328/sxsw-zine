'use client';

import type { Band } from '@prisma/client';

import { type NonZinePicture } from '../lib/actions';
import ImageOverlay from '../ui/image-overlay';

export default function Thumbnails({
  notZinePictures,
  band,
}: {
  notZinePictures: NonZinePicture[];
  band: Band;
}) {
  if (!notZinePictures.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2 overflow-hidden ">
      {notZinePictures.slice(0, 8).map((picture) =>
        picture.url ? (
          <div
            key={picture.id}
            className="relative flex aspect-square min-w-16 shrink grow-0 rounded-md border-3 border-sub-background md:min-w-24"
          >
            <ImageOverlay
              src={picture.url}
              alt={`Photo of ${band.name} taken on ${picture.takenAt}`}
              className="rounded-md object-cover" // Adjusted to cover for thumbnail effect
              isRotate
            />
          </div>
        ) : null,
      )}
    </div>
  );
}

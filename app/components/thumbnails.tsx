'use client';

import type { Band } from '@prisma/client';

import ImageOverlay from '@/app/components/ui/image-overlay';
import { type NonZinePicture } from '@/app/lib/actions';

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
    <div className="flex flex-wrap items-center justify-center space-x-2 overflow-hidden">
      {notZinePictures.slice(0, 8).map((picture) =>
        picture.url ? (
          <div
            key={picture.id}
            className="relative flex aspect-square min-w-12 shrink grow-0 rounded-md border-2 border-sub-background xs:min-w-16 md:min-w-24"
          >
            <ImageOverlay
              src={picture.url}
              alt={`Photo of ${band.name} taken on ${picture.takenAt}`}
              className="rounded-md object-cover" // Adjusted to cover for thumbnail effect
              isRotate
              sizes="25vw"
            />
          </div>
        ) : null,
      )}
    </div>
  );
}

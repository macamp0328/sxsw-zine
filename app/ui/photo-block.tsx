import type { Picture } from '@prisma/client';
import Image from 'next/image';
import React from 'react';

// interface PhotoBlockProps {
//   fileName: string;
//   id: string | number;
// }

export default function PhotoBlock(picture: Picture) {
  return (
    <div>
      <Image
        src={picture.filePath}
        alt={`Photo ${picture.id}`}
        // style={{ width: '100%', height: 'auto' }}
        width={4091}
        height={3068}
      />
    </div>
  );
}

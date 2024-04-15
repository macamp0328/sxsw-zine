import Image from 'next/image';
import React from 'react';

interface PhotoBlockProps {
  fileName: string;
  id: string | number;
}

export default function PhotoBlock(props: PhotoBlockProps) {
  return (
    <div>
      <Image
        src={props.fileName}
        alt={`Photo ${props.id}`}
        // style={{ width: '100%', height: 'auto' }}
        width={4091}
        height={3068}
      />
    </div>
  );
}

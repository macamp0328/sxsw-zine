import { Button } from '@nextui-org/react';
import React from 'react';

import { getPictures } from '@/app/lib/actions';
import { cutiveMono } from '@/app/ui/fonts';
import PhotoBlock from '@/app/ui/photo-block';

type Picture = {
  id: string;
  fileName: string;
  title: string;
  band: string; // Assuming there's a 'band' field in your data
};

const Home: React.FC = () => {
  const pictures: Picture[] = getPictures();

  return (
    <div className="relative">
      <div
        className={`${cutiveMono.className} fixed left-0 top-0 z-50 w-full bg-transparent p-5 text-xl font-bold text-white xl:text-black`}
      >
        <h2>Miles&apos;s</h2>
        <h2>SXSW</h2>
      </div>
      <div className="mx-auto mt-16 flex flex-col items-center gap-8 p-4">
        {pictures.map((picture) => (
          <div key={picture.id} className="w-full max-w-6xl">
            <PhotoBlock fileName={picture.fileName} id={picture.id} />
            <div className="mt-2 border-t border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h1 className="text-xl font-bold">{picture.title}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Photo by {picture.band} | {picture.title}
              </p>
              <Button>Add to Favorites</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

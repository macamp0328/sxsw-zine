'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const getRandomRotation = () => `rotate-${Math.floor(Math.random() * 5) - 2}`;
const getRandomShift = () => `${Math.floor(Math.random() * 6) - 3}px`;

const ResponsiveLayout: React.FC = () => {
  const [rotations, setRotations] = useState<string[]>([]);
  const [shifts, setShifts] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    // Generate random rotations and shifts for elements
    const newRotations = new Array(5).fill('').map(() => getRandomRotation());
    const newShifts = new Array(5).fill({ top: '', left: '' }).map(() => ({
      top: getRandomShift(),
      left: getRandomShift(),
    }));

    setRotations(newRotations);
    setShifts(newShifts);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white lg:flex-row">
      {/* Mobile Title */}
      <div className="block border-b-4 border-yellow-500 bg-gray-800 p-4 lg:hidden">
        <h1 className="mb-4 text-3xl font-bold italic">Title</h1>
      </div>

      {/* Image Section */}
      <div className="relative flex grow flex-col items-center justify-center bg-gray-700">
        <div className="relative size-full border-4 border-white bg-red-300 lg:mt-24">
          <Image
            src="https://picsum.photos/4000/3000"
            alt="Random image from Lorem Picsum"
            layout="fill"
            className="object-contain"
          />
        </div>
        {/* Thumbnails */}
        <div className="my-4 flex space-x-2 overflow-x-auto border-y-4 border-white bg-yellow-500 p-4">
          {[1, 2, 3, 4, 5].map((n, i) => (
            <div
              key={n}
              className={`relative size-16 shrink-0 border-2 border-black bg-green-300 ${rotations[i]}`}
              style={{ top: shifts[i]?.top, left: shifts[i]?.left }}
            >
              <Image
                src={`https://picsum.photos/3000/4000?random=${n}`}
                alt={`Thumbnail ${n}`}
                layout="fill"
                className="rounded-md object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Title and Description */}
      <div className="hidden border-l-4 border-yellow-500 bg-gray-800 p-4 lg:flex lg:w-1/5 lg:flex-col">
        <h1 className="mb-4 -rotate-2 text-3xl font-bold italic">Title</h1>
        <div className="mt-auto">
          <h2 className="mb-2 rotate-1 text-2xl font-bold">Description</h2>
          <p className="font-handwritten text-sm leading-loose">
            Description section pushed to the bottom. Description section pushed
            to the bottom. Description section pushed to the bottom. Description
            section pushed to the bottom. Description section pushed to the
            bottom. Description section pushed to the bottom. Description
            section pushed to the bottom.
          </p>
        </div>
      </div>

      {/* Mobile Description Section */}
      <div className="mt-auto block border-t-4 border-yellow-500 bg-gray-800 p-4 lg:hidden">
        <h2 className="mb-2 rotate-1 text-2xl font-bold">Description</h2>
        <p className="font-handwritten text-sm leading-loose">
          Description section pushed to the bottom. Description section pushed
          to the bottom. Description section pushed to the bottom. Description
          section pushed to the bottom. Description section pu shed to the
          bottom. Description section pushed to the bottom. Description section
          pushed to the bottom.
        </p>
      </div>
    </div>
  );
};

export default ResponsiveLayout;

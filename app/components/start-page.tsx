import Image from 'next/image';

export default function StartPage() {
  return (
    <div className="flex h-screen w-full snap-start flex-col items-center justify-center overflow-hidden md:flex-row md:items-stretch">
      {/* Text container with responsive min and max height properties */}
      <div className="flex max-h-[15%] min-h-[25%] w-full flex-col items-center justify-center px-4 py-8 text-center md:max-h-none md:min-h-0 md:flex-1">
        <p className="flex:grow text-xl text-gray-800">
          A musical photo journey of SXSW 2024,
          <br />
          through the lens of Miles.
        </p>
        <p className="hidden text-medium text-gray-700 md:flex md:max-h-[15%]">
          Go ahead, take a scroll.
        </p>
      </div>
      {/* Image container using flex-grow to ensure it is always visible */}
      <div className="relative m-2 w-full flex-1 md:m-4">
        <div className="size-full">
          <Image
            src="/photos/header-miles.jpg"
            layout="fill"
            alt="picture of Miles Camp, the maker of this page"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}

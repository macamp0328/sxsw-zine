import Image from 'next/image';

export default function StartPage() {
  return (
    <div className="flex h-screen w-full snap-start flex-col items-center justify-evenly overflow-hidden md:flex-row md:items-stretch">
      <div className="flex max-h-[15%] min-h-[25%] flex-initial flex-col items-center justify-center p-4 md:max-h-none md:min-h-0 md:flex-1">
        <div className="flex-1" />
        <p className="flex-1 text-xl text-gray-800">
          A journey of SXSW 2024,
          <br />
          through the lens of Miles.
        </p>
        <div className="my-4 hidden flex-initial content-end justify-center md:flex">
          <p className="flex content-center justify-center text-medium text-gray-700 ">
            Go ahead, take a scroll.
          </p>
        </div>
      </div>

      <div className="relative m-2 w-full flex-1 object-cover">
        <div className="size-full">
          <Image
            src="/photos/header-miles.jpg"
            alt="picture of Miles Camp, the maker of this page"
            fill
            sizes="100vw"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
      {/* max-h-[10%] min-h-[15%] */}
      <div className="my-4 flex-initial content-end justify-center md:hidden">
        <p className="flex content-center justify-center text-medium text-gray-700 md:hidden">
          Go ahead, take a scroll.
        </p>
      </div>
    </div>
  );
}

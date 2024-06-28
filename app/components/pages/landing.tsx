'use client';

import ScrollURLUpdater from '@/app/components/scroll-url-updater';
import ImageOverlay from '@/app/components/ui/image-overlay';

export default function Landing() {
  const heroImageUrl = `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/statics/start-page-miles.jpg`;

  return (
    <div
      id="landing"
      className="texture-overlay flex h-svh w-full snap-start snap-normal flex-col items-center justify-between overflow-hidden md:flex-row md:items-stretch"
    >
      <ScrollURLUpdater urlSegment="landing" isRootSection />
      <div className="flex w-full flex-initial basis-1/4 flex-col items-center justify-end md:flex-auto md:justify-center">
        <div className="hidden flex-1 md:flex" />
        <h1 className="mb-4 mt-24 flex w-full items-center justify-center text-center align-bottom text-2xl text-main-text md:m-0 md:flex-1 md:text-3xl">
          a sxsw journey,
          <br />
          through my lens.
        </h1>
        <div className="mb-12 hidden w-full flex-initial items-end justify-center md:flex md:flex-1">
          <p className="animate-bounce text-lg text-sub-text">
            Go ahead, take a scroll.
          </p>
        </div>
      </div>

      <div className="w-full flex-auto p-2">
        <div className="relative size-full">
          <ImageOverlay
            src={heroImageUrl}
            alt="picture of Miles Camp, the maker of this page"
            priority
            isRotate
            sizes="60vw"
          />
        </div>
      </div>
      <div className="mb-12 flex w-full flex-initial basis-1/6 items-end justify-center md:hidden">
        <p className="animate-bounce text-lg text-sub-text md:hidden">
          Go ahead, take a scroll.
        </p>
      </div>
    </div>
  );
}

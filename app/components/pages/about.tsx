'use client';

import type { Metadata } from 'next';

import ScrollURLUpdater from '@/app/components/scroll-url-updater';
import ImageOverlay from '@/app/components/ui/image-overlay';
import TrackedLink from '@/app/components/ui/tracked-link';
import { cutiveMono, robotoCondensed } from '@/app/lib/fonts';

export const metadata: Metadata = {
  title: 'Abouts',
  description:
    'About Page: Welcome to my slice of SXSW 2024—a digital zine documenting my quest to catch 50 live sets. This isn&apos;t your typical, polished ad filled corporate fluff; it&apos;s a DIY tribute to live music, captured with a small camera (Ricoh GR II) during my perfectly paced party. My collection is a gritty memory of every set I danced to. Dive into these visuals, listen to the sounds of the artists, support their socials, and let their art resonate with you. Every dollar, listen, and follow counts.',
};

export default function About() {
  const drummingImageUrl = `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/statics/drumming.jpg`;
  const nickelImageUrl = `${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/statics/nickel.jpg`;

  return (
    <div
      id="about"
      className={`texture-overlay flex min-h-svh w-full snap-start snap-normal flex-col items-center justify-center px-4 pb-24 pt-20 sm:px-6 md:snap-align-none md:scroll-m-0 md:px-10 md:pb-28 md:pt-24 lg:px-12 ${robotoCondensed.className}`}
    >
      <ScrollURLUpdater urlSegment="about" isRootSection />
      <div className="relative z-10 flex w-full max-w-[1500px] flex-col gap-8 md:gap-10 lg:gap-12">
        <div className="grid w-full items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-8 xl:gap-x-16">
          <div className="squiggle-texture-overlay bg-sub-background p-3 shadow-xl md:p-5 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:ml-8 lg:p-6 xl:ml-16">
            <div className="relative aspect-[16/9] min-h-[260px] w-full sm:min-h-[320px] lg:min-h-[300px] xl:min-h-[340px]">
              <ImageOverlay
                src={drummingImageUrl}
                alt="a random drummer in an empty lot"
                priority
                isRotate
                sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 52vw, 100vw"
                quality={85}
              />
            </div>
          </div>

          <div className="flex w-full justify-center lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:justify-end lg:pr-2">
            <p className="max-w-2xl text-center text-lg leading-relaxed text-main-text sm:text-xl md:max-w-[46rem] lg:max-w-[30rem] lg:text-right xl:text-2xl">
              Welcome to my slice of SXSW 2024—a digital zine documenting my
              quest to catch 50 live sets. This isn&apos;t your typical,
              polished ad filled corporate fluff; it&apos;s a DIY tribute to
              live music, captured with a small camera (Ricoh GR II) during my
              perfectly paced party. My collection is a gritty memory of every
              set I danced to. Dive into these visuals, listen to the sounds of
              the artists, support their socials, and let their art resonate
              with you. Every <b>dollar</b>, listen, and follow counts.
            </p>
          </div>

          <div className="squiggle-texture-overlay bg-sub-background p-3 shadow-xl md:p-5 lg:col-span-7 lg:col-start-1 lg:row-start-2 lg:mr-8 lg:p-6 xl:mr-20">
            <div className="relative aspect-[16/9] min-h-[260px] w-full sm:min-h-[320px] lg:min-h-[300px] xl:min-h-[340px]">
              <ImageOverlay
                src={nickelImageUrl}
                alt="a boiler maker at Nickel City"
                priority
                isRotate
                sizes="(min-width: 1280px) 44vw, (min-width: 1024px) 52vw, 100vw"
                quality={85}
              />
            </div>
          </div>

          <div className="flex w-full justify-center lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:justify-start lg:pl-2 xl:pl-6">
            <p className="max-w-2xl text-center text-lg leading-relaxed text-main-text sm:text-xl md:max-w-[46rem] lg:max-w-[34rem] lg:text-left xl:text-2xl">
              This project is my love letter to the joy that live music brings
              me and every hidden treasure I discovered when I lost my way. By
              train, bike, and foot, soaked by rain and drenched in sweat under
              the moontowers&apos; light, I didn&apos;t quite hit my goal of 50
              sets, but here you&apos;ll find 48 that captured my heart. Each
              image captures a fleeting moment; take some time to explore,
              engage, and perhaps discover your next favorite artist who might
              soon visit your town—or inspire you to visit their country.
            </p>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 border-y border-main-text/10 py-6 md:gap-5 md:py-8">
          <p className="w-full text-center text-base leading-relaxed text-main-text md:text-lg">
            <b>Footnote 1:</b> For the bands featured, these photos are yours
            for the taking. Just click the download button.
          </p>
          <p className="w-full text-center text-base leading-relaxed text-main-text md:text-lg">
            <b>Footnote 2:</b> This site is also a playground. Stay tuned for
            blog posts about technical details. In the meantime,{' '}
            <TrackedLink
              href="https://github.com/macamp0328/sxsw-zine"
              linkType="aboutLink"
              className="text-center text-sub-text underline"
            >
              check out the repo!
            </TrackedLink>
          </p>
          <p className="w-full text-center text-base leading-relaxed text-main-text md:text-lg">
            <b>Footnote 3:</b> I utilized AI to help write the descriptions
            about the artists.
          </p>
        </div>

        <div className="w-full justify-center text-center">
          <p
            className={`animate-bounce text-lg text-sub-text ${cutiveMono.className}`}
          >
            <strong>Come on now, just keep scrolling.</strong>
          </p>
        </div>
        <ScrollURLUpdater urlSegment="about" isRootSection />
      </div>
    </div>
  );
}

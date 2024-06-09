import { robotoCondensed } from '../other/fonts';
import ImageOverlay from '../ui/image-overlay';

export default function AboutPage() {
  const drummingImageUrl = `${process.env.AWS_CLOUDFRONT_DOMAIN}/statics/drumming.jpg`;
  const nickelImageUrl = `${process.env.AWS_CLOUDFRONT_DOMAIN}/statics/nickel.jpg`;

  return (
    <div
      id="about"
      className={`flex w-full snap-start snap-always flex-col items-center justify-center pb-28 pt-20 md:grid md:scroll-m-0 md:grid-cols-2 md:px-12 xl:px-40 2xl:px-60 ${robotoCondensed.className}`}
    >
      <div className="flex size-full bg-sub-background p-2 shadow-xl md:hidden">
        <div className="relative min-h-[300px] w-full">
          <ImageOverlay
            src={drummingImageUrl}
            alt="a random drummer in an empty lot"
            priority
            isRotate
          />
        </div>
      </div>
      <div className="flex h-fit w-full items-center justify-center p-6 md:pr-12">
        <p className="w-full text-center text-lg text-main-text md:text-right md:text-xl">
          Welcome to my slice of SXSW 2024—a digital zine documenting my quest
          to catch 50 live sets. This isn&apos;t your typical, polished ad
          filled corporate fluff; it&apos;s a DIY tribute to live music,
          captured with a small camera (Ricoh GR II) during my perfectly paced
          party. My collection is a gritty memory of every set I danced to. Dive
          into these visuals, listen to the sounds of the artists, support their
          socials, and let their art resonate with you. Every <b>dollar</b>,
          listen, and follow counts.
        </p>
      </div>
      <div className="m-2 hidden size-full bg-sub-background p-6 shadow-2xl md:flex">
        <div className="relative size-full min-h-[300px]">
          <ImageOverlay
            src={drummingImageUrl}
            alt="a random drummer in an empty lot"
            priority
            isRotate
          />
        </div>
      </div>
      <div className="m-2 hidden size-full bg-sub-background p-6 shadow-2xl md:flex">
        <div className="relative size-full min-h-[300px]">
          <ImageOverlay
            src={nickelImageUrl}
            alt="a boiler maker at Nickel City"
            priority
            isRotate
          />
        </div>
      </div>
      <div className="flex size-full flex-col items-center justify-center p-6 md:pl-12">
        <p className="w-full text-center text-lg text-main-text md:text-left md:text-xl">
          This project is my love letter to the joy that live music brings me
          and every hidden treasure I discovered when I lost my way. By train,
          bike, and foot, soaked by rain and drenched in sweat under the
          moontowers&apos; light, I didn&apos;t quite hit my goal of 50 sets,
          but here you&apos;ll find 48 that captured my heart. Each image
          captures a fleeting moment; take some time to explore, engage, and
          perhaps discover your next favorite artist who might soon visit your
          town—or inspire you to visit their country.
        </p>
      </div>
      <div className="flex size-full bg-sub-background p-2 shadow-xl md:hidden">
        <div className="relative min-h-[300px] w-full">
          <ImageOverlay
            src={nickelImageUrl}
            alt="a boiler maker at Nickel City"
            priority
            isRotate
          />
        </div>
      </div>
      <div className="flex size-full flex-col items-center justify-center p-6 md:pl-12">
        <p className="mt-6 w-full text-center text-base text-main-text md:hidden md:text-lg">
          <b>Footnote 1:</b> For the bands featured, these photos are yours for
          the taking. Hit me up. This zine is for you, by you, and is a
          heartfelt thank you for filling our city with your music.
        </p>
        <p className="mt-6 w-full text-center text-base text-main-text md:hidden md:text-lg">
          <b>Footnote 2:</b> This site is also my playground for experimenting
          with new webdev frameworks and tooling—a casual project to remember
          the times before social media. Stay tuned for blog posts where
          I&apos;ll nerd out about the technical details. In the meantime,{' '}
          <a
            href="https://github.com/macamp0328/sxsw-zine"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-sub-text underline"
          >
            check out the repo!
          </a>
        </p>
        <p className="mt-6 w-full text-center text-base text-main-text md:hidden md:text-lg">
          <b>Footnote 3:</b> I utilized AI to help write the descriptions about
          the artists.
        </p>
      </div>
      <div className="hidden size-full flex-col items-center justify-start p-6 md:col-span-2 md:flex">
        <p className="mt-6 w-full text-center text-sm text-main-text md:text-lg">
          <b>Footnote 1:</b> For the bands featured, these photos are yours for
          the taking. Just click the download button.
        </p>
        <p className="mt-6 w-full text-center text-sm text-main-text md:text-lg">
          <b>Footnote 2:</b> This site is also a playground. Stay tuned for blog
          posts about technical details. In the meantime,{' '}
          <a
            href="https://github.com/macamp0328/sxsw-zine"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-sub-text underline"
          >
            check out the repo!
          </a>
        </p>
        <p className="mt-6 w-full text-center text-sm text-main-text md:text-lg">
          <b>Footnote 3:</b> I utilized AI to help write the descriptions about
          the artists.
        </p>
      </div>
    </div>
  );
}

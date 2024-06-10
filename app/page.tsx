// app/page.tsx
import Head from 'next/head';
import React from 'react';

import AboutPage from './components/about-page';
import PhotoGallery from './components/photo-gallery';
import StartPage from './components/start-page';
import { getZinePictures } from './lib/actions';
import { generatePictureMetadata } from './lib/metadata-utils';

export default async function Home() {
  const zinePhotos = await getZinePictures();

  // Generate default metadata for the initial load
  const defaultPhoto = zinePhotos[0];
  const initialMetadata = generatePictureMetadata(defaultPhoto);

  return (
    <div className="h-svh w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-neutral-200">
      <Head>
        <title>{initialMetadata.title?.toString() || "Miles's SXSW"}</title>
        <meta
          name="description"
          content={
            initialMetadata.description || 'A SXSW journey through my lens.'
          }
        />
        {/* {initialMetadata.openGraph?.images && (
          <meta
            property="og:image"
            content={initialMetadata.openGraph.images[0].url.toString()}
          />
        )}
        {initialMetadata.twitter?.images && (
          <meta
            name="twitter:image"
            content={initialMetadata.twitter.images[0].toString()}
          />
        )} */}
      </Head>
      <StartPage />
      <AboutPage />
      <PhotoGallery zinePhotos={zinePhotos} />
      <div
        id="footer"
        className="flex min-h-screen snap-start snap-always flex-col items-center justify-center md:px-32"
      >
        <p className="text-center text-main-text">
          You&apos;ve reached the end of the almost 50 sets.
        </p>
        <p className="text-center text-sub-text">
          If you made it this far, you should probably go back and listen to
          some music.
        </p>
        <p className="mt-4 text-center text-sub-text">
          If you would like to see the source code for this project, you can
          find it on GitHub. I am treating this as a sandbox, so it will
          continue to evolve.
        </p>
        <a
          href="https://github.com/macamp0328/sxsw-zine"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sub-text underline"
        >
          GitHub Repository
        </a>
      </div>
    </div>
  );
}

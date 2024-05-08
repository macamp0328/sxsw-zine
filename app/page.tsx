import React from 'react';

import ScrollURLUpdater from '@/app/components/scroll-url-updater';

import AboutPage from './components/about-page';
import PhotoGallery from './components/photo-gallery';
import StartPage from './components/start-page';

export default async function Home() {
  return (
    <div className="h-svh w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-background">
      <StartPage />

      <div>
        <ScrollURLUpdater urlSegment="about" />
        <AboutPage />
      </div>

      <PhotoGallery />

      <div
        id="footer"
        className="flex min-h-screen snap-center flex-col items-center justify-center"
      >
        <ScrollURLUpdater urlSegment="footer" />
        <p className="text-center text-main-text">
          You&apos;ve reached the end of the festival.
        </p>
        <p className="text-center text-sub-text">
          Thank you for visiting my gallery!
        </p>
        <p className="mt-4 text-center text-sub-text">
          If you would like to see the source code for this project, you can
          find it on GitHub:
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

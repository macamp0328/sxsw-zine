import React from 'react';

import AboutPage from './components/about-page';
import PhotoGallery from './components/photo-gallery';
import StartPage from './components/start-page';

export default async function Home() {
  return (
    <div className="h-svh w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-neutral-200">
      <StartPage />

      <div>
        <AboutPage />
      </div>

      <PhotoGallery />

      <div
        id="footer"
        className="flex min-h-screen snap-center flex-col items-center justify-center md:px-32"
      >
        <p className="text-main-text text-center">
          You&apos;ve reached the end of the festival.
        </p>
        <p className="text-sub-text text-center">
          If you made it this far, you should probably go back and listen to
          some music.
        </p>
        <p className="text-sub-text mt-4 text-center">
          If you would like to see the source code for this project, you can
          find it on GitHub. I am treating this as a sandbox, so it will
          continue to evolve.
        </p>
        <a
          href="https://github.com/macamp0328/sxsw-zine"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sub-text text-center underline"
        >
          GitHub Repository
        </a>
      </div>
    </div>
  );
}

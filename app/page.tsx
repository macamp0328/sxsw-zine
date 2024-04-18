import React from 'react';

import PhotoGallery from './components/photo-gallery';
import StartPage from './components/start-page';

export default async function Home() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* <WorkInProgressBanner /> */}
      <StartPage />

      <PhotoGallery />

      <div className="flex min-h-screen snap-center items-center justify-center">
        End Page Content
      </div>
    </div>
  );
}

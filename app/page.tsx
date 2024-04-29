import React from 'react';

import PhotoGallery from './components/photo-gallery';
import StartPage from './components/start-page';

export default async function Home() {
  return (
    <div className="h-svh w-full snap-y snap-mandatory overflow-y-scroll bg-background">
      <StartPage />

      <PhotoGallery />

      <div className="flex min-h-screen snap-center items-center justify-center">
        End Page Content
      </div>
    </div>
  );
}

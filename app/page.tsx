import React from 'react';

import StartPage from './components/start-page';

export default async function Home() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      {/* <WorkInProgressBanner /> */}
      <StartPage />

      {/* <div>
        <PhotoGallery />
      </div> */}

      <div className="flex min-h-screen snap-center items-center justify-center">
        End Page Content
      </div>
    </div>
  );
}

import React from 'react';

import { robotoCondensed } from '../lib/fonts';

const messages = [
  'Hold tight! Let me find those files for you...',
  'It will take a few moments, they are here somewhere...',
  "Thanks for the patience, I can't afford the fast servers...",
];

interface DownloadOverlayProps {
  messageIndex: number;
}

const DownloadOverlay: React.FC<DownloadOverlayProps> = ({ messageIndex }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="relative w-full max-w-xs space-y-3 border-4 border-sub-text bg-sub-background p-4 text-center md:max-w-md">
        <p className={`text-sm text-bonus-text ${robotoCondensed.className}`}>
          {messages[messageIndex]}
        </p>
        <div className="mx-auto mt-2 size-12">
          <div className="punk-spinner" />
        </div>
      </div>
    </div>
  );
};

export default DownloadOverlay;

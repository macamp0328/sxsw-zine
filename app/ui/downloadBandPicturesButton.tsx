'use client';

import React, { useTransition } from 'react';

interface DownloadButtonProps {
  bandId: string;
}

/**
 * Component for downloading band pictures as a zip file.
 * @param bandId - The ID of the band.
 */
const DownloadBandPicturesButton: React.FC<DownloadButtonProps> = ({
  bandId,
}) => {
  const [isPending, startTransition] = useTransition();

  /**
   * Handles the download click event.
   * Fetches the zip file from the server and triggers the download.
   */
  const handleDownloadClick = async () => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/download-images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bandId }),
        });

        if (!response.ok) {
          throw new Error('Failed to create zip file');
        }

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `miless-sxsw.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Failed to download images', error);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDownloadClick}
      className="p-1 text-xs text-main-text underline decoration-solid decoration-1 transition-colors hover:bg-sub-background disabled:opacity-50"
      disabled={isPending}
    >
      download pictures
    </button>
  );
};

export default DownloadBandPicturesButton;

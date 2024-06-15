'use client';

import React, { useState } from 'react';

interface DownloadButtonProps {
  bandId: string;
  bandName: string;
}

/**
 * Component for downloading band pictures as a zip file.
 * @param bandId - The ID of the band.
 * @param bandName - The name of the band.
 */
const DownloadBandPicturesButton: React.FC<DownloadButtonProps> = ({
  bandId,
  bandName,
}) => {
  const [isPending, setIsPending] = useState(false);

  /**
   * Handles the download click event.
   * Fetches the zip file from the server and triggers the download.
   * @param event - The click event.
   */
  const handleDownloadClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    setIsPending(true);

    try {
      // Record the download click
      await fetch('/api/track-link-click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          linkType: 'downloadPictures',
          bandId,
          band: bandName,
          url: window.location.href,
        }),
      });

      // Fetch the zip file
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
      link.download = `${bandName}-miless-sxsw.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download images', error);
      alert('Failed to download images. Please try again later.'); // Provide user feedback in case of an error
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownloadClick}
      className="flex items-center p-1 text-xs text-main-text underline decoration-solid decoration-1 transition-colors hover:bg-sub-background disabled:opacity-50"
      disabled={isPending}
      aria-busy={isPending}
    >
      {isPending ? (
        <>
          <svg
            className="mr-2 size-4 animate-spin text-main-text"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          downloading...
        </>
      ) : (
        'download pictures'
      )}
    </button>
  );
};

export default DownloadBandPicturesButton;

'use client';

import React from 'react';

interface TrackedLinkProps {
  href: string;
  children: React.ReactNode;
  linkType: 'linksLink' | 'downloadPictures' | 'aboutLink' | 'footerLink';
  bandId?: string;
  band?: string;
  className?: string;
}

const TrackedLink: React.FC<TrackedLinkProps> = ({
  href,
  children,
  linkType,
  bandId,
  band,
  className,
}) => {
  const handleClick = () => {
    const payload = JSON.stringify({ linkType, bandId, band, url: href });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        '/api/track-link-click',
        new Blob([payload], { type: 'application/json' }),
      );
      return;
    }

    fetch('/api/track-link-click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
      keepalive: true,
    }).catch((error) => {
      console.error('Failed to record link click:', error);
    });
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default TrackedLink;

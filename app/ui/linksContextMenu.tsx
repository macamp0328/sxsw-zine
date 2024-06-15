'use client';

import React, { useCallback, useEffect, useRef } from 'react';

interface LinksContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: {
    id: string;
    url: string;
    platform: string;
    bandId: string;
    band: string;
  }[];
}

const LinksContextMenu: React.FC<LinksContextMenuProps> = ({
  isOpen,
  onClose,
  links,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = useCallback(
    async (linkId: string, url: string, bandId: string, band: string) => {
      try {
        await fetch('/api/track-link-click', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            linkId,
            url,
            linkType: 'linksLink',
            bandId,
            band,
          }),
        });
      } catch (error) {
        console.error('Failed to record link click:', error);
      }
    },
    [],
  );

  const handleClick = useCallback(
    (link: {
      id: string;
      url: string;
      platform: string;
      bandId: string;
      band: string;
    }) => {
      return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        handleLinkClick(link.id, link.url, link.bandId, link.band);
        window.open(link.url, '_blank', 'noopener,noreferrer');
      };
    },
    [handleLinkClick],
  );

  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'} button-texture-overlay absolute z-10 mt-2 bg-main-text text-xs text-sub-background xs:text-sm`}
      style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)' }}
    >
      <div ref={ref} className="flex flex-col">
        {links.map((link) => (
          <a
            key={`${link.url}-${link.platform}`}
            href={link.url}
            onClick={handleClick(link)}
            className="px-4 py-2 text-xs transition-colors hover:bg-gray-700 xs:text-sm"
          >
            {link.platform.replace(/_/g, ' ')}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinksContextMenu;

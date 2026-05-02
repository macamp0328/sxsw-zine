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
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onClose]);

  const handleLinkClick = useCallback(
    (linkId: string, url: string, bandId: string, band: string) => {
      const payload = JSON.stringify({
        linkId,
        url,
        linkType: 'linksLink',
        bandId,
        band,
      });

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
      return () => {
        handleLinkClick(link.id, link.url, link.bandId, link.band);
      };
    },
    [handleLinkClick],
  );

  return (
    <div
      className={`${isOpen ? 'block' : 'hidden'} button-texture-overlay absolute z-10 mt-2 bg-main-text text-xs text-sub-background xs:text-sm`}
      style={{ bottom: '0%', left: '50%', transform: 'translateX(-50%)' }}
      role="menu"
    >
      <div ref={ref} className="flex flex-col">
        {links.map((link) => (
          <a
            key={`${link.url}-${link.platform}`}
            href={link.url}
            onClick={handleClick(link)}
            target="_blank"
            rel="noopener noreferrer"
            role="menuitem"
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

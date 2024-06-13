'use client';

import React, { useEffect, useRef } from 'react';

interface LinksContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { url: string; platform: string }[];
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
            target="_blank"
            rel="noopener noreferrer"
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

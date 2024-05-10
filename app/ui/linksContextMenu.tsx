'use client';

import React, { useEffect, useRef } from 'react';

interface LinksContextMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { url: string; platform: string }[];
  isLeftButton?: boolean;
}

const LinksContextMenu: React.FC<LinksContextMenuProps> = ({
  isOpen,
  onClose,
  links,
  isLeftButton = true,
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
      className={`${isOpen ? 'block' : 'hidden'} absolute z-10 mt-2 bg-gray-800 text-white shadow-lg`}
      style={{ bottom: '0%', [isLeftButton ? 'left' : 'right']: '0%' }}
    >
      <div ref={ref} className="flex flex-col">
        {links.map((link) => (
          <a
            key={`${link.url}-${link.platform}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-small transition-colors hover:bg-gray-700"
          >
            {link.platform.replace(/_/g, ' ')}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinksContextMenu;

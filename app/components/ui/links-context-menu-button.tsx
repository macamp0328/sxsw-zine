'use client';

import { useState } from 'react';

import LinksContextMenu from './links-context-menu';

interface LinksContextMenuButtonProps {
  title: string;
  links: {
    id: string;
    url: string;
    platform: string;
    bandId: string;
    band: string;
  }[];
}

const LinksContextMenuButton: React.FC<LinksContextMenuButtonProps> = ({
  title,
  links,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleMenu}
        className="button-texture-overlay bg-main-text p-1 text-xs text-sub-background transition-colors hover:bg-gray-900 xs:p-2 xs:text-sm xs:underline xs:decoration-sub-background xs:decoration-solid xs:decoration-1 xs:underline-offset-8 xl:p-4"
      >
        {title}
      </button>
      {isOpen && (
        <LinksContextMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          links={links}
        />
      )}
    </div>
  );
};

export default LinksContextMenuButton;

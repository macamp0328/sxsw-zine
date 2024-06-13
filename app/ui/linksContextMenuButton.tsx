'use client';

import { useState } from 'react';

import LinksContextMenu from './linksContextMenu';

interface LinksContextMenuButtonProps {
  title: string;
  links: { url: string; platform: string }[];
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
        className="bg-main-text p-1 text-xs text-sub-background transition-colors hover:bg-gray-900 xs:p-2 xs:text-sm xs:underline xs:decoration-sub-background xs:decoration-solid xs:decoration-1 xs:underline-offset-8 xl:p-4"
      >
        {title}
      </button>
      {isOpen && (
        <LinksContextMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          links={links}
          isLeftButton={title === 'Socials'}
        />
      )}
    </div>
  );
};

export default LinksContextMenuButton;

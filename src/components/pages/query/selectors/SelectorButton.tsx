import React from 'react';
import { Button } from '../../../common/Buttons';

interface SelectorButton {
  onClick?: () => void;
}

const SelectorButton: React.FC<SelectorButton> = ({ onClick, children }) => (
  <Button className="mb-1 text-left text-lg" onClick={onClick}>
    {children}
  </Button>
);

export default SelectorButton;

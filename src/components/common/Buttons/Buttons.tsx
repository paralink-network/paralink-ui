import React from 'react';

const BLUE_COLOR = 'blue';
const GREEN_COLOR = 'green';
const GRAY_COLOR = 'gray';
const RED_COLOR = 'red';

type Color = typeof BLUE_COLOR | typeof GREEN_COLOR | typeof GRAY_COLOR | typeof RED_COLOR;

interface Button {
  onClick?: () => void;
  color?: Color;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<Button> = ({ children, onClick, color = GRAY_COLOR, className = '', disabled = false }) => (
  <button
    type="button"
    disabled={disabled}
    className={`focus:outline-none text-${color}-600 text-sm py-1.5 px-3 rounded-md border border-${color}-600 hover:bg-${color}-50 ${className} disabled:opacity-50`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;

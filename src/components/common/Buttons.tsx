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
}

export const Button: React.FC<Button> = ({ children, onClick, color = GRAY_COLOR, className = '' }) => (
  <button
    type="button"
    className={`focus:outline-none text-${color}-600 text-sm py-1.5 px-3 rounded-md border border-${color}-600 hover:bg-${color}-50 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface TooltipButton extends Button {
  tooltip: string;
}

export const TooltipButton: React.FC<TooltipButton> = (props) => (
  <div className="has-tooltip inline-flex">
    <Button {...props} />
    <span className="tooltip rounded shadow-lg p-1 bg-gray-600 text-white mt-10 ml-1 px-auto py-1">
      {props.tooltip}
    </span>
  </div>
);

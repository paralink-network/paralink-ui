import React from "react"

interface CardProps {
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({children, onClick}) => (
  <div className="bg-white px-4 py-5 border border-gray-200 sm:px-6" onClick={onClick}>
    {children}
  </div>
);

export const HoverCard: React.FC<CardProps> = ({children, onClick}) => (
  <div className="bg-white px-4 py-5 border border-gray-200 sm:px-6 hover:bg-blue-600 hover:text-gray-200 cursor-pointer" onClick={onClick}>
    {children}
  </div>
);
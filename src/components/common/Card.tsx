import React from "react"

interface CardProps {

}

export const Card: React.FC<CardProps> = ({children}) => (
  <div className="bg-white px-4 py-5 border border-gray-200 sm:px-6">
    {children}
  </div>
);

export const HoverCard: React.FC<CardProps> = ({children}) => (
  <div className="bg-white px-4 py-5 border border-gray-200 sm:px-6 hover:bg-green-500 cursor-pointer">
    {children}
  </div>
);
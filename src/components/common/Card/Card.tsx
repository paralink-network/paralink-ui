import React from 'react';

const Card: React.FC<{ className?: string }> = ({ className = '', children }) => {
  return <div className={`inline-block bg-light shadow-lg overflow-hidden sm:rounded-lg ${className}`}>{children}</div>;
};

export default Card;

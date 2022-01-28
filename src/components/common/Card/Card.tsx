import React from 'react';

const Card: React.FC<{}> = ({ children }) => {
  return <div className="inline-block bg-light shadow-lg overflow-hidden sm:rounded-lg">{children}</div>;
};

export default Card;

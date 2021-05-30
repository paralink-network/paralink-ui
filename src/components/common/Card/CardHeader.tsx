import React from 'react';

const CardHeader: React.FC<{}> = ({ children }) => {
  return <div className="mx-4 px-4 py-3 text-left text-2xl border-b border-gray-200">{children}</div>;
};

export default CardHeader;

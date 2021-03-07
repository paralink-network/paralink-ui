import React from 'react';

const TableBody: React.FC<{ className?: string }> = ({ className = '', children }): JSX.Element => {
  return <tbody className={`bg-white divide-y divide-gray-200 ${className}`}>{children}</tbody>;
};

export default TableBody;

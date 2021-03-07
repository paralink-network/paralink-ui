import React from 'react';

const TableCell: React.FC<{ className?: string }> = ({ className = '', children }): JSX.Element => {
  return <td className={`px-6 py-4 whitespace-nowrap ${className}`}>{children}</td>;
};

export default TableCell;

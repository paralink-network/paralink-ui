import React from 'react';

const TableHeaderCell: React.FC<{ className?: string }> = ({ className = '', children }): JSX.Element => {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
};

export default TableHeaderCell;

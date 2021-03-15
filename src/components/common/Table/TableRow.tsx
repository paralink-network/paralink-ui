import React from 'react';

const TableRow: React.FC<{ className?: string }> = ({ className = '', children }): JSX.Element => {
  return <tr className={className}>{children}</tr>;
};

export default TableRow;

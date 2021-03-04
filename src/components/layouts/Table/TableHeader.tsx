import React from 'react';

const TableHeader: React.FC<{ className?: string }> = ({ className = '', children }): JSX.Element => {
  return <thead className={`bg-gray-50 ${className}`}>{children}</thead>;
};

export default TableHeader;

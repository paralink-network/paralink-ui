import React from 'react';

const Table: React.FC<{ className?: string }> = ({ className = '', children }): JSX.Element => {
  return <table className={`min-w-full divide-y divide-gray-200 ${className}`}>{children}</table>;
};

export default Table;

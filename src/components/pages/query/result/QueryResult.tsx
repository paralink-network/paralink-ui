import React from 'react'

interface QueryResult {
  result: string;
}

const QueryResult = ({ result }: QueryResult): JSX.Element => {

  return (
    <div className='col-span-3 p-3 shadow-sm flex-auto'>
      Results
    </div>
  );
};

export default QueryResult;
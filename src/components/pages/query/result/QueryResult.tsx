import React from 'react';

interface QueryResult {
  result: string;
}

const QueryResult = ({ result }: QueryResult): JSX.Element => (
  <div className="col-span-3 p-3 shadow-sm flex-auto">{result}</div>
);

export default QueryResult;

import React from 'react';

interface QueryResult {
  result: string;
}

const QueryResult = ({ result }: QueryResult): JSX.Element => (
  <div className="container mt-5 text-center">{result}</div>
);

export default QueryResult;

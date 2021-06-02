import React from 'react';
import Loading from '../../../common/sub-pages/Loading';

interface QueryResult {
  result: string;
  error: boolean;
  isLoading: boolean;
}

const QueryResult = ({ error, isLoading, result }: QueryResult): JSX.Element => {
  
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className={`container mt-5 text-center overflow-auto ${error ? "text-red-700" : ""}`}>{result}</div>
  );
};

export default QueryResult;

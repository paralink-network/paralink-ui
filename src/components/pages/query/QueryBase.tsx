import React from 'react';
import Editor from '../../common/Editor';
import QueryResult from './result/QueryResult';

interface QueryBase {
  pql: string;
  error: boolean;
  result: string;
  isLoading: boolean;
  showResult: boolean;
  setPql: (pql: string) => void;
}

const QueryBase = ({ pql, result, showResult, isLoading, error, setPql }: QueryBase): JSX.Element => (
  <div className="col-span-3 pb-5 shadow-sm flex-auto">
    {showResult 
      ? <QueryResult result={result} isLoading={isLoading} error={error} /> 
      : <Editor code={pql} onChange={setPql} />
    }
  </div>
);

export default QueryBase;

import React from 'react';
import { Pql } from '../../../state/pql/pql';
import Editor from '../../common/Editor';
import QueryResult from './result/QueryResult';

interface QueryBase {
  pql: string;
  result: string;
  showResult: boolean;
  setPql: (pql: string) => void;
}

const QueryBase = ({ pql, result, showResult, setPql }: QueryBase): JSX.Element => (
  <div className="col-span-3 pb-5 shadow-sm flex-auto">
    {showResult ? <QueryResult result={result} /> : <Editor code={pql} onChange={setPql} />}
  </div>
);

export default QueryBase;

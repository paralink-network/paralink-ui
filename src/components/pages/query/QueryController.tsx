import React from 'react';
import { Pql } from '../../../pql/pql';
import QueryBuilder from './builder/QueryBuilder';
import QueryHeader from './QueryHeader';
import QueryResult from './result/QueryResult';

interface QueryController {
  pql: Pql
}

const QueryController = ({ pql }: QueryController): JSX.Element => {

  return (
    <div className='grid grid-cols-4 gap-0 h-full'>
      <div className="col-span-3 flex flex-col">
        <QueryHeader />
        <QueryResult result="" />
      </div>
      <QueryBuilder pql={pql}/> 
    </div>
  )
}

export default QueryController;
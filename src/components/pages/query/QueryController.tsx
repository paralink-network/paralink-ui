import React from 'react';
import { QueryData } from './builder/builder';
import QueryBuilder from './QueryBuilder';
import QueryHeader from './QueryHeader';
import QueryResult from './result/QueryResult';

interface QueryController {
  queryData: QueryData;
}

const QueryController = ({ queryData }: QueryController): JSX.Element => {

  return (
    <div className='grid grid-cols-4 gap-0 h-full'>
      <div className="col-span-3 flex flex-col">
        <QueryHeader />
        <QueryResult result="" />
      </div>
      <QueryBuilder queryData={queryData}/> 
    </div>
  )
}

export default QueryController;
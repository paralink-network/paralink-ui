import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadIPFSWithHash } from '../../../api/pql';
import { emptyPql, Pql } from '../../../pql/pql';
import ErrorContainer from '../../common/sub-pages/ErrorContainer';
import Loading from '../../common/sub-pages/Loading';
import { convertPql, emptyQueryData } from './builder/builder';
import QueryController from './QueryController';

interface UrlParams {
  hash: string;
}

const QueryLoader = (): JSX.Element => {
  const { hash } = useParams<UrlParams>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [queryData, setQueryData] = useState({ ...emptyQueryData });

  useEffect(() => {
    Promise.resolve()
      .then(() => setIsLoading(true))
      .then(() => loadIPFSWithHash(hash))
      .then((res) => convertPql(res.pql))
      .then(setQueryData)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [hash]);

  if (isLoading) 
    return <Loading />
  
  if (error.length > 0)
    return <ErrorContainer message={error} hash={hash} />

  return <QueryController queryData={queryData} />
}

export default QueryLoader;
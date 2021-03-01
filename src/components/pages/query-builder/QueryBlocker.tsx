import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadIPFSWithHash } from '../../../api/pql';
import { emptyPql, Pql } from '../../../pql/pql';
import ErrorContainer from '../../common/loading/error/ErrorContainer';
import Loading from '../../common/loading/Loading';
import QueryBuilder from './QueryBuilder';

interface UrlParams {
  hash: string;
}

const QueryBlocker = (): JSX.Element => {
  const { hash } = useParams<UrlParams>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [pql, setPql] = useState<Pql>({ ...emptyPql });

  useEffect(() => {
    Promise.resolve()
      .then(() => setIsLoading(true))
      .then(() => loadIPFSWithHash(hash))
      .then((res) => setPql(res.pql))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [hash]);

  if (isLoading) 
    return <Loading />
  
  if (error.length > 0)
    return <ErrorContainer message={error} hash={hash} />

  return <QueryBuilder pql={{ ...pql }} />
}

export default QueryBlocker;
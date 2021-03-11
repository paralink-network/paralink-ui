import {
  EthereumBalancePqlLoader,
  EthereumFunctionPqlLoader,
  HttpGetPqlLoader,
  HttpPostPqlLoader,
  LoaderMethods,
  PqlLoader,
  SqlPqlLoader,
} from '../../../../state/pql/loaders';
import {
  GetIndexPqlOperator,
  MathPqlOperator,
  OperatorStep,
  PqlOperator,
  TraversePqlOperator,
  QuerySqlPqlOperator,
} from '../../../../state/pql/operators';
import { Operator, Pql, SourceOperation } from '../../../../state/pql/pql';
import GetIndexOperator from './operators/GetIndexOperator';
import HttpGetOperator from './loaders/HttpGetLoader';
import TraverseOperator from './operators/TraverseOperator';
import MathOperator from './operators/MathOperator';
import QuerySqlOperator from './operators/QuerySqlOperator';
import HttpPostLoader from './loaders/HttpPostLoader';
import EthereumBalanceLoader from './loaders/EthereumBalanceLoader';
import EthereumFunctionLoader from './loaders/EthereumFunctionLoader';
import PostgresLoader from './loaders/PostgresLoader';
import { createNewOperator, createNewSource, emptyQueryData, QueryData } from '../../../../state/query-builder';
import AggregatorOperator from './operators/AggregateOperator';
import { AggregationMethods } from '../../../../state/pql/aggregators';

const createMathOperator = (operation: MathPqlOperator): MathOperator =>
  new MathOperator(operation.method, operation.params, operation.direction);

const createQuerySqlOperator = ({ method, query, result }: QuerySqlPqlOperator): QuerySqlOperator =>
  new QuerySqlOperator(method, query, result);

const createHttpPostOperator = ({ uri, params }: HttpPostPqlLoader): HttpPostLoader => new HttpPostLoader(uri, params);
const createPostgressOperator = ({ uri, query }: SqlPqlLoader): PostgresLoader => new PostgresLoader(uri, query);

const createEthereumBalanceOperator = ({ address, chain, params }: EthereumBalancePqlLoader): EthereumBalanceLoader =>
  new EthereumBalanceLoader(
    address,
    chain,
    params.block === 'latest' ? undefined : params.block,
    params.num_confirmations,
  );

const createEthereumFunctionOperator = ({
  address,
  chain,
  params,
}: EthereumFunctionPqlLoader): EthereumFunctionLoader =>
  new EthereumFunctionLoader(
    address,
    chain,
    params.function,
    params.args,
    params.block === 'latest' ? undefined : params.block,
    params.num_confirmations,
  );

const convertPqlOperationToOperator = (operation: PqlOperator): Operator => {
  console.log('Operation: ', operation);
  switch (operation.step) {
    case OperatorStep.Traverse:
      return new TraverseOperator((<TraversePqlOperator>operation).params);
    case OperatorStep.GetIndex:
      return new GetIndexOperator((<GetIndexPqlOperator>operation).params);
    case OperatorStep.Math:
      return createMathOperator(<MathPqlOperator>operation);
    case OperatorStep.QuerySql:
      return createQuerySqlOperator(<QuerySqlPqlOperator>operation);
    default:
      throw new Error('Operator is not implemented!');
  }
};

const convertPqlLoaderToOperator = (loaderOperation: PqlLoader): Operator => {
  console.log('Loader: ', loaderOperation);
  switch (loaderOperation.method) {
    case LoaderMethods.Get:
      return new HttpGetOperator((<HttpGetPqlLoader>loaderOperation).uri);
    case LoaderMethods.Post:
      return createHttpPostOperator(<HttpPostPqlLoader>loaderOperation);
    case LoaderMethods.Postgres:
      return createPostgressOperator(<SqlPqlLoader>loaderOperation);
    case LoaderMethods.EthBalance:
      return createEthereumBalanceOperator(<EthereumBalancePqlLoader>loaderOperation);
    case LoaderMethods.EthFunction:
      return createEthereumFunctionOperator(<EthereumFunctionPqlLoader>loaderOperation);

    default:
      throw new Error('Loader operator is not implemented!');
  }
};

const convertPqlSourceOperationToOperator = (operation: SourceOperation): Operator =>
  operation.step === 'extract'
    ? convertPqlLoaderToOperator(<PqlLoader>operation)
    : convertPqlOperationToOperator(<PqlOperator>operation);

export const convertPql = (pql: Pql): QueryData => {
  let queryData = { ...emptyQueryData };
  let sourceId = '';

  for (let pipelineIndex = 0; pipelineIndex < pql.sources.length; pipelineIndex += 1) {
    const source = pql.sources[pipelineIndex];
    [queryData, sourceId] = createNewSource(queryData, source.name);

    for (let operationIndex = 0; operationIndex < source.pipeline.length; operationIndex += 1) {
      const operator = convertPqlSourceOperationToOperator(source.pipeline[operationIndex]);
      [queryData] = createNewOperator(queryData, sourceId, operator);
    }
  }
  if (pql.aggregate) {
    queryData.aggregate =
      pql.aggregate.method === AggregationMethods.Query
        ? new AggregatorOperator(pql.aggregate.method, pql.aggregate.query, pql.aggregate.params)
        : new AggregatorOperator(pql.aggregate.method);
  }

  return queryData;
};

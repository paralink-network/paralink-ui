import { EthereumBalancePqlLoader, EthereumFunctionPqlLoader, HttpGetPqlLoader, HttpPostPqlLoader, LoaderMethods, PqlLoader, SqlPqlLoader } from "../../../../pql/loaders";
import { GetIndexPqlOperator, MathPqlOperator, OperatorStep, PqlOperator, TraversePqlOperator, QuerySqlPqlOperator } from "../../../../pql/operators";
import { Operator, Pql, SourceOperation } from "../../../../pql/pql";
import GetIndexOperator from "./operators/GetIndexOperator";
import HttpGetOperator from "./loaders/HttpGetLoader";
import TraverseOperator from "./operators/TraverseOperator";
import MathOperator from "./operators/MathOperator";
import QuerySqlOperator from "./operators/QuerySqlOperator";
import HttpPostLoader from "./loaders/HttpPostLoader";
import EthereumBalanceLoader from "./loaders/EthereumBalanceLoader";
import EthereumFunctionLoader from "./loaders/EthereumFunctionLoader";
import PostgresLoader from "./loaders/PostgresLoader";

export interface ExtendedOperator {
  id: string;
  operator: Operator;
}

export interface ExtendedSource {
  id: string;
  title: string;
  operators: string[];
}

export interface QueryData {
  operators: {[key: string]: ExtendedOperator};
  sources: {[key: string]: ExtendedSource};
  sourceOrder: string[];
}

const createMathOperator = (operation: MathPqlOperator): MathOperator => 
  new MathOperator(operation.method, operation.params, operation.direction);

const createQuerySqlOperator = ({method, query, result}: QuerySqlPqlOperator): QuerySqlOperator => 
  new QuerySqlOperator(method, query, result);

  const createHttpPostOperator = ({ uri, params }: HttpPostPqlLoader): HttpPostLoader => 
  new HttpPostLoader(uri, params);

const createPostgressOperator = ({ uri, query }: SqlPqlLoader): PostgresLoader => 
  new PostgresLoader(uri, query)

const createEthereumBalanceOperator = ({ address, chain, params }: EthereumBalancePqlLoader): EthereumBalanceLoader => 
  new EthereumBalanceLoader(address, chain, params.block, params.num_confirmations);

const createEthereumFunctionOperator = ({ address, chain, params }: EthereumFunctionPqlLoader): EthereumFunctionLoader =>
  new EthereumFunctionLoader(address, chain, params.block, params.num_confirmations);
  
const convertPqlOperationToOperator = (operation: PqlOperator): Operator => {
  console.log('Operation: ', operation);
  switch(operation.step) {
    case OperatorStep.Traverse: return new TraverseOperator((<TraversePqlOperator>operation).params);
    case OperatorStep.GetIndex: return new GetIndexOperator((<GetIndexPqlOperator>operation).params);
    case OperatorStep.Math: return createMathOperator((<MathPqlOperator> operation));
    case OperatorStep.QuerySql: return createQuerySqlOperator((<QuerySqlPqlOperator> operation));
    default: 
      throw new Error('Operator is not implemented!')
  }
}

const convertPqlLoaderToOperator = (loaderOperation: PqlLoader): Operator => {
  console.log('Loader: ', loaderOperation);
  switch(loaderOperation.method) {
    case LoaderMethods.Get: return new HttpGetOperator((<HttpGetPqlLoader>loaderOperation).uri);
    case LoaderMethods.Post: return createHttpPostOperator((<HttpPostPqlLoader> loaderOperation));
    case LoaderMethods.Postgres: return createPostgressOperator((<SqlPqlLoader> loaderOperation));
    case LoaderMethods.EthBalance: return createEthereumBalanceOperator((<EthereumBalancePqlLoader> loaderOperation));
    case LoaderMethods.EthFunction: return createEthereumFunctionOperator((<EthereumFunctionPqlLoader> loaderOperation));
  
    default: 
      throw new Error('Loader operator is not implemented!')
  }
}

const convertPqlSourceOperationToOperator = (operation: SourceOperation): Operator => 
  operation.step == 'extract' ? 
    convertPqlLoaderToOperator(<PqlLoader> operation) : 
    convertPqlOperationToOperator(<PqlOperator> operation);

export const convertPql = (pql: Pql): QueryData => {
  var operationIndex = 0;
  var operators: {[key: string]: ExtendedOperator} = {};
  var sources: {[key: string]: ExtendedSource} = {};
  var sourceOrder: string[] = [];

  for (var pipelineIndex = 0; pipelineIndex < pql.sources.length; pipelineIndex ++) {
    const source = pql.sources[pipelineIndex];
    const sourceId = `source-${pipelineIndex}`;
    var sourceOperators: string[] = [];

    for (var index = 0; index < source.pipeline.length; index ++) {
      const operation = source.pipeline[index];
      const operationId = `operation-${operationIndex}`;

      operators[operationId] = {
        id: operationId,
        operator: convertPqlSourceOperationToOperator(operation)
      };
      sourceOperators.push(operationId);
      operationIndex ++;
    }

    sources[sourceId] = {
      id: sourceId,
      title: source.name,
      operators: sourceOperators
    };
    sourceOrder.push(sourceId);
  }

  return { operators, sources, sourceOrder };
}

export const emptyQueryData: QueryData = {
  operators: {},
  sources: {},
  sourceOrder: [],
}


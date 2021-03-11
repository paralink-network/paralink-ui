import AggregatorOperator from '../components/pages/query/builder/operators/AggregateOperator';
import { AggregationMethods, AGGREGATOR_CONFIG } from './pql/aggregators';
import { Operator, OperatorKind, OutsideOperator } from './pql/pql';

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
  operators: { [key: string]: ExtendedOperator };
  sources: { [key: string]: ExtendedSource };
  sourceOrder: string[];

  sourceIndex: number;
  operatorIndex: number;

  aggregate?: OutsideOperator;
}

const removeSource = (data: QueryData, sourceId: string): QueryData => {
  const sources = { ...data.sources };
  delete sources[sourceId];
  return { ...data, sources, sourceOrder: data.sourceOrder.filter((item) => item !== sourceId) };
};

const removeOperator = (data: QueryData, sourceId: string, operatorId: string): QueryData => {
  const source = { ...data.sources[sourceId] };
  return {
    ...data,
    sources: {
      ...data.sources,
      [sourceId]: { ...source, operators: [...source.operators].filter((operator) => operator !== operatorId) },
    },
  };
};

export const onOperatorRemoveAction = (
  data: QueryData,
  sourceId: string,
  operatorId: string,
): QueryData => // removeOperator(data, sourceId, operatorId);
  data.operators[operatorId].operator.kind === OperatorKind.Loader
    ? removeSource(data, sourceId)
    : removeOperator(data, sourceId, operatorId);

export const createNewOperator = (data: QueryData, sourceId: string, operator: Operator): [QueryData, string] => {
  const id = `operator-${data.operatorIndex}`;
  const source = data.sources[sourceId];

  return [
    {
      ...data,
      operators: {
        ...data.operators,
        [id]: {
          id,
          operator,
        },
      },
      sources: { ...data.sources, [sourceId]: { ...source, operators: [...source.operators, id] } },
      operatorIndex: data.operatorIndex + 1,
    },
    id,
  ];
};

export const createNewSource = (data: QueryData, title = ''): [QueryData, string] => {
  const id = `source-${data.sourceIndex}`;
  return [
    {
      ...data,
      sources: {
        ...data.sources,
        [id]: {
          id,
          title: title !== '' ? title : `Source-${data.sourceIndex + 1}`,
          operators: [],
        },
      },
      sourceOrder: [...data.sourceOrder, id],
      sourceIndex: data.sourceIndex + 1,
    },
    id,
  ];
};

export const createNewLoader = (data: QueryData, operator: Operator, title = ''): [QueryData, string] => {
  const [sourceData, sourceId] = createNewSource(data, title);
  return createNewOperator(sourceData, sourceId, operator);
};

export const createNewAggregator = (data: QueryData): [QueryData, string] => {
  return [{ ...data, aggregate: new AggregatorOperator(AggregationMethods.Max) }, AGGREGATOR_CONFIG];
};

export const emptyQueryData: QueryData = {
  operators: {},
  sources: {},
  sourceOrder: [],

  sourceIndex: 0,
  operatorIndex: 0,
};

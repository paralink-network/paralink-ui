export const AGGREGATOR_CONFIG = 'aggregate';

export enum AggregationMethods {
  Max = 'max',
  Min = 'min',
  Mean = 'mean',
  Median = 'median',
  Query = 'query.sql',
}

export enum AggregationQueryParams {
  Json = 'json',
  List = 'list',
  None = 'None',
}

type AggregationBaseMethods =
  | AggregationMethods.Max
  | AggregationMethods.Min
  | AggregationMethods.Mean
  | AggregationMethods.Median;

interface AggregationBasePql {
  method: AggregationBaseMethods;
}

interface AggregationQueryPql {
  params: AggregationQueryParams;
  query: string;
  result: boolean;
  method: AggregationMethods.Query;
}

export type PqlAggregation = AggregationBasePql | AggregationQueryPql;

export const aggregatePql = (method: AggregationBaseMethods): AggregationBasePql => ({
  method,
});

export const aggregateQueryPql = (query: string, params: AggregationQueryParams): AggregationQueryPql => ({
  query,
  params,
  result: true,
  method: AggregationMethods.Query,
});

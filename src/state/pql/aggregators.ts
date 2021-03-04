export const AGGREGATION_METHOD_MAX = 'max';
export const AGGREGATION_METHOD_MIN = 'min';
export const AGGREGATION_METHOD_MEAN = 'mean';
export const AGGREGATION_METHOD_MEDIAN = 'median';
export const AGGREGATION_METHOD_QUERY_SQL = 'query.sql';

export const AGGREGATION_PARAMS_JSON = 'json';
export const AGGREGATION_PARAMS_LIST = 'list';
export const AGGREGATION_PARAMS_NONE = 'None';

type AggregationParams =
  | typeof AGGREGATION_PARAMS_JSON
  | typeof AGGREGATION_PARAMS_LIST
  | typeof AGGREGATION_PARAMS_NONE;

type AggregationBaseMethods =
  | typeof AGGREGATION_METHOD_MAX
  | typeof AGGREGATION_METHOD_MIN
  | typeof AGGREGATION_METHOD_MEAN
  | typeof AGGREGATION_METHOD_MEDIAN;

type AggregationQueryMethods = typeof AGGREGATION_METHOD_QUERY_SQL;

interface AggregationBasePql {
  method: AggregationBaseMethods;
}

interface AggregationQueryPql {
  params: AggregationParams;
  query: string;
  result: boolean;
  method: AggregationQueryMethods;
}

export type PqlAggregation = AggregationBasePql | AggregationQueryPql;

export const aggregatePql = (method: AggregationBaseMethods): AggregationBasePql => ({
  method,
});

export const aggregateQueryPql = (query: string, params: AggregationParams): AggregationQueryPql => ({
  query,
  params,
  result: true,
  method: AGGREGATION_METHOD_QUERY_SQL,
});

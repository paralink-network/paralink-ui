import { Pql } from '../../../../state/pql/pql';
import { QueryData } from '../../../../state/query-builder';

export const compile = (name: string, pqlVersion: string, data: QueryData): Pql => ({
  name,
  psql_version: pqlVersion,
  sources: data.sourceOrder.map((sourceId) => ({
    name: data.sources[sourceId].title,
    pipeline: data.sources[sourceId].operators.map((operatorId) => data.operators[operatorId].operator.build()),
  })),
  aggregate: data.aggregate ? data.aggregate.build() : undefined,
});

export const partialCompile = (
  name: string,
  pqlVersion: string,
  data: QueryData,
  endSourceId: string,
  endOperatorId: string,
): Pql => {
  const endSourceIndex = data.sourceOrder.findIndex((source) => source === endSourceId);

  const sources = data.sourceOrder
    .filter((item, index) => index <= endSourceIndex)
    .map((sourceId) => {
      const source = data.sources[sourceId];
      let endOperatorIndex = source.operators.findIndex((operator) => operator === endOperatorId);

      // If the end operator is not in the current source, find index will return -1,
      // therefore, we need to update it to the full length of operators
      // because of the next filter method
      if (endOperatorIndex === -1) endOperatorIndex = source.operators.length;

      const operations = source.operators
        .filter((operator, index) => index <= endOperatorIndex)
        .map((operator) => data.operators[operator].operator.build());

      return {
        name: source.title,
        pipeline: operations,
      };
    });

  return {
    name,
    sources,
    psql_version: pqlVersion,
  };
};

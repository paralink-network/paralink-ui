import { Pql } from "../../../../state/pql/pql";
import { QueryData } from "../../../../state/query-builder";

export const compile = (name: string, pqlVersion: string, data: QueryData): Pql => ({
  name,
  psql_version: pqlVersion,
  sources: data.sourceOrder
    .map((sourceId) => ({
      name: data.sources[sourceId].title,
      pipeline: data.sources[sourceId].operators
        .map((operatorId) => 
          data.operators[operatorId].operator.build())
    })),
    aggregate: data.aggregate ? data.aggregate.build() : undefined,
});
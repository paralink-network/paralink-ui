export interface SourceItem {
  step: string;
  method: string;
  url: string;
}

export interface Source {
  name: string;
  pipeline: SourceItem[];
}

export interface Aggregate {
  method: string;
}

export interface PQL {
  name: string;
  psql_version: string; // TODO changed from snake cased to camel cased!
  sources: Source[];
  aggregate?: Aggregate;
}

export const emptyPql: PQL = {
  name: '',
  psql_version: '0.1',
  sources: [],
};

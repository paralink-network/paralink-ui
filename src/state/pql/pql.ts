import { EOPNOTSUPP } from 'constants';
import { PqlAggregation } from './aggregators';
import { PqlLoader } from './loaders';
import { PqlOperator } from './operators';

export type SourceOperation = PqlLoader | PqlOperator;

export interface Source {
  name: string;
  pipeline: SourceOperation[];
}

export interface Pql {
  name: string;
  psql_version: string; // TODO suggestion: changed from snake cased to camel cased!
  sources: Source[];
  aggregate?: PqlAggregation;
}

export const emptyPql: Pql = {
  name: '',
  psql_version: '0.1',
  sources: [],
};

// type EmptyRefreshCallBack = (fun: () => void) => () => void;
// type ValueRefreshCallBack = <T>(fun: (value: T) => void) => (value: T) => void;
export type RefreshCallback = <T>(fun: (value: T) => void) => (value: T) => void;

export enum OperatorKind {
  Loader,
  Operation,
}

interface BaseOperator {
  title: string;
  kind: OperatorKind;
  renderConfig: (refreshCallback: RefreshCallback) => JSX.Element;
}

export interface Operator extends BaseOperator {
  build: () => SourceOperation;
}

export interface OutsideOperator extends BaseOperator {
  build: () => PqlAggregation;
}

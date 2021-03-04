export const MATH_DIRECTION = 'reverse';
export type MathDirection = typeof MATH_DIRECTION;

export enum MathMethod {
  Add = 'add',
  Mul = 'mul',
  Sub = 'sub',
  Div = 'div',
}

export enum SqlMethod {
  Json = 'json',
  List = 'list',
  Dict = 'dict',
  None = 'None',
}

export enum OperatorStep {
  Math = 'math',
  Traverse = 'traverse',
  GetIndex = 'get_index',
  QuerySql = 'query.sql',
}

interface DefaultPqlOperator {
  step: OperatorStep;
}

export interface TraversePqlOperator extends DefaultPqlOperator {
  method: string;
  params: string[];
}

export interface GetIndexPqlOperator extends DefaultPqlOperator {
  params: number;
}

export interface MathPqlOperator extends DefaultPqlOperator {
  method: MathMethod;
  params: number;
  direction?: MathDirection;
}

export interface QuerySqlPqlOperator extends DefaultPqlOperator {
  method: SqlMethod;
  query: string;
  result: boolean;
}

// interface CustomStepPqlOperator extends GetIndexPqlOperator { }

export type PqlOperator = TraversePqlOperator | GetIndexPqlOperator | MathPqlOperator | QuerySqlPqlOperator;
// | CustomStepPqlOperator;

export const MATH_METHOD_ADD = 'add';
export const MATH_METHOD_MUL = 'mul';
export const MATH_METHOD_SUB = 'sub';
export const MATH_METHOD_DIV = 'div';

export const MATH_DIRECTION = 'reverse';

export const SQL_METHOD_JSON = 'json';
export const SQL_METHOD_LIST = 'list';
export const SQL_METHOD_DICT = 'dict';
export const SQL_METHOD_NONE = 'None';

type MathMethod = typeof MATH_METHOD_ADD | typeof MATH_METHOD_MUL | typeof MATH_METHOD_SUB | typeof MATH_METHOD_DIV;

type MathDirection = typeof MATH_DIRECTION;

type SqlMethod = typeof SQL_METHOD_JSON | typeof SQL_METHOD_LIST | typeof SQL_METHOD_DICT | typeof SQL_METHOD_NONE;

interface DefaultPqlOperator {
  step: string;
}

interface TraversePqlOperator extends DefaultPqlOperator {
  method: string;
  params: string[];
}

interface GetIndexPqlOperator extends DefaultPqlOperator {
  params: number;
}

interface MathPqlOperator extends DefaultPqlOperator {
  method: MathMethod;
  params: number;
  direction?: MathDirection;
}

interface QuerySqlPqlOperator extends DefaultPqlOperator {
  method: SqlMethod;
  query: string;
  result: boolean;
}

// interface CustomStepPqlOperator extends GetIndexPqlOperator { }

export type PqlOperator = TraversePqlOperator | GetIndexPqlOperator | MathPqlOperator | QuerySqlPqlOperator;
// | CustomStepPqlOperator;

export const traversePqlOperator = (params: string[]): TraversePqlOperator => ({
  params,
  method: 'json',
  step: 'traverse',
});

export const GetIndexPqlOperator = (params: number): GetIndexPqlOperator => ({
  params,
  step: 'get_index',
});

export const mathOperator = (method: MathMethod, params: number, direction?: MathDirection): MathPqlOperator => ({
  direction,
  method,
  params,
  step: 'math',
});

export const QuerySqlPqlOperator = (method: SqlMethod, query: string, result: boolean): QuerySqlPqlOperator => ({
  method,
  query,
  result,
  step: 'query.sql',
});

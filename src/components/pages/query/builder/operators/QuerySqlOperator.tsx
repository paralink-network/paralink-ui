import React from 'react';
import { Input, Label } from '../../../../common/Inputs';
import { OperatorStep, QuerySqlPqlOperator, SqlMethod } from '../../../../../state/pql/operators';
import { Operator } from '../../../../../state/pql/pql';

export default class QuerySqlOperator implements Operator {
  title = 'SQL query';

  private method: SqlMethod = SqlMethod.None;

  private query = '';

  private result = true;

  constructor(method: SqlMethod, query: string, result: boolean) {
    this.method = method;
    this.query = query;
    this.result = result;
  }

  build(): QuerySqlPqlOperator {
    return {
      method: this.method,
      query: this.query,
      result: this.result,
      step: OperatorStep.QuerySql,
    };
  }

  renderConfig(): JSX.Element {
    return (
      <>
        <div>
          <Label name="Select SQL method:" />
          <select>
            <option>List</option>
            <option>Dictionary</option>
            <option>Json</option>
            <option>None</option>
          </select>
        </div>
        <div>
          <Label name="Query:" />
          <textarea value={this.query} onChange={() => {}} />
        </div>
        <div>
          <Label name="Show result:" />
          <Input type="checkbox" value={this.result} onChange={() => {}} />
        </div>
      </>
    );
  }
}

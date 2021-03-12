import React from 'react';
import { Checkbox, Input, Label, Option, Select, Textarea } from '../../../../common/Inputs';
import { OperatorStep, QuerySqlPqlOperator, SqlMethod } from '../../../../../state/pql/operators';
import { Operator, OperatorKind, RefreshCallback } from '../../../../../state/pql/pql';

export default class QuerySqlOperator implements Operator {
  title = 'SQL query';

  kind = OperatorKind.Operation;

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

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const onQueryChange = (query: string): void => {
      this.query = query;
    };
    const onMethodChange = (method: string): void => {
      this.method = method as SqlMethod;
    };
    const onResultChange = (): void => {
      this.result = !this.result;
    };

    return (
      <>
        <div className="flex flex-col">
          <Label name="Select SQL method:" />
          <Select value={this.method} onChange={refresh(onMethodChange)}>
            <Option value={SqlMethod.None}>None</Option>
            <Option value={SqlMethod.List}>List</Option>
            <Option value={SqlMethod.Dict}>Dictionary</Option>
            <Option value={SqlMethod.Json}>Json</Option>
          </Select>
        </div>
        <div className="mt-3 flex flex-col">
          <Label name="Query:" />
          <Textarea value={this.query} onChange={refresh(onQueryChange)} />
        </div>
        <div className="mt-3">
          <Label name="Show result:" />
          <Checkbox value={this.result} onChange={() => refresh(onResultChange)(undefined)} />
        </div>
      </>
    );
  }
}

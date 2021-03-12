import React from 'react';
import { Label, Option, Select, Textarea } from '../../../../common/Inputs';
import { OperatorKind, OutsideOperator, RefreshCallback } from '../../../../../state/pql/pql';
import { AggregationMethods, AggregationQueryParams, PqlAggregation } from '../../../../../state/pql/aggregators';

export default class AggregatorOperator implements OutsideOperator {
  title = 'Aggregate';

  kind = OperatorKind.Operation;

  method: AggregationMethods = AggregationMethods.Max;

  param: AggregationQueryParams = AggregationQueryParams.None;

  query = '';

  constructor(method: AggregationMethods, query = '', param = AggregationQueryParams.None) {
    this.param = param;
    this.query = query;
    this.method = method;
  }

  build(): PqlAggregation {
    if (this.method === AggregationMethods.Query)
      return {
        result: true,
        params: this.param,
        query: this.query,
        method: AggregationMethods.Query,
      };
    return {
      method: this.method,
    };
  }

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const onQueryChange = (value: string): void => {
      this.query = value;
    };
    const onMethodChange = (value: string): void => {
      this.method = value as AggregationMethods;
    };
    const onParamChange = (value: string): void => {
      this.param = value as AggregationQueryParams;
    };

    return (
      <>
        <div className="mt-3 flex flex-col">
          <Label name="Method:" />
          <Select value={this.method} onChange={refresh(onMethodChange)}>
            <Option value={AggregationMethods.Max}>Max</Option>
            <Option value={AggregationMethods.Min}>Min</Option>
            <Option value={AggregationMethods.Mean}>Mean</Option>
            <Option value={AggregationMethods.Median}>Median</Option>
            <Option value={AggregationMethods.Query}>SQL query</Option>
          </Select>
        </div>
        {this.method === AggregationMethods.Query && (
          <div className="mt-3 flex flex-col">
            <Label name="Parameter:" />
            <Select value={this.param} onChange={refresh(onParamChange)}>
              <Option value={AggregationQueryParams.None}>None</Option>
              <Option value={AggregationQueryParams.List}>List</Option>
              <Option value={AggregationQueryParams.Json}>Json</Option>
            </Select>
          </div>
        )}
        {this.method === AggregationMethods.Query && (
          <div className="mt-3 flex flex-col">
            <Label name="Query:" />
            <Textarea value={this.query} onChange={refresh(onQueryChange)} />
          </div>
        )}
      </>
    );
  }
}

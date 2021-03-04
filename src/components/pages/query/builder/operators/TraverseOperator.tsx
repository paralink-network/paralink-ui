import React from 'react';
import { OperatorStep, TraversePqlOperator } from '../../../../../state/pql/operators';
import { Operator } from '../../../../../state/pql/pql';

export default class TraverseOperator implements Operator {
  title = 'Traverse';

  private params: string[] = [];

  constructor(params: string[]) {
    this.params = [...params];
  }

  build(): TraversePqlOperator {
    return {
      params: this.params,
      method: 'json',
      step: OperatorStep.Traverse,
    };
  }

  renderConfig(): JSX.Element {
    return <>{this.params}</>;
  }
}

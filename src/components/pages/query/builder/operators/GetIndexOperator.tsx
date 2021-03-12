import React from 'react';
import { GetIndexPqlOperator, OperatorStep } from '../../../../../state/pql/operators';
import { Input, Label } from '../../../../common/Inputs';
import { Operator, OperatorKind, RefreshCallback } from '../../../../../state/pql/pql';

export default class GetIndexOperator implements Operator {
  title = 'Get index';

  kind = OperatorKind.Operation;

  private params = 0;

  constructor(params: number) {
    this.params = params;
  }

  build(): GetIndexPqlOperator {
    return {
      params: this.params,
      step: OperatorStep.GetIndex,
    };
  }

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const onChange = (value: string): void => {
      this.params = parseInt(value, 10);
    };
    return (
      <>
        <Label name="Index:" />
        <Input value={this.params} onChange={refresh(onChange)} type="number" />
      </>
    );
  }
}

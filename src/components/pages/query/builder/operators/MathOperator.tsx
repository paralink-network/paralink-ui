import React from 'react';
import { MathDirection, MathMethod, MathPqlOperator, OperatorStep } from '../../../../../pql/operators';
import { Input, Label } from '../../../../common/Inputs';
import { Operator } from '../../../../../pql/pql';

export default class MathOperator implements Operator {
  title = 'Math';

  private method: MathMethod = MathMethod.Add;

  private params = 0;

  private direction?: MathDirection;

  constructor(method: MathMethod, params: number, direction?: MathDirection) {
    this.method = method;
    this.params = params;
    this.direction = direction;
  }

  build(): MathPqlOperator {
    const config = {
      method: this.method,
      params: this.params,
      step: OperatorStep.Math,
    };
    if (this.direction) return { ...config, direction: this.direction };
    return config;
  }

  renderConfig(): JSX.Element {
    return (
      <>
        <div>
          <select value={this.method}>
            <option value={MathMethod.Add}>Add</option>
            <option value={MathMethod.Sub}>Subtract</option>
            <option value={MathMethod.Mul}>Multiply</option>
            <option value={MathMethod.Div}>Divide</option>
          </select>
        </div>
        <div>
          <Label name="Constant:" />
          <Input value={this.params} type="number" onChange={() => {}} />
        </div>
        <div>
          <Label name="Reversed:" />
          <Input value={this.direction} type="checkbox" onChange={() => {}} />
        </div>
      </>
    );
  }
}

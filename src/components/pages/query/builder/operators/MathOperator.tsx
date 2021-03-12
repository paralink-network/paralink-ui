import React from 'react';
import { MathDirection, MathMethod, MathPqlOperator, OperatorStep } from '../../../../../state/pql/operators';
import { Checkbox, Input, Label, Option, Select } from '../../../../common/Inputs';
import { Operator, OperatorKind, RefreshCallback } from '../../../../../state/pql/pql';

export default class MathOperator implements Operator {
  title = 'Math';

  kind = OperatorKind.Operation;

  private method: MathMethod = MathMethod.Add;

  private params = 0;

  private direction = false;

  constructor(method: MathMethod, params: number, direction?: MathDirection) {
    this.method = method;
    this.params = params;
    this.direction = direction === 'reverse';
  }

  build(): MathPqlOperator {
    const config = {
      method: this.method,
      params: this.params,
      step: OperatorStep.Math,
    };
    if (this.direction) return { ...config, direction: 'reverse' };
    return config;
  }

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const onMethodChange = (method: string): void => {
      this.method = method as MathMethod;
    };
    const onConstantChange = (value: string): void => {
      this.params = parseFloat(value);
    };
    const onDirectionChange = (): void => {
      this.direction = !this.direction;
    };

    return (
      <>
        <div className="mt-3 flex flex-col">
          <Label name="Method: " />
          <Select value={this.method} onChange={refresh(onMethodChange)}>
            <Option value={MathMethod.Add}>Add</Option>
            <Option value={MathMethod.Sub}>Subtract</Option>
            <Option value={MathMethod.Mul}>Multipy</Option>
            <Option value={MathMethod.Div}>Divide</Option>
          </Select>
        </div>
        <div className="mt-3 flex flex-col">
          <Label name="Constant:" />
          <Input value={this.params} type="number" onChange={refresh(onConstantChange)} />
        </div>
        <div className="mt-3">
          <Label name="Reversed:" />
          <Checkbox value={this.direction} onChange={() => refresh(onDirectionChange)(undefined)} />
        </div>
      </>
    );
  }
}

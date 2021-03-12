import React from 'react';
import { OperatorStep, TraversePqlOperator } from '../../../../../state/pql/operators';
import { Operator, OperatorKind, RefreshCallback } from '../../../../../state/pql/pql';
import { Button } from '../../../../common/Buttons';
import { Input, Label } from '../../../../common/Inputs';
import { ListHeaderAddRemove } from '../../../../common/Lists';

export default class TraverseOperator implements Operator {
  title = 'Traverse';

  kind = OperatorKind.Operation;

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

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const onItemAdd = (): void => {
      this.params = [...this.params, ''];
    };
    const onItemRemove = (): string[] => this.params.splice(-1, 1);
    const onItemUpdate = (index: number) => (value: string): void => {
      this.params[index] = value;
    };

    const itemView = this.params.map((param, index) => (
      <li key={index} className="w-full mt-1">
        <Input value={param} onChange={refresh(onItemUpdate(index))} className="w-full" />
      </li>
    ));

    return (
      <>
        <ListHeaderAddRemove
          title="Traverse parameters:"
          onAdd={() => refresh(onItemAdd)(undefined)}
          onRemove={() => refresh(onItemRemove)(undefined)}
        />
        <ul className="w-full">{itemView}</ul>
      </>
    );
  }
}

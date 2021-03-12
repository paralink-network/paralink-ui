import React from 'react';
import { HttpPostPqlLoader, LoaderMethods, ObjectParams } from '../../../../../state/pql/loaders';
import { Input, Label } from '../../../../common/Inputs';
import { Operator, OperatorKind, RefreshCallback } from '../../../../../state/pql/pql';
import { ListHeaderAddRemove } from '../../../../common/Lists';

export default class implements Operator {
  title = 'Http Post';

  kind = OperatorKind.Loader;

  private uri = '';

  private params: [string, string][] = [];

  constructor(uri: string, params: ObjectParams) {
    this.uri = uri;
    this.params = Object.entries(params);
  }

  build(): HttpPostPqlLoader {
    const params = this.params.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

    return {
      params,
      uri: this.uri,
      step: 'extract',
      method: LoaderMethods.Post,
    };
  }

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const setUri = (uri: string): void => {
      this.uri = uri;
    };
    const onItemAdd = (): void => {
      this.params = [...this.params, ['', '']];
    };
    const onItemRemove = (): void => {
      this.params.splice(-1, 1);
    };
    const onItemUpdate = (index: number, key = 0) => (value: string): void => {
      this.params[index][key] = value;
    };

    const itemView = this.params.map((param, index) => (
      <li key={index} className="w-full mt-1 grid grid-cols-2">
        <Input value={param[0]} onChange={refresh(onItemUpdate(index, 0))} className="mr-1" placeholder="Key" />
        <Input value={param[1]} onChange={refresh(onItemUpdate(index, 1))} className="ml-1" placeholder="Value" />
      </li>
    ));

    return (
      <>
        <div>
          <Label name="Url: " />
          <Input value={this.uri} onChange={refresh(setUri)} className="w-full" />
        </div>
        <ListHeaderAddRemove
          title="Post parameters:"
          onAdd={() => refresh(onItemAdd)(undefined)}
          onRemove={() => refresh(onItemRemove)(undefined)}
        />
        <ul className="w-full">{itemView}</ul>
      </>
    );
  }
}

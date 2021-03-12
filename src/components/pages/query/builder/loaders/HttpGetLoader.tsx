import React from 'react';
import { Input, Label } from '../../../../common/Inputs';
import { Operator, OperatorKind, RefreshCallback } from '../../../../../state/pql/pql';
import { HttpGetPqlLoader, LoaderMethods } from '../../../../../state/pql/loaders';

export default class implements Operator {
  title = 'Http Get';

  kind = OperatorKind.Loader;

  private uri = '';

  constructor(uri: string) {
    this.uri = uri;
  }

  build(): HttpGetPqlLoader {
    return {
      uri: this.uri,
      step: 'extract',
      method: LoaderMethods.Get,
    };
  }

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const setUri = (uri: string): void => {
      this.uri = uri;
    };

    return (
      <>
        <Label name="Url: " />
        <Input value={this.uri} onChange={refresh(setUri)} className="w-full" />
      </>
    );
  }
}

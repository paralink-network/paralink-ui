import React from 'react';
import { Input, Label } from '../../../../common/Inputs';
import { Operator, RefreshCallback } from '../../../../../pql/pql';
import { HttpGetPqlLoader, LoaderMethods } from '../../../../../pql/loaders';

export default class implements Operator {
  title = 'Http Get';

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

  renderConfig(refreshCallback: RefreshCallback): JSX.Element {
    const setUri = (uri: string): void => {
      this.uri = uri;
      refreshCallback();
    };

    return (
      <>
        <Label name="Url: " />
        <Input value={this.uri} onChange={setUri} className="w-full" />
      </>
    );
  }
}

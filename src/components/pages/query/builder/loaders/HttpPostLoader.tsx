import React from 'react';
import { HttpPostPqlLoader, LoaderMethods, ObjectParams } from '../../../../../state/pql/loaders';
import { Input, Label } from '../../../../common/Inputs';
import { Operator, RefreshCallback } from '../../../../../state/pql/pql';

export default class implements Operator {
  title = 'Http Get';

  private uri = '';

  private params: ObjectParams = {};

  constructor(uri: string, params: ObjectParams) {
    this.uri = uri;
    this.params = { ...params };
  }

  build(): HttpPostPqlLoader {
    return {
      uri: this.uri,
      params: { ...this.params },
      step: 'extract',
      method: LoaderMethods.Post,
    };
  }

  renderConfig(refreshCallback: RefreshCallback): JSX.Element {
    const setUri = (uri: string): void => {
      this.uri = uri;
      refreshCallback();
    };

    return (
      <>
        <div>
          <Label name="Url: " />
          <Input value={this.uri} onChange={setUri} className="w-full" />
        </div>
        <div />
      </>
    );
  }
}

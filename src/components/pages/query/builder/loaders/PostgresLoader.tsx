import React from 'react';
import { LoaderMethods, SqlPqlLoader } from '../../../../../state/pql/loaders';
import { Input, Label, Textarea } from '../../../../common/Inputs';
import { Operator, OperatorKind, RefreshCallback } from '../../../../../state/pql/pql';

export default class implements Operator {
  title = 'Postgres database';

  kind = OperatorKind.Loader;

  private uri = '';

  private query = '';

  constructor(uri: string, query: string) {
    this.uri = uri;
    this.query = query;
  }

  build(): SqlPqlLoader {
    return {
      uri: this.uri,
      query: this.query,
      step: 'extract',
      method: LoaderMethods.Postgres,
    };
  }

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const setUri = (uri: string): void => {
      this.uri = uri;
    };
    const setQuery = (query: string): void => {
      this.query = query;
    };

    return (
      <>
        <div className="mt-3 flex flex-col">
          <Label name="Url: " />
          <Input value={this.uri} onChange={refresh(setUri)} className="w-full" />
        </div>
        <div className="mt-3 flex flex-col">
          <Label name="Query:" />
          <Textarea value={this.query} onChange={refresh(setQuery)} />
        </div>
      </>
    );
  }
}

import React from 'react';
import { LoaderMethods, SqlPqlLoader } from '../../../../../state/pql/loaders';
import { Input, Label } from '../../../../common/Inputs';
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
    const setUri = (uri: string): string => this.uri = uri;
    const setQuery = (query: string): string => this.query = query;

    return (
      <>
        <div>
          <Label name="Url: " />
          <Input value={this.uri} onChange={refresh(setUri)} className="w-full" />
        </div>
        <div>
          <textarea value={this.query} onChange={refresh((event) => setQuery(event.target.value))} />
        </div>
      </>
    );
  }
}

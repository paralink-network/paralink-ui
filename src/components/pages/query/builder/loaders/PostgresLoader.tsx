import React from 'react';
import { LoaderMethods, SqlPqlLoader } from '../../../../../pql/loaders';
import { Input, Label } from '../../../../common/Inputs';
import { Operator, RefreshCallback } from '../../../../../pql/pql';

export default class implements Operator {
  title = 'Postgres database';

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
    }
  }

  renderConfig(refreshCallback: RefreshCallback) {

    const setUri = (uri: string) => {
      this.uri = uri;
      refreshCallback();
    }

    const setQuery = (query: string) => {
      this.query = query;
      refreshCallback();
    }
    
    return (
      <>
        <div>
          <Label name='Url: '/>
          <Input value={this.uri} onChange={setUri} className='w-full' />
        </div>
        <div>
          <textarea value={this.query} onChange={(event) => setQuery(event.target.value)} />
        </div>
      </>
    );
  }
}

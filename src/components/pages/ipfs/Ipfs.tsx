import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Grid, Message } from 'semantic-ui-react';

import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

// No typings for jsoneditor-react for now just using @ts-ignore for getting around the issue
// Later on with advanced design we might not used that library. If we do we can as well define typings for it
// @ts-ignore
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import { LoadPQLHash } from './pql';
import Error from './Error';
import { axiosInstance } from '../../../api/api';

const pqlAction = (endpoint: string, text: any, setResult: (value: string) => void): void => {
  Promise.resolve()
    .then(() => axiosInstance.post<any>(`${endpoint}`, text))
    .then((res) => JSON.stringify(res.data))
    .then(setResult)
    .catch((err) => setResult(err.message));
};

interface UrlParams {
  hash: string;
}

const Ipfs: React.FC<{}> = () => {
  const { hash } = useParams<UrlParams>();
  const editor = useRef<Editor>();

  const [error, setError] = useState('');
  const [resultContent, setResultContent] = useState('');

  const getContent = (): any => editor.current.jsonEditor.getText();
  const testAction = (): void => pqlAction('pql/test', getContent(), setResultContent);
  const saveAction = (): void => pqlAction('ipfs/save_pql', getContent(), setResultContent);

  useEffect(() => {
    Promise.resolve()
      .then(() => axiosInstance.get<LoadPQLHash>(`/ipfs/${hash}`))
      .then((res) => res.data)
      .then((res) => {
        editor.current.jsonEditor.set(res.pql);
        setResultContent(res.hash);
      })
      .catch((err) => setError(err.message));
  }, [hash]);

  return error.length > 0 ? (
    <Error message={error} hash={hash} />
  ) : (
    <Grid>
      <Grid.Row>
        <div className="ui big breadcrumb">
          <Link to="/ipfs">IPFS</Link>
          <i className="right chevron icon divider" />
          <div className="active section">{hash}</div>
        </div>
      </Grid.Row>
      <Grid.Row>
        <div style={{ height: '500px', width: '100%' }}>
          <Editor
            ref={editor}
            value={{}}
            ace={ace}
            mode="code"
            allowedModes={['code', 'tree']}
            htmlElementProps={{ style: { height: '100%' } }}
          />
        </div>
      </Grid.Row>

      <Button primary onClick={testAction}>
        Test
      </Button>
      <Button onClick={saveAction}>Save to IPFS</Button>
      <Grid.Row>
        <Message style={{ width: '100%' }}>
          <Message.Header>Result:</Message.Header>
          <p>{resultContent}</p>
        </Message>
      </Grid.Row>
    </Grid>
  );
};

export default Ipfs;

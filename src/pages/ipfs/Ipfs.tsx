import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Message, Segment } from 'semantic-ui-react';

import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

// No typings for jsoneditor-react for now just using @ts-ignore for getting around the issue
// Later on with advanced design we might not used that library. If we do we can as well define typings for it
// @ts-ignore
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

interface IpfsProps {
  match: { params: { hash: string } };
}

interface IpfsState {
  hash: string;
  result: string;
  error: any;
}

class Ipfs extends React.Component<IpfsProps, IpfsState> {
  API_PATH = 'http://127.0.0.1:7424/api';

  editor: any;

  constructor(props: IpfsProps) {
    super(props);
    this.state = {
      hash: '',
      result: 'Click "Test" button to get the result of the above PQL definition.',
      error: null,
    };
    this.editor = React.createRef();

    this.pqlAction = this.pqlAction.bind(this);
  }

  componentDidMount(): void {
    const { hash } = this.props.match.params;

    fetch(`${this.API_PATH}/ipfs/${hash}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((json) => {
            throw json;
          });
        }
        return res.json();
      })
      .then((res) => {
        this.setState({
          hash: res.hash,
          error: null,
        });
        this.editor.current.jsonEditor.set(res.pql);
      })
      .catch((res) => {
        this.setState({
          error: res.error,
        });
      });
  }

  pqlAction(endpoint: string): void {
    const text = this.editor.current.jsonEditor.getText();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: text,
    };

    fetch(`${this.API_PATH}/${endpoint}`, requestOptions)
      .then((res) => res.json())
      .then((res) => this.setState({ result: JSON.stringify(res) }));
  }

  render(): ReactNode {
    const { hash } = this.props.match.params;
    if (this.state.error) {
      return (
        <div>
          <Header as="h1" attached="top">
            Error: {this.state.error}
          </Header>
          <Segment attached>
            An error occurred retrieving IPFS hash <i>{hash}</i> . The selected IPFS hash was not a valid PQL definition
            file.
          </Segment>
        </div>
      );
    }
    return (
      <Grid>
        <Grid.Row>
          <div className="ui big breadcrumb">
            <Link to="/ipfs">IPFS</Link>
            <i className="right chevron icon divider" />
            <div className="active section">{this.state.hash}</div>
          </div>
        </Grid.Row>
        <Grid.Row>
          <div style={{ height: '500px', width: '100%' }}>
            <Editor
              ref={this.editor}
              value={{}}
              ace={ace}
              mode="code"
              allowedModes={['code', 'tree']}
              htmlElementProps={{ style: { height: '100%' } }}
            />
          </div>
        </Grid.Row>

        <Button primary onClick={(): void => this.pqlAction('test_pql')}>
          Test
        </Button>
        <Button onClick={(): void => this.pqlAction('save_pql')}>Save to IPFS</Button>
        <Grid.Row>
          <Message style={{ width: '100%' }}>
            <Message.Header>Result:</Message.Header>
            <p>{this.state.result}</p>
          </Message>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Ipfs;

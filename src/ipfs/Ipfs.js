import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Segment, Grid, Message } from "semantic-ui-react";

import ace from "brace";
import "brace/mode/json";
import "brace/theme/github";

import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";

class Ipfs extends React.Component {
  API_PATH = "http://127.0.0.1:7424/api";

  constructor(props) {
    super(props);
    this.state = {
      hash: "",
      result:
        'Click "Test" button to get the result of the above PQL definition.',
      error: null,
    };
    this.editor = React.createRef();
  }

  componentDidMount() {
    let hash = this.props.match.params.hash;

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
          hash: res["hash"],
          error: null,
        });
        this.editor.current.jsonEditor.set(res["pql"]);
      })
      .catch((res) => {
        this.setState({
          error: res["error"],
        });
      });
  }

  pqlAction(endpoint) {
    let text = this.editor.current.jsonEditor.getText();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: text,
    };

    fetch(`${this.API_PATH}/${endpoint}`, requestOptions)
      .then((res) => res.json())
      .then((res) => this.setState({ result: JSON.stringify(res) }));
  }

  render() {
    let hash = this.props.match.params.hash;
    if (this.state.error) {
      return (
        <div>
          <Header as="h1" attached="top">
            Error: {this.state.error}
          </Header>
          <Segment attached>
            An error occurred retrieving IPFS hash <i>{hash}</i> . The selected
            IPFS hash was not a valid PQL definition file.
          </Segment>
        </div>
      );
    } else {
      return (
        <Grid>
          <Grid.Row>
            <div class="ui big breadcrumb">
              <Link to="/ipfs">IPFS</Link>
              <i class="right chevron icon divider"></i>
              <div class="active section">{this.state.hash}</div>
            </div>
          </Grid.Row>
          <Grid.Row>
            <div style={{ height: "500px", width: "100%" }}>
              <Editor
                ref={this.editor}
                value={{}}
                ace={ace}
                mode="code"
                allowedModes={["code", "tree"]}
                htmlElementProps={{ style: { height: "100%" } }}
              />
            </div>
          </Grid.Row>

          <Button primary onClick={this.pqlAction.bind(this, "test_pql")}>
            Test
          </Button>
          <Button onClick={this.pqlAction.bind(this, "save_pql")}>
            Save to IPFS
          </Button>
          <Grid.Row>
            <Message style={{ width: "100%" }}>
              <Message.Header>Result:</Message.Header>
              <p>{this.state.result}</p>
            </Message>
          </Grid.Row>
        </Grid>
      );
    }
  }
}

export default Ipfs;

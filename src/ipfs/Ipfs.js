import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment } from "semantic-ui-react";

class Ipfs extends React.Component {
  API_PATH = "http://127.0.0.1:7424/api";

  constructor(props) {
    super(props);
    this.state = {
      pql: {},
      hash: "",
      error: null,
    };
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
          pql: res["pql"],
          hash: res["hash"],
          error: null,
        });
      })
      .catch((res) => {
        this.setState({
          error: res["error"],
        });
      });
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
        <div class="ui grid">
          <div class="row">
            <div class="ui big breadcrumb">
              <Link to="/ipfs">IPFS</Link>
              <i class="right chevron icon divider"></i>
              <div class="active section">{this.state.hash}</div>
            </div>
          </div>
          <div class="ui row">
            <div id="jsoneditor"></div>
          </div>
          <button id="test-document" class="ui primary button">
            Test
          </button>
          <button id="save-document" class="ui button">
            Save to IPFS
          </button>
          <div class="row">
            <div id="result-row" class="ui message">
              <div class="header">Result:</div>
              <p id="result">
                Click "Test" button to get the result of the above PQL
                definition.
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Ipfs;

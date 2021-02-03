import React from "react";
import { Link } from "react-router-dom";
import { Table, Header, Button } from "semantic-ui-react";

class IpfsList extends React.Component {
  API_PATH = "http://127.0.0.1:7424/api";

  constructor(props) {
    super(props);
    this.state = {
      ipfsHashes: [],
    };
  }

  componentDidMount() {
    fetch(`${this.API_PATH}/ipfs`)
      .then((res) => res.json())
      .then(
        (res) => {
          this.setState({
            ipfsHashes: res["hashes"],
          });
        },
        (error) => {
          this.setState({
            ipfsHashes: [],
          });
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div class="column">
        <Link to="/ipfs/new">
          <Button primary>
            <i class="plus icon"></i>New PQL definition
          </Button>
        </Link>

        <Header as="h1">List of local IPFS hashes</Header>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>IPFS hash</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.ipfsHashes.map((hash) => (
              <Table.Row>
                <Table.Cell>
                  <Link to={`/ipfs/${hash}`}>{hash}</Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default IpfsList;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Table } from 'semantic-ui-react';
import { axiosInstance } from '../../../api/api';

interface ApiCall {
  hashes: string[];
}

const IpfsList = (): JSX.Element => {
  const [, setIsLoading] = useState(true);
  const [ipfsHashes, setIpfsHashes] = useState<string[]>([]);

  useEffect(() => {
    // Async/Await pattern
    const update = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get<ApiCall>('ipfs');
        setIpfsHashes(res.data.hashes);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    update();
  }, []);

  const ipfsItems = ipfsHashes.map((hash) => (
    <Table.Row key={hash}>
      <Table.Cell>
        <Link to={`/ipfs/${hash}`}>{hash}</Link>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <div className="container m-auto">
      <Link to="/ipfs/new">
        <Button primary>
          <i className="plus icon" />
          New PQL definition
        </Button>
      </Link>

      <Header as="h1">List of local IPFS hashes</Header>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>IPFS hash</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{ipfsItems}</Table.Body>
      </Table>
    </div>
  );
};

export default IpfsList;

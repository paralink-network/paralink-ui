import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

interface Error {
  message: string;
  hash: string;
}

const Error: React.FC<Error> = ({ message, hash }) => (
  <div>
    <Header as="h1" attached="top">
      Error: {message}
    </Header>
    <Segment attached>
      An error occurred retrieving IPFS hash <i>{hash}</i> . The selected IPFS hash was not a valid PQL definition file.
    </Segment>
  </div>
);

export default Error;

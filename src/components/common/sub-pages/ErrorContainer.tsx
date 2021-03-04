import React from 'react';

interface ErrorContainer {
  message: string;
  hash: string;
}

const ErrorContainer = ({ message, hash }: ErrorContainer): JSX.Element => (
  <div className="container mx-auto mt-5">
    <div className="bg-gray-500 border rounded h-20 text-xl text-white text-center">Error: {message}</div>
    <div className="border rounded h-40 text-lg text-center">
      An error occurred retrieving IPFS hash <i>{hash}</i> . The selected IPFS hash was not a valid PQL definition file.
    </div>
  </div>
);

export default ErrorContainer;

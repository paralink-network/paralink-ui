// We can remove this when we can hook to the BE and get that data it's just for getting the UX ready for it
const mockDataChain = [
  {
    name: 'eth.mainnet',
    type: 'evm',
    project: 'eth',
    url: 'https://mainnet.infura.io/v3/<project_id>',
    credentials: {},
    tracked_contracts: [],
  },
  {
    name: 'eth.dev-mainnet-fork',
    type: 'evm',
    project: 'eth',
    url: 'ws://localhost:8545',
    credentials: {
      private_key: '<private_key>',
    },
    tracked_contracts: [{ address: '0x3194cBDC3dbcd3E11a07892e7bA5c3394048Cc87', enabled: true }],
  },
  {
    name: 'dev-canvas',
    type: 'substrate',
    project: 'canvas',
    url: 'ws://127.0.0.1:9944',
    credentials: {
      private_key: '<private_key>',
      public_key: '<public_key>',
    },
    tracked_contracts: [{ address: '5FnDzvXcnu3RCtQ3f3RFqaQnVLfcWLZ9FvUURNoPMdmsKZXP', enabled: false }],
  },
];
export default mockDataChain;

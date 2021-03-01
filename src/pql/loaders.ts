
const LATEST = 'latest';

interface DefaultPqlLoader {
  step: string;
  method: string;
}

// Http loaders
export interface HttpGetPqlLoader extends DefaultPqlLoader {
  uri: string;
}

export interface HttpPostPqlLoader extends HttpGetPqlLoader {
  params: any; // TODO for this type im not sure!!
}

// Sql loaders
export interface SqlPqlLoader extends HttpGetPqlLoader { 
  query: string;
}

// Ethereum loaders
type BlockType = typeof LATEST | number;

export interface DefaultEthereumPqlLoader extends DefaultPqlLoader { 
  address: string;
  chain: string;
}

export interface EthereumBalancePqlLoader extends DefaultEthereumPqlLoader {
  params: {
    block: BlockType;
    num_confirmations?: number;
  }
}

export interface EthereumFunctionPqlLoader extends DefaultEthereumPqlLoader {
  params: {
    args: string[];
    block: BlockType;
    function: string;
    num_confirmations?: number;
  }
}

export type PqlLoader = 
  | HttpGetPqlLoader
  | HttpPostPqlLoader
  | SqlPqlLoader
  | EthereumBalancePqlLoader
  | EthereumFunctionPqlLoader;


export const httpGetPqlLoader = (uri: string): HttpGetPqlLoader => ({
  uri,
  step: 'extract',
  method: 'http.get',
});

export const HttpPostPqlLoader = (uri: string, params: any): HttpPostPqlLoader => ({
  uri,
  params,
  step: 'extract',
  method: 'http.post'
});

export const sqlPqlLoader = (uri: string, query: string): SqlPqlLoader => ({
  uri,
  query,
  step: 'extract',
  method: 'sql.postgres',
});

export const ethereumBalancePqlLoader = (address: string, chain: string, block: BlockType, num_confirmations?: number): EthereumBalancePqlLoader => ({
  address,
  chain,
  params: {
    block,
    num_confirmations
  },
  step: 'extract',
  method: 'eth.balance',
});

export const ethereumFunctionPqlLoader = (address: string, chain: string, fun: string, args: string[], block: BlockType, num_confirmations?: number): EthereumFunctionPqlLoader => ({
  address,
  chain,
  params: {
    function: fun,
    block,
    args,
    num_confirmations
  },
  step: 'extract',
  method: 'eth.function',
});


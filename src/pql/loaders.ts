const LATEST = 'latest';

export enum LoaderMethods {
  Get = 'http.get',
  Post = 'http.post',
  Postgres = 'sql.postgres',
  EthBalance = 'eth.balance',
  EthFunction = 'eth.function',
}

export type ObjectParams = { [key: string]: string };

interface DefaultPqlLoader {
  step: string;
  method: LoaderMethods;
}

// Http loaders
export interface HttpGetPqlLoader extends DefaultPqlLoader {
  uri: string;
}

export interface HttpPostPqlLoader extends HttpGetPqlLoader {
  params: ObjectParams; // TODO ensure string value is awailable!
}

// Sql loaders
export interface SqlPqlLoader extends HttpGetPqlLoader {
  query: string;
}

// Ethereum loaders
export type BlockType = typeof LATEST | number;

export interface DefaultEthereumPqlLoader extends DefaultPqlLoader {
  address: string;
  chain: string;
}

export interface EthereumBalancePqlLoader extends DefaultEthereumPqlLoader {
  params: {
    block: BlockType;
    num_confirmations?: number;
  };
}

export interface EthereumFunctionPqlLoader extends DefaultEthereumPqlLoader {
  params: {
    args: string[];
    block: BlockType;
    function: string;
    num_confirmations?: number;
  };
}

export type PqlLoader =
  | HttpGetPqlLoader
  | HttpPostPqlLoader
  | SqlPqlLoader
  | EthereumBalancePqlLoader
  | EthereumFunctionPqlLoader;

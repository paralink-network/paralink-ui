import { Pql } from '../state/pql/pql';
import { axiosInstance } from './api';

interface PQLWithHash {
  pql: Pql;
  hash: string;
}

export const loadIPFSWithHash = (hash: string): Promise<PQLWithHash> =>
  Promise.resolve()
    .then(() => axiosInstance.get<PQLWithHash>(`/ipfs/${hash}`))
    .then((res) => res.data);

// TODO Move those two interfaces somewhere
interface Result {
  result: any;
}

interface Success {
  success: string;
}

const resolvePqlApiAction = <Res>(endpoint: string, pql: Pql): Promise<Res> =>
  Promise.resolve()
    .then(() => axiosInstance.post<Res>(endpoint, pql))
    .then((res) => res.data);

export const runPqlApi = (pql: Pql): Promise<string> =>
  Promise.resolve()
    .then(() => resolvePqlApiAction<Result>('pql/test', pql))
    .then((res) => JSON.stringify(res.result));

export const savePqlApi = (pql: Pql): Promise<string> =>
  Promise.resolve()
    .then(() => resolvePqlApiAction<Success>('ipfs/save_pql', pql))
    .then((res) => res.success);

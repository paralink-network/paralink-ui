import { Pql } from '../state/pql/pql';
import { axiosInstance } from './api';

export interface ApiCall {
  hashes: string[];
}

export interface PQLWithHash {
  pql: Pql;
  hash: string;
}

export const loadLocalIpfsHashes = (): Promise<ApiCall> =>
  Promise.resolve()
    .then(() => axiosInstance.get<ApiCall>('ipfs'))
    .then((result) => result.data);

export const loadIPFSWithHash = (hash: string): Promise<PQLWithHash> =>
  Promise.resolve()
    .then(() => axiosInstance.get<PQLWithHash>(`/ipfs/${hash}`))
    .then((res) => res.data);

const resolvePqlApiAction = <Res>(endpoint: string, pql: Pql): Promise<Res> =>
  Promise.resolve()
    .then(() => axiosInstance.post<Res>(endpoint, pql))
    .then((res) => res.data);

export const runPqlApi = (pql: Pql): Promise<string> =>
  Promise.resolve()
    .then(() => resolvePqlApiAction<{ result: any }>('pql/test', pql))
    .then((res) => JSON.stringify(res.result));

export const savePqlApi = (pql: Pql): Promise<string> =>
  Promise.resolve()
    .then(() => resolvePqlApiAction<{ success: string }>('ipfs/save_pql', pql))
    .then((res) => res.success);

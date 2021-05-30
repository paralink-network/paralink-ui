import { Chain } from '../interfaces';
import { axiosInstance } from './api';

// Let it be implicit here to avoid importing AxiosResponse etc.

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const chainsApi = '/chains';

const getAllChains = () => axiosInstance.get<Chain[]>(`${chainsApi}`);
const getChain = (chain: string) => axiosInstance.get<Chain>(`${chainsApi}/${chain}`);
const setChainStatus = (chain: string) => axiosInstance.put<any>(`${chainsApi}/${chain}`);

export default { getAllChains, getChain, setChainStatus };

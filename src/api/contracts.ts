import { ApiResponse, Contract } from '../interfaces';
import { axiosInstance } from './api';

const contractsApi = '/contracts';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// Implementation : https://github.com/paralink-network/paralink-node/blob/master/src/api/contracts.py
const getAllContracts = () => axiosInstance.get<Contract[]>(`${contractsApi}`);
const getChainContracts = (chain: string) => axiosInstance.get<Contract>(`${contractsApi}/${chain}`);
const createContract = (contract: Omit<Contract, 'id'>) => axiosInstance.post<ApiResponse>(`${contractsApi}`, contract);
const setContractStatus = (chain: string, address: string, contract: Pick<Contract, 'active'>) =>
  axiosInstance.put<any>(`${contractsApi}/${chain}/${address}`, contract);
const deleteContract = (chain: string, address: string) =>
  axiosInstance.delete<any>(`${contractsApi}/${chain}/${address}`);

export default { getAllContracts, getChainContracts, createContract, setContractStatus, deleteContract };

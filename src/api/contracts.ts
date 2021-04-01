import { Contract } from '../interfaces';
import { axiosInstance } from './api';

const contractsApi = '/contracts';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

// Implementation : https://github.com/paralink-network/paralink-node/blob/master/src/api/contracts.py
const getAllContracts = () => axiosInstance.get<Contract[]>(`${contractsApi}`);
const getChainContracts = (chain: string) => axiosInstance.get<Contract>(`${contractsApi}/${chain}`);
const createContract = (contract: Omit<Contract, 'id'>) => axiosInstance.post<any>(`${contractsApi}`, contract);
const setContractStatus = (id: number, contract: Pick<Contract, 'active'>) =>
  axiosInstance.put<any>(`${contractsApi}/${id}`, contract);
const deleteContract = (id: number) => axiosInstance.delete<any>(`${contractsApi}/${id}`);

export default { getAllContracts, getChainContracts, createContract, setContractStatus, deleteContract };

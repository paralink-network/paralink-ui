import { Contract } from './Contract';

export interface Chain {
  name: string;
  type: string;
  active: boolean;
  contracts: Contract[];
}

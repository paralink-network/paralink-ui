import React from 'react';
import { BlockType, EthereumBalancePqlLoader, LoaderMethods } from '../../../../../state/pql/loaders';
import { Input, Label } from '../../../../common/Inputs';
import { Operator, OperatorKind, RefreshCallback } from '../../../../../state/pql/pql';

export default class implements Operator {
  title = 'Ethereum balance';

  kind = OperatorKind.Loader;

  private address = '';

  private chain = '';

  private block?: number;

  private numberConfirmation?: number;

  constructor(address: string, chain: string, block?: number, numberConfirmation?: number) {
    this.address = address;
    this.chain = chain;
    this.block = block;
    this.numberConfirmation = numberConfirmation;
  }

  build(): EthereumBalancePqlLoader {
    return {
      address: this.address,
      chain: this.chain,
      params: {
        block: this.block ? this.block : 'latest',
        num_confirmations: this.numberConfirmation,
      },
      step: 'extract',
      method: LoaderMethods.EthBalance,
    };
  }

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const setChain = (chain: string): string => this.chain = chain;
    const setAddress = (address: string): string => this.address = address;
    const setBlock = (block: number) => this.block = block;
    const setNumberConfirmation = (numberConfirmation: number) => this.numberConfirmation = numberConfirmation;

    return (
      <>
        <div className="mt-3 flex flex-col">
          <Label name="Address:" />
          <Input value={this.address} onChange={refresh(setAddress)} className="w-full" />
        </div>
        <div className="mt-3 flex flex-col">
          <Label name="Chain:" />
          <Input value={this.chain} onChange={refresh(setChain)} className="w-full" />
        </div>
        <div className="mt-3 flex flex-col">
          <Label name="Block:" />
          <Input value={this.block} type="number" onChange={refresh(setBlock)} className="w-full" />
        </div>
        <div className="mt-3 flex flex-col">
          <Label name="Number confirmation:" />
          <Input value={this.numberConfirmation} type="number" onChange={refresh(setNumberConfirmation)} className="w-full" />
        </div>
      </>
    );
  }
}

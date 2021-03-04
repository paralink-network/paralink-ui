import React from 'react';
import { BlockType, EthereumBalancePqlLoader, LoaderMethods } from '../../../../../state/pql/loaders';
import { Input, Label } from '../../../../common/Inputs';
import { Operator, OperatorKind, RefreshCallback } from '../../../../../state/pql/pql';

export default class implements Operator {
  title = 'Ethereum balance';

  kind = OperatorKind.Loader;

  private address = '';

  private chain = '';

  private block: BlockType = 'latest';

  private numberConfirmation?: number;

  constructor(address: string, chain: string, block: BlockType, numberConfirmation?: number) {
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
        block: this.block,
        num_confirmations: this.numberConfirmation,
      },
      step: 'extract',
      method: LoaderMethods.EthBalance,
    };
  }

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const setChain = (chain: string): string => this.chain = chain;
    const setAddress = (address: string): string => this.address = address;

    return (
      <>
        <div>
          <Label name="Address: " />
          <Input value={this.address} onChange={refresh(setAddress)} className="w-full" />
        </div>
        <div>
          <Label name="Chain: " />
          <Input value={this.chain} onChange={refresh(setChain)} className="w-full" />
        </div>
      </>
    );
  }
}

import React from 'react';
import { BlockType, EthereumBalancePqlLoader, LoaderMethods } from '../../../../../state/pql/loaders';
import { Input, Label } from '../../../../common/Inputs';
import { Operator, RefreshCallback } from '../../../../../state/pql/pql';

export default class implements Operator {
  title = 'Ethereum balance';

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

  renderConfig(refreshCallback: RefreshCallback): JSX.Element {
    const update = <T,>(fun: (value: T) => void) => (value: T) => {
      fun(value);
      refreshCallback();
    };

    const setAddress = (address: string): void => {
      this.address = address;
    };
    const setChain = (chain: string): void => {
      this.chain = chain;
    };

    return (
      <>
        <div>
          <Label name="Address: " />
          <Input value={this.address} onChange={update(setAddress)} className="w-full" />
        </div>
        <div>
          <Label name="Chain: " />
          <Input value={this.chain} onChange={update(setChain)} className="w-full" />
        </div>
      </>
    );
  }
}

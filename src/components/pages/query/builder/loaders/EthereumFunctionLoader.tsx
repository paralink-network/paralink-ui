import React from 'react';
import { Input, Label } from '../../../../common/Inputs';
import { Operator, OperatorKind, RefreshCallback } from '../../../../../state/pql/pql';
import { BlockType, EthereumFunctionPqlLoader, LoaderMethods } from '../../../../../state/pql/loaders';
import { Button } from '../../../../common/Buttons';
import { ListHeaderAddRemove } from '../../../../common/Lists';

export default class implements Operator {
  title = 'Ethereum function';

  kind = OperatorKind.Loader;

  private address = '';

  private chain = '';

  private fun = '';

  private args: string[] = [''];

  private block?: number;

  private numberConfirmation?: number;

  constructor(
    address: string,
    chain: string,
    fun: string,
    args: string[],
    block?: number,
    numberConfirmation?: number,
  ) {
    this.address = address;
    this.chain = chain;
    this.fun = fun;
    this.args = [...args];
    this.block = block;
    this.numberConfirmation = numberConfirmation;
  }

  build(): EthereumFunctionPqlLoader {
    return {
      address: this.address,
      chain: this.chain,
      params: {
        block: this.block ? this.block : 'latest',
        function: this.fun,
        args: [...this.args],
        num_confirmations: this.numberConfirmation,
      },
      step: 'extract',
      method: LoaderMethods.EthBalance,
    };
  }

  renderConfig(refresh: RefreshCallback): JSX.Element {
    const setChain = (chain: string): string => (this.chain = chain);
    const setFunction = (fun: string): string => (this.fun = fun);
    const setAddress = (address: string): string => (this.address = address);
    const setBlock = (block: string) => (this.block = parseInt(block));
    const setNumberConfirmation = (numberConfirmation: string) =>
      (this.numberConfirmation = parseInt(numberConfirmation));

    const onItemAdd = (): string[] => (this.args = [...this.args, '']);
    const onItemRemove = (): string[] => this.args.splice(-1, 1);
    const onItemUpdate = (index: number) => (value: string): string => (this.args[index] = value);

    const itemView = this.args.map((arg, index) => (
      <li key={index} className="w-full mt-1">
        <Input value={arg} onChange={refresh(onItemUpdate(index))} className="w-full" />
      </li>
    ));
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
        <div>
          <Label name="Function: " />
          <Input value={this.fun} onChange={refresh(setFunction)} className="w-full" />
        </div>
        <ListHeaderAddRemove
          title="Parameters:"
          onAdd={() => refresh(onItemAdd)(undefined)}
          onRemove={() => refresh(onItemRemove)(undefined)}
        />
        <ul className="w-full">{itemView}</ul>
        <div className="mt-3 flex flex-col">
          <Label name="Block:" />
          <Input value={this.block} type="number" onChange={refresh(setBlock)} className="w-full" />
        </div>
        <div className="mt-3 flex flex-col">
          <Label name="Number confirmation:" />
          <Input
            value={this.numberConfirmation}
            type="number"
            onChange={refresh(setNumberConfirmation)}
            className="w-full"
          />
        </div>
      </>
    );
  }
}

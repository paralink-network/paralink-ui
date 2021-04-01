import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Card, CardBody, CardHeader } from '../../components/common';
import Button from '../../components/common/Buttons';
import SearchInput from '../../components/common/Input';
import mockDataChain from './mock-data';
import TrackedChain from './TrackedChain';
import TrackedContractRow, { TrackedContract } from './TrackedContract';

type ChainType = 'evm' | 'substrate';

interface Chain {
  name: string;
  type: ChainType;
  project: string;
  url: string;
  credentials: {
    // TODO: Ask potentially BE to have structure camelCase in case or we can just disable the warning in eslint
    /* eslint-disable camelcase */
    private_key?: string;
    public_key?: string;
  };
  tracked_contracts: TrackedContract[];
}

const TrackedContractsList: React.FC<{}> = () => {
  const [chains, setChains] = useState<Chain[]>([]);
  const [activeChain, setActiveChain] = useState<Chain>();
  const [searchChain, setSearchChain] = useState('');
  const [focused, setFocused] = useState<boolean>(false);

  // TODO: current view, we should block user from switching subtrate if they did a change currently
  // have a call from the tracked contract when something changed to let the parent know
  // We should have a modal displaying that there is some current changes to update
  // this is just a safe precaution

  useEffect(() => {
    setChains(mockDataChain as Chain[]);
  }, []);

  // const selectChain = (chain: Chain): void => {
  //   setActiveChain(chain);
  //   setActiveContracts(chain.tracked_contracts.length ? chain.tracked_contracts : ['No Tracked Contracts']);
  // };

  // Filter out by the search but also keep the current active in the search
  const allChains = chains
    .filter((chain) => chain.name.includes(searchChain.trim().toLocaleLowerCase()) || activeChain?.name === chain.name)
    .map((chain) => (
      <TrackedChain active={chain.name === activeChain?.name} name={chain.name} onClick={() => setActiveChain(chain)} />
    ));

  // const activeContracts =
  //   activeChain && activeChain.tracked_contracts.length ? activeChain.tracked_contracts : ['No Tracked Contracts'];

  // TODO: Optmistic update , need to refresh the state
  const addContract = (entry: TrackedContract): void => {
    let emptyContractExisting = false;
    if (activeChain?.tracked_contracts.length) {
      const lastEntry = activeChain?.tracked_contracts[activeChain?.tracked_contracts.length - 1];
      emptyContractExisting = lastEntry.address === '';
    }

    if (activeChain && !emptyContractExisting) {
      setActiveChain({
        ...activeChain,
        tracked_contracts: [...activeChain.tracked_contracts, entry],
      });
      setFocused(true);
    }
  };

  const removeContract = (index: number): void => {
    if (activeChain?.tracked_contracts.length) {
      activeChain.tracked_contracts.splice(index, 1);
      setActiveChain({
        ...activeChain,
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="lg:flex overflow-hidden px-2">
        <div className="flex-none lg:w-80 w-full">
          <Card className="mr-10">
            <div className="mx-4 px-4 py-3 max-w-md">
              <SearchInput
                value={searchChain}
                onChange={(val: string) => setSearchChain(val)}
                placeholder="Search"
                className="py-3 text-lg leading-relaxed max-w-full"
              />
            </div>
            <CardBody>
              <div className="divide-y divide-gray-100 text-secondary">{allChains}</div>
            </CardBody>
          </Card>
        </div>
        <div className="md:flex-1">
          <Card className="w-full">
            <CardBody>
              <CardHeader>
                <div className="flex">
                  <div className="flex-1">Tracked Contracts</div>
                  <div className="flex-none">
                    <Button
                      className="ml-1 border-none px-3.5 py-3.5"
                      color="blue"
                      onClick={() => addContract({ address: '', enabled: false })}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <div className="divide-y mt-4">
                {activeChain?.tracked_contracts.map((contract: TrackedContract, index: number) => {
                  return (
                    <TrackedContractRow
                      focused={focused}
                      key={activeChain.name + contract.address + index.toString()}
                      trackedContract={contract}
                      remove={() => removeContract(index)}
                    />
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackedContractsList;

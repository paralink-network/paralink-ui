import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ChainsApi from '../../api/chains';
import { Card, CardBody, CardHeader } from '../../components/common';
import Button from '../../components/common/Buttons';
import SearchInput from '../../components/common/Input';
import { Chain, Contract } from '../../interfaces';
import TrackedChain from './TrackedChain';
import TrackedContractRow from './TrackedContract';

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
    ChainsApi.getAllChains().then((res: any) => {
      setChains(res.data.chains);
      // Select the first chain as active
      setActiveChain(res.data.chains[0]);
    });
  }, []);

  // Filter out by the search but also keep the current active in the search
  const allChains = chains
    .filter((chain) => chain.name.includes(searchChain.trim().toLocaleLowerCase()) || activeChain?.name === chain.name)
    .map((chain) => (
      <TrackedChain
        key={chain.name}
        active={chain.name === activeChain?.name}
        name={chain.name}
        onClick={() => setActiveChain(chain)}
      />
    ));

  const addContract = (): void => {
    // Check if there is already an empty entry in the array to fill
    let emptyContractExisting = false;
    if (activeChain?.contracts.length) {
      const lastEntry = activeChain?.contracts[activeChain?.contracts.length - 1];
      emptyContractExisting = lastEntry.address === '';
    }

    const entry = { address: '', active: false, chain: activeChain?.name || '', newContract: true };
    if (activeChain && !emptyContractExisting) {
      setActiveChain({
        ...activeChain,
        contracts: [...activeChain.contracts, entry],
      });
      setFocused(true);
    }
  };

  // Update the value in the list
  const updateContract = (contract: Contract, index: number): void => {
    // const entry = { address: '', active: false, chain: activeChain?.name || '', newContract: true };
    const newContracts = activeChain?.contracts.slice(0);
    if (newContracts) {
      newContracts[index] = contract;
      if (activeChain) {
        setActiveChain({
          ...activeChain,
          contracts: newContracts,
        });
      }
    }
  };

  // Remove a contract from the chain visually
  const removeContract = (index: number): void => {
    if (activeChain?.contracts.length) {
      activeChain.contracts.splice(index, 1);
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
                    <Button className="ml-1 border-none px-3.5 py-3.5" color="blue" onClick={() => addContract()}>
                      <FaPlus />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <div className="divide-y mt-4">
                {activeChain?.contracts.map((contract: Contract, index: number) => {
                  return (
                    <TrackedContractRow
                      focused={focused}
                      key={activeChain.name + contract.address}
                      trackedContract={contract}
                      remove={() => removeContract(index)}
                      update={(c: Contract) => updateContract(c, index)}
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

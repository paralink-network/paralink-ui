import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '../../components/common';
import SearchInput from '../../components/common/Input';
import mockDataChain from './mock-data';

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
  tracked_contracts: string[];
}

const TrackedContractsList: React.FC<{}> = () => {
  const [chains, setChains] = useState<Chain[]>([]);
  const [activeChain, setActiveChain] = useState<Chain>();
  const [searchChain, setSearchChain] = useState('');

  useEffect(() => {
    setChains(mockDataChain as Chain[]);
  }, []);

  const allChains = chains
    .filter((data) => {
      if (!searchChain) {
        return data;
      }
      if (data.name.includes(searchChain.trim().toLocaleLowerCase())) {
        return data;
      }
      return null;
    })
    .map((chain) => {
      return (
        <div
          className={`focus:outline-none py-4 capitalize cursor-pointer ${
            chain.name === activeChain?.name ? 'font-bold text-primary' : ''
          }`}
          role="button"
          onClick={() => setActiveChain(chain)}
          onKeyPress={() => setActiveChain(chain)}
          tabIndex={0}
        >
          {chain.name}
        </div>
      );
    });

  const activeContracts =
    activeChain && activeChain.tracked_contracts.length
      ? activeChain.tracked_contracts.map((contract) => {
          return contract;
        })
      : 'No Tracked Contracts';

  return (
    <div className="container mx-auto">
      <div className="flex">
        <div className="flex-none mr-10 w-1/4 md:w-auto">
          <Card>
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
        <div className="flex-1">
          <Card className="w-full">
            <CardBody>
              <CardHeader>Tracked Contracts</CardHeader>
              {/* <Table></Table> */}
              {activeContracts}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrackedContractsList;

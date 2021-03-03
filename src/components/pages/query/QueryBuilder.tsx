import React, { useState } from 'react';
import { Pql, SourceOperation } from '../../../pql/pql';
import { TooltipButton } from '../../common/Buttons';
import { InlineIcon } from '@iconify/react';
import chartBoxPlusOutline from '@iconify-icons/mdi/chart-box-plus-outline';
import sourceFork from '@iconify-icons/mdi/source-fork';
import databasePlusOutline from '@iconify-icons/mdi/database-plus-outline';
import PqlPipeline from './builder/PqlPipeline';
import { initialData } from './builder/builder';
import QuerySelector, { SelectorKind, SELECTOR_LOADER, SELECTOR_OPERATOR } from './selectors/QuerySelector';
import { httpGetPqlLoader } from '../../../pql/loaders';
import OperationConfig from './configurators/OperationConfig';

interface QueryBuilder {
  pql: Pql
}

const BUILDER = 'BUILDER';
const SELECTOR = 'SELECTOR';
const CONFIGURATOR = 'CONFIGURATOR';

type ViewState =
  | typeof BUILDER
  | typeof SELECTOR
  | typeof CONFIGURATOR;

const QueryBuilder = ({ pql }: QueryBuilder): JSX.Element => {
  const [view, setView] = useState<ViewState>(BUILDER);

  const [data, setData] = useState({...initialData});
  const [selector, setSelector] = useState<SelectorKind>(SELECTOR_OPERATOR);
  const [config, setConfig] = useState<SourceOperation>(httpGetPqlLoader(''));

  const addSelectorAction = (selector: SelectorKind) => {
    setView(SELECTOR);
    setSelector(selector);
  };
  const configureAction = () => setView(CONFIGURATOR);

  const onSelectorClose = () => setView(BUILDER);

  return (
    <div className='flex flex-col'>
      <div className='p-2 flex flex-column w-full justify-start shadow-sm'>
        <div className='my-1'>
          <TooltipButton onClick={() => addSelectorAction(SELECTOR_LOADER)} tooltip='Add loader'>
            <InlineIcon icon={databasePlusOutline} width="20" />
          </TooltipButton>
          <TooltipButton onClick={() => addSelectorAction(SELECTOR_OPERATOR)} className="ml-1" tooltip='Add operator'>
            <InlineIcon icon={chartBoxPlusOutline} width="20" />
          </TooltipButton>
          <TooltipButton onClick={configureAction} className="ml-1" tooltip='Aggregate'>
            <InlineIcon icon={sourceFork} width="20" />
          </TooltipButton>
        </div>
      </div>
      <div className='p-3 shadow-sm relative bg-gray-100 flex-auto'>
        { view === BUILDER && <PqlPipeline data={data} /> }
        { view === SELECTOR && <QuerySelector kind={selector} onClose={onSelectorClose} /> }
        { view === CONFIGURATOR && <OperationConfig /> }
      </div>
    </div>
  );
};

export default QueryBuilder;

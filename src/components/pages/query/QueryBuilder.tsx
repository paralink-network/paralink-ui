import React, { useState } from 'react';
import { Pql, SourceOperation } from '../../../pql/pql';
import { TooltipButton } from '../../common/Buttons';
import { InlineIcon } from '@iconify/react';
import chartBoxPlusOutline from '@iconify-icons/mdi/chart-box-plus-outline';
import sourceFork from '@iconify-icons/mdi/source-fork';
import databasePlusOutline from '@iconify-icons/mdi/database-plus-outline';
import PqlPipeline from './builder/PqlPipeline';
import { convertPql, Operator, QueryData } from './builder/builder';
import QuerySelector, { SelectorKind, SELECTOR_LOADER, SELECTOR_OPERATOR } from './selectors/QuerySelector';
import OperationConfig from './OperationConfig';

interface QueryBuilder {
  queryData: QueryData;
}

enum ViewState {
  Builder,
  Selector,
  Configurator
};

const QueryBuilder = ({ queryData }: QueryBuilder): JSX.Element => {
  const [view, setView] = useState<ViewState>(ViewState.Builder);

  const [data, setData] = useState({...queryData});
  const [selector, setSelector] = useState<SelectorKind>(SELECTOR_OPERATOR);
  const [configId, setConfigId] = useState('');

  const addSelectorAction = (selector: SelectorKind) => {
    setView(ViewState.Selector);
    setSelector(selector);
  };
  const configureAction = (id: string) => {
    setConfigId(id);
    setView(ViewState.Configurator);
  };
  const onClose = () => setView(ViewState.Builder);

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
          <TooltipButton onClick={() => {}} className="ml-1" tooltip='Aggregate'>
            <InlineIcon icon={sourceFork} width="20" />
          </TooltipButton>
        </div>
      </div>
      <div className='p-3 shadow-sm relative bg-gray-100 flex-auto'>
        { view === ViewState.Builder && <PqlPipeline data={data} onConfigClick={configureAction} /> }
        { view === ViewState.Selector && <QuerySelector kind={selector} onClose={onClose} /> }
        { view === ViewState.Configurator && <OperationConfig onClose={onClose} operator={data.operators[configId].operator} /> }
      </div>
    </div>
  );
};

export default QueryBuilder;

import React from 'react';
import { InlineIcon } from '@iconify/react';
import chartBoxPlusOutline from '@iconify-icons/mdi/chart-box-plus-outline';
import sourceFork from '@iconify-icons/mdi/source-fork';
import databasePlusOutline from '@iconify-icons/mdi/database-plus-outline';
import { TooltipButton } from '../../common/Buttons';
import { SelectorKind, SELECTOR_LOADER, SELECTOR_OPERATOR } from './selectors/QuerySelector';

interface QueryBuilderHeader {
  addSelectorAction: (selector: SelectorKind) => void;
  addOrConfigAggregatorAction: () => void;
}

const QueryBuilderHeader = ({ addSelectorAction, addOrConfigAggregatorAction }: QueryBuilderHeader): JSX.Element => {
  return (
    <div className="p-2 flex flex-column w-full justify-start shadow-sm">
      <div className="my-1">
        <TooltipButton onClick={() => addSelectorAction(SELECTOR_LOADER)} tooltip="Add loader">
          <InlineIcon icon={databasePlusOutline} width="20" />
        </TooltipButton>
        <TooltipButton onClick={() => addSelectorAction(SELECTOR_OPERATOR)} className="ml-1" tooltip="Add operator">
          <InlineIcon icon={chartBoxPlusOutline} width="20" />
        </TooltipButton>
        <TooltipButton onClick={addOrConfigAggregatorAction} className="ml-1" tooltip="Aggregate">
          <InlineIcon icon={sourceFork} width="20" />
        </TooltipButton>
      </div>
    </div>
  );
};

export default QueryBuilderHeader;

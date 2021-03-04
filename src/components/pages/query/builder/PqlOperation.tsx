import React from 'react';
import { InlineIcon } from '@iconify/react';
import cogIcon from '@iconify-icons/mdi/cog';
import minusIcon from '@iconify-icons/mdi/minus';
import arrowRightDropCircleOutline from '@iconify-icons/mdi/arrow-right-drop-circle-outline';
import { Draggable } from 'react-beautiful-dnd';
import { ExtendedOperator } from './builder';
import { TooltipButton } from '../../../common/Buttons';

interface PqlOperation extends ExtendedOperator {
  index: number;
  onConfigClick: (id: string) => void;
}

const PqlOperation = ({ id, index, operator, onConfigClick }: PqlOperation): JSX.Element => (
  <Draggable draggableId={id} index={index}>
    {(provided) => (
      <div
        className="bg-white border rounded px-5 py-2 mb-1 flex flex-row justify-between"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        {operator.title}
        <div className="flex flex-row">
          <TooltipButton className="rounded-full ml-1" color="green" tooltip="Run">
            <InlineIcon icon={arrowRightDropCircleOutline} />
          </TooltipButton>
          <TooltipButton className="rounded-full ml-1" tooltip="Config" onClick={() => onConfigClick(id)}>
            <InlineIcon icon={cogIcon} />
          </TooltipButton>
          <TooltipButton className="rounded-full ml-1" color="red" tooltip="Remove">
            <InlineIcon icon={minusIcon} className="m-auto" />
          </TooltipButton>
        </div>
      </div>
    )}
  </Draggable>
);

export default PqlOperation;

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { InlineIcon } from '@iconify/react';
import { ExtendedOperator } from './builder';
import cogIcon from '@iconify-icons/mdi/cog';
import arrowRightDropCircleOutline from '@iconify-icons/mdi/arrow-right-drop-circle-outline';
import minusIcon from '@iconify-icons/mdi/minus';
import { TooltipButton } from '../../../common/Buttons';

interface PqlOperation extends ExtendedOperator { 
  index: number;
}

const PqlOperation = ({ id, text, index }: PqlOperation) => (
  <Draggable draggableId={id} index={index}>
    {(provided) => (
      <div className='bg-white border rounded px-5 py-2 mb-1 flex flex-row justify-between' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
        {text}
        <div className='flex flex-row'>
          <TooltipButton className='rounded-full ml-1' color='green' tooltip='Run'>
            <InlineIcon icon={arrowRightDropCircleOutline} />
          </TooltipButton>
          <TooltipButton className='rounded-full ml-1' tooltip='Config'>
            <InlineIcon icon={cogIcon} />
          </TooltipButton>
          <TooltipButton className='rounded-full ml-1' color='red' tooltip='Remove'>
            <InlineIcon icon={minusIcon} className='m-auto' />
          </TooltipButton>
        </div>
      </div>
    )}
  </Draggable>
);

export default PqlOperation;
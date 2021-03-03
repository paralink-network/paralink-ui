import { InlineIcon } from '@iconify/react';
import React from 'react';
import { TooltipButton } from '../../common/Buttons';
import arrowLeft from '@iconify-icons/mdi/arrow-left';

interface QueryClosableContainer {
  onClose: () => void;
}

const QueryClosableContainer: React.FC<QueryClosableContainer> = ({ onClose, children }) => (
  <div className='flex flex-col'>
    <div className='mb-3'>
      <TooltipButton className='rounded-full' onClick={onClose} tooltip='Back'>
        <InlineIcon icon={arrowLeft} />
      </TooltipButton>
    </div>
    {children}
  </div>
);

export default QueryClosableContainer;

import { InlineIcon } from '@iconify/react';
import React from 'react';
import { Button } from '../../common/Buttons';
import closeIcon from '@iconify-icons/mdi/close';

interface QueryClosableContainer {
  onClose: () => void;
}

const QueryClosableContainer: React.FC<QueryClosableContainer> = ({ onClose, children }) => (
  <div className='flex flex-col'>
    <div className='flex justify-end mb-3'>
      <Button className='rounded-full' onClick={onClose}>
        <InlineIcon icon={closeIcon} />
      </Button>
    </div>
    {children}
  </div>
);

export default QueryClosableContainer;

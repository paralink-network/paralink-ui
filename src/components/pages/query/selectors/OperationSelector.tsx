import React from 'react';
import { Button } from '../../../common/Buttons';
import QuerySelectorContainer from '../QueryClosableContainer';

interface OperationSelector extends QuerySelectorContainer { }

const OperationSelector = ({ onClose }: OperationSelector): JSX.Element => (
  <QuerySelectorContainer onClose={onClose}>
    <Button className='mb-1'>Traverse</Button>
    <Button className='mb-1'>Get index</Button>
    <Button className='mb-1'>Math</Button>
    <Button className='mb-1'>Query SQL</Button>
  </QuerySelectorContainer>
);


export default OperationSelector;
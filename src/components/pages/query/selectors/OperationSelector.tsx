import React from 'react';
import QuerySelectorContainer from '../QueryClosableContainer';
import SelectorButton from './SelectorButton';

const OperationSelector = ({ onClose }: QuerySelectorContainer): JSX.Element => (
  <QuerySelectorContainer onClose={onClose}>
    <SelectorButton>Traverse</SelectorButton>
    <SelectorButton>Get index</SelectorButton>
    <SelectorButton>Math</SelectorButton>
    <SelectorButton>SQL query</SelectorButton>
  </QuerySelectorContainer>
);

export default OperationSelector;

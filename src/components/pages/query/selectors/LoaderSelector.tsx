import React from 'react';
import QuerySelectorContainer from '../QueryClosableContainer';
import SelectorButton from './SelectorButton';

const LoaderSelector = ({ onClose }: QuerySelectorContainer): JSX.Element => (
  <QuerySelectorContainer onClose={onClose}>
    <SelectorButton>Http Get</SelectorButton>
    <SelectorButton>Http Post</SelectorButton>
    <SelectorButton>Ethereum Balance</SelectorButton>
    <SelectorButton>Ethereum Function</SelectorButton>
    <SelectorButton>SQL</SelectorButton>
  </QuerySelectorContainer>
);

export default LoaderSelector;

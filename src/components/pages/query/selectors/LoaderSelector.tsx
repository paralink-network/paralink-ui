import React from 'react';
import QuerySelectorContainer from '../QueryClosableContainer';

interface LoaderSelector extends QuerySelectorContainer { }

const LoaderSelector = ({ onClose }: LoaderSelector): JSX.Element => {

  return (
    <QuerySelectorContainer onClose={onClose}>
      
    </QuerySelectorContainer>
  );
};

export default LoaderSelector;
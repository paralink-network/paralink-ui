import React, { useEffect, useState } from 'react';
import { Operator } from './builder/builder';
import QueryClosableContainer from './QueryClosableContainer';

interface OperationConfig extends QueryClosableContainer { 
  operator: Operator;
}

const OperationConfig = ({ onClose, operator }: OperationConfig ) => {
  // Because our operators are not common components, their state is internally updated so
  // we need to trigger this (parent) component to refresh childs component view.
  const [refreshIndex, setRefreshIndex] = useState(true);
  const refreshCallback = () => setRefreshIndex(!refreshIndex);
  useEffect(() => {}, [refreshIndex]);
  
  return (
    <QueryClosableContainer onClose={onClose}>
      {operator.renderConfig(refreshCallback)}
    </QueryClosableContainer>
  );
}

export default OperationConfig;
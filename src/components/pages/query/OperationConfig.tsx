import React, { useEffect, useState } from 'react';
import { Operator } from '../../../state/pql/pql';
import QueryClosableContainer from './QueryClosableContainer';

interface OperationConfig extends QueryClosableContainer {
  operator: Operator;
}

const OperationConfig = ({ onClose, operator }: OperationConfig): JSX.Element => {
  // Because our operators are not common components, when their state is internally updated
  // we need to trigger this (parent) component to refresh childs component view.
  const [refreshIndex, setRefreshIndex] = useState(true);
  const refreshCallback = (): void => setRefreshIndex(!refreshIndex);
  useEffect(() => {}, [refreshIndex]);

  return <QueryClosableContainer onClose={onClose}>{operator.renderConfig(refreshCallback)}</QueryClosableContainer>;
};

export default OperationConfig;

import React, { useEffect, useState } from 'react';
import { Operator, OutsideOperator } from '../../../state/pql/pql';
import QueryClosableContainer from './QueryClosableContainer';

interface OperatorConfig extends QueryClosableContainer {
  operator: Operator | OutsideOperator;
}

const OperatorConfig = ({ onClose, operator }: OperatorConfig): JSX.Element => {
  // Because our operators are not common components, when their state is internally updated
  // we need to trigger this (parent) component to refresh childs component view.
  const [refreshIndex, setRefreshIndex] = useState(true);
  const refresh = <T,>(fun: (value: T) => void) => (value: T) => {
    fun(value);
    setRefreshIndex(!refreshIndex);
  };
  useEffect(() => {}, [refreshIndex]);

  return (
    <QueryClosableContainer onClose={onClose} submitButton>
      {operator.renderConfig(refresh)}
    </QueryClosableContainer>
  );
};

export default OperatorConfig;

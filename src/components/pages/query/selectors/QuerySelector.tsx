import React from 'react';
import LoaderSelector from './LoaderSelector';
import OperationSelector from './OperationSelector';
import QuerySelectorContainer from '../QueryClosableContainer';
import { Operator } from '../../../../state/pql/pql';

export const SELECTOR_LOADER = 'loader';
export const SELECTOR_OPERATOR = 'operator';

export type SelectorKind = typeof SELECTOR_LOADER | typeof SELECTOR_OPERATOR;

interface QuerySelector extends QuerySelectorContainer {
  kind: SelectorKind;
  addOperator: (operator: Operator) => void;
}

const QuerySelector = ({ kind, addOperator, onClose }: QuerySelector): JSX.Element => {
  switch (kind) {
    case SELECTOR_LOADER:
      return <LoaderSelector onClose={onClose} addOperator={addOperator} />;
    case SELECTOR_OPERATOR:
      return <OperationSelector onClose={onClose} addOperator={addOperator} />;
    default:
      return <OperationSelector onClose={onClose} addOperator={addOperator} />;
  }
};

export default QuerySelector;

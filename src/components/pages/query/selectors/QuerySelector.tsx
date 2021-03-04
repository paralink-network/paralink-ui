import React from 'react';
import LoaderSelector from './LoaderSelector';
import OperationSelector from './OperationSelector';
import QuerySelectorContainer from '../QueryClosableContainer';

export const SELECTOR_LOADER = 'loader';
export const SELECTOR_OPERATOR = 'operator';

export type SelectorKind = typeof SELECTOR_LOADER | typeof SELECTOR_OPERATOR;

interface QuerySelector extends QuerySelectorContainer {
  kind: SelectorKind;
}

const QuerySelector = ({ kind, onClose }: QuerySelector): JSX.Element => {
  switch (kind) {
    case SELECTOR_LOADER:
      return <LoaderSelector onClose={onClose} />;
    case SELECTOR_OPERATOR:
      return <OperationSelector onClose={onClose} />;
    default:
      return <OperationSelector onClose={onClose} />;
  }
};

export default QuerySelector;

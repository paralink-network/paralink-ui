import React from 'react';
import { MathMethod, SqlMethod } from '../../../../state/pql/operators';
import { Operator } from '../../../../state/pql/pql';
import GetIndexOperator from '../builder/operators/GetIndexOperator';
import MathOperator from '../builder/operators/MathOperator';
import QuerySqlOperator from '../builder/operators/QuerySqlOperator';
import TraverseOperator from '../builder/operators/TraverseOperator';
import QuerySelectorContainer from '../QueryClosableContainer';
import SelectorButton from './SelectorButton';

interface OperatorSelection extends QuerySelectorContainer {
  addOperator: (operator: Operator) => void;
}

const OperationSelector = ({ addOperator, onClose }: OperatorSelection): JSX.Element => {
  const onGetIndexClick = (): void => addOperator(new GetIndexOperator(0));
  const onTraverseClick = (): void => addOperator(new TraverseOperator(['']));
  const onMathClick = (): void => addOperator(new MathOperator(MathMethod.Add, 0));
  const onSqlQueryClick = (): void => addOperator(new QuerySqlOperator(SqlMethod.None, '', false));

  return (
    <QuerySelectorContainer onClose={onClose}>
      <SelectorButton onClick={onTraverseClick}>Traverse</SelectorButton>
      <SelectorButton onClick={onGetIndexClick}>Get index</SelectorButton>
      <SelectorButton onClick={onMathClick}>Math</SelectorButton>
      <SelectorButton onClick={onSqlQueryClick}>SQL query</SelectorButton>
    </QuerySelectorContainer>
  );
};
export default OperationSelector;

import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { onOperatorRemoveAction, QueryData } from '../../../../state/query-builder';
import OperationBody from './OperationBody';
import PqlSource from './PqlSource';

type UpdateData = (data: QueryData) => void;

// This function needs to be take care off...
// Too much if statements
const onDragEnd = (data: QueryData, setData: UpdateData) => (result: DropResult) => {
  const { destination, source, draggableId } = result;

  if (!destination) return;
  if (source.droppableId === destination.droppableId && source.index === destination.index) return;

  if (destination.droppableId === source.droppableId) {
    const column = data.sources[source.droppableId];
    const newOperators = [...column.operators];
    newOperators.splice(source.index, 1);
    newOperators.splice(destination.index, 0, draggableId);

    setData({ ...data, sources: { ...data.sources, [column.id]: { ...column, operators: newOperators } } });
  } else {
    const fromColumn = data.sources[source.droppableId];
    const fromOperators = [...fromColumn.operators];
    fromOperators.splice(source.index, 1);

    const toColumn = data.sources[destination.droppableId];
    const toOperators = [...toColumn.operators];
    toOperators.splice(destination.index, 0, draggableId);

    setData({
      ...data,
      sources: {
        ...data.sources,
        [fromColumn.id]: { ...fromColumn, operators: [...fromOperators] },
        [toColumn.id]: { ...toColumn, operators: [...toOperators] },
      },
    });
  }
};

interface PqlPipeline {
  data: QueryData;
  setData: UpdateData;
  onConfigClick: (id: string) => void;
  onRun: () => void;
  partialRun: (sourceId: string) => (operatorId: string) => void;
}

const PqlPipeline = ({ data, setData, onConfigClick, onRun, partialRun }: PqlPipeline): JSX.Element => {
  const sourcesView = data.sourceOrder.map((sourceId) => {
    const { operators, title } = data.sources[sourceId];
    const operationItems = operators.map((operationId) => data.operators[operationId]);

    const onTitleChange = (value: string): void =>
      setData({ ...data, sources: { ...data.sources, [sourceId]: { ...data.sources[sourceId], title: value } } });

    const onRemove = (id: string): void => setData(onOperatorRemoveAction(data, sourceId, id));

    return (
      <PqlSource
        id={sourceId}
        key={sourceId}
        title={title}
        onTitleChange={onTitleChange}
        operators={operationItems}
        onRun={partialRun}
        onRemove={onRemove}
        onConfigClick={onConfigClick}
      />
    );
  });

  const removeAggregation = (): void => setData({ ...data, aggregate: undefined });

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd(data, setData)}>{sourcesView}</DragDropContext>
      {data.aggregate && (
        <div className="mb-5 rounded pb-2 px-1">
          <div className="border rounded px-5 py-2 mb-1 flex flex-row justify-between">
            Aggregate
            <OperationBody onRun={onRun} onRemove={removeAggregation} onConfig={() => onConfigClick('aggregate')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PqlPipeline;

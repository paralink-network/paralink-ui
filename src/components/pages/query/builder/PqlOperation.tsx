import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { OperatorKind } from '../../../../state/pql/pql';
import { ExtendedOperator } from '../../../../state/query-builder';
import OperationBody from './OperationBody';

interface PqlOperation extends ExtendedOperator {
  index: number;
  onRun: (id: string) => void;
  onRemove: (id: string) => void;
  onConfigClick: (id: string) => void;
}

const PqlOperation = ({ id, index, operator, onConfigClick, onRemove, onRun }: PqlOperation): JSX.Element => (
  <Draggable draggableId={id} index={index} isDragDisabled={operator.kind === OperatorKind.Loader}>
    {(provided, snapshot) => (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`border rounded px-5 py-2 mb-1 flex flex-row justify-between
          ${snapshot.isDragging ? 'bg-blue-100' : 'bg-white'}`}
        ref={provided.innerRef}
      >
        {operator.title}
        <OperationBody onRun={() => onRun(id)} onConfig={() => onConfigClick(id)} onRemove={() => onRemove(id)} />
      </div>
    )}
  </Draggable>
);

export default PqlOperation;

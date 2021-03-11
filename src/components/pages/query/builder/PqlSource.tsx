import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ExtendedOperator } from '../../../../state/query-builder';
import PqlOperation from './PqlOperation';

interface PqlSource {
  id: string;
  title: string;
  operators: ExtendedOperator[];

  onRemove: (id: string) => void;
  onConfigClick: (id: string) => void;
  onRun: (sourceId: string) => (operatorId: string) => void;

  onTitleChange: (value: string) => void;
}

const PqlSource = ({ id, title, operators, onTitleChange, onRun, onRemove, onConfigClick }: PqlSource): JSX.Element => {
  const operationView = operators.map((operator, index) => (
    <PqlOperation
      index={index}
      key={operator.id}
      {...operator}
      onConfigClick={onConfigClick}
      onRun={onRun(id)}
      onRemove={onRemove}
    />
  ));

  return (
    <div className="mb-5 border rounded pb-2 px-1">
      <input
        type="text"
        value={title}
        placeholder="Source-1"
        onChange={(event) => onTitleChange(event.target.value)}
        className="mb-1 focus:ring-indigo-500 focus:border-indigo-500 inline-block border-0 shadow-sm sm:text-sm rounded-md w-full"
      />
      <Droppable droppableId={id}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} style={{ minHeight: '10px' }}>
            {operationView}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default PqlSource;

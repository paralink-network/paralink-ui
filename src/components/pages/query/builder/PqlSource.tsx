import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { ExtendedOperator } from './builder';
import PqlOperation from './PqlOperation';

interface PqlSource {
  id: string;
  title: string;
  operations: ExtendedOperator[];
  onTitleChange: (value: string) => void;
}

const PqlSource = ({ id, title, operations, onTitleChange }: PqlSource) => {
  const operationView = operations
    .map((operation, index) => <PqlOperation index={index} key={operation.id} {...operation} />);
  return (
    <div className='mb-5 border rounded pb-2 px-1 bg-yellow-200'>
      <input type="text" value={title} onChange={(event) => onTitleChange(event.target.value)} className="mb-1 focus:ring-indigo-500 focus:border-indigo-500 inline-block border-0 shadow-sm sm:text-sm rounded-md w-full" placeholder="Source-1"/>
      <Droppable droppableId={id}>
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} style={{ minHeight: '30px' }}>
            {operationView}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

export default PqlSource;

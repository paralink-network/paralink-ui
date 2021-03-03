import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Pql } from '../../../../pql/pql';
import { QueryData } from './builder';
import PqlSource from './PqlSource';

interface PqlPipeline {
  data: QueryData,
  onConfigClick: (id: string) => void;
}

const PqlPipeline = ({ data, onConfigClick }: PqlPipeline): JSX.Element => {
  const sourcesView = data.sourceOrder
    .map((sourceId) => {
      const { operators, title } = data.sources[sourceId];
      const operationItems = operators
        .map((operationId) => data.operators[operationId]);

      return <PqlSource id={sourceId} key={sourceId} title={title} onTitleChange={(value) => {}} operators={operationItems} onConfigClick={onConfigClick} />
  });

  return (
    <div>
      <DragDropContext onDragEnd={(result) => {}}>
        {sourcesView}
      </DragDropContext>
      <div className='pb-2 px-1'>
        <div className='border rounded px-5 py-2 mb-1'>Aggregare</div>
      </div>
    </div>
  );
};

export default PqlPipeline;
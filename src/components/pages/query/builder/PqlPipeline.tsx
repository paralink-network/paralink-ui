import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { QueryData } from './builder';
import PqlSource from './PqlSource';

interface PqlPipeline {
  data: QueryData;
  onConfigClick: (id: string) => void;
}

const PqlPipeline = ({ data, onConfigClick }: PqlPipeline): JSX.Element => {
  const [change, setChange] = useState(false);
  const update = (): void => setChange(!change);
  useEffect((): void => {}, [change]);

  const sourcesView = data.sourceOrder.map((sourceId) => {
    const { operators, title } = data.sources[sourceId];
    const operationItems = operators.map((operationId) => data.operators[operationId]);

    const onTitleChange = (value: string) => {
      data.sources[sourceId].title = value;
      update();
    };

    return (
      <PqlSource
        id={sourceId}
        key={sourceId}
        title={title}
        onTitleChange={onTitleChange}
        operators={operationItems}
        onConfigClick={onConfigClick}
      />
    );
  });

  return (
    <div>
      <DragDropContext onDragEnd={() => {}}>{sourcesView}</DragDropContext>
      <div className="pb-2 px-1">
        <div className="border rounded px-5 py-2 mb-1">Aggregare</div>
      </div>
    </div>
  );
};

export default PqlPipeline;

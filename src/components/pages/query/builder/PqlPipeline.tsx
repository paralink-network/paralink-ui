import React, { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { isConstructorDeclaration } from 'typescript';
import { OperatorKind } from '../../../../state/pql/pql';
import { onOperatorRemoveAction } from '../../../../state/query-builder';
import { QueryData } from './builder';
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

    setData({...data,
      sources: {...data.sources,
        [column.id]: {...column,
          operators: newOperators
        }
      }
    });
  }
  else {
    const fromColumn = data.sources[source.droppableId];
    const fromOperators = [...fromColumn.operators];
    fromOperators.splice(source.index, 1);

    const toColumn = data.sources[destination.droppableId];
    const toOperators = [...toColumn.operators];
    toOperators.splice(destination.index, 0, draggableId);

    setData({...data,
      sources: {...data.sources,
        [fromColumn.id]: {...fromColumn,
          operators: [...fromOperators],
        },
        [toColumn.id]: {...toColumn,
          operators: [...toOperators]
        }
      }
    });
  }
}



interface PqlPipeline {
  data: QueryData;
  setData: UpdateData;
  onConfigClick: (id: string) => void;
}

const PqlPipeline = ({ data, setData, onConfigClick }: PqlPipeline): JSX.Element => {
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
    const onRemove = (id: string) => 
      setData(onOperatorRemoveAction(data, sourceId, id));

    return (
      <PqlSource
        id={sourceId}
        key={sourceId}
        title={title}
        onTitleChange={onTitleChange}
        operators={operationItems}
        onRun={() => {}}
        onRemove={onRemove}
        onConfigClick={onConfigClick}
      />
    );
  });

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd(data, setData)}>{sourcesView}</DragDropContext>
      {data.aggregate && 
        <div className={`border rounded px-5 py-2 mb-1 flex flex-row justify-between`}>
          Aggregare
          <OperationBody onRun={() => {}} onRemove={() => {}} onConfig={() => {}} />
        </div>
      }
    </div>
  );
};

export default PqlPipeline;

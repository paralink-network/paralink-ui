import React from 'react';
import { Pql } from '../../../../pql/pql';
import { TooltipButton } from '../../../common/Buttons';
import { InlineIcon } from '@iconify/react';
import chartBoxPlusOutline from '@iconify-icons/mdi/chart-box-plus-outline';
import sourceFork from '@iconify-icons/mdi/source-fork';
import databasePlusOutline from '@iconify-icons/mdi/database-plus-outline';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

interface QueryBuilder {
  pql: Pql
}

const items = ["test1", "test2", "test3"];

const QueryBuilder = ({ pql }: QueryBuilder): JSX.Element => {

  return (
    <div className='flex flex-col'>
      <div className='p-2 flex flex-column w-full justify-start shadow-sm'>
        <div className='my-1'>
          <TooltipButton onClick={() => {}} tooltip='Add loader'>
            <InlineIcon icon={databasePlusOutline} width="20" />
          </TooltipButton>
          <TooltipButton onClick={() => {}} className="ml-1" tooltip='Add operator'>
            <InlineIcon icon={chartBoxPlusOutline} width="20" />
          </TooltipButton>
          <TooltipButton onClick={() => {}} className="ml-1" tooltip='Aggregate'>
            <InlineIcon icon={sourceFork} width="20" />
          </TooltipButton>
        </div>
      </div>
      <div className="p-3 shadow-sm flex-auto">
        <DragDropContext onDragEnd={(result, provider) => {}}>
          <div className="bg-blue">
            <Droppable droppableId="1">
            {(provided, snapshot) => (
              <>
                <div
                  ref={provided.innerRef}
                  style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  {...provided.droppableProps}
                >
                  <h2>I am a droppable!2</h2>
                  {provided.placeholder}
                </div>
                <div
                  ref={provided.innerRef}
                  style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                  {...provided.droppableProps}
                >
                  <h2>I am a droppable!1</h2>
                  {provided.placeholder}
                </div>
              </>
            )}
            </Droppable>
          </div>
          
        </DragDropContext>
      </div>
    </div>
  );
};

export default QueryBuilder;

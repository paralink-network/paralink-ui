import React, { useState } from 'react';
import { Operator, OperatorKind, Pql } from '../../../state/pql/pql';
import { createNewLoader, createNewOperator, onOperatorRemoveAction } from '../../../state/query-builder';
import { QueryData } from './builder/builder';
import PqlPipeline from './builder/PqlPipeline';
import OperationConfig from './OperationConfig';
import QueryBuilder from './QueryBuilder';
import QueryHeader from './QueryHeader';
import QueryResult from './result/QueryResult';
import QuerySelector, { SelectorKind, SELECTOR_OPERATOR } from './selectors/QuerySelector';

interface QueryController {
  queryData: QueryData;
  pql: Pql;
}

enum ViewState {
  Builder,
  Selector,
  Configurator,
}

const QueryController = ({ queryData, pql }: QueryController): JSX.Element => {
  const [view, setView] = useState<ViewState>(ViewState.Builder);

  const [configId, setConfigId] = useState('');
  const [data, setData] = useState({ ...queryData });
  const [projectName, setProjectName] = useState(pql.name);
  const [selector, setSelector] = useState<SelectorKind>(SELECTOR_OPERATOR);

  const addSelectorAction = (selected: SelectorKind): void => {
    setView(ViewState.Selector);
    setSelector(selected);
  };
  const configureAction = (id: string): void => {
    setConfigId(id);
    setView(ViewState.Configurator);
  };
  const onClose = (): void => setView(ViewState.Builder);
  const addNewOperator = (opearator: Operator) => {
    const [newData, operatorId] = opearator.kind === OperatorKind.Loader
      ? createNewLoader(data, opearator)
      : createNewOperator(data, data.sourceOrder[data.sourceOrder.length-1], opearator);

    setData(newData);
    setConfigId(operatorId);
    setView(ViewState.Configurator);
  }

  return (
    <div className="grid grid-cols-4 gap-0 h-full">
      <div className="col-span-3 flex flex-col">
        <QueryHeader projectName={projectName} setProjectName={setProjectName} />
        <QueryResult result="" />
      </div>
      <div className="flex flex-col">
        <QueryBuilder addSelectorAction={addSelectorAction} />
        <div className="p-3 shadow-sm relative flex-auto">
          {view === ViewState.Builder && <PqlPipeline data={data} setData={setData} onConfigClick={configureAction} />}
          {view === ViewState.Selector && <QuerySelector kind={selector} onClose={onClose} addOperator={addNewOperator} />}
          {view === ViewState.Configurator && (
            <OperationConfig onClose={onClose} operator={data.operators[configId].operator} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryController;

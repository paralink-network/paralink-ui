import React, { useState } from 'react';
import { Pql } from '../../../state/pql/pql';
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

  const [data] = useState({ ...queryData });
  const [configId, setConfigId] = useState('');
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

  return (
    <div className="grid grid-cols-4 gap-0 h-full">
      <div className="col-span-3 flex flex-col">
        <QueryHeader projectName={projectName} setProjectName={setProjectName} />
        <QueryResult result="" />
      </div>
      <div className="flex flex-col">
        <QueryBuilder addSelectorAction={addSelectorAction} />
        <div className="p-3 shadow-sm relative bg-gray-100 flex-auto">
          {view === ViewState.Builder && <PqlPipeline data={data} onConfigClick={configureAction} />}
          {view === ViewState.Selector && <QuerySelector kind={selector} onClose={onClose} />}
          {view === ViewState.Configurator && (
            <OperationConfig onClose={onClose} operator={data.operators[configId].operator} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryController;

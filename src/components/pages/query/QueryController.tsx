import React, { useState } from 'react';
import { runPqlApi, savePqlApi } from '../../../api/pql';
import { AGGREGATOR_CONFIG } from '../../../state/pql/aggregators';
import { Operator, OperatorKind, Pql } from '../../../state/pql/pql';
import { createNewAggregator, createNewLoader, createNewOperator, QueryData } from '../../../state/query-builder';
import { convertPql } from './builder/builder';
import { compile, partialCompile } from './builder/compile';
import PqlPipeline from './builder/PqlPipeline';
import OperationConfig from './OperatorConfig';
import QueryBase from './QueryBase';
import QueryBuilderHeader from './QueryBuilderHeader';
import QueryHeader from './QueryHeader';
import QuerySelector, { SelectorKind, SELECTOR_OPERATOR } from './selectors/QuerySelector';

interface QueryController {
  queryData: QueryData;
  pqlData: Pql;
}

enum ViewState {
  Builder,
  Selector,
  Configurator,
}

const toPql = (code: string): Pql => JSON.parse(code);
const fromPql = (pql: Pql): string => JSON.stringify(pql, null, '\t');

const QueryController = ({ queryData, pqlData }: QueryController): JSX.Element => {
  const [view, setView] = useState<ViewState>(ViewState.Builder);

  const [result, setResult] = useState('');
  const [configId, setConfigId] = useState('');
  const [pql, setPql] = useState(fromPql(pqlData));
  const [data, setData] = useState({ ...queryData });
  const [showResult, setShowResult] = useState(false);
  const [projectName, setProjectName] = useState(pqlData.name);
  const [selector, setSelector] = useState<SelectorKind>(SELECTOR_OPERATOR);

  const switchCodeResult = (): void => setShowResult(!showResult);
  const addSelectorAction = (selected: SelectorKind): void => {
    setView(ViewState.Selector);
    setSelector(selected);
  };
  const configureAction = (id: string): void => {
    setConfigId(id);
    setView(ViewState.Configurator);
  };
  const onClose = (): void => setView(ViewState.Builder);
  const addNewOperator = (opearator: Operator): void => {
    const [newData, operatorId] =
      opearator.kind === OperatorKind.Loader
        ? createNewLoader(data, opearator)
        : createNewOperator(data, data.sourceOrder[data.sourceOrder.length - 1], opearator);

    setData(newData);
    setConfigId(operatorId);
    setView(ViewState.Configurator);
  };
  const addOrConfigAggregator = (): void => {
    if (!data.aggregate) {
      const [newData] = createNewAggregator(data);
      setData(newData);
    }
    configureAction(AGGREGATOR_CONFIG);
  };

  const build = (): void => {
    try {
      const newQueryData = convertPql(JSON.parse(pql) as Pql);
      setData(newQueryData);
      setShowResult(false);
    } catch (error) {
      setResult(error.message);
      setShowResult(true);
    }
  };
  const compileToPql = (): void => setPql(fromPql(compile(projectName, pqlData.psql_version, data)));

  const run = (): Promise<void> =>
    Promise.resolve()
      .then(() => compileToPql())
      .then(() => runPqlApi(toPql(pql)))
      .then(setResult)
      .catch((err) => setResult(err.message))
      .finally(() => setShowResult(true));

  const partialRun = (sourceId: string) => async (operatorId: string): Promise<void> => {
    try {
      const compiledPql = partialCompile(projectName, pqlData.psql_version, data, sourceId, operatorId);
      const resultRes = await runPqlApi(compiledPql);
      setPql(fromPql(compiledPql));
      setResult(resultRes);
    } catch (error) {
      setResult(error.message);
    } finally {
      setShowResult(true);
    }
  };

  const save = (): Promise<void> =>
    Promise.resolve()
      .then(() => savePqlApi(toPql(pql)))
      .then(setResult)
      .catch((err) => setResult(err.message))
      .finally(() => setShowResult(true));

  return (
    <div className="grid grid-cols-4 gap-0 h-full">
      <div className="col-span-3 flex flex-col">
        <QueryHeader
          showResult={showResult}
          projectName={projectName}
          onRun={run}
          onSave={save}
          onBuild={build}
          onCompile={compileToPql}
          setProjectName={setProjectName}
          onResultCodeSwitch={switchCodeResult}
        />
        <QueryBase pql={pql} setPql={setPql} result={result} showResult={showResult} />
      </div>
      <div className="flex flex-col">
        <QueryBuilderHeader addSelectorAction={addSelectorAction} addOrConfigAggregatorAction={addOrConfigAggregator} />
        <div className="p-3 shadow-sm relative flex-auto">
          {view === ViewState.Builder && (
            <PqlPipeline
              data={data}
              setData={setData}
              onConfigClick={configureAction}
              onRun={run}
              partialRun={partialRun}
            />
          )}
          {view === ViewState.Selector && (
            <QuerySelector kind={selector} onClose={onClose} addOperator={addNewOperator} />
          )}
          {view === ViewState.Configurator && (
            <OperationConfig
              onClose={onClose}
              operator={configId === AGGREGATOR_CONFIG ? data.aggregate! : data.operators[configId].operator}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryController;

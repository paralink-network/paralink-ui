
export interface ExtendedOperator {
  id: string;
  // data: SourceOperation
  text: string;
}

export interface ExtendedSource {
  id: string;
  title: string;
  operations: string[];
}

export interface QueryData {
  operations: {[key: string]: ExtendedOperator};
  sources: {[key: string]: ExtendedSource};
  sourceOrder: string[];
}

export const initialData: QueryData = {
  operations: {
    'operator-1': { id: 'operator-1', text: 'Load' },
    'operator-2': { id: 'operator-2', text: 'Get index' },
    'operator-3': { id: 'operator-3', text: 'Traverse' },
    'operator-4': { id: 'operator-4', text: 'Math' },
  },
  sources: {
    'source-1': {
      id: 'source-1',
      title: 'Source-1',
      operations: ['operator-1', 'operator-2']
    }, 
    'source-2': {
      id: 'source-2',
      title: 'Source-2',
      operations: ['operator-3', 'operator-4']
    },
    'source-3': {
      id: 'source-3',
      title: 'Source-3',
      operations: []
    }
  },
  sourceOrder: ['source-1', 'source-2', 'source-3']
};
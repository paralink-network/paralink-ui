import React from 'react';
import { Pql } from '../../../../pql/pql';

interface PqlPipeline {
  pql: Pql;
}

const PqlPipeline = ({ pql }: PqlPipeline): JSX.Element => {

  return (
    <div>
      Builder
    </div>
  );
};

export default PqlPipeline;
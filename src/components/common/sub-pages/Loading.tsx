import React from 'react';
import { Icon } from '@iconify/react';
import loadingIcon from '@iconify-icons/mdi/loading';

const Loading = (): JSX.Element => (
  <div className="container m-auto" role="status">
    <svg className="animate-spin m-auto" width="50" height="50">
      <Icon icon={loadingIcon} width="50" height="50" />
    </svg>
    <h4 className="text-center text-lg">Loading...</h4>
  </div>
);

export default Loading;

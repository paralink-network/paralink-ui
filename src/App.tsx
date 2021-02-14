import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BaseLayout from './components/layouts/BaseLayout';
import IpfsList from './pages/ipfs/IpfsList';
import Ipfs from './pages/ipfs/Ipfs';

import './App.scss';

function App(): JSX.Element {
  return (
    <Router>
      <BaseLayout>
        <Switch>
          <Route path="/ipfs/:hash" component={Ipfs} />
          <Route path={['/', '/ipfs']} component={IpfsList} />
        </Switch>
      </BaseLayout>
    </Router>
  );
}

export default App;

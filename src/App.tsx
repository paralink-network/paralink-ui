import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import BaseLayout from './components/layouts/BaseLayout';
import Ipfs from './pages/ipfs/Ipfs';
import IpfsList from './pages/ipfs/IpfsList';

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

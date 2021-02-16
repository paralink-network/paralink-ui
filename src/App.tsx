import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import BaseLayout from './components/layouts/BaseLayout';
import { storageNames } from './config';
import UserContext from './hooks/UserContext';
import Ipfs from './pages/ipfs/Ipfs';
import IpfsList from './pages/ipfs/IpfsList';
import Login from './pages/Login/Login';
import { ProtectedRoute } from './shared/ProtectedRoute';

function App(): JSX.Element {
  // Handle user state
  const accessToken = localStorage.getItem(storageNames.user) || '';
  const [isLoggedIn, setLoggedIn] = useState(!!accessToken);

  // Handle user login by setting the storage and state
  const login = (token: string): void => {
    setLoggedIn(true);
    localStorage.setItem(storageNames.user, token);
  };

  // Handle user logout
  const logout = (): void => {
    setLoggedIn(false);
    localStorage.removeItem(storageNames.user);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/ipfs/:hash" component={Ipfs} />
            <ProtectedRoute path={['/', '/ipfs']} component={IpfsList} />
          </Switch>
        </BaseLayout>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

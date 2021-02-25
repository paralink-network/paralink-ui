import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import BaseLayout from './components/layouts/BaseLayout';
import Login from './components/pages/auth/Login';
import Page from './components/Page';
import { ERROR_404_PAGE, LOGIN_PAGE, USER_PAGES } from './components/urls';
import Error404 from './components/pages/errors/Error404';
import UserContext, { emptyUser } from './state/user';
import './App.scss';

function App(): JSX.Element {
  const [user, setUser] = useState({ ...emptyUser });

  const login = (email: string): void => setUser({ email, isLoggedIn: true });
  const logout = (): void => setUser({ ...emptyUser });

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route path={LOGIN_PAGE} component={Login} />
            <Route path={ERROR_404_PAGE} component={Error404} />
            <Route path={USER_PAGES} component={Page} />
            <Route path="/" render={() => <Redirect to={ERROR_404_PAGE} />} />
          </Switch>
        </BaseLayout>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

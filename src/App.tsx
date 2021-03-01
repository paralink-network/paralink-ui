import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import BaseLayout from './components/layouts/BaseLayout';
import Login from './components/pages/auth/Login';
import Page from './components/Page';
import Error404 from './components/pages/errors/Error404';
import UserContext, { emptyUser } from './state/user';
import './App.scss';
import "tailwindcss/tailwind.css"
import { ERROR_404_PAGE_ROUTE, LOGIN_PAGE_ROUTE, USER_ROUTES } from './components/routes';

function App(): JSX.Element {
  const [user, setUser] = useState({ ...emptyUser });

  const login = (email: string): void => setUser({ email, isLoggedIn: true });
  const logout = (): void => setUser({ ...emptyUser });

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <Router>
        <BaseLayout>
          <Switch>
            <Route path={LOGIN_PAGE_ROUTE} component={Login} />
            <Route path={ERROR_404_PAGE_ROUTE} component={Error404} />
            <Route path={USER_ROUTES} component={Page} />
            <Route path="/" render={() => <Redirect to={ERROR_404_PAGE_ROUTE} />} />
          </Switch>
        </BaseLayout>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

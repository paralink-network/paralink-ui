import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import UserContext, { emptyUser } from './state/user';
import Page from './components/Page';
import Login from './components/pages/auth/Login';
import Error404 from './components/pages/errors/Error404';
import NavigationBar from './components/navigation/NavigationBar';
import { ERROR_404_PAGE_ROUTE, LOGIN_PAGE_ROUTE, USER_ROUTES } from './components/routes';
import 'tailwindcss/tailwind.css';
import './App.scss';

function App(): JSX.Element {
  // TODO this is a hack! Move all Context providers in some higher component!
  // TODO keep only Router and BaseLayout here!
  // Replace window.location.pathname = ... to history.push(...)
  const [user, setUser] = useState({ ...emptyUser });

  const login = (email: string): void => setUser({ email, isLoggedIn: true });
  const logout = (): void => {
    setUser({ ...emptyUser });
    window.location.pathname = LOGIN_PAGE_ROUTE;
  };

  return (
    <Router>
      <UserContext.Provider value={{ user, login, logout }}>
        <div className="h-screen flex flex-col">
          <NavigationBar />
          <div className="container-fluid flex-auto">
            <Switch>
              <Route path={LOGIN_PAGE_ROUTE} component={Login} />
              <Route path={ERROR_404_PAGE_ROUTE} component={Error404} />
              <Route path={USER_ROUTES} component={Page} />
              <Route path="/" render={() => <Redirect to={ERROR_404_PAGE_ROUTE} />} />
            </Switch>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;

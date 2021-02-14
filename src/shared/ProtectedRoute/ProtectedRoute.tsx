import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../../hooks/UserContext';

// Disable the eslint for next any
// eslint-disable-next-line
const ProtectedRoute = ({ component: Component, ...rest }: any): JSX.Element => {
  const userContext = useContext(UserContext);
  /** Verify that user is logged in otherwise redirect to login page */
  return (
    <Route
      {...rest}
      render={(props) =>
        userContext.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;

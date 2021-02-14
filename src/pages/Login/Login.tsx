import React, { useContext } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import UserContext from '../../hooks/UserContext';
import paralinkApi from '../../services/interceptor';
import './Login.scss';

interface LoginProps {
  from: string;
}

const Login = (props: RouteComponentProps<{}, {}, LoginProps>): JSX.Element => {
  const userContext = useContext(UserContext);

  const [state, setState] = React.useState({
    email: '',
    password: '',
    seePassword: false,
  });

  const { from } = props.location.state || { from: { pathname: '/' } };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const togglePassword = (): void => {
    setState((prevState) => ({
      ...prevState,
      seePassword: !prevState.seePassword,
    }));
  };

  const login = async (): Promise<any> => {
    // TODO: put like a loading icon on the login button

    // TODO: do like a safe check on the email & password here

    // Just to check
    await paralinkApi
      // For now this is going to be the placeholder
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(() => {
        // We should get the login token here from the BE
        const token = 'faketokenhere';
        userContext.login(token);
      })
      .catch((err: any) => {
        // TODO: Need to display the error in the UI ( user not found, not correct password, not correct email)
        console.error(err);
      })
      .finally(() => {
        // TODO: login loading should be set to false here
      });
  };

  if (userContext.isLoggedIn) {
    return <Redirect to={from} />;
  }

  // TODO: handle pressing enter to submit ( maybe having it as a form instead and using submit )
  return (
    <div className="login__card">
      <div className="login__title">Login into your account</div>
      <div className="login__input-container">
        <input
          type="email"
          className="login__email login__input"
          id="email"
          aria-describedby="emailHelp"
          placeholder="myemail@gmail.com"
          value={state.email}
          onChange={handleChange}
        />
        <div className="login__input-icon">
          <FaEnvelope className="login__email-icon" />
        </div>
      </div>
      <div className="login__input-container">
        <input
          type={state.seePassword ? 'text' : 'password'}
          className="login__password login__input"
          id="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />

        <button className="login__input-icon" type="button" onClick={togglePassword}>
          {state.seePassword ? (
            <FaEyeSlash className="login__password-icon" />
          ) : (
            <FaEye className="login__password-icon" />
          )}
        </button>
      </div>
      <button className="login__button" type="submit" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default Login;

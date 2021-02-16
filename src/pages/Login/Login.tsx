import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import * as yup from 'yup';
import UserContext from '../../hooks/UserContext';
import paralinkApi from '../../services/interceptor';
import './Login.scss';

interface LoginProps {
  from: string;
}

type LoginFormData = {
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(), // We could define rules here for password if there are
});

const Login = (props: RouteComponentProps<{}, {}, LoginProps>): JSX.Element => {
  const userContext = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm<LoginFormData>({ resolver: yupResolver(loginSchema) });

  const [state, setState] = React.useState({
    // email: '',
    // password: '',
    seePassword: false,
  });

  const { from } = props.location.state || { from: { pathname: '/' } };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
  //   const { id, value } = e.target;
  //   setState((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));
  //   console.log('errors', errors);
  // };

  const togglePassword = (): void => {
    setState((prevState) => ({
      ...prevState,
      seePassword: !prevState.seePassword,
    }));
  };

  const login = async (data: LoginFormData): Promise<any> => {
    // Avoid the page to refresh from submitting the form
    // event.preventDefault();
    // TODO: put like a loading icon on the login button

    // TODO: do like a safe check on the email & password here

    console.log('data', data);
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
      <form onSubmit={handleSubmit(login)}>
        <div className="login__input-container">
          <input
            type="email"
            className={`login__email login__input ${errors.email?.message ? 'login__input--error' : ''}`}
            ref={register({ required: true })}
            id="email"
            aria-describedby="emailHelp"
            placeholder="myemail@gmail.com"
            name="email"
          />
          <div className="login__input-icon">
            <FaEnvelope className="login__email-icon" />
          </div>
        </div>
        {errors.email?.message ? <span className="login__input-error-msg">{errors.email?.message}</span> : ''}

        <div className="login__input-container">
          <input
            type={state.seePassword ? 'text' : 'password'}
            className={`login__password login__input ${errors.email?.message ? 'login__input--error' : ''}`}
            ref={register({ required: true })}
            id="password"
            placeholder="Password"
            name="password"
          />

          <button className="login__input-icon" type="button" onClick={togglePassword}>
            {state.seePassword ? (
              <FaEyeSlash className="login__password-icon" />
            ) : (
              <FaEye className="login__password-icon" />
            )}
          </button>
        </div>
        {errors.password?.message ? <span className="login__input-error-msg">{errors.password?.message}</span> : ''}
        <button className="login__button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

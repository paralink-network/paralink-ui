import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import './Login.scss';
import { authenticateUser, UserAuthenticationData } from '../../../api/auth';
import UserContext from '../../../state/user';
import { HOME_PAGE_ROUTE } from '../../routes';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(), // We could define rules here for password if there are
});

const Login = (): JSX.Element => {
  const history = useHistory();
  const userContext = useContext(UserContext);
  const [seePassword, setSeePasword] = useState(false);
  const { register, handleSubmit, errors } = useForm<UserAuthenticationData>({ resolver: yupResolver(loginSchema) });

  const togglePassword = (): void => setSeePasword(!seePassword);

  const login = (data: UserAuthenticationData): void => {
    // Avoid the page to refresh from submitting the form
    // event.preventDefault();
    // TODO: put like a loading icon on the login button

    // TODO: do like a safe check on the email & password here

    authenticateUser(data)
      .then(() => {
        userContext.login(data.email);
        history.push(HOME_PAGE_ROUTE);
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            type={seePassword ? 'text' : 'password'}
            className={`login__password login__input ${errors.email?.message ? 'login__input--error' : ''}`}
            ref={register({ required: true })}
            id="password"
            placeholder="Password"
            name="password"
          />

          <button className="login__input-icon" type="button" onClick={togglePassword}>
            {seePassword ? <FaEyeSlash className="login__password-icon" /> : <FaEye className="login__password-icon" />}
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

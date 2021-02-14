import React, { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserContext from '../../../hooks/UserContext';
import './NavigationBar.scss';

const NavigationBar = (): JSX.Element => {
  const userContext = useContext(UserContext);

  const logout = (): void => {
    userContext.logout();
  };

  return (
    <div className="navigation-bar">
      <nav className="navigation-bar__nav">
        <div className="navigation-bar__general">
          <Link className="navigation-bar__logo" to="/">
            <img className="navigation-bar__logo-img" src="/assets/images/logo-icon.png" alt="Paralink Network" />
          </Link>
          <div className="navigation-bar__content">
            <ul className="navigation-bar__links">
              <li className="navigation-bar__link">
                <Link to="/ipfs">Paralink Network</Link>
              </li>
              <li className="navigation-bar__link">
                <Link to="/ipfs">IPFS</Link>
              </li>
            </ul>
          </div>
        </div>
        {userContext.isLoggedIn ? (
          <div className="navigation-bar__user">
            {/* TODO: Need to have this as a small menu showing up */}
            <a className="navigation-bar__link navigation-bar__user-link" onClick={logout} href="/">
              <FaUserCircle />
            </a>
          </div>
        ) : (
          ''
        )}
      </nav>
    </div>
  );
};

export default NavigationBar;

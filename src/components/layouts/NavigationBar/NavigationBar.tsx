import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NavigationBar.scss';

const NavigationBar = (): JSX.Element => {
  return (
    <div className="navigation-bar bg-dark">
      <nav className="navigation-bar__nav ">
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
        <div className="navigation-bar__user">
          {/* TODO: Need to be a user page */}
          <a className="navigation-bar__link navigation-bar__user-link" href="/">
            <FaUserCircle />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default NavigationBar;

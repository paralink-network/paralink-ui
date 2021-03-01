import React, { useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserContext from '../../../state/user';
import { HOME_PAGE_ROUTE, IPFS_BASE_PAGE_ROUTE, QUERY_LIST_ROUTE } from '../../routes';
import './NavigationBar.scss';

const NavigationBar = (): JSX.Element => {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="navigation-bar">
      <nav className="navigation-bar__nav">
        <div className="navigation-bar__general">
          <Link className="navigation-bar__logo" to={HOME_PAGE_ROUTE}>
            <img className="navigation-bar__logo-img" src="/assets/images/logo-icon.png" alt="Paralink Network" />
          </Link>
          <div className="navigation-bar__content">
            <ul className="navigation-bar__links">
              <li className="navigation-bar__link">
                <Link to={IPFS_BASE_PAGE_ROUTE}>Paralink Network</Link>
              </li>
              <li className="navigation-bar__link">
                <Link to={IPFS_BASE_PAGE_ROUTE}>IPFS</Link>
              </li>
              <li className='navigation-bar__link'>
                <Link to={QUERY_LIST_ROUTE} />
              </li>
            </ul>
          </div>
        </div>
        {user.isLoggedIn ? (
          <div className="navigation-bar__user">
            {/* TODO: Need to have this as a small menu showing up */}
            <a className="navigation-bar__link navigation-bar__user-link" onClick={logout} href="/login">
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

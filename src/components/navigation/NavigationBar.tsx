import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../state/user';
import { HOME_PAGE_ROUTE, IPFS_BASE_PAGE_ROUTE, QUERY_LIST_ROUTE } from '../routes';

const NavigationBar = (): JSX.Element => {
  const { logout } = useContext(UserContext);

  const [userShow, setUserShow] = useState(false);
  const [mobileShow, setMobileShow] = useState(false);

  const userShowToggle = (): void => setUserShow(!userShow);
  const mobileShowToggle = (): void => setMobileShow(!mobileShow);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              aria-expanded="false"
              aria-controls="mobile-menu"
              onClick={mobileShowToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-8 w-auto" src="/assets/images/logo-icon.png" alt="Workflow" />
              <img className="hidden lg:block h-8 w-auto" src="/assets/images/logo-icon.png" alt="Workflow" />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to={HOME_PAGE_ROUTE}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to={IPFS_BASE_PAGE_ROUTE}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Paralink Network
                </Link>
                <Link
                  to={QUERY_LIST_ROUTE}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Query list
                </Link>
                <Link
                  to={`${QUERY_LIST_ROUTE}/new`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Query
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={userShowToggle}
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
              <div
                className={`origin-top-right absolute right-0 mt-2 py-1 z-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                  userShow ? 'show' : 'hidden'
                }`}
                role="menu"
                aria-orientation="vertical"
              >
                <button
                  type="button"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Your Profile
                </button>
                <button
                  type="button"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Settings
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`sm:hidden ${mobileShow ? 'show' : 'hidden'}`} aria-label="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to={HOME_PAGE_ROUTE}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to={IPFS_BASE_PAGE_ROUTE}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Paralink Network
          </Link>
          <Link
            to={QUERY_LIST_ROUTE}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Query list
          </Link>
          <Link
            to={`${QUERY_LIST_ROUTE}/new`}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Query
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;

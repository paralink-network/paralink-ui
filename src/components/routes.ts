export const HOME_PAGE_ROUTE = '/';

// Authentication pages
export const LOGIN_PAGE_ROUTE = '/login';
export const REGISTER_PAGE_ROUTE = '/register';

// IPFS pages
export const IPFS_BASE_PAGE_ROUTE = '/ipfs';
export const IPFS_PAGE_ROUTE = `${IPFS_BASE_PAGE_ROUTE}/:hash`;

// Query builder routes
export const QUERY_LIST_ROUTE = '/query-builder';
export const QUERY_BUILDER_ROUTE = `${QUERY_LIST_ROUTE}/:hash`;

// Error pages
export const ERROR_404_PAGE_ROUTE = '/error404';

export const USER_ROUTES = [
  HOME_PAGE_ROUTE,
  IPFS_BASE_PAGE_ROUTE,
  IPFS_PAGE_ROUTE,
  QUERY_LIST_ROUTE,
  QUERY_BUILDER_ROUTE,
];

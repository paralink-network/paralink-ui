export const HOME_PAGE = '/';

// Authentication pages
export const LOGIN_PAGE = '/login';
export const REGISTER_PAGE = '/register';

// IPFS pages
export const IPFS_BASE_PAGE = '/ipfs';
export const IPFS_PAGE = `${IPFS_BASE_PAGE}/:hash`;

// Error pages
export const ERROR_404_PAGE = '/error404';

export const USER_PAGES = [HOME_PAGE, IPFS_BASE_PAGE, IPFS_PAGE];

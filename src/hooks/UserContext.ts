import { createContext } from 'react';

interface UserContextState {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext({} as UserContextState);

export default UserContext;

import { createContext } from 'react';

interface User {
  email: string;
  isLoggedIn: boolean;
}

interface UserContextState {
  user: User;
  login: (email: string) => void;
  logout: () => void;
}

export const emptyUser: User = {
  isLoggedIn: false,
  email: '',
};

export const emptyUserState: UserContextState = {
  user: { ...emptyUser },
  login: () => {},
  logout: () => {},
};

const UserContext = createContext<UserContextState>({ ...emptyUserState });

export default UserContext;

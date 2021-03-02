import { axiosInstance } from './api';

const LOGIN_URL = '/auth';

export interface UserAuthenticationData {
  email: string;
  password: string;
}

const loginUser = (data: UserAuthenticationData): Promise<void> => {
  const { email, password } = data;

  if (email !== 'test@test.com') throw new Error('Email does not exist!');
  if (password !== 'geslo123') throw new Error('Password is incorrect!');
  axiosInstance.post<{}>(LOGIN_URL, data).then((res) => res.data);
  return Promise.resolve();
};

export const authenticateUser = async (data: UserAuthenticationData): Promise<void> => {
  await loginUser(data);
  // const jwtTokens = await obtainTokenApi(data.email, data.password);
  // saveTokens(jwtTokens);
};

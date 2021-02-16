import axios from 'axios';
import { apis, storageNames } from '../../config';

const paralinkApi = axios.create({
  baseURL: apis.url,
  timeout: apis.timeout,
});

paralinkApi.interceptors.request.use(
  (config: any) => {
    // Check for user token, we can't use hooks from here
    const accessToken = localStorage.getItem(storageNames.user);

    // If user not logged we just pass it through, the backend should not accept it
    // This lets us do api requests like for logging in for example.
    // Depending on the API we could potentially reject here before doing the call and add an exception for login path
    if (!accessToken) {
      return config;
    }

    // Otherwise set the token in the request
    const request = config;
    request.headers.authorization = `Bearer ${accessToken}`;
    return request;
  },
  (error) => {
    // User might have been rejected
    return Promise.reject(error);
  },
);

export default paralinkApi;

import axios from 'axios';

// const OBTAIN_TOKEN = '/token/obtain/';
// const REFRESH_TOKEN_URL = '/token/refresh/';

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

// interface JWTTokenResponse {
//   refresh: string;
//   access: string;
// }

export const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:7424/api/',
  timeout: 5000,
  headers: {
    // 'Authorization': localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

// export const saveTokens = (jwtToken: JWTTokenResponse): JWTTokenResponse => {
//   localStorage.setItem(ACCESS_TOKEN, jwtToken.access);
//   localStorage.setItem(REFRESH_TOKEN, jwtToken.refresh);
//   return jwtToken;
// };

const localGet = (key: string, defaultValue = ''): string => {
  const value = localStorage.getItem(key);
  if (value === null) return defaultValue;
  return value;
};

export const getAccessToken = (): string => localGet(ACCESS_TOKEN);
export const getRefreshToken = (): string => localGet(REFRESH_TOKEN);

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    // const originalRequest = err.config;
    // If refresh tokens is expired redirect to login page
    // if (err.response.status === 401 && originalRequest.url === REFRESH_TOKEN_URL) {
    //   window.location.href = '/login/';
    //   return Promise.reject(err);
    // }

    // // If access token is expired update it
    // if (err.response.status === 401 && err.response.statusText === 'Unauthorized') {
    //   return axiosInstance
    //     .post<JWTTokenResponse>(REFRESH_TOKEN_URL, {refresh: localStorage.getItem(REFRESH_TOKEN)})
    //     .then(res => res.data)
    //     .then(saveTokens)
    //     .then(res => {
    //       axiosInstance.defaults.headers['Authorization'] = 'JWT ' + res.access;
    //       originalRequest.headers['Authorization'] = 'JWT ' + res.access;

    //       return axiosInstance(originalRequest);
    //     })
    // }

    return Promise.reject(err);
  },
);

// export const obtainTokenApi = async (email: string, password: string): Promise<JWTTokenResponse> =>
//   axiosInstance
//     .post<JWTTokenResponse>(OBTAIN_TOKEN, { email, password })
//     .then((res) => res.data);

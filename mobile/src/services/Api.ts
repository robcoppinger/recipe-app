import axios from 'axios';
import { env } from '../../env';
import { IUser } from '../redux/modules/auth/types';
import { actions, selectors } from '../redux/modules/auth/Auth';
import { store } from '../redux/store';

const axiosInstance = axios.create({ baseURL: env.apiBaseUrl });

/**
 * API request interceptor. For each request, retrieve the access token
 * from the redux store and attach it to the Authorization header
 */
axiosInstance.interceptors.request.use((config) => {
  const { getState } = store;
  const accessToken = selectors.accessToken(getState());
  if (accessToken) config.headers['Authorization'] = 'Bearer ' + accessToken;
  return config;
});

/**
 * API Response interceptor. For every unauthorized response,
 * try to refresh the access token and retry the original request
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      const { getState, dispatch } = store;
      const refreshToken = selectors.refreshToken(getState());

      // no refresh token found - not worth trying to refresh
      if (!refreshToken) return axiosInstance(originalRequest);
      originalRequest._retry = true;

      // a fresh instance is created so that if the /refresh-token
      // request fails, the interceptor on axiosInstance doesn't
      // pick it up and retry refresh request, resulting in an
      // infinite loop.
      const freshInstance = axios.create({ baseURL: env.apiBaseUrl });
      return freshInstance
        .post('/refresh-token', undefined, {
          headers: { refreshtoken: refreshToken },
        })
        .then((res) => {
          if (!res.data) return Promise.reject(error);
          const { accessToken, refreshToken } = res.data;
          if (!accessToken || !refreshToken) return Promise.reject(error);

          // update redux store with new tokens
          dispatch(actions.refreshTokens({ accessToken, refreshToken }));

          // rerun and return original request
          return axiosInstance(originalRequest);
        })
        .catch((e) => {
          return Promise.reject(e);
        });
    }
    return Promise.reject(error);
  },
);

interface ILogin {
  email: string;
  password: string;
}
interface RLogin {
  data: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}
export const login = ({ email, password }: ILogin): Promise<RLogin> =>
  axiosInstance.post('/login', {
    email,
    password,
  });

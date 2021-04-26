import axios from 'axios';
import { env } from '../../env';
import { IUser } from '../redux/modules/auth/types';

const axiosInstance = axios.create({ baseURL: env.apiBaseUrl });

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

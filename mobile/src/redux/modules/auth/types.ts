import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './Auth';

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface IAuthState {
  isLoggedIn: boolean;
  isGuest?: boolean;
  accessToken?: string;
  refreshToken?: string;
  user?: IUser;
}

export interface ILoginSuccess {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface LoginSuccessAction extends ILoginSuccess {
  type: typeof LOGIN_SUCCESS;
}

export interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

export type AuthActions = LoginSuccessAction | LogoutSuccessAction;

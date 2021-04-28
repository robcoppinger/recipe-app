import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REFRESH_TOKENS } from './Auth';

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

export interface IRefreshTokens {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokensAction extends IRefreshTokens {
  type: typeof REFRESH_TOKENS;
}

export type AuthActions =
  | LoginSuccessAction
  | LogoutSuccessAction
  | RefreshTokensAction;

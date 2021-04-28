import produce from 'immer';
import { RootState, ReduxAction } from '../..';
import {
  IAuthState,
  ILoginSuccess,
  IRefreshTokens,
  LoginSuccessAction,
  LogoutSuccessAction,
  RefreshTokensAction,
} from './types';

export const UPDATE_UNFOUND_ORDER = 'shoppingList/UPDATE_UNFOUND_ORDER';

const initialState: IAuthState = {
  isLoggedIn: false,
};

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const REFRESH_TOKENS = 'auth/REFRESH_TOKENS';

export default function reducer(
  state: IAuthState = initialState,
  action: ReduxAction,
): IAuthState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return produce(state, (draft) => {
        draft.isLoggedIn = true;
        draft.isGuest = false;
        draft.accessToken = action.accessToken;
        draft.refreshToken = action.refreshToken;
        draft.user = action.user;
      });

    case LOGOUT_SUCCESS:
      return initialState;

    case REFRESH_TOKENS:
      return produce(state, (draft) => {
        draft.accessToken = action.accessToken;
        draft.refreshToken = action.refreshToken;
      });

    default:
      return state;
  }
}

export const actions = {
  loginSuccess: ({
    accessToken,
    refreshToken,
    user,
  }: ILoginSuccess): LoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    accessToken,
    refreshToken,
    user,
  }),
  logoutSuccess: (): LogoutSuccessAction => ({
    type: LOGOUT_SUCCESS,
  }),
  refreshTokens: ({
    accessToken,
    refreshToken,
  }: IRefreshTokens): RefreshTokensAction => ({
    type: REFRESH_TOKENS,
    accessToken,
    refreshToken,
  }),
};

export const selectors = {
  isLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  user: (state: RootState) => state.auth.user,
  accessToken: (state: RootState) => state.auth.accessToken,
  refreshToken: (state: RootState) => state.auth.refreshToken,
};

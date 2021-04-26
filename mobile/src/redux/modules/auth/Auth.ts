import produce from 'immer';
import { RootState, ReduxAction } from '../..';
import {
  IAuthState,
  ILoginSuccess,
  LoginSuccessAction,
  LogoutSuccessAction,
} from './types';

export const UPDATE_UNFOUND_ORDER = 'shoppingList/UPDATE_UNFOUND_ORDER';

const initialState: IAuthState = {
  isLoggedIn: false,
};

export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';

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
};

export const selectors = {
  isLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  user: (state: RootState) => state.auth.user,
};

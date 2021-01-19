import produce from 'immer';
import {RootState, ReduxAction} from '../..';
import {ApplicationState, ToggleThemeAction} from './types';

export const UPDATE_UNFOUND_ORDER = 'shoppingList/UPDATE_UNFOUND_ORDER';

const initialState: ApplicationState = {
  theme: 'light',
};

export const TOGGLE_THEME = 'application/TOGGLE_THEME';

export default function reducer(
  state: ApplicationState = initialState,
  action: ReduxAction,
): ApplicationState {
  switch (action.type) {
    case TOGGLE_THEME:
      return produce(state, (draft) => {
        draft.theme = state.theme === 'light' ? 'dark' : 'light';
      });

    default:
      return state;
  }
}

export const actions = {
  toggleTheme: (): ToggleThemeAction => ({
    type: TOGGLE_THEME,
  }),
};

export const selectors = {
  theme: (state: RootState) => state.application.theme,
};

import {TOGGLE_THEME} from './Application';

export type ApplicationState = {
  theme: 'light' | 'dark';
};

export type ToggleThemeAction = {
  type: typeof TOGGLE_THEME;
};

export type ApplicationActions = ToggleThemeAction;

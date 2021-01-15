import {fonts} from './Fonts';

import {DefaultTheme, ThemeColors} from 'styled-components';

type ColorsObj = {
  light: ThemeColors;
  dark: ThemeColors;
};

const themeColors: ColorsObj = {
  light: {
    screenBackground: '#f5f5f5',
    headerBackground: '#FFFFFF',
    headerBorder: '#EDEDED',
    primary: '#DE8888',
    text: '#000000',
    textSecondary: '#A8A8A8',
    paper: '#FFFFFF',
    iconColor: '#000000',
    iconSubtleColor: '#d1d1d1',
  },
  dark: {
    screenBackground: '#3d3d3d',
    headerBackground: '#262626',
    headerBorder: '#EDEDED',
    primary: '#66cfff',
    text: '#ededed',
    textSecondary: '#9e9e9e',
    paper: '#262626',
    iconColor: '#ededed',
    iconSubtleColor: '#d1d1d1',
  },
};

export const theme = (selectedTheme: 'light' | 'dark'): DefaultTheme => ({
  pagePadding: '8px',
  colors: themeColors[selectedTheme],
  fontSize: {
    h1: '24px',
    h2: '20px',
    h3: '16px',
    regular: '14px',
    small: '12px',
    xsmall: '10px',
  },
  defaultFontFamily: fonts.montserrat,
  defaultFontStyle: 'regular',
  borderRadius: '8px',
  shadow: '0px 1px 3px rgba(0, 0, 0, 0.1);',
});

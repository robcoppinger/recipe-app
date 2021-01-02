import {fonts} from './Fonts';

import {DefaultTheme, ThemeColors} from 'styled-components';

type ColorsObj = {
  light: ThemeColors;
  dark: ThemeColors;
};

const themeColors: ColorsObj = {
  light: {
    screenBackground: '#f5f5f5',
    headerColor: '#FFFFFF',
    primary: '#DE8888',
    text: '#000000',
    textSecondary: '#A8A8A8',
    fill: '#FFFFFF',
    iconColor: '#000000',
  },
  dark: {
    screenBackground: '#3d3d3d',
    headerColor: '#262626',
    primary: '#66cfff',
    text: '#ededed',
    textSecondary: '#9e9e9e',
    fill: '#262626',
    iconColor: '#ededed',
  },
};

export const theme = (selectedTheme: 'light' | 'dark'): DefaultTheme => ({
  colors: themeColors[selectedTheme],
  fontSize: {
    h1: 24,
    h2: 20,
    h3: 16,
    regular: 14,
    small: 12,
    xsmall: 10,
  },
  defaultFontFamily: fonts.montserrat,
  defaultFontStyle: 'regular',
  borderRadius: '6px',
  shadow: '0px 1px 3px rgba(0, 0, 0, 0.1);',
});

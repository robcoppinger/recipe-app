import {fonts} from './Fonts';
import {DefaultTheme, ThemeColors} from 'styled-components';

type ColorsObj = {
  light: ThemeColors;
  dark: ThemeColors;
};

const themeColors: ColorsObj = {
  light: {
    screenBackground: '#f0f0f0',
    headerBackground: '#FFFFFF',
    headerBorder: '#EDEDED',
    primary: '#DE8888',
    primaryFaded: '#F8EEEE',
    text: '#000000',
    textSecondary: '#A8A8A8',
    paper: '#fcfcfc',
    paperSecondary: '#f9f9f9',
    itemSeparator: '#EDEDED',
    itemSeparatorSecondary: '#E3E3E3',
    iconColor: '#000000',
    iconSubtleColor: '#D1D1D1',
    textInputBorder: '#e0e0e0',
    placeholder: 'rgba(0,0,0.1, 0.2)',
    danger: '#DB302A',
    drawerActiveTintColor: '#F5C5BC',
  },
  dark: {
    screenBackground: '#303030',
    headerBackground: '#262626',
    headerBorder: '#141414',
    primary: '#66cfff',
    primaryFaded: '#2F3D43',
    text: '#EDEDED',
    textSecondary: '#9E9E9E',
    paper: '#292929',
    paperSecondary: '#2c2c2c',
    itemSeparator: '#212121',
    itemSeparatorSecondary: '#E3E3E3',
    iconColor: '#EDEDED',
    iconSubtleColor: '#828282',
    textInputBorder: '#828282',
    placeholder: 'rgba(0,0,0.1, 0.2)',
    danger: '#DB302A',
    drawerActiveTintColor: '#E0FDFF',
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
  shadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  itemPadding: '20px',
});

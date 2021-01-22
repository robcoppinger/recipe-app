// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export type FontStyle =
    | 'bold'
    | 'semiBold'
    | 'medium'
    | 'regular'
    | 'light'
    | 'thin';

  export type FontFamily = {[key in FontStyle]: string};

  export type ThemeColors = {
    screenBackground: string;
    headerBackground: string;
    headerBorder: string;
    primary: string;
    primaryFaded: string;
    text: string;
    textSecondary: string;
    paper: string;
    paperSecondary: string;
    itemSeparator: string;
    itemSeparatorSecondary: string;
    iconColor: string;
    iconSubtleColor: string;
    textInputBorder: string;
    placeholder: string;
    danger: string;
    drawerActiveTintColor: string;
  };

  export type FontSize = {
    h1: string;
    h2: string;
    h3: string;
    regular: string;
    small: string;
    xsmall: string;
  };

  export interface DefaultTheme {
    pagePadding: string;
    colors: ThemeColors;
    fontSize: FontSize;
    defaultFontFamily: FontFamily;
    defaultFontStyle: FontStyle;
    borderRadius: string;
    shadow: string;
    itemPadding: string;
  }
}

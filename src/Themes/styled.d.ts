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
    headerColor: string;
    primary: string;
    text: string;
    textSecondary: string;
    fill: string;
    iconColor: string;
  };

  export type FontSize = {
    h1: number;
    h2: number;
    h3: number;
    regular: number;
    small: number;
    xsmall: number;
  };

  export interface DefaultTheme {
    colors: ThemeColors;
    fontSize: FontSize;
    defaultFontFamily: FontFamily;
    defaultFontStyle: FontStyle;
    borderRadius: string;
    shadow: string;
  }
}

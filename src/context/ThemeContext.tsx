import React from 'react';
import {
  ThemeContext,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components/native';

import {theme} from '../Themes';

export function ThemeProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const selectedTheme = 'light';
  return (
    <StyledThemeProvider theme={theme(selectedTheme)}>
      {children}
    </StyledThemeProvider>
  );
}

export function useTheme() {
  const themeContext = React.useContext(ThemeContext);
  if (themeContext === undefined) {
    throw new Error(`useTheme must be used within a ThemeProvider`);
  }
  return themeContext;
}

import React from 'react';
import {
  ThemeContext,
  ThemeProvider as StyledThemeProvider,
} from 'styled-components/native';

import { theme } from '../themes';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { selectors } from '../redux/modules/application/Application';

export function ThemeProvider({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const selectedTheme = useSelector(selectors.theme);
  return (
    <StyledThemeProvider theme={theme(selectedTheme)}>
      <StatusBar
        barStyle={selectedTheme === 'light' ? 'dark-content' : 'light-content'}
      />
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

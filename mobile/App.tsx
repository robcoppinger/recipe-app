/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import 'react-native-get-random-values';
import { ThemeProvider } from './src/context/ThemeContext';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './src/redux/store';
import { AppNavigator } from './src/navigators/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SnackContextProvider } from './src/context/SnackContext';
import { ModalViewContextProvider } from './src/context/ModalViewContext';

const { persistor, store } = configureStore();

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SafeAreaProvider>
            <ModalViewContextProvider>
              <SnackContextProvider>
                <AppNavigator />
              </SnackContextProvider>
            </ModalViewContextProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;

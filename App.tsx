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
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Recipes} from './src/screens/Recipes';
import {Recipe} from './src/screens/Recipe';
import {ThemeProvider} from './src/context/ThemeContext';

import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {configureStore} from './src/redux/store';

const {persistor, store} = configureStore();

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName="Recipes">
              <Stack.Screen name="Recipes" component={Recipes} />
              <Stack.Screen name="Recipe" component={Recipe} />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;

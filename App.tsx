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
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Recipes} from './src/screens/Recipes';
import {Recipe} from './src/screens/Recipe';
import {navigationRef} from './src/services/NavigationService';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Recipes">
          <Stack.Screen name="Recipes" component={Recipes} />
          <Stack.Screen name="Recipe" component={Recipe} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

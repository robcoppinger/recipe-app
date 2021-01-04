import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Recipes} from '../screens/Recipes';
import {Recipe} from '../screens/Recipe';
import {createStackNavigator} from '@react-navigation/stack';

export const AppNavigator = () => {
  const Stack = createStackNavigator();
  return (
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
  );
};

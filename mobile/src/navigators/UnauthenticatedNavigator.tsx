import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Login';

export type UnauthenticatedStackParamList = {
  Login: undefined;
};

const UnauthenticatedStack = createStackNavigator<UnauthenticatedStackParamList>();

export const UnauthenticatedNavigator = () => (
  <UnauthenticatedStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Login">
    <UnauthenticatedStack.Screen name="Login" component={Login} />
  </UnauthenticatedStack.Navigator>
);

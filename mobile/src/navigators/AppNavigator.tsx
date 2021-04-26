import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UnauthenticatedNavigator } from './UnauthenticatedNavigator';
import { AuthenticatedNavigator } from './AuthenticatedNavigator';
import { useSelector } from 'react-redux';
import { selectors } from '../redux/modules/auth/Auth';
import { env } from '../../env';

export const AppNavigator = () => {
  const isLoggedIn = useSelector(selectors.isLoggedIn);
  const isAuthenticated = isLoggedIn || !env.featureFlags.isAuthEnabled;

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <AuthenticatedNavigator />
      ) : (
        <UnauthenticatedNavigator />
      )}
    </NavigationContainer>
  );
};

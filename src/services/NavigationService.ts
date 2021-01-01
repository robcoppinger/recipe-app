import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef>();

// Call to navigate to a specific Route
export const navigate = (routeName: string, params?: any) => {
  navigationRef.current?.navigate(routeName, params);
};
// Call to navigate and reset so that the person cant go back
export const navigateAndReset = (routeName: string, params?: any) => {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: routeName, params}],
  });
};

// Call to go back one screen on stack
export const goBack = () => {
  navigationRef.current?.goBack();
};

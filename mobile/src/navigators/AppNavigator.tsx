import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '../context/ThemeContext';
import { DrawerContent } from './DrawerContent';
import { SvgImage } from '../components/common/SvgImage';
import { RecipeNavigator } from './RecipeNavigator';
import { ShoppingListNavigator } from './ShoppingListNavigator';
import { RoadmapNavigator } from './RoadmapNavigator';
import { UnauthenticatedNavigator } from './UnauthenticatedNavigator';

const Drawer = createDrawerNavigator();

export const AppNavigator = () => {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: theme.colors.primary,
          inactiveTintColor: theme.colors.text,
          labelStyle: {
            fontFamily: theme.defaultFontFamily.regular,
            fontWeight: '600',
          },
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Recipes">
        <Drawer.Screen
          name="Recipes"
          component={RecipeNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <SvgImage icon="list" fill={color} size={30} />
            ),
          }}
        />
        <Drawer.Screen
          name="Shopping List"
          component={ShoppingListNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <SvgImage icon="cart" fill={color} size={30} />
            ),
          }}
        />
        <Drawer.Screen
          name="Roadmap"
          component={RoadmapNavigator}
          options={{
            drawerIcon: ({ color }) => (
              <SvgImage icon="info" fill={color} size={30} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

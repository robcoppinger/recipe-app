import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useTheme} from '../context/ThemeContext';
import {DrawerContent} from './DrawerContent';
import {Images} from '../../assets/images';
import {SvgImage} from '../components/common/SvgImage';
import {RecipeNavigator} from './RecipeNavigator';
import {ShoppingListNavigator} from './ShoppingListNavigator';

const Drawer = createDrawerNavigator();

export const AppNavigator = () => {
  const theme = useTheme();

  const icon = (image: any, color: string) => (
    <SvgImage
      source={image}
      style={{
        fill: color,
        width: 30,
        height: 30,
      }}
    />
  );

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
            drawerIcon: ({color}) => icon(Images.list, color),
          }}
        />
        <Drawer.Screen
          name="Shopping List"
          component={ShoppingListNavigator}
          options={{
            drawerIcon: ({color}) => icon(Images.cart, color),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

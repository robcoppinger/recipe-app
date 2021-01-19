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

  const icon = (image: any) => (
    <SvgImage
      source={image}
      style={{fill: theme.colors.primary, width: 30, height: 30}}
    />
  );

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: theme.colors.drawerActiveTintColor,
          labelStyle: {
            fontFamily: theme.defaultFontFamily.regular,
            fontWeight: '600',
            color: theme.colors.primary,
          },
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Recipes">
        <Drawer.Screen
          name="Recipes"
          component={RecipeNavigator}
          options={{
            drawerIcon: () => icon(Images.list),
          }}
        />
        <Drawer.Screen
          name="Shopping List"
          component={ShoppingListNavigator}
          options={{
            drawerIcon: () => icon(Images.cart),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

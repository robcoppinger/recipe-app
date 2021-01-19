import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ShoppingList} from '../screens/ShoppingList';
import {ShoppingLists} from '../screens/ShoppingLists';

type ShoppingListParamList = {
  ShoppingLists: undefined;
  ShoppingList: {shoppingListId: string};
};

export type ShoppingListScreenRouteProp = RouteProp<
  ShoppingListParamList,
  'ShoppingList'
>;

const ShoppingListStack = createStackNavigator<ShoppingListParamList>();

export const ShoppingListNavigator = () => (
  <ShoppingListStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="ShoppingLists">
    <ShoppingListStack.Screen name="ShoppingLists" component={ShoppingLists} />
    <ShoppingListStack.Screen name="ShoppingList" component={ShoppingList} />
  </ShoppingListStack.Navigator>
);

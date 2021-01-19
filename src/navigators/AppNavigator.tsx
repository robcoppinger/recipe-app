import React from 'react';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {Recipes} from '../screens/Recipes';
import {Recipe} from '../screens/Recipe';
import {createStackNavigator} from '@react-navigation/stack';
import {ShoppingList} from '../screens/ShoppingList';

export type RootStackParamList = {
  Recipes: undefined;
  Recipe: {recipeId: string};
  ShoppingList: {shoppingListId: string};
};

export type RecipeScreenRouteProp = RouteProp<RootStackParamList, 'Recipe'>;
export type ShoppingListScreenRouteProp = RouteProp<
  RootStackParamList,
  'ShoppingList'
>;

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Recipes">
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="Recipe" component={Recipe} />
        <Stack.Screen name="ShoppingList" component={ShoppingList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

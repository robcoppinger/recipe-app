import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {Recipes} from '../screens/Recipes';
import {Recipe} from '../screens/Recipe';
import {createStackNavigator} from '@react-navigation/stack';

export type RecipeStackParamList = {
  Recipes: undefined;
  Recipe: {recipeId: string};
};

export type RecipeScreenRouteProp = RouteProp<RecipeStackParamList, 'Recipe'>;

const RecipeStack = createStackNavigator<RecipeStackParamList>();

export const RecipeNavigator = () => (
  <RecipeStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName="Recipes">
    <RecipeStack.Screen name="Recipes" component={Recipes} />
    <RecipeStack.Screen name="Recipe" component={Recipe} />
  </RecipeStack.Navigator>
);

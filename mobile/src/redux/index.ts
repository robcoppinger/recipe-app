import { combineReducers } from 'redux';
import application from './modules/application/Application';
import ingredients from './modules/ingredients/Ingredients';
import recipes from './modules/recipes/Recipes';
import method from './modules/method/Method';
import shoppingLists from './modules/shoppingLists/ShoppingLists';
import shoppingListItems from './modules/shoppingListItems/ShoppingListItems';
import { IngredientsActions } from './modules/ingredients/types';
import { RecipesActions } from './modules/recipes/types';
import { MethodActions } from './modules/method/types';
import { ShoppingListItemActions } from './modules/shoppingListItems/types';
import { ShoppingListActions } from './modules/shoppingLists/types';
import { ApplicationActions } from './modules/application/types';

const reducer = combineReducers({
  application,
  recipes,
  ingredients,
  method,
  shoppingLists,
  shoppingListItems,
});

export const rootReducer = (state: any, action: any) => {
  return reducer(state, action);
};

export type ReduxAction =
  | ApplicationActions
  | IngredientsActions
  | RecipesActions
  | MethodActions
  | ShoppingListActions
  | ShoppingListItemActions;

export type RootState = ReturnType<typeof rootReducer>;

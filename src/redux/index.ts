import {combineReducers} from 'redux';
import ingredients from './modules/ingredients/Ingredients';
import recipes from './modules/recipes/Recipes';
import method from './modules/method/Method';
import {IngredientsActions} from './modules/ingredients/types';
import {RecipesActions} from './modules/recipes/types';
import {MethodActions} from './modules/method/types';

const reducer = combineReducers({
  recipes,
  ingredients,
  method,
});

export const rootReducer = (state: any, action: any) => {
  return reducer(state, action);
};

export type ReduxAction = IngredientsActions | RecipesActions | MethodActions;

export type RootState = ReturnType<typeof rootReducer>;

import {combineReducers} from 'redux';
import ingredients from './modules/ingredients/Ingredients';
import {IngredientsActions} from './modules/ingredients/types';
import {RecipesActions} from './modules/recipes/types';

const reducer = combineReducers({
  ingredients,
});

export const rootReducer = (state: any, action: any) => {
  return reducer(state, action);
};

export type ReduxAction = IngredientsActions | RecipesActions;

export type RootState = ReturnType<typeof rootReducer>;

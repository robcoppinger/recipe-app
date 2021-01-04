import {combineReducers} from 'redux';
import ingredients from './modules/ingredients/ingredients';
import {IngredientsActions} from './modules/ingredients/types';

const reducer = combineReducers({
  ingredients,
});

export const rootReducer = (state: any, action: any) => {
  return reducer(state, action);
};

export type ReduxAction = IngredientsActions;

export type RootState = ReturnType<typeof rootReducer>;

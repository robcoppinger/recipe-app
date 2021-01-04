import produce from 'immer';
import {RootState, ReduxAction} from '../..';
import {
  IngredientsState,
  Ingredient,
  AddIngredientAction,
  IngredientsActions,
  DeleteIngredientAction,
} from './types';

export const ADD_INGREDIENT = 'ingredient/ADD';
export const DELETE_INGREDIENT = 'ingredient/DELETE';

const initialState: IngredientsState = {};

export default function reducer(
  state: IngredientsState = initialState,
  action: ReduxAction,
): IngredientsState {
  switch (action.type) {
    case ADD_INGREDIENT:
      return produce(state, (draft) => {
        draft[action.ingredientId] = action.ingredient;
      });
    case DELETE_INGREDIENT:
      return produce(state, (draft) => {
        delete draft[action.ingredientId];
      });
    default:
      return state;
  }
}

export const actions = {
  addIngredient: (
    ingredientId: string,
    recipeId: string,
    ingredient: Ingredient,
  ): AddIngredientAction => ({
    type: ADD_INGREDIENT,
    ingredientId,
    recipeId,
    ingredient,
  }),
  deleteIngredient: (
    ingredientId: string,
    recipeId: string,
  ): DeleteIngredientAction => ({
    type: DELETE_INGREDIENT,
    ingredientId,
    recipeId,
  }),
};

export const selectors = {
  ingredient: (state: RootState, ingredientId: string): Ingredient =>
    state.ingredients[ingredientId] || {},
};

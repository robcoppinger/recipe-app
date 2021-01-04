import produce from 'immer';
import {RootState, ReduxAction} from '../..';
import {IngredientsState, Ingredient, AddIngredientAction} from './types';

export const ADD_INGREDIENT = 'ingredient/ADD';

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
};

export const selectors = {
  ingredient: (state: RootState, ingredientId: string): Ingredient =>
    state.ingredients[ingredientId],
};

import produce from 'immer';
import {RootState, ReduxAction} from '../..';
import {
  IngredientsState,
  Ingredient,
  AddIngredientAction,
  DeleteIngredientAction,
  EditIngredientAction,
} from './types';

export const ADD_INGREDIENT = 'ingredient/ADD';
export const DELETE_INGREDIENT = 'ingredient/DELETE';
export const EDIT_INGREDIENT = 'ingredient/EDIT';

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
    case EDIT_INGREDIENT:
      if (!state[action.ingredientId]) return state;
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
  deleteIngredient: (
    ingredientId: string,
    recipeId: string,
  ): DeleteIngredientAction => ({
    type: DELETE_INGREDIENT,
    ingredientId,
    recipeId,
  }),
  editIngredient: (
    ingredientId: string,
    ingredient: Ingredient,
  ): EditIngredientAction => ({
    type: EDIT_INGREDIENT,
    ingredientId,
    ingredient,
  }),
};

export const selectors = {
  ingredient: (state: RootState, ingredientId: string): Ingredient =>
    state.ingredients[ingredientId] || {},
};

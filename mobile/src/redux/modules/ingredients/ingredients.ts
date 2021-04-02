import produce from 'immer';
import { RootState, ReduxAction } from '../..';
import {
  IngredientsState,
  Ingredient,
  AddIngredientAction,
  DeleteIngredientAction,
  EditIngredientAction,
  DeleteBulkIngredientsAction,
} from './types';
import { DELETE_RECIPE } from '../recipes/Recipes';

export const ADD_INGREDIENT = 'ingredient/ADD';
export const DELETE_INGREDIENT = 'ingredient/DELETE';
export const EDIT_INGREDIENT = 'ingredient/EDIT';
export const DELETE_BULK_INGREDIENTS = 'ingredient/DELETE_BULK';

const initialState: IngredientsState = {};

export default function reducer(
  state: IngredientsState = initialState,
  action: ReduxAction,
): IngredientsState {
  switch (action.type) {
    case ADD_INGREDIENT:
      return produce(state, (draft) => {
        draft[action.ingredientId] = {
          recipeId: action.recipeId,
          ...action.ingredient,
        };
      });
    case DELETE_INGREDIENT:
      return produce(state, (draft) => {
        delete draft[action.ingredientId];
      });
    case EDIT_INGREDIENT:
      if (!state[action.ingredientId]) return state;
      return produce(state, (draft) => {
        draft[action.ingredientId] = {
          ...draft[action.ingredientId],
          ...action.ingredient,
        };
      });
    case DELETE_RECIPE:
      return produce(state, (draft) => {
        for (const [ingredientId, ingredient] of Object.entries(state)) {
          if (ingredient.recipeId === action.recipeId)
            delete draft[ingredientId];
        }
      });
    case DELETE_BULK_INGREDIENTS:
      return produce(state, (draft) => {
        action.ingredientIds.map((ingredientId) => {
          delete draft[ingredientId];
        });
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
  deleteBulkIngredients: (
    recipeId: string,
    ingredientIds: string[],
  ): DeleteBulkIngredientsAction => ({
    type: DELETE_BULK_INGREDIENTS,
    recipeId,
    ingredientIds,
  }),
};

export const selectors = {
  ingredient: (state: RootState, ingredientId: string): Ingredient =>
    state.ingredients[ingredientId] || {},
};

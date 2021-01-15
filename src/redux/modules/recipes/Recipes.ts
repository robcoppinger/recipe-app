import produce from 'immer';
import {RootState, ReduxAction} from '../..';
import {
  RecipesState,
  AddEmptyRecipeAction,
  EditRecipeTitleAction,
  DeleteRecipeAction,
} from './types';
import {ADD_INGREDIENT, DELETE_INGREDIENT} from '../ingredients/Ingredients';
import {ADD_STEP, DELETE_STEP} from '../method/Method';

export const ADD_EMPTY_RECIPE = 'recipes/ADD_EMPTY';
export const EDIT_TITLE = 'recipes/EDIT_TITLE';
export const DELETE_RECIPE = 'recipes/DELETE_RECIPE';

const initialState: RecipesState = {};

export default function reducer(
  state: RecipesState = initialState,
  action: ReduxAction,
): RecipesState {
  switch (action.type) {
    case ADD_EMPTY_RECIPE:
      return produce(state, (draft) => {
        draft[action.recipeId] = action.recipe;
      });
    case DELETE_RECIPE:
      return produce(state, (draft) => {
        delete draft[action.recipeId];
      });
    case ADD_INGREDIENT:
      if (!state[action.recipeId]) return state;
      return produce(state, (draft) => {
        draft[action.recipeId].ingredients.push(action.ingredientId);
      });
    case ADD_STEP:
      if (!state[action.recipeId]) return state;
      return produce(state, (draft) => {
        draft[action.recipeId].method.push(action.stepId);
      });
    case EDIT_TITLE:
      if (!state[action.recipeId]) return state;
      return produce(state, (draft) => {
        draft[action.recipeId].title = action.title;
      });
    case DELETE_INGREDIENT:
      if (!state[action.recipeId]) return state;
      return produce(state, (draft) => {
        draft[action.recipeId].ingredients = state[
          action.recipeId
        ].ingredients.filter((id) => id !== action.ingredientId);
      });
    case DELETE_STEP:
      if (!state[action.recipeId]) return state;
      return produce(state, (draft) => {
        draft[action.recipeId].method = state[
          action.recipeId
        ].method.filter((id) => id !== action.stepId);
      });
    default:
      return state;
  }
}

export const actions = {
  addEmptyRecipe: (recipeId: string): AddEmptyRecipeAction => ({
    type: ADD_EMPTY_RECIPE,
    recipeId,
    recipe: {
      title: 'New Recipe',
      ingredients: [],
      method: [],
    },
  }),
  editTitle: (recipeId: string, title: string): EditRecipeTitleAction => ({
    type: EDIT_TITLE,
    recipeId,
    title,
  }),
  deleteRecipe: (recipeId: string): DeleteRecipeAction => ({
    type: DELETE_RECIPE,
    recipeId,
  }),
};

export const selectors = {
  recipe: (state: RootState, recipeId: string) => state.recipes[recipeId],
  recipes: (state: RootState) => state.recipes,
};

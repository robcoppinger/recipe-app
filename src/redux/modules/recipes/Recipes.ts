import React from 'react';
import produce from 'immer';
import {RootState, ReduxAction} from '../..';
import {
  RecipesState,
  AddEmptyRecipeAction,
  EditRecipeTitleAction,
} from './types';
import {ADD_INGREDIENT} from '../ingredients/Ingredients';

export const ADD_EMPTY_RECIPE = 'recipes/ADD_EMPTY';
export const EDIT_TITLE = 'recipes/EDIT_TITLE';

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
    case ADD_INGREDIENT:
      if (!state[action.recipeId]) return state;
      return produce(state, (draft) => {
        draft[action.recipeId].ingredients.push(action.ingredientId);
      });
    case EDIT_TITLE:
      if (!state[action.recipeId]) return state;
      return produce(state, (draft) => {
        draft[action.recipeId].title = action.title;
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
      title: '',
      ingredients: [],
      method: [],
    },
  }),
  editTitle: (recipeId: string, title: string): EditRecipeTitleAction => ({
    type: EDIT_TITLE,
    recipeId,
    title,
  }),
};

export const selectors = {
  recipe: (state: RootState, recipeId: string) => state.recipes[recipeId],
  recipes: (state: RootState) => state.recipes,
};

import produce from 'immer';
import {RootState, ReduxAction} from '../..';
import {RecipesState, AddEmptyRecipeAction, Recipe} from './types';
import {ADD_INGREDIENT} from '../ingredients/Ingredients';

export const ADD_EMPTY_RECIPE = 'ingredient/ADD_EMPTY';

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
    default:
      return state;
  }
}

export const actions = {
  addEmptyRecipe: (recipeId: string, recipe: Recipe): AddEmptyRecipeAction => ({
    type: ADD_EMPTY_RECIPE,
    recipeId,
    recipe,
  }),
};

export const selectors = {
  ingredient: (state: RootState, ingredientId: string) =>
    state.ingredients[ingredientId],
};

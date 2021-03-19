import {
  ADD_EMPTY_RECIPE,
  EDIT_TITLE,
  DELETE_RECIPE,
  UPDATE_INGREDIENTS_ORDER,
} from './Recipes';

export type Recipe = {
  title: string;
  ingredients: string[];
  method: string[];
};

export type RecipesState = {
  [key: string]: Recipe;
};

export type AddEmptyRecipeAction = {
  type: typeof ADD_EMPTY_RECIPE;
  recipeId: string;
  recipe: Recipe;
};

export type EditRecipeTitleAction = {
  type: typeof EDIT_TITLE;
  recipeId: string;
  title: string;
};

export type DeleteRecipeAction = {
  type: typeof DELETE_RECIPE;
  recipeId: string;
};

export type UpdateIngredientsOrderAction = {
  type: typeof UPDATE_INGREDIENTS_ORDER;
  recipeId: string;
  ingredientIds: string[];
};

export type RecipesActions =
  | AddEmptyRecipeAction
  | EditRecipeTitleAction
  | DeleteRecipeAction
  | UpdateIngredientsOrderAction;

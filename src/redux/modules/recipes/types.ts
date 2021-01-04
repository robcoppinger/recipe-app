import {ADD_EMPTY_RECIPE, EDIT_TITLE} from './Recipes';

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

export type RecipesActions = AddEmptyRecipeAction | EditRecipeTitleAction;

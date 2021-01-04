import {ADD_EMPTY_RECIPE} from './Recipes';

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

export type RecipesActions = AddEmptyRecipeAction;

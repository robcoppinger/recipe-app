import {ADD_INGREDIENT, DELETE_INGREDIENT} from './Ingredients';

export type Ingredient = {
  name: string;
  amount?: number;
  unit?: string;
  price?: number;
};

export type IngredientsState = {
  [key: string]: Ingredient;
};

export type AddIngredientAction = {
  type: typeof ADD_INGREDIENT;
  ingredientId: string;
  recipeId: string;
  ingredient: Ingredient;
};

export type DeleteIngredientAction = {
  type: typeof DELETE_INGREDIENT;
  ingredientId: string;
  recipeId: string;
};

export type IngredientsActions = AddIngredientAction | DeleteIngredientAction;

import {ADD_INGREDIENT} from './Ingredients';

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

export type IngredientsActions = AddIngredientAction;

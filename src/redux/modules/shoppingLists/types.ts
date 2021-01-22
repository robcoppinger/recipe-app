import {ShoppingListItem} from '../shoppingListItems/types';
import {
  IMPORT_INGREDIENTS,
  PREPARE_INGREDIENTS_IMPORT,
  UPDATE_UNFOUND_ORDER,
} from './ShoppingLists';

export type ShoppingListEntry = {
  name: string;
  unfoundItems: string[];
  foundItems: string[];
};

export type ShoppingListState = {
  [key: string]: ShoppingListEntry;
};

export type UpdateUnfoundOrderAction = {
  type: typeof UPDATE_UNFOUND_ORDER;
  shoppingListId: string;
  newOrder: string[];
};

export type PrepareIngredientsImportAction = {
  type: typeof PREPARE_INGREDIENTS_IMPORT;
  shoppingListId: string;
  ingredientIds: string[];
};

export type ImportIngredientsAction = {
  type: typeof IMPORT_INGREDIENTS;
  shoppingListId: string;
  ingredients: {[key: string]: ShoppingListItem};
};

export type ShoppingListActions =
  | UpdateUnfoundOrderAction
  | PrepareIngredientsImportAction
  | ImportIngredientsAction;

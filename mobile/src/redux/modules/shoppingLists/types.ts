import {ShoppingListItem} from '../shoppingListItems/types';
import {
  IMPORT_INGREDIENTS,
  PREPARE_INGREDIENTS_IMPORT,
  UPDATE_UNFOUND_ORDER,
  ADD_EMPTY_SHOPPING_LIST,
  EDIT_SHOPPING_LIST_TITLE,
  DELETE_SHOPPING_LIST,
} from './ShoppingLists';

export type ShoppingListEntry = {
  name: string;
  unfoundItems: string[];
  foundItems: string[];
};

export type ShoppingListState = {
  [key: string]: ShoppingListEntry;
};

export type AddEmptyShoppingListAction = {
  type: typeof ADD_EMPTY_SHOPPING_LIST;
  shoppingListId: string;
  shoppingList: ShoppingListEntry;
};

export type DeleteShoppingListAction = {
  type: typeof DELETE_SHOPPING_LIST;
  shoppingListId: string;
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

export type EditShoppingListTitleAction = {
  type: typeof EDIT_SHOPPING_LIST_TITLE;
  shoppingListId: string;
  title: string;
};

export type ShoppingListActions =
  | AddEmptyShoppingListAction
  | UpdateUnfoundOrderAction
  | PrepareIngredientsImportAction
  | ImportIngredientsAction
  | EditShoppingListTitleAction
  | DeleteShoppingListAction;

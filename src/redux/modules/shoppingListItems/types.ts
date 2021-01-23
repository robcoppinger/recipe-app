import {
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  MARK_FOUND,
  MARK_UNFOUND,
} from './ShoppingListItems';

export type ShoppingListItem = {
  shoppingListId?: string;
  name: string;
  amount?: string;
  unit?: string;
  isFound: boolean;
};

export type ShoppingListItemsState = {
  [key: string]: ShoppingListItem;
};

export type AddShoppingListItemAction = {
  type: typeof ADD_ITEM;
  shoppingListId: string;
  shoppingListItemId: string;
  shoppingListItem: ShoppingListItem;
};

export type EditShoppingListItemAction = {
  type: typeof EDIT_ITEM;
  shoppingListItemId: string;
  shoppingListItem: ShoppingListItem;
};

export type DeleteShoppingListItemAction = {
  type: typeof DELETE_ITEM;
  shoppingListId: string;
  shoppingListItemId: string;
};

export type MarkShoppingListItemFoundAction = {
  type: typeof MARK_FOUND;
  shoppingListId: string;
  shoppingListItemId: string;
};

export type MarkShoppingListItemUnfoundAction = {
  type: typeof MARK_UNFOUND;
  shoppingListId: string;
  shoppingListItemId: string;
};

export type ShoppingListItemActions =
  | AddShoppingListItemAction
  | EditShoppingListItemAction
  | DeleteShoppingListItemAction
  | MarkShoppingListItemFoundAction
  | MarkShoppingListItemUnfoundAction;

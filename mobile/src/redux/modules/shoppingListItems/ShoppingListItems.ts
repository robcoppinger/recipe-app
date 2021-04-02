import produce from 'immer';
import { RootState, ReduxAction } from '../..';
import {
  DELETE_SHOPPING_LIST,
  IMPORT_INGREDIENTS,
} from '../shoppingLists/ShoppingLists';
import {
  AddShoppingListItemAction,
  DeleteShoppingListItemAction,
  EditShoppingListItemAction,
  MarkShoppingListItemFoundAction,
  MarkShoppingListItemUnfoundAction,
  ShoppingListItem,
  ShoppingListItemsState,
} from './types';

export const ADD_ITEM = 'shoppingListItem/ADD';
export const EDIT_ITEM = 'shoppingListItem/EDIT';
export const DELETE_ITEM = 'shoppingListItem/DELETE';
export const MARK_FOUND = 'shoppingListItem/MARK_FOUND';
export const MARK_UNFOUND = 'shoppingListItem/MARK_UNFOUND';

const initialState: ShoppingListItemsState = {};

export default function reducer(
  state: ShoppingListItemsState = initialState,
  action: ReduxAction,
): ShoppingListItemsState {
  switch (action.type) {
    case ADD_ITEM:
      return produce(state, (draft) => {
        draft[action.shoppingListItemId] = {
          shoppingListId: action.shoppingListId,
          ...action.shoppingListItem,
        };
      });
    case EDIT_ITEM:
      if (!state[action.shoppingListItemId]) return state;
      return produce(state, (draft) => {
        draft[action.shoppingListItemId] = {
          ...state[action.shoppingListItemId],
          ...action.shoppingListItem,
        };
      });
    case DELETE_ITEM:
      if (!state[action.shoppingListItemId]) return state;
      return produce(state, (draft) => {
        delete draft[action.shoppingListItemId];
      });
    case MARK_FOUND:
    case MARK_UNFOUND:
      if (!state[action.shoppingListItemId]) return state;
      return produce(state, (draft) => {
        draft[action.shoppingListItemId].isFound = action.type === MARK_FOUND;
      });
    case IMPORT_INGREDIENTS:
      return produce(state, (draft) => {
        Object.keys(action.ingredients).map((id) => {
          draft[id] = action.ingredients[id];
        });
      });
    case DELETE_SHOPPING_LIST:
      return produce(state, (draft) => {
        for (const [shoppingListItemId, shoppingListItem] of Object.entries(
          state,
        )) {
          if (shoppingListItem.shoppingListId === action.shoppingListId)
            delete draft[shoppingListItemId];
        }
      });
    default:
      return state;
  }
}

export const actions = {
  addItem: (
    shoppingListId: string,
    shoppingListItemId: string,
    shoppingListItem: ShoppingListItem,
  ): AddShoppingListItemAction => ({
    type: ADD_ITEM,
    shoppingListId,
    shoppingListItemId,
    shoppingListItem,
  }),
  editItem: (
    shoppingListItemId: string,
    shoppingListItem: ShoppingListItem,
  ): EditShoppingListItemAction => ({
    type: EDIT_ITEM,
    shoppingListItemId,
    shoppingListItem,
  }),
  deleteItem: (
    shoppingListId: string,
    shoppingListItemId: string,
  ): DeleteShoppingListItemAction => ({
    type: DELETE_ITEM,
    shoppingListId,
    shoppingListItemId,
  }),
  markFound: (
    shoppingListId: string,
    shoppingListItemId: string,
  ): MarkShoppingListItemFoundAction => ({
    type: MARK_FOUND,
    shoppingListId,
    shoppingListItemId,
  }),
  markUnfound: (
    shoppingListId: string,
    shoppingListItemId: string,
  ): MarkShoppingListItemUnfoundAction => ({
    type: MARK_UNFOUND,
    shoppingListId,
    shoppingListItemId,
  }),
};

export const selectors = {
  shoppingListItem: (state: RootState, shoppingListItemId: string) =>
    state.shoppingListItems[shoppingListItemId],
};

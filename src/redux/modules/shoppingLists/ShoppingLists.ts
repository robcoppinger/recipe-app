import produce from 'immer';
import {RootState, ReduxAction} from '../..';
import {
  ADD_ITEM,
  DELETE_ITEM,
  MARK_FOUND,
  MARK_UNFOUND,
} from '../shoppingListItems/ShoppingListItems';
import {ShoppingListItem} from '../shoppingListItems/types';
import {
  AddEmptyShoppingListAction,
  DeleteShoppingListAction,
  EditShoppingListTitleAction,
  ImportIngredientsAction,
  PrepareIngredientsImportAction,
  ShoppingListState,
  UpdateUnfoundOrderAction,
} from './types';
import {v4 as uuidv4} from 'uuid';

export const ADD_EMPTY_SHOPPING_LIST = 'shoppingList/ADD_EMPTY';
export const DELETE_SHOPPING_LIST = 'shoppingList/DELETE';
export const UPDATE_UNFOUND_ORDER = 'shoppingList/UPDATE_UNFOUND_ORDER';
export const PREPARE_INGREDIENTS_IMPORT =
  'shoppingList/PREPARE_INGREDIENTS_IMPORT';
export const IMPORT_INGREDIENTS = 'shoppingList/IMPORT_INGREDIENTS';
export const EDIT_SHOPPING_LIST_TITLE = 'shoppingList/EDIT_TITLE';

const initialState: ShoppingListState = {
  [uuidv4()]: {
    name: 'My Shopping List',
    unfoundItems: [],
    foundItems: [],
  },
};

export default function reducer(
  state: ShoppingListState = initialState,
  action: ReduxAction,
): ShoppingListState {
  switch (action.type) {
    case ADD_EMPTY_SHOPPING_LIST:
      return produce(state, (draft) => {
        draft[action.shoppingListId] = action.shoppingList;
      });
    case EDIT_SHOPPING_LIST_TITLE:
      if (!state[action.shoppingListId]) return state;
      return produce(state, (draft) => {
        draft[action.shoppingListId].name = action.title;
      });
    case DELETE_SHOPPING_LIST:
      if (!state[action.shoppingListId]) return state;
      return produce(state, (draft) => {
        delete draft[action.shoppingListId];
      });
    case ADD_ITEM:
      if (!state[action.shoppingListId]) return state;
      return produce(state, (draft) => {
        draft[action.shoppingListId].unfoundItems.push(
          action.shoppingListItemId,
        );
      });
    case DELETE_ITEM:
      if (!state[action.shoppingListId]) return state;
      return produce(state, (draft) => {
        const {shoppingListId, shoppingListItemId} = action;
        const {unfoundItems, foundItems} = state[shoppingListId];
        if (unfoundItems.includes(shoppingListItemId)) {
          draft[shoppingListId].unfoundItems = unfoundItems.filter(
            (i) => i !== shoppingListItemId,
          );
        }
        if (foundItems.includes(shoppingListItemId)) {
          draft[shoppingListId].foundItems = foundItems.filter(
            (i) => i !== shoppingListItemId,
          );
        }
      });
    case MARK_FOUND:
      if (!state[action.shoppingListId]) return state;
      return produce(state, (draft) => {
        let unfound = [...state[action.shoppingListId].unfoundItems];
        let found = [...state[action.shoppingListId].foundItems];

        draft[action.shoppingListId].unfoundItems = unfound.filter(
          (id) => id !== action.shoppingListItemId,
        );
        if (!found.includes(action.shoppingListItemId)) {
          draft[action.shoppingListId].foundItems = [
            action.shoppingListItemId,
            ...found,
          ];
        }
      });
    case MARK_UNFOUND:
      if (!state[action.shoppingListId]) return state;
      return produce(state, (draft) => {
        let unfound = [...state[action.shoppingListId].unfoundItems];
        let found = [...state[action.shoppingListId].foundItems];

        draft[action.shoppingListId].foundItems = found.filter(
          (id) => id !== action.shoppingListItemId,
        );
        if (!unfound.includes(action.shoppingListItemId)) {
          draft[action.shoppingListId].unfoundItems.push(
            action.shoppingListItemId,
          );
        }
      });
    case UPDATE_UNFOUND_ORDER:
      if (!state[action.shoppingListId]) return state;
      return produce(state, (draft) => {
        draft[action.shoppingListId].unfoundItems = action.newOrder;
      });
    case IMPORT_INGREDIENTS:
      if (!state[action.shoppingListId]) return state;
      return produce(state, (draft) => {
        draft[action.shoppingListId].unfoundItems = state[
          action.shoppingListId
        ].unfoundItems.concat(Object.keys(action.ingredients));
      });
    default:
      return state;
  }
}

export const actions = {
  updateUnfoundOrder: (
    shoppingListId: string,
    newOrder: string[],
  ): UpdateUnfoundOrderAction => ({
    type: UPDATE_UNFOUND_ORDER,
    shoppingListId,
    newOrder,
  }),
  prepareIngredientsImport: (
    shoppingListId: string,
    ingredientIds: string[],
  ): PrepareIngredientsImportAction => ({
    type: PREPARE_INGREDIENTS_IMPORT,
    shoppingListId,
    ingredientIds,
  }),
  importIngredients: (
    shoppingListId: string,
    ingredients: {[key: string]: ShoppingListItem},
  ): ImportIngredientsAction => ({
    type: IMPORT_INGREDIENTS,
    shoppingListId,
    ingredients,
  }),
  addEmptyShoppingList: (
    shoppingListId: string,
    name: string,
  ): AddEmptyShoppingListAction => ({
    type: ADD_EMPTY_SHOPPING_LIST,
    shoppingListId,
    shoppingList: {
      name: name.trim(),
      unfoundItems: [],
      foundItems: [],
    },
  }),
  editShoppingListTitle: (
    shoppingListId: string,
    title: string,
  ): EditShoppingListTitleAction => ({
    type: EDIT_SHOPPING_LIST_TITLE,
    shoppingListId,
    title,
  }),
  deleteShoppingList: (shoppingListId: string): DeleteShoppingListAction => ({
    type: DELETE_SHOPPING_LIST,
    shoppingListId,
  }),
};

export const selectors = {
  shoppingLists: (state: RootState) => state.shoppingLists,
  shoppingList: (state: RootState, shoppingListId: string) =>
    state.shoppingLists[shoppingListId],
  unfoundItems: (state: RootState, shoppingListId: string) =>
    state.shoppingLists[shoppingListId]?.unfoundItems || [],
  foundItems: (state: RootState, shoppingListId: string) =>
    state.shoppingLists[shoppingListId]?.foundItems || [],
};

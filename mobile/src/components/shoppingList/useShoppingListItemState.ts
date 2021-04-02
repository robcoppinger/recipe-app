import { useReducer } from 'react';
import { ShoppingListItem as ShoppingListItemType } from '../../redux/modules/shoppingListItems/types';
import produce from 'immer';
import { ShoppingListItem } from '../../redux/modules/shoppingListItems/types';

const defaultState: ShoppingListItem = {
  name: '',
  amount: '',
  unit: '',
  isFound: false,
};

export function useShoppingListItemState(
  initialState: ShoppingListItem = defaultState,
): [ShoppingListItemType, (action: Actions) => void] {
  const [shoppingListItem, dispatchItem] = useReducer(reducer, initialState);

  function reducer(
    state: ShoppingListItemType,
    action: Actions,
  ): ShoppingListItemType {
    switch (action.type) {
      case 'setName':
        return produce(state, (draft) => {
          draft.name = action.name;
        });
      case 'setAmount':
        return produce(state, (draft) => {
          draft.amount = action.amount;
        });
      case 'setUnit':
        return produce(state, (draft) => {
          draft.unit = action.unit;
        });
      case 'resetAll':
        return initialState;
      default:
        return state;
    }
  }

  return [shoppingListItem, dispatchItem];
}

type SetNameAction = {
  type: 'setName';
  name: string;
};

type SetAmountAction = {
  type: 'setAmount';
  amount: string;
};

type SetUnitAction = {
  type: 'setUnit';
  unit: string;
};

type ResetAll = {
  type: 'resetAll';
};

type Actions = SetNameAction | SetAmountAction | SetUnitAction | ResetAll;

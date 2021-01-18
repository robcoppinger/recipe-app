import { useReducer} from 'react';
import produce from 'immer';
import {v4 as uuidV4} from 'uuid'

export type ShoppingListItem = {
    name: string
    found: boolean
}
export type ShoppingListState = {
  unfoundOrder: string[]
  foundOrder: string[]
  items: {
    [key: string]: ShoppingListItem   
  }
}

const defaultState: ShoppingListState = {
  unfoundOrder: [],
  foundOrder: [],
  items: {}
}

export function useShoppingListState(
  initialState: ShoppingListState = defaultState,
): [ShoppingListState, (action: ShoppingListActions) => void] {
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: ShoppingListState, action: ShoppingListActions): ShoppingListState {
    switch (action.type) {
      case 'addItem':
        return produce(state, (draft) => {
          const newId = uuidV4()
          draft.items[newId] = {name: action.name, found: false};
          draft.unfoundOrder.push(newId)

        });
      case 'markFound':
        return produce(state, draft => {
          draft.items[action.id].found = action.value

          let unfound = [...state.unfoundOrder]
          let found = [...state.foundOrder]

          if (action.value === true) {
            unfound = unfound.filter((id) => id !== action.id)
            if (!found.includes(action.id)) found = [action.id, ...found]
          } else {
            found = found.filter((id) => id !== action.id)
            if (!unfound.includes(action.id)) unfound.push(action.id)
          }

          draft.unfoundOrder = unfound
          draft.foundOrder = found
        })
      case 'deleteItem':
        return produce(state, draft => {
          delete draft.items[action.id]
          if (state.unfoundOrder.includes(action.id)) {
            draft.unfoundOrder.splice(state.unfoundOrder.indexOf(action.id), 1)
          }
          if (state.foundOrder.includes(action.id)) {
            draft.foundOrder.splice(state.foundOrder.indexOf(action.id), 1)
          }
        }) 
      case 'updateOrder':
        return produce(state, draft => {
          draft.unfoundOrder = action.unfoundOrder
        })
      default:
        return state;
    }
  }

  return [state, dispatch];
}

type AddItemAction = {
  type: 'addItem';
  name: string;
};

type MarkFoundAction = {
    type: 'markFound',
    id: string,
    value: boolean
}

type DeleteItemAction = {
  type: 'deleteItem'
  id: string
}

type UpdateOrderAction = {
  type: 'updateOrder',
  unfoundOrder: string[]
}



export type ShoppingListActions = AddItemAction | MarkFoundAction | DeleteItemAction | UpdateOrderAction

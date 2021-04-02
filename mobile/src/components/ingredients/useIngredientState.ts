import { useState, useReducer } from 'react';
import { Ingredient } from '../../redux/modules/ingredients/types';
import produce from 'immer';

const defaultState = {
  name: '',
  amount: '',
  unit: '',
};

export function useIngredientState(
  initialState: Ingredient = defaultState,
): [Ingredient, (action: Actions) => void] {
  const [ingredient, dispatchIngredient] = useReducer(reducer, initialState);

  function reducer(state: Ingredient, action: Actions): Ingredient {
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

  return [ingredient, dispatchIngredient];
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

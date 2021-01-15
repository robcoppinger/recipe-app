import produce from 'immer';
import {RootState, ReduxAction} from '../..';
import {DELETE_RECIPE} from '../recipes/Recipes';
import {MethodStep, MethodState, AddMethodStepAction} from './types';

export const ADD_STEP = 'method/ADD_STEP';
export const EDIT_STEP = 'method/EDIT_STEP';

const initialState: MethodState = {};

export default function reducer(
  state = initialState,
  action: ReduxAction,
): MethodState {
  switch (action.type) {
    case ADD_STEP:
      return produce(state, (draft) => {
        draft[action.stepId] = {
          recipeId: action.recipeId,
          ...action.step,
        };
      });
    case EDIT_STEP:
      if (!state[action.stepId]) return state;
      return produce(state, (draft) => {
        draft[action.stepId] = {...state[action.stepId], ...action.step};
      });
    case DELETE_RECIPE:
      return state;
    default:
      return state;
  }
}

export const actions = {
  addStep: (
    stepId: string,
    recipeId: string,
    step: MethodStep,
  ): AddMethodStepAction => ({
    type: ADD_STEP,
    stepId,
    recipeId,
    step,
  }),
  editStep: (stepId: string, step: MethodStep) => ({
    type: EDIT_STEP,
    stepId,
    step,
  }),
};

export const selectors = {
  step: (state: RootState, stepId: string): MethodStep =>
    state.method[stepId] || {},
};

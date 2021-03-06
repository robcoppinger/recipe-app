import { ADD_STEP, DELETE_STEP, EDIT_STEP } from './method';

export type MethodStep = {
  recipeId?: string;
  text: string;
};

export type MethodState = {
  [key: string]: MethodStep;
};

export type AddMethodStepAction = {
  type: typeof ADD_STEP;
  stepId: string;
  recipeId: string;
  step: MethodStep;
};

type EditMethodStepAction = {
  type: typeof EDIT_STEP;
  stepId: string;
  step: MethodStep;
};

type DeleteMethodStepAction = {
  type: typeof DELETE_STEP;
  stepId: string;
  recipeId: string;
};

export type MethodActions =
  | AddMethodStepAction
  | EditMethodStepAction
  | DeleteMethodStepAction;

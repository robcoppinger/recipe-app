import {ADD_STEP} from './method';

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

export type MethodActions = AddMethodStepAction;

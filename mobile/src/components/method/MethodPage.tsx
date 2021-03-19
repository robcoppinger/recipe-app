import React from 'react';
import {NewStep} from './NewStep';
import {ScrollView} from 'react-native-gesture-handler';
import {KeyboardAvoidingView} from 'react-native';
import {useSelector} from 'react-redux';
import {selectors} from '../../redux/modules/recipes/Recipes';
import {RootState} from '../../redux';
import {StepItem} from './StepItem';
import {EditStep} from './EditStep';
import {RecipeMode} from '../../screens/Recipe';

type MethodPageProps = {
  title?: string; // For TabView Title only
  recipeId: string;
  mode: RecipeMode;
};

export const MethodPage = ({recipeId, mode}: MethodPageProps) => {
  const recipe = useSelector((st: RootState) => selectors.recipe(st, recipeId));
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={170}>
      <ScrollView style={{flex: 1}}>
        {recipe.method.map((stepId, index) =>
          mode === 'default' || mode === 'select' ? (
            <StepItem key={stepId} {...{stepId}} />
          ) : (
            <EditStep key={stepId} {...{stepId, recipeId}} />
          ),
        )}
        {mode === 'edit' && <NewStep {...{recipeId}} />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

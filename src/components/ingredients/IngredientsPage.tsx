import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {selectors} from '../../redux/modules/recipes/Recipes';
import {RootState} from '../../redux';
import {IngredientItem} from './IngredientItem';
import {EditIngredientItem} from './EditIngredientItem';
import {NewIngredient} from './NewIngredient';
import styled from 'styled-components/native';

type IngredientsPageProps = {
  title?: string;
  recipeId: string;
  mode: 'default' | 'edit';
};

export const IngredientsPage = ({
  recipeId,
  mode = 'default',
}: IngredientsPageProps) => {
  const recipe = useSelector((st: RootState) => selectors.recipe(st, recipeId));

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="padding"
      keyboardVerticalOffset={100}>
      <PageContainer>
        <ScrollView>
          {recipe.ingredients.map((id) =>
            mode === 'default' ? (
              <IngredientItem key={id} ingredientId={id} recipeId={recipeId} />
            ) : (
              <EditIngredientItem
                key={id}
                ingredientId={id}
                recipeId={recipeId}
              />
            ),
          )}
          {mode === 'edit' && (
            <NewIngredient key="newIngredient" recipeId={recipeId} />
          )}
        </ScrollView>
      </PageContainer>
    </KeyboardAvoidingView>
  );
};

const PageContainer = styled.View`
    flex: 1
    margin: ${(props) => props.theme.pagePadding}
`;

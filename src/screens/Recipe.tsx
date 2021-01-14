import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Layout} from '../components/common/Layout';
import {ScrollView, KeyboardAvoidingView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectors, actions} from '../redux/modules/recipes/Recipes';
import {useRoute} from '@react-navigation/native';
import {RecipeScreenRouteProp} from '../navigators/AppNavigator';
import {RootState} from '../redux';
import {IngredientItem} from '../components/ingredients/IngredientItem';
import {NewIngredient} from '../components/ingredients/NewIngredient';

export const Recipe = () => {
  const route = useRoute<RecipeScreenRouteProp>();
  const dispatch = useDispatch();
  const params = route.params || {};
  const {recipeId} = params;

  const recipe = useSelector((st: RootState) => selectors.recipe(st, recipeId));
  if (!recipe) return <Layout />;

  const [title, setTitle] = useState(recipe.title);

  const customHeader = () => (
    <HeaderContent>
      <HeaderTitle
        value={title}
        selectTextOnFocus
        onChangeText={(value) => setTitle(value)}
        onBlur={() => dispatch(actions.editTitle(recipeId, title))}
        autoFocus={title === 'New Recipe'}
        placeholder="New Recipe"
      />
    </HeaderContent>
  );
  return (
    <Layout customHeaderComponent={customHeader}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
        keyboardVerticalOffset={100}>
        <ScrollView>
          {recipe.ingredients.map((id) => (
            <IngredientItem key={id} ingredientId={id} recipeId={recipeId} />
          ))}
          <NewIngredient key="newIngredient" recipeId={recipeId} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

const HeaderTitle = styled.TextInput`
  flex: 1;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.defaultFontFamily.semiBold};
  font-size: ${(props) => props.theme.fontSize.h3};
`;

const HeaderContent = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  padding-left: 40px;
  padding-right: 40px;
`;

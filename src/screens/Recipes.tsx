import React from 'react';
import styled from 'styled-components/native';
import {Layout} from '../components/common/Layout';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {SvgImage} from '../components/common/SvgImage';
import {Images} from '../../assets/images';
import {useSelector, useDispatch} from 'react-redux';
import {selectors, actions} from '../redux/modules/recipes/Recipes';
import {v4 as uuidV4} from 'uuid';
import {RecipeItem} from '../components/recipes/RecipeItem';

export const Recipes = () => {
  const recipes = useSelector(selectors.recipes);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();

  const HeaderRightComponent = () => (
    <TouchableOpacity
      style={{position: 'absolute', right: 12}}
      onPress={() => {
        const recipeId = uuidV4();
        dispatch(actions.addEmptyRecipe(recipeId));
        navigate('Recipe', {recipeId});
      }}>
      <SvgImage style={{width: 30, height: 30}} source={Images.add} />
    </TouchableOpacity>
  );

  return (
    <Layout headerRightComponent={HeaderRightComponent}>
      {Object.keys(recipes).map((recipeId, index) => (
        <RecipeItem recipeId={recipeId} />
      ))}
    </Layout>
  );
};

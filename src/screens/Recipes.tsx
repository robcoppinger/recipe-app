import React from 'react';
import {Layout} from '../components/common/Layout';
import {useNavigation} from '@react-navigation/native';
import {FlatList, TouchableOpacity} from 'react-native';
import {SvgImage} from '../components/common/SvgImage';
import {Images} from '../../assets/images';
import {useSelector, useDispatch} from 'react-redux';
import {selectors, actions} from '../redux/modules/recipes/Recipes';
import {v4 as uuidV4} from 'uuid';
import {RecipeItem} from '../components/recipes/RecipeItem';
import {useTheme} from '../context/ThemeContext';
import styled from 'styled-components/native';

export const Recipes = () => {
  const recipes = useSelector(selectors.recipes);
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const theme = useTheme();

  const HeaderRightComponent = () => (
    <TouchableOpacity
      style={{position: 'absolute', right: 12}}
      onPress={() => {
        const recipeId = uuidV4();
        dispatch(actions.addEmptyRecipe(recipeId));
        navigate('Recipe', {recipeId});
      }}>
      <SvgImage
        style={{width: 30, height: 30, fill: theme.colors.primary}}
        source={Images.add}
      />
    </TouchableOpacity>
  );

  return (
    <Layout headerRightComponent={HeaderRightComponent}>
      <PageContainer>
        <FlatList
          contentContainerStyle={{flex: 1}}
          keyExtractor={(item) => item}
          data={Object.keys(recipes)}
          renderItem={({item}) => <RecipeItem key={item} recipeId={item} />}
        />
      </PageContainer>
    </Layout>
  );
};

const PageContainer = styled.View`
  padding: ${(props) => props.theme.pagePadding};
  flex: 1;
`;

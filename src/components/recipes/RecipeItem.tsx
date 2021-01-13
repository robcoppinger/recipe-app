import React from 'react';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {selectors, actions} from '../../redux/modules/recipes/Recipes';
import {RootState} from '../../redux';
import {TouchableOpacity} from 'react-native';
import {SvgImage} from '../common/SvgImage';
import {Images} from '../../../assets/images';
import {useTheme} from '../../context/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {Text} from '../common/Text';

type RecipeItemProps = {
  recipeId: string;
};

export const RecipeItem = ({recipeId}: RecipeItemProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const recipe = useSelector((st: RootState) => selectors.recipe(st, recipeId));
  const {navigate} = useNavigation();
  return (
    <RecipeItemContainer onPress={() => navigate('Recipe', {recipeId})}>
      <RecipeText variant="regular">{recipe.title}</RecipeText>
      <TouchableOpacity
        onPress={() => dispatch(actions.deleteRecipe(recipeId))}>
        <SvgImage
          style={{width: 25, height: 25, fill: theme.colors.iconSubtleColor}}
          source={Images.closeFilled}
        />
      </TouchableOpacity>
    </RecipeItemContainer>
  );
};

const RecipeItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.paper};
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 8px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadow};
`;

const RecipeText = styled(Text)`
  flex: 1;
  font-weight: 500;
`;

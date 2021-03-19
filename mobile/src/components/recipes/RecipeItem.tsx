import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {RootState} from '../../redux';
import {actions, selectors} from '../../redux/modules/recipes/Recipes';
import {Deleteable} from '../common/Deleteable';
import {Text} from '../common/Text';

const HEIGHT = 64;

type RecipeItemProps = {
  recipeId: string;
};

export const RecipeItem = ({recipeId}: RecipeItemProps) => {
  const dispatch = useDispatch();
  const recipe = useSelector((st: RootState) => selectors.recipe(st, recipeId));
  const {navigate} = useNavigation();
  const deleteItem = () => dispatch(actions.deleteRecipe(recipeId));

  return (
    <Deleteable containerHeight={HEIGHT} onDeleteAnimationComplete={deleteItem}>
      {({interceptPress}) => (
        <RecipeItemContainer
          activeOpacity={0.5}
          onPress={() => interceptPress(() => navigate('Recipe', {recipeId}))}>
          <RecipeText variant="h3">{recipe.title}</RecipeText>
        </RecipeItemContainer>
      )}
    </Deleteable>
  );
};

const RecipeItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.paper};
  height: 100%;
  padding-left: 32px
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator}
`;

const RecipeText = styled(Text)`
  flex: 1;
  font-weight: 600;
`;

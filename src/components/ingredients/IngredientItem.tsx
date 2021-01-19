import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {actions, selectors} from '../../redux/modules/ingredients/Ingredients';
import {Text} from '../common/Text';
import {Deleteable} from '../common/Deleteable';

const INGREDIENT_ITEM_HEIGHT = 60;

type IngredientItemProps = {
  ingredientId: string;
  recipeId: string;
};

export const IngredientItem = ({
  ingredientId,
  recipeId,
}: IngredientItemProps) => {
  const dispatch = useDispatch();
  const ingredient = useSelector((st: RootState) =>
    selectors.ingredient(st, ingredientId),
  );
  const {name, amount, unit} = ingredient;

  const deleteItem = () =>
    dispatch(actions.deleteIngredient(ingredientId, recipeId));

  return (
    <Deleteable
      containerHeight={INGREDIENT_ITEM_HEIGHT}
      onDeleteAnimationComplete={deleteItem}>
      {({interceptPress}) => (
        <IngredientContainer
          activeOpacity={1}
          onPress={() => interceptPress(() => {})}>
          <IngredientText>{name}</IngredientText>
          <AmountText>{`${amount || ''} ${unit || ''}`}</AmountText>
        </IngredientContainer>
      )}
    </Deleteable>
  );
};

const IngredientContainer = styled.TouchableOpacity`
  height: 100%;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.paper};
  padding: ${(props) => props.theme.itemPadding};
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator};
`;

const IngredientText = styled(Text)`
  flex: 1;
  font-weight: 500;
`;

const AmountText = styled(Text)`
  color: ${(props) => props.theme.colors.textSecondary};
`;

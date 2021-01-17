import React from 'react';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {selectors} from '../../redux/modules/ingredients/Ingredients';
import {Text} from '../common/Text';

type IngredientItemProps = {
  ingredientId: string;
  recipeId: string;
};

export const IngredientItem = ({
  ingredientId,
  recipeId,
}: IngredientItemProps) => {
  const ingredient = useSelector((st: RootState) =>
    selectors.ingredient(st, ingredientId),
  );
  const {name, amount, unit} = ingredient;

  return (
    <IngredientContainer>
      <IngredientText>{name}</IngredientText>
      <AmountText>{`${amount || ''} ${unit || ''}`}</AmountText>
    </IngredientContainer>
  );
};

const IngredientContainer = styled.View`
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

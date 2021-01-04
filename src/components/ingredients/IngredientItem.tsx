import React, {useState} from 'react';
import styled from 'styled-components/native';
import {TextInput} from '../common/TextInput';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {selectors} from '../../redux/modules/ingredients/Ingredients';

type IngredientItemProps = {
  recipeId: string;
};

export const IngredientItem = ({recipeId}: IngredientItemProps) => {
  const ingredient = useSelector((st: RootState) =>
    selectors.ingredient(st, recipeId),
  );
  const [ingredientName, setIngredientName] = useState(ingredient.name);

  return (
    <IngredientText
      value={ingredientName}
      onChangeText={setIngredientName}
      placeholder="New Ingredient"
    />
  );
};

const IngredientText = styled(TextInput)`
  margin-bottom: 8px;
  padding: 12px;
`;

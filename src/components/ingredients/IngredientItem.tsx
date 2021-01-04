import React, {useState} from 'react';
import styled from 'styled-components/native';
import {TextInput} from '../common/TextInput';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {selectors, actions} from '../../redux/modules/ingredients/Ingredients';

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
  const [ingredientName, setIngredientName] = useState(ingredient.name);

  const onBlur = () => {
    if (ingredientName === '') {
      dispatch(actions.deleteIngredient(ingredientId, recipeId));
    }
  };

  return (
    <IngredientText
      value={ingredientName}
      onChangeText={setIngredientName}
      placeholder="New Ingredient"
      onBlur={onBlur}
    />
  );
};

const IngredientText = styled(TextInput)`
  margin-bottom: 8px;
  padding: 12px;
`;

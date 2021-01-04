import React, {useState} from 'react';
import styled from 'styled-components';
import {TextInput} from '../common/TextInput';
import {useDispatch} from 'react-redux';
import {actions} from '../../redux/modules/ingredients/Ingredients';
import {v4 as uuidV4} from 'uuid';

type NewIngredientProps = {
  recipeId: string;
};

export const NewIngredient = ({recipeId}: NewIngredientProps) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const addIngredient = () => {
    if (name.length < 1) return;
    dispatch(
      actions.addIngredient(uuidV4(), recipeId, {
        name,
      }),
    );
    setName('');
  };

  return (
    <NewIngredientItem
      value={name}
      onChangeText={setName}
      onBlur={addIngredient}
      placeholder="New Ingredient"
    />
  );
};

const NewIngredientItem = styled(TextInput)`
  margin-bottom: 8px;
  padding: 12px;
  background-color: transparent;
  border-color: #bebebf;
  border-bottom-width: 1px;
`;

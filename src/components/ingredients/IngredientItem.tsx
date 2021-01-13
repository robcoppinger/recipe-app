import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {selectors, actions} from '../../redux/modules/ingredients/Ingredients';
import {SvgImage} from '../common/SvgImage';
import {Images} from '../../../assets/images';
import {TouchableOpacity} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

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
  const theme = useTheme();

  const onBlur = () => {
    if (ingredientName === '') {
      dispatch(actions.deleteIngredient(ingredientId, recipeId));
      return;
    }
    dispatch(
      actions.editIngredient(ingredientId, {
        name: ingredientName,
      }),
    );
  };

  return (
    <IngredientContainer>
      <IngredientText
        value={ingredientName}
        onChangeText={setIngredientName}
        placeholder="New Ingredient"
        onBlur={onBlur}
      />
      <TouchableOpacity
        onPress={() =>
          dispatch(actions.deleteIngredient(ingredientId, recipeId))
        }>
        <SvgImage
          style={{width: 25, height: 25, fill: theme.colors.iconSubtleColor}}
          source={Images.closeFilled}
        />
      </TouchableOpacity>
    </IngredientContainer>
  );
};

const IngredientContainer = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.paper};
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: 8px;
  padding: 16px;
`;

const IngredientText = styled.TextInput`
  padding: 0;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.defaultFontFamily['regular']};
  font-size: ${(props) => props.theme.fontSize.regular};
  font-weight: 500;
  flex: 1;
`;

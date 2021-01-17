import React, {createRef} from 'react';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {selectors, actions} from '../../redux/modules/ingredients/Ingredients';
import {SvgImage} from '../common/SvgImage';
import {Images} from '../../../assets/images';
import {TouchableOpacity, TextInput as RNTextInput} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {useIngredientState} from './useIngredientState';
import {TextInput} from '../common/TextInput';

type EditIngredientItemProps = {
  ingredientId: string;
  recipeId: string;
};

export const EditIngredientItem = ({
  ingredientId,
  recipeId,
}: EditIngredientItemProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const amountInput = createRef<RNTextInput>();
  const unitInput = createRef<RNTextInput>();

  const [ingredient, dispatchIngredient] = useIngredientState(
    useSelector((st: RootState) => selectors.ingredient(st, ingredientId)),
  );

  const onBlur = () => {
    if (ingredient.name === '') {
      dispatch(actions.deleteIngredient(ingredientId, recipeId));
      return;
    }
    dispatch(actions.editIngredient(ingredientId, ingredient));
  };

  return (
    <IngredientContainer>
      <IngredientText
        value={ingredient.name}
        placeholder="New Ingredient"
        onChangeText={(value) =>
          dispatchIngredient({type: 'setName', name: value})
        }
        onBlur={onBlur}
        returnKeyType="next"
        onSubmitEditing={() => amountInput.current?.focus()}
      />
      <Amount
        ref={amountInput}
        placeholder="Amt."
        value={ingredient.amount}
        onChangeText={(value) =>
          dispatchIngredient({type: 'setAmount', amount: value})
        }
        onBlur={onBlur}
        returnKeyType="next"
        onSubmitEditing={() => unitInput.current?.focus()}
      />
      <Unit
        ref={unitInput}
        placeholder="unit"
        autoCapitalize="none"
        value={ingredient.unit}
        onChangeText={(value) =>
          dispatchIngredient({type: 'setUnit', unit: value})
        }
        onBlur={onBlur}
        returnKeyType="done"
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
  padding: ${(props) => props.theme.itemPadding};
  padding-bottom: 11px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator};
`;

const Input = styled(TextInput)`
  font-weight: 500;
  border-bottom-width: 1px;
  margin-right: 8px;
  padding-bottom: 8px;
`;

const IngredientText = styled(Input)`
  flex: 1;
`;

const Amount = styled(Input)`
  text-align: center;
  width: 44px;
`;

const Unit = styled(Input)`
  width: 36px
  text-align: center;
`;

import React, {createRef, useEffect} from 'react';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {actions} from '../../redux/modules/ingredients/Ingredients';
import {v4 as uuidV4} from 'uuid';
import {
  TextInput as RNTextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {SvgImage} from '../common/SvgImage';
import {Images} from '../../../assets/images';
import {useTheme} from '../../context/ThemeContext';
import {useIngredientState} from './useIngredientState';
import {TextInput} from '../common/TextInput';

type NewIngredientProps = {
  recipeId: string;
};

export const NewIngredient = ({recipeId}: NewIngredientProps) => {
  const [ingredient, dispatchIngredient] = useIngredientState();
  const dispatch = useDispatch();
  const theme = useTheme();

  const ingredientInputRef = createRef<RNTextInput>();
  const amountRef = createRef<RNTextInput>();
  const unitRef = createRef<RNTextInput>();

  useEffect(() => {
    Keyboard.addListener('keyboardWillHide', addIngredient);
    return () => {
      Keyboard.removeListener('keyboardWillHide', addIngredient);
    };
  }, [ingredient]);

  const addIngredient = () => {
    if (ingredient.name.length < 1) return;
    dispatch(actions.addIngredient(uuidV4(), recipeId, ingredient));
    dispatchIngredient({type: 'resetAll'});
    ingredientInputRef.current?.focus();
  };

  return (
    <NewIngredientContainer>
      <NewIngredientItem
        ref={ingredientInputRef}
        value={ingredient.name}
        onChangeText={(value) =>
          dispatchIngredient({type: 'setName', name: value})
        }
        placeholder="New Ingredient"
        returnKeyType="next"
        onSubmitEditing={() => amountRef.current?.focus()}
      />
      <Amount
        value={ingredient.amount}
        onChangeText={(value) =>
          dispatchIngredient({type: 'setAmount', amount: value})
        }
        ref={amountRef}
        placeholder="Amt."
        returnKeyType="next"
        onSubmitEditing={() => unitRef.current?.focus()}
      />
      <Unit
        value={ingredient.unit}
        onChangeText={(value) =>
          dispatchIngredient({type: 'setUnit', unit: value})
        }
        ref={unitRef}
        placeholder="unit"
        returnKeyType="done"
        onSubmitEditing={addIngredient}
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={{marginRight: 8}}
        onPress={addIngredient}
        disabled={ingredient.name === ''}>
        <SvgImage
          style={{
            width: 25,
            height: 25,
            fill:
              ingredient.name === ''
                ? theme.colors.iconSubtleColor
                : theme.colors.primary,
          }}
          source={Images.addFilled}
        />
      </TouchableOpacity>
    </NewIngredientContainer>
  );
};

const NewIngredientContainer = styled.View`
  flex-direction: row;
  background-color: transparent;
  margin-bottom: 8px;
  padding: ${(props) => props.theme.itemPadding};
  padding-right: 12px;
`;

const Input = styled(TextInput)`
  font-family: ${(props) => props.theme.defaultFontFamily['regular']};
  font-size: ${(props) => props.theme.fontSize.regular};
  font-weight: 500;
  border-color: ${(props) => props.theme.colors.iconSubtleColor};
  color: ${(props) => props.theme.colors.text};
  border-bottom-width: 1px;
  margin-right: 8px;
  padding-bottom: 12px;
`;

const NewIngredientItem = styled(Input)`
  flex: 1;
  border-bottom-width: 1px;
  padding-left: 8px;
`;

const Amount = styled(Input)`
  width: 44px;
  text-align: center;
`;

const Unit = styled(Input)`
  width: 36px;
  text-align: center;
`;

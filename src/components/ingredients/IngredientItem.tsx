import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {actions, selectors} from '../../redux/modules/ingredients/Ingredients';
import {Text} from '../common/Text';
import {Deleteable} from '../common/Deleteable';
import {IngredientMode} from './IngredientsPage';
import {useTheme} from '../../context/ThemeContext';
import {SvgImage} from '../common/SvgImage';
import {Images} from '../../../assets/images';
import {RecipeMode} from '../../screens/Recipe';

export const INGREDIENT_ITEM_HEIGHT = 60;

type IngredientItemProps = {
  ingredientId: string;
  recipeId: string;
  mode: RecipeMode;
  setMode: (mode: IngredientMode) => void;
  isSelected: boolean;
  addSelectedItem: (id: string) => void;
  removeSelectedItem: (id: string) => void;
};

export const IngredientItem = ({
  ingredientId,
  recipeId,
  mode,
  setMode,
  isSelected,
  addSelectedItem,
  removeSelectedItem,
}: IngredientItemProps) => {
  const isSelectMode = mode === 'select';
  const dispatch = useDispatch();
  const theme = useTheme();
  const ingredient = useSelector((st: RootState) =>
    selectors.ingredient(st, ingredientId),
  );
  const {name, amount, unit} = ingredient;

  const deleteItem = () =>
    dispatch(actions.deleteIngredient(ingredientId, recipeId));

  const selectItem = () => {
    if (!isSelectMode) {
      setMode('select');
    }
    isSelected
      ? removeSelectedItem(ingredientId)
      : addSelectedItem(ingredientId);
  };

  return (
    <Deleteable
      enabled={!isSelectMode}
      containerHeight={INGREDIENT_ITEM_HEIGHT}
      onDeleteAnimationComplete={deleteItem}>
      {({interceptPress}) => (
        <IngredientContainer
          activeOpacity={isSelectMode ? 0.5 : 1}
          onLongPress={selectItem}
          onPress={() =>
            interceptPress(() => {
              if (isSelectMode) selectItem();
            })
          }>
          <IngredientText numberOfLines={1}>{name}</IngredientText>
          <AmountText>{`${amount || ''} ${unit || ''}`}</AmountText>
          {isSelectMode && (
            <CheckboxContainer>
              <SvgImage
                source={isSelected ? Images.checkedFilled : Images.unchecked}
                style={{
                  width: 25,
                  height: 25,
                  fill: theme.colors.primary,
                }}
              />
            </CheckboxContainer>
          )}
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

const CheckboxContainer = styled.View`
  margin-left: 16px;
  height: 100%;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
`;

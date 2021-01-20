import React, {useEffect, useState} from 'react';
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
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export const INGREDIENT_ITEM_HEIGHT = 60;
export const CHECKBOX_CONTAINER_WIDTH = 40;

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

  const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);
  const setCheckboxHidden = () => setIsCheckboxVisible(false); // needed for anim callbak
  const checkboxContainerWidth = useSharedValue(0);

  useEffect(() => {
    if (isSelectMode && !isCheckboxVisible) {
      setIsCheckboxVisible(true);
      checkboxContainerWidth.value = withTiming(
        CHECKBOX_CONTAINER_WIDTH,
        animationConfig,
      );
    }
    if (!isSelectMode && isCheckboxVisible) {
      checkboxContainerWidth.value = withTiming(0, animationConfig, () =>
        runOnJS(setCheckboxHidden)(),
      );
    }
  }, [isSelectMode]);

  const deleteItem = () =>
    dispatch(actions.deleteIngredient(ingredientId, recipeId));

  const selectItem = () => {
    if (!isSelectMode) {
      Haptics.impactAsync();
      setMode('select');
    }
    isSelected
      ? removeSelectedItem(ingredientId)
      : addSelectedItem(ingredientId);
  };

  const checkboxContainerStyle = useAnimatedStyle(() => ({
    width: checkboxContainerWidth.value,
  }));

  return (
    <Deleteable
      enabled={!isSelectMode}
      containerHeight={INGREDIENT_ITEM_HEIGHT}
      onDeleteAnimationComplete={deleteItem}>
      {({interceptPress}) => (
        <IngredientContainer
          style={
            isSelected && {
              backgroundColor: theme.colors.primaryFaded,
            }
          }
          activeOpacity={isSelectMode ? 0.5 : 1}
          onLongPress={selectItem}
          onPress={() =>
            interceptPress(() => {
              if (isSelectMode) selectItem();
            })
          }>
          <TextContainer>
            <IngredientText numberOfLines={1}>{name}</IngredientText>
            <AmountText style={{paddingLeft: 4}}>{`${amount || ''} ${
              unit || ''
            }`}</AmountText>
          </TextContainer>
          {isCheckboxVisible && (
            <CheckboxContainer style={checkboxContainerStyle}>
              <SvgImage
                source={isSelected ? Images.checkedFilled : Images.unchecked}
                style={{
                  width: 30,
                  height: 30,
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
  padding-left: ${(props) => props.theme.itemPadding};
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator};
`;

const TextContainer = styled.View`
  flex-direction: row;
  padding-right: 16px;
  flex: 1;
`;

const IngredientText = styled(Text)`
  flex: 1;
  font-weight: 500;
`;

const AmountText = styled(Text)`
  color: ${(props) => props.theme.colors.textSecondary};
`;

const CheckboxContainer = styled(Animated.View)`
  overflow: hidden;
  width: ${CHECKBOX_CONTAINER_WIDTH}px;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
`;

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 200,
};

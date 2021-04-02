import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import {
  actions,
  selectors,
} from '../../redux/modules/ingredients/Ingredients';
import { actions as recipeActions } from '../../redux/modules/recipes/Recipes';
import { Text } from '../common/Text';
import { Deleteable } from '../common/Deleteable';
import { IngredientMode, Positions } from './IngredientsPage';
import { useTheme } from '../../context/ThemeContext';
import { SvgImage } from '../common/SvgImage';
import { RecipeMode } from '../../screens/Recipe';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

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
  positions: Animated.SharedValue<Positions>;
  deletingId: Animated.SharedValue<string | undefined>;
};

export const IngredientItem = ({
  ingredientId,
  recipeId,
  mode,
  setMode,
  isSelected,
  addSelectedItem,
  removeSelectedItem,
  positions,
  deletingId,
}: IngredientItemProps) => {
  const isSelectMode = mode === 'select';
  const dispatch = useDispatch();
  const theme = useTheme();

  const ingredient = useSelector((st: RootState) =>
    selectors.ingredient(st, ingredientId),
  );
  const { name, amount, unit } = ingredient;

  const position = getPosition(positions.value[ingredientId]);
  const translateY = useSharedValue(position.y); // changed on reorder
  const isReorderGestureActive = useSharedValue(false);

  const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);
  const [isReorderVisible, setIsReorderVisible] = useState(true);
  const setCheckboxHidden = () => setIsCheckboxVisible(false); // needed for anim callbak
  const setReorderHidden = () => setIsReorderVisible(false); // needed for anim callbak
  const checkboxContainerWidth = useSharedValue(0);

  // ========================= Reactions =========================
  useEffect(() => {
    if (isSelectMode && !isCheckboxVisible) {
      // Show checkbox
      setIsCheckboxVisible(true);
      checkboxContainerWidth.value = withTiming(
        CHECKBOX_CONTAINER_WIDTH,
        animationConfig,
        () => runOnJS(setReorderHidden)(),
      );
    }
    if (!isSelectMode && isCheckboxVisible) {
      // hide checkbox
      setIsReorderVisible(true);
      checkboxContainerWidth.value = withTiming(0, animationConfig, () =>
        runOnJS(setCheckboxHidden)(),
      );
    }
  }, [isSelectMode]);

  // if the positions object changes,
  // animate the item to its new position
  useAnimatedReaction(
    () => positions.value[ingredientId],
    (newOrder) => {
      const newPosition = getPosition(newOrder);
      translateY.value = withTiming(
        newPosition.y,
        animationConfig,
        () => (isReorderGestureActive.value = false),
      );
    },
  );

  // if item is below a currently deleting item,
  // animate the position of the item as the animation
  // reduces the height of the deleting item
  useAnimatedReaction(
    () => deletingId.value,
    (dId) => {
      if (!dId) return;
      const indexOfDeletingItem = positions.value[dId];
      const currentPosition = positions.value[ingredientId];
      if (currentPosition > indexOfDeletingItem) {
        translateY.value = withTiming(
          translateY.value - INGREDIENT_ITEM_HEIGHT,
          deleteAnimationConfig,
        );
      }
    },
  );

  // ===================== General Functions =====================
  const deleteItemAnimation = () => (deletingId.value = ingredientId);
  const triggerReorderHaptic = () => Haptics.selectionAsync();
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

  // After repositioning animations, dispatch the new order to save in redux
  const updatePositions = () => {
    let newOrder = Object.keys(positions.value).sort((a: string, b: string) => {
      return positions.value[a] - positions.value[b];
    });
    dispatch(recipeActions.updateIngredientsOrder(recipeId, newOrder));
  };

  // ====================== Gesture Handler ======================
  // Reordering gesture handler
  const onReOrderGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      isReorderGestureActive.value = true;
      ctx.y = translateY.value;
      runOnJS(triggerReorderHaptic)();
    },
    onActive: ({ translationY }, ctx) => {
      // update the position of the active item on drag
      translateY.value = ctx.y + translationY;

      // if order changes based on current position, update the positions object
      // so that the other items can react to the change
      const oldOrder = positions.value[ingredientId];
      const newOrder = getOrder(translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder,
        );
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[ingredientId] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
    },
    onEnd: () => {
      isReorderGestureActive.value = false;
      const destination = getPosition(positions.value[ingredientId]);
      if (translateY.value === destination.y) {
        // alredy in position. No need to animate
        return runOnJS(updatePositions)();
      }
      translateY.value = withTiming(destination.y, animationConfig, () => {
        runOnJS(updatePositions)();
      });
    },
  });

  const mainContainerStyle = useAnimatedStyle(() => {
    const zIndex = isReorderGestureActive.value ? 200 : 1;
    const scale = isReorderGestureActive.value ? 1.03 : 1;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex,
      transform: [{ translateY: translateY.value }, { scale }],
    };
  });

  const checkboxContainerStyle = useAnimatedStyle(() => ({
    width: checkboxContainerWidth.value,
  }));

  const reorderContainerStyle = useAnimatedStyle(() => ({
    width: interpolate(
      checkboxContainerWidth.value,
      [0, CHECKBOX_CONTAINER_WIDTH],
      [CHECKBOX_CONTAINER_WIDTH, 0],
    ),
    opacity: interpolate(
      checkboxContainerWidth.value,
      [0, CHECKBOX_CONTAINER_WIDTH],
      [1, 0],
    ),
  }));

  const reorderImageStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      checkboxContainerWidth.value,
      [0, CHECKBOX_CONTAINER_WIDTH],
      [1, 0],
    );
    return {
      width: 25,
      height: 25,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={mainContainerStyle}>
      <Deleteable
        enabled={!isSelectMode}
        containerHeight={INGREDIENT_ITEM_HEIGHT}
        onDeleteAnimationStarted={deleteItemAnimation}
        onDeleteAnimationComplete={deleteItem}>
        {({ interceptPress }) => (
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
            <Animated.View style={reorderContainerStyle}>
              {isReorderVisible && (
                <PanGestureHandler onGestureEvent={onReOrderGestureEvent}>
                  <ReorderContainer>
                    <Animated.View style={reorderImageStyle}>
                      <SvgImage
                        icon="reorder"
                        size="100%"
                        fill={theme.colors.primary}
                      />
                    </Animated.View>
                  </ReorderContainer>
                </PanGestureHandler>
              )}
            </Animated.View>
            <TextContainer>
              <IngredientText numberOfLines={1}>{name}</IngredientText>
              <AmountText style={{ paddingLeft: 4 }}>{`${amount || ''} ${
                unit || ''
              }`}</AmountText>
            </TextContainer>
            {isCheckboxVisible && (
              <CheckboxContainer style={checkboxContainerStyle}>
                <SvgImage
                  icon={isSelected ? 'checkedFilled' : 'unchecked'}
                  size={30}
                  fill={theme.colors.primary}
                />
              </CheckboxContainer>
            )}
          </IngredientContainer>
        )}
      </Deleteable>
    </Animated.View>
  );
};

const ReorderContainer = styled(Animated.View)`
  width: ${CHECKBOX_CONTAINER_WIDTH}px;
  height: 100%;
  align-items: flex-end;
  justify-content: center;
  right: 0;
`;

const IngredientContainer = styled.TouchableOpacity`
  height: 100%;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.paper};
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator};
`;

const TextContainer = styled.View`
  flex-direction: row;
  padding-left: 12px;
  padding-right: ${(props) => props.theme.itemPadding}
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

const getPosition = (order: number) => {
  'worklet';
  return {
    y: order * INGREDIENT_ITEM_HEIGHT,
  };
};

const getOrder = (y: number) => {
  'worklet';
  return Math.round(y / INGREDIENT_ITEM_HEIGHT);
};

const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 200,
};

const deleteAnimationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

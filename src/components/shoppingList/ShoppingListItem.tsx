import React from 'react';
import styled from 'styled-components/native';
import {Images} from '../../../assets/images';
import {useTheme} from '../../context/ThemeContext';
import {SvgImage} from '../common/SvgImage';
import {Text} from '../common/Text';
import {
  ShoppingListItem as ShoppingListItemType,
  ShoppingListState,
  ShoppingListActions,
} from './useShoppingListState';
import {
  getOrder,
  getPosition,
  Positions,
  SHOPPING_LIST_ITEM_HEIGHT,
} from '../../screens/ShoppingList';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {Dimensions, TouchableOpacity} from 'react-native';

type ShoppingListItemProps = {
  id: string;
  item: ShoppingListItemType;
  dispatchShoppingList: (action: ShoppingListActions) => void;
  positions: Animated.SharedValue<Positions>;
  checkAnimation: (id: string, isFound: boolean) => void;
  shoppingList: ShoppingListState;
  deletingId: Animated.SharedValue<string | undefined>;
};

const SNAP_INTERVAL = -80;
const SNAP_THRESHOLD = -70;
const WIDTH = Dimensions.get('window').width;

export const ShoppingListItem = ({
  id,
  item,
  dispatchShoppingList,
  positions,
  checkAnimation,
  shoppingList,
  deletingId,
}: ShoppingListItemProps) => {
  const theme = useTheme();
  const position = getPosition(positions.value[id]);
  const translateY = useSharedValue(position.y);
  const translateX = useSharedValue(0);
  const isReorderGestureActive = useSharedValue(false);

  // height of the item. Changes on delete animation
  const height = useSharedValue(SHOPPING_LIST_ITEM_HEIGHT);
  // Prevents reordering the item into the 'already found' item section
  const reorderDragLimit =
    (shoppingList.unfoundOrder.length - 1) * SHOPPING_LIST_ITEM_HEIGHT;

  // if the positions object changes,
  // animate the item to its new position
  useAnimatedReaction(
    () => positions.value[id],
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
      const currentPosition = positions.value[id];
      if (currentPosition > indexOfDeletingItem) {
        translateY.value = withTiming(
          translateY.value - SHOPPING_LIST_ITEM_HEIGHT,
          animationConfig,
        );
      }
    },
  );

  // set swipe to default position
  const resetSwipeAnim = () => {
    translateX.value = withTiming(0, animationConfig);
  };

  // After repositioning animations, dispatch the new order to save in state
  const updatePositions = () => {
    let newOrder = Object.keys(positions.value).sort((a: string, b: string) => {
      return positions.value[a] - positions.value[b];
    });

    if (shoppingList.foundOrder.length <= 0) {
      dispatchShoppingList({type: 'updateOrder', unfoundOrder: newOrder});
      return;
    }
    // first entry of the found section. These do not change.
    // We're only interested in the 'not yet found' positions
    const firstFoundId = shoppingList.foundOrder[0];
    const index = newOrder.indexOf(firstFoundId);
    newOrder = newOrder.splice(0, index);
    dispatchShoppingList({type: 'updateOrder', unfoundOrder: newOrder});
  };

  // Reordering gesture handler
  const onReOrderGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      isReorderGestureActive.value = true;
      ctx.y = translateY.value;
    },
    onActive: ({translationY}, ctx) => {
      // update the position of the active item on drag
      let dest = ctx.y + translationY;
      reorderDragLimit;
      translateY.value = dest > reorderDragLimit ? reorderDragLimit : dest;

      // if order changes based on current position, update the positions object
      // so that the other items can react to the change
      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder,
        );
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
    },
    onEnd: () => {
      isReorderGestureActive.value = false;
      const destination = getPosition(positions.value[id]);
      translateY.value = withTiming(destination.y, animationConfig, () =>
        runOnJS(updatePositions)(),
      );
    },
  });

  // swipe to delete gesture handler
  const onSwipeGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({translationX}, ctx) => {
      let dest = ctx.x + translationX;
      translateX.value = dest <= 0 ? dest : 0;
    },
    onEnd: () => {
      const destination = translateX.value < SNAP_THRESHOLD ? SNAP_INTERVAL : 0;
      translateX.value = withTiming(destination, animationConfig);
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    const zIndex = isReorderGestureActive.value ? 100 : 1;
    const scale = isReorderGestureActive.value ? 1.03 : 1;
    return {
      height: height.value,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex,
      transform: [{translateY: translateY.value}, {scale}],
    };
  });

  const deleteContainerStyle = useAnimatedStyle(() => {
    const zIndex = deletingId.value === id ? 100 : 1;
    return {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: '#de2626',
      right: 0,
      zIndex,
      width: Math.abs(translateX.value),
      height: height.value,
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: 25,
      height: 25,
      opacity: interpolate(translateX.value, [0, SNAP_INTERVAL], [0, 1]),
      transform: [
        {
          scale: interpolate(
            translateX.value,
            [0, SNAP_INTERVAL],
            [0.001, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  const deleteItem = () => {
    deletingId.value = undefined;
    dispatchShoppingList({type: 'deleteItem', id});
  };

  const deleteItemAnim = () => {
    deletingId.value = id;
    translateX.value = withTiming(-WIDTH, animationConfig);
    height.value = withTiming(0, animationConfig, () => runOnJS(deleteItem)());
  };

  const checkboxPress = () => {
    if (Math.abs(translateX.value) > 20) return resetSwipeAnim();
    // Do not animate if the position does not change
    const isLastUnfoundItem =
      id === shoppingList.unfoundOrder[shoppingList.unfoundOrder.length - 1];
    const isFirstFoundItem =
      shoppingList.foundOrder && shoppingList.foundOrder[0] === id;
    if (!isLastUnfoundItem && !isFirstFoundItem) {
      isReorderGestureActive.value = true;
    }
    checkAnimation(id, !item.found);
  };

  const DeleteButton = () => (
    <Animated.View style={deleteContainerStyle}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={deleteItemAnim}>
        <Animated.View style={imageStyle}>
          <SvgImage
            source={Images.deleteFilled}
            style={{fill: '#FFF', width: '100%', height: '100%'}}
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );

  const swipeableContainerStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      flexDirection: 'row',
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <ShoppingListItemContainer
      style={[
        containerStyle,
        item.found && {backgroundColor: theme.colors.paperSecondary},
      ]}>
      <DeleteButton />
      <Animated.View style={swipeableContainerStyle}>
        <PanGestureHandler
          enabled={!item.found}
          onGestureEvent={onReOrderGestureEvent}>
          <ReorderContainer>
            <SvgImage
              source={Images.reorder}
              style={{
                width: 25,
                height: 25,
                color: item.found
                  ? theme.colors.iconSubtleColor
                  : theme.colors.primary,
              }}
            />
          </ReorderContainer>
        </PanGestureHandler>

        <PanGestureHandler onGestureEvent={onSwipeGestureEvent}>
          <Animated.View
            style={{height: '100%', flex: 1, flexDirection: 'row'}}>
            <TextContainer onPress={resetSwipeAnim}>
              <ShoppingListText
                style={
                  item.found && {
                    textDecorationLine: 'line-through',
                    color: theme.colors.textSecondary,
                  }
                }>
                {item.name}
              </ShoppingListText>
            </TextContainer>
            <CheckboxButton onPress={checkboxPress}>
              <SvgImage
                source={item.found ? Images.checkedFilled : Images.unchecked}
                style={{
                  width: 30,
                  height: 30,
                  color: theme.colors.primary,
                  fill: theme.colors.primary,
                }}
              />
            </CheckboxButton>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </ShoppingListItemContainer>
  );
};

const ShoppingListItemContainer = styled(Animated.View)`
  overflow: hidden;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.paper};
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator};
`;

const ShoppingListText = styled(Text)`
  font-weight: 500;
`;

const ReorderContainer = styled(Animated.View)`
  padding-left: ${(props) => props.theme.itemPadding};
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.TouchableOpacity`
  padding: ${(props) => props.theme.itemPadding};
  flex: 1;
  justify-content: center;
`;

const CheckboxButton = styled.TouchableOpacity`
  height: 100%;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
`;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

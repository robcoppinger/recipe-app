import React from 'react';
import styled from 'styled-components/native';
import {Images} from '../../../assets/images';
import {useTheme} from '../../context/ThemeContext';
import {SvgImage} from '../common/SvgImage';
import {Text} from '../common/Text';
import {getOrder, getPosition, Positions} from '../../screens/ShoppingList';
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
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux';
import {
  selectors,
  actions as listActions,
} from '../../redux/modules/shoppingLists/ShoppingLists';
import {
  actions,
  selectors as itemSelectors,
} from '../../redux/modules/shoppingListItems/ShoppingListItems';
import * as Haptic from 'expo-haptics';

type ShoppingListItemProps = {
  shoppingListId: string;
  itemId: string;
  positions: Animated.SharedValue<Positions>;
  deletingId: Animated.SharedValue<string | undefined>;
};

export const SHOPPING_LIST_ITEM_HEIGHT = 60;
const SNAP_INTERVAL = -80;
const SNAP_THRESHOLD = -70;
const WIDTH = Dimensions.get('window').width;

export const ShoppingListItem = ({
  shoppingListId,
  itemId,
  positions,
  deletingId,
}: ShoppingListItemProps) => {
  // ================ Declare state and variables ================
  const dispatch = useDispatch();
  const theme = useTheme();
  const position = getPosition(positions.value[itemId]);
  const translateY = useSharedValue(position.y); // changed on reorder
  const translateX = useSharedValue(0); // changed on swipe to delete
  const isReorderGestureActive = useSharedValue(false);
  const height = useSharedValue(SHOPPING_LIST_ITEM_HEIGHT); // height of the item. Changes on delete animation

  const item = useSelector((s: RootState) =>
    itemSelectors.shoppingListItem(s, itemId),
  );
  const unfoundItems = useSelector((s: RootState) =>
    selectors.unfoundItems(s, shoppingListId),
  );
  const foundItems = useSelector((s: RootState) =>
    selectors.foundItems(s, shoppingListId),
  );
  // Prevents reordering the item into the 'already found' item section
  const reorderDragLimit =
    (unfoundItems.length - 1) * SHOPPING_LIST_ITEM_HEIGHT;

  // ==================== Animation reactions ====================
  // if the positions object changes,
  // animate the item to its new position
  useAnimatedReaction(
    () => positions.value[itemId],
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
      const currentPosition = positions.value[itemId];
      if (currentPosition > indexOfDeletingItem) {
        translateY.value = withTiming(
          translateY.value - SHOPPING_LIST_ITEM_HEIGHT,
          animationConfig,
        );
      }
    },
  );

  // ========= Gesture SideEffects and General Functions =========

  const triggerHaptic = () => Haptic.selectionAsync();

  // set swipe to default position
  const resetSwipeAnim = () => {
    translateX.value = withTiming(0, animationConfig);
  };

  // After repositioning animations, dispatch the new order to save in redux
  const updatePositions = () => {
    let newOrder = Object.keys(positions.value).sort((a: string, b: string) => {
      return positions.value[a] - positions.value[b];
    });

    if (foundItems.length <= 0) {
      dispatch(listActions.updateUnfoundOrder(shoppingListId, newOrder));
      return;
    }
    // first entry of the found section. These do not change.
    // We're only interested in the 'not yet found' positions
    const firstFoundId = foundItems[0];
    const index = newOrder.indexOf(firstFoundId);
    newOrder = newOrder.splice(0, index);
    dispatch(listActions.updateUnfoundOrder(shoppingListId, newOrder));
  };

  const deleteItem = () => {
    deletingId.value = undefined;
    dispatch(actions.deleteItem(shoppingListId, itemId));
  };

  const deleteItemAnimation = () => {
    deletingId.value = itemId;
    translateX.value = withTiming(-WIDTH, animationConfig);
    height.value = withTiming(0, animationConfig, () => runOnJS(deleteItem)());
  };

  const assignNewPositions = (order: string[]) => {
    positions.value = Object.assign(
      {},
      ...order.map((i, index) => ({[i]: index})),
    );
  };

  const foundAnimation = async () => {
    const isLastUnfoundItem = itemId === unfoundItems[unfoundItems.length - 1];
    const markFound = () => dispatch(actions.markFound(shoppingListId, itemId));

    if (isLastUnfoundItem) {
      // animation not needed. Item is already in position
      markFound();
      return;
    }
    // animate position change
    isReorderGestureActive.value = true;
    let newUnfound = unfoundItems.filter((d) => d !== itemId);
    let newFound = [itemId, ...foundItems];
    let newOrder = [...newUnfound, ...newFound];
    assignNewPositions(newOrder);

    // wait for animation to complete before updating redux
    await new Promise((res) => setTimeout(res, animationConfig.duration));
    markFound();
  };

  const unfoundAnimation = async () => {
    const isFirstFoundItem = foundItems && foundItems[0] === itemId;
    const markUnfound = () =>
      dispatch(actions.markUnfound(shoppingListId, itemId));

    if (isFirstFoundItem) {
      // animation not needed. Item is already in position
      markUnfound();
      return;
    }
    // animate position change
    isReorderGestureActive.value = true;
    let newUnfound = [...unfoundItems, itemId];
    let newFound = foundItems.filter((d) => d !== itemId);
    let newOrder = [...newUnfound, ...newFound];
    assignNewPositions(newOrder);

    // wait for animation to complete before updating redux
    await new Promise((res) => setTimeout(res, animationConfig.duration));
    markUnfound();
  };

  const checkboxPress = () => {
    triggerHaptic();
    if (Math.abs(translateX.value) > 20) return resetSwipeAnim();
    if (item.isFound) return unfoundAnimation();
    foundAnimation();
  };

  // ====================== Gesture Handlers ======================
  // Reordering gesture handler
  const onReOrderGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      isReorderGestureActive.value = true;
      ctx.y = translateY.value;
      runOnJS(triggerHaptic)();
    },
    onActive: ({translationY}, ctx) => {
      // update the position of the active item on drag
      let dest = ctx.y + translationY;
      translateY.value = dest > reorderDragLimit ? reorderDragLimit : dest;

      // if order changes based on current position, update the positions object
      // so that the other items can react to the change
      const oldOrder = positions.value[itemId];
      const newOrder = getOrder(translateY.value);
      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder,
        );
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[itemId] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
    },
    onEnd: () => {
      isReorderGestureActive.value = false;
      const destination = getPosition(positions.value[itemId]);
      if (translateY.value === destination.y) {
        return runOnJS(updatePositions)();
      }
      translateY.value = withTiming(destination.y, animationConfig, () => {
        runOnJS(updatePositions)();
      });
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

  // ====================== Animated Styles ======================
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
    const zIndex = deletingId.value === itemId ? 100 : 1;
    return {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: theme.colors.danger,
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
  const swipeableContainerStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      flexDirection: 'row',
      transform: [{translateX: translateX.value}],
    };
  });

  // ====================== Rendered content ======================

  const DeleteButton = () => (
    <Animated.View style={deleteContainerStyle}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={deleteItemAnimation}>
        <Animated.View style={imageStyle}>
          <SvgImage
            source={Images.deleteFilled}
            style={{fill: '#FFF', width: '100%', height: '100%'}}
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ShoppingListItemContainer
      style={[
        containerStyle,
        item.isFound && {backgroundColor: theme.colors.paperSecondary},
      ]}>
      <DeleteButton />
      <Animated.View style={swipeableContainerStyle}>
        <PanGestureHandler
          enabled={!item.isFound}
          onGestureEvent={onReOrderGestureEvent}>
          <ReorderContainer>
            <SvgImage
              source={Images.reorder}
              style={{
                width: 25,
                height: 25,
                color: item.isFound
                  ? theme.colors.iconSubtleColor
                  : theme.colors.primary,
              }}
            />
          </ReorderContainer>
        </PanGestureHandler>

        <PanGestureHandler
          activeOffsetX={[-10, 10]}
          onGestureEvent={onSwipeGestureEvent}>
          <Animated.View
            style={{height: '100%', flex: 1, flexDirection: 'row'}}>
            <TextContainer onPress={resetSwipeAnim}>
              <ItemText
                style={
                  item.isFound && {
                    textDecorationLine: 'line-through',
                    color: theme.colors.textSecondary,
                  }
                }>
                {item.name}
              </ItemText>
              <AmountText style={{paddingLeft: 4}}>
                {`${item.amount || ''} ${item.unit || ''}`}
              </AmountText>
            </TextContainer>
            <CheckboxButton onPress={checkboxPress}>
              <SvgImage
                source={item.isFound ? Images.checkedFilled : Images.unchecked}
                style={{
                  width: 30,
                  height: 30,
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

const ItemText = styled(Text)`
  flex: 1;
  font-weight: 500;
`;

const ReorderContainer = styled(Animated.View)`
  padding-left: ${(props) => props.theme.itemPadding};
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: ${(props) => props.theme.itemPadding};
  padding-right: 0;
  flex: 1;
  justify-content: center;
`;

const CheckboxButton = styled.TouchableOpacity`
  height: 100%;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
`;

const AmountText = styled(Text)`
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

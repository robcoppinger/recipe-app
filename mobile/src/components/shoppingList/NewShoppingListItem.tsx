import React, { createRef } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { v4 as uuidV4 } from 'uuid';
import { actions } from '../../redux/modules/shoppingListItems/ShoppingListItems';
import { TextInput } from '../common/TextInput';
import { animationConfig, SHOPPING_LIST_ITEM_HEIGHT } from './ShoppingListItem';
import { useShoppingListItemState } from './useShoppingListItemState';

type NewShoppingListItemProps = {
  shoppingListId: string;
  offset: number;
  deletingId: Animated.SharedValue<string | undefined>;
};

export const NEW_SHOPPINGLIST_ITEM_HEIGHT = 60;

export const NewShoppingListItem = ({
  shoppingListId,
  offset,
  deletingId,
}: NewShoppingListItemProps) => {
  const dispatch = useDispatch();
  const [newItem, dispatchNewItem] = useShoppingListItemState();
  const translateY = useSharedValue(offset);

  const nameInputRef = createRef<RNTextInput>();
  const amountRef = createRef<RNTextInput>();
  const unitRef = createRef<RNTextInput>();

  const addItem = () => {
    if (newItem.name === '') return;
    const newId = uuidV4();
    dispatch(actions.addItem(shoppingListId, newId, newItem));
    dispatchNewItem({ type: 'resetAll' });
  };

  useAnimatedReaction(
    () => deletingId.value,
    (dId) => {
      if (dId) {
        translateY.value = withTiming(
          translateY.value - SHOPPING_LIST_ITEM_HEIGHT,
          animationConfig,
        );
      }
    },
  );

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: NEW_SHOPPINGLIST_ITEM_HEIGHT,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      transform: [{ translateY: translateY.value }],
      justifyContent: 'center',
    };
  });

  return (
    <Animated.View style={containerStyle}>
      <NewItemContainer>
        <ItemName
          ref={nameInputRef}
          value={newItem.name}
          onChangeText={(value) =>
            dispatchNewItem({ type: 'setName', name: value })
          }
          placeholder="New Item"
          returnKeyType="next"
          onSubmitEditing={() => amountRef.current?.focus()}
        />
        <Amount
          value={newItem.amount}
          onChangeText={(value) =>
            dispatchNewItem({ type: 'setAmount', amount: value })
          }
          ref={amountRef}
          placeholder="Amt."
          returnKeyType="next"
          onSubmitEditing={() => unitRef.current?.focus()}
        />
        <Unit
          value={newItem.unit}
          onChangeText={(value) =>
            dispatchNewItem({ type: 'setUnit', unit: value })
          }
          ref={unitRef}
          placeholder="unit"
          returnKeyType="done"
          onSubmitEditing={addItem}
          autoCapitalize="none"
        />
      </NewItemContainer>
    </Animated.View>
  );
};

const NewItemContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: transparent;
  margin-bottom: 8px;
  padding-top: 12px;
  padding-left: ${(props) => props.theme.itemPadding};
  padding-right: 8px;
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

const ItemName = styled(Input)`
  flex: 1;
  border-bottom-width: 1px;
`;

const Amount = styled(Input)`
  width: 44px;
  text-align: center;
`;

const Unit = styled(Input)`
  width: 36px;
  text-align: center;
`;

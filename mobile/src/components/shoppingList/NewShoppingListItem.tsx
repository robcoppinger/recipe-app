import React, { useState } from 'react';
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

type NewShoppingListItemProps = {
  shoppingListId: string;
  offset: number;
  deletingId: Animated.SharedValue<string | undefined>;
};

export const NEW_SHOPPINGLIST_ITEM_HEIGHT = 50;

export const NewShoppingListItem = ({
  shoppingListId,
  offset,
  deletingId,
}: NewShoppingListItemProps) => {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState('');
  const translateY = useSharedValue(offset);

  const addItem = () => {
    if (newItem === '') return;
    const newId = uuidV4();
    dispatch(
      actions.addItem(shoppingListId, newId, {
        shoppingListId,
        name: newItem.trim(),
        isFound: false,
      }),
    );
    setNewItem('');
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
      <NewItem
        placeholder="new Item"
        value={newItem}
        onChangeText={setNewItem}
        blurOnSubmit={newItem === ''}
        onSubmitEditing={addItem}
      />
    </Animated.View>
  );
};

const NewItem = styled(TextInput)`
  height: 100%;
  border-bottom-width: 1px;
  padding-bottom: 12px;
  padding-top: 12px;
  margin: 12px;
`;

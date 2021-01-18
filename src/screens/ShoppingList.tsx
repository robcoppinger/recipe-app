import React, {useState} from 'react';
import {View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import styled from 'styled-components/native';
import {Layout} from '../components/common/Layout';
import {TextInput} from '../components/common/TextInput';
import {
  animationConfig,
  ShoppingListItem,
} from '../components/shoppingList/ShoppingListItem';
import {useShoppingListState} from '../components/shoppingList/useShoppingListState';

export const SHOPPING_LIST_ITEM_HEIGHT = 60;

export const ShoppingList = ({}) => {
  const [shoppingList, dispatchShoppingList] = useShoppingListState();
  const {items, foundOrder, unfoundOrder} = shoppingList;
  const [newItem, setNewItem] = useState('');

  const deletingId = useSharedValue<undefined | string>(undefined);

  const order = unfoundOrder.concat(foundOrder);
  const positions = useSharedValue<Positions>(
    Object.assign({}, ...order.map((id, index) => ({[id]: index}))),
  );

  const addItem = () => {
    if (newItem === '') return;
    dispatchShoppingList({type: 'addItem', name: newItem.trim()});
    setNewItem('');
  };

  const foundAnimation = (id: string) => {
    let newUnfound = shoppingList.unfoundOrder.filter((d) => d !== id);
    let newFound = [id, ...shoppingList.foundOrder];

    let newOrder = [...newUnfound, ...newFound];
    positions.value = Object.assign(
      {},
      ...newOrder.map((i, index) => ({[i]: index})),
    );
  };

  const unfoundAnimation = (id: string) => {
    let newUnfound = [...shoppingList.unfoundOrder, id];
    let newFound = shoppingList.foundOrder.filter((d) => d !== id);

    let newOrder = [...newUnfound, ...newFound];
    positions.value = Object.assign(
      {},
      ...newOrder.map((i, index) => ({[i]: index})),
    );
  };

  const foundStatusCallback = (id: string, isFound: boolean) => {
    dispatchShoppingList({
      type: 'markFound',
      id: id,
      value: isFound,
    });
  };

  const checkAnimation = (id: string, isFound: boolean) => {
    // first found item should not animate. it's already in position
    const isLastUnfoundItem =
      id === shoppingList.unfoundOrder[shoppingList.unfoundOrder.length - 1];
    const isFirstFoundItem =
      shoppingList.foundOrder && shoppingList.foundOrder[0] === id;
    const shouldAnimate = !isLastUnfoundItem && !isFirstFoundItem;

    if (!shouldAnimate) return foundStatusCallback(id, isFound);
    // trigger animation
    isFound ? foundAnimation(id) : unfoundAnimation(id);
    // update state after animation
    setTimeout(
      () => foundStatusCallback(id, isFound),
      animationConfig.duration,
    );
  };

  return (
    <Layout>
      <View style={{flex: 1}}>
        <View style={{height: order.length * SHOPPING_LIST_ITEM_HEIGHT}}>
          {order.map((id) => {
            const item = items[id];
            return (
              <ShoppingListItem
                key={id}
                {...{
                  id,
                  item,
                  dispatchShoppingList,
                  positions,
                  checkAnimation,
                  shoppingList,
                  deletingId,
                }}
              />
            );
          })}
        </View>

        <NewItem
          placeholder="new Item"
          value={newItem}
          onChangeText={setNewItem}
          blurOnSubmit={newItem === ''}
          onSubmitEditing={addItem}
        />
      </View>
    </Layout>
  );
};

const NewItem = styled(TextInput)`
  font-weight: 500;
  border-bottom-width: 1px;
  padding-bottom: 12px;
  padding-top: 12px;
  margin: 12px;
`;

export const getPosition = (order: number) => {
  'worklet';
  return {
    y: order * SHOPPING_LIST_ITEM_HEIGHT,
  };
};

export const getOrder = (y: number) => {
  'worklet';
  return Math.round(y / SHOPPING_LIST_ITEM_HEIGHT);
};

export interface Positions {
  [id: string]: number;
}

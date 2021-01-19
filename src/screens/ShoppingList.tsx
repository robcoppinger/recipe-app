import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {Layout} from '../components/common/Layout';
import {
  ShoppingListItem,
  SHOPPING_LIST_ITEM_HEIGHT,
} from '../components/shoppingList/ShoppingListItem';
import {ShoppingListScreenRouteProp} from '../navigators/ShoppingListNavigator';
import {selectors} from '../redux/modules/shoppingLists/ShoppingLists';
import {RootState} from '../redux';
import {
  NewShoppingListItem,
  NEW_SHOPPINGLIST_ITEM_HEIGHT,
} from '../components/shoppingList/NewShoppingListItem';

export const ShoppingList = () => {
  const route = useRoute<ShoppingListScreenRouteProp>();
  const params = route.params || {};
  const {shoppingListId} = params;
  const deletingId = useSharedValue<undefined | string>(undefined);

  const shoppingList = useSelector((s: RootState) =>
    selectors.shoppingList(s, shoppingListId),
  );
  const {unfoundItems, foundItems} = shoppingList;
  const order = unfoundItems
    .concat(foundItems)
    .filter((value, index, self) => self.indexOf(value) === index);
  const positions = useSharedValue<Positions>(
    Object.assign({}, ...order.map((id, index) => ({[id]: index}))),
  );
  const newItemOffset = order.length * SHOPPING_LIST_ITEM_HEIGHT;

  return (
    <Layout>
      <View style={{flex: 1}}>
        <ScrollView
          scrollIndicatorInsets={{right: 1}}
          contentContainerStyle={{
            height:
              order.length * SHOPPING_LIST_ITEM_HEIGHT +
              NEW_SHOPPINGLIST_ITEM_HEIGHT,
          }}>
          {order.map((shoppingListItemId) => (
            <ShoppingListItem
              key={shoppingListItemId}
              {...{
                shoppingListId,
                itemId: shoppingListItemId,
                positions,
                deletingId,
              }}
            />
          ))}
          <NewShoppingListItem
            shoppingListId={shoppingListId}
            offset={newItemOffset}
            deletingId={deletingId}
          />
        </ScrollView>
      </View>
    </Layout>
  );
};

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

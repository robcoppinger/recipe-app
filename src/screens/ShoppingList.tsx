import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {Layout} from '../components/common/Layout';
import {
  ShoppingListItem,
  SHOPPING_LIST_ITEM_HEIGHT,
} from '../components/shoppingList/ShoppingListItem';
import {ShoppingListScreenRouteProp} from '../navigators/AppNavigator';
import {selectors} from '../redux/modules/shoppingLists/ShoppingLists';
import {RootState} from '../redux';
import {NewShoppingListItem} from '../components/shoppingList/NewShoppingListItem';

export const ShoppingList = () => {
  const route = useRoute<ShoppingListScreenRouteProp>();
  const params = route.params || {};
  const {shoppingListId} = params;
  const deletingId = useSharedValue<undefined | string>(undefined);

  const shoppingList = useSelector((s: RootState) =>
    selectors.shoppingList(s, shoppingListId),
  );
  const {unfoundItems, foundItems} = shoppingList;
  const order = unfoundItems.concat(foundItems);
  const positions = useSharedValue<Positions>(
    Object.assign({}, ...order.map((id, index) => ({[id]: index}))),
  );

  return (
    <Layout>
      <View style={{flex: 1}}>
        <View style={{height: order.length * SHOPPING_LIST_ITEM_HEIGHT}}>
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
        </View>
        <NewShoppingListItem shoppingListId={shoppingListId} />
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

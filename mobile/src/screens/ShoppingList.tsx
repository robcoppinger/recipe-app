import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from '../components/common/Layout';
import {
  ShoppingListItem,
  SHOPPING_LIST_ITEM_HEIGHT,
} from '../components/shoppingList/ShoppingListItem';
import { ShoppingListScreenRouteProp } from '../navigators/ShoppingListNavigator';
import {
  actions,
  selectors,
} from '../redux/modules/shoppingLists/ShoppingLists';
import { RootState } from '../redux';
import {
  NewShoppingListItem,
  NEW_SHOPPINGLIST_ITEM_HEIGHT,
} from '../components/shoppingList/NewShoppingListItem';
import styled from 'styled-components/native';
import { TextInput } from '../components/common/TextInput';
import { useTheme } from '../context/ThemeContext';
import { SvgImage } from '../components/common/SvgImage';
import { Text } from '../components/common/Text';
import { EditShoppingListItem } from '../components/shoppingList/EditShoppingListItem';

export const ShoppingList = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const theme = useTheme();

  const route = useRoute<ShoppingListScreenRouteProp>();
  const params = route.params || {};
  const { shoppingListId } = params;

  const shoppingList = useSelector((s: RootState) =>
    selectors.shoppingList(s, shoppingListId),
  );
  if (!shoppingList) return <View />;
  const { unfoundItems, foundItems } = shoppingList;

  const [mode, setMode] = useState<'default' | 'edit'>('default');
  const [title, setTitle] = useState(shoppingList.name);
  const deletingId = useSharedValue<undefined | string>(undefined);

  const toggleMode = () => setMode(mode === 'default' ? 'edit' : 'default');

  const order = unfoundItems
    .concat(foundItems)
    .filter((value, index, self) => self.indexOf(value) === index);
  const positions = useSharedValue<Positions>(
    Object.assign({}, ...order.map((id, index) => ({ [id]: index }))),
  );
  const newItemOffset = order.length * SHOPPING_LIST_ITEM_HEIGHT;

  const customHeader = () => (
    <HeaderContent>
      <TouchableOpacity onPress={goBack}>
        <SvgImage icon="back" size={30} fill={theme.colors.primary} />
      </TouchableOpacity>
      <HeaderTitle
        editable={mode === 'edit'}
        style={mode === 'edit' && { borderBottomWidth: 1, paddingBottom: 3 }}
        value={title}
        selectTextOnFocus
        onChangeText={(value) => setTitle(value)}
        onBlur={() =>
          dispatch(actions.editShoppingListTitle(shoppingListId, title))
        }
        autoFocus={title === 'New Recipe'}
        placeholder="New Recipe"
      />
      <HeaderActionButton onPress={toggleMode}>
        <HeaderActionText>
          {mode === 'default' ? 'Edit' : 'Done'}
        </HeaderActionText>
      </HeaderActionButton>
    </HeaderContent>
  );

  return (
    <Layout
      customHeaderComponent={customHeader}
      headerLabel={shoppingList.name}
      showGoBack>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={110}>
        <ScrollView
          scrollIndicatorInsets={{ right: 1 }}
          contentContainerStyle={{
            height:
              order.length * SHOPPING_LIST_ITEM_HEIGHT +
              NEW_SHOPPINGLIST_ITEM_HEIGHT,
          }}>
          {order.map((shoppingListItemId) =>
            mode === 'default' ? (
              <ShoppingListItem
                key={shoppingListItemId}
                {...{
                  shoppingListId,
                  itemId: shoppingListItemId,
                  positions,
                  deletingId,
                }}
              />
            ) : (
              <EditShoppingListItem
                key={shoppingListItemId}
                {...{ shoppingListItemId, shoppingListId }}
              />
            ),
          )}
          <NewShoppingListItem
            shoppingListId={shoppingListId}
            offset={newItemOffset}
            deletingId={deletingId}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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

const HeaderActionButton = styled.TouchableOpacity`
  height: 30px;
  padding: 8px;
  justify-content: center;
`;

const HeaderTitle = styled(TextInput)`
  flex: 1;
  text-align: left;
  font-family: ${(props) => props.theme.defaultFontFamily.semiBold};
  font-size: ${(props) => props.theme.fontSize.h3};
  margin-left: 8px;
  margin-right: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
`;

const HeaderContent = styled.View`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  padding-left: 8px;
  padding-right: 24px;
`;

const HeaderActionText = styled(Text)`
  color: ${(props) => props.theme.colors.primary};
`;

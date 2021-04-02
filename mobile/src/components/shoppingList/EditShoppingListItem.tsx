import React, { createRef } from 'react';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { SvgImage } from '../common/SvgImage';
import { TouchableOpacity, TextInput as RNTextInput } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { TextInput } from '../common/TextInput';
import { SHOPPING_LIST_ITEM_HEIGHT } from './ShoppingListItem';
import {
  actions,
  selectors,
} from '../../redux/modules/shoppingListItems/ShoppingListItems';
import { useShoppingListItemState } from './useShoppingListItemState';

type EditShoppingListItemProps = {
  shoppingListItemId: string;
  shoppingListId: string;
};

export const EditShoppingListItem = ({
  shoppingListItemId,
  shoppingListId,
}: EditShoppingListItemProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const amountInput = createRef<RNTextInput>();
  const unitInput = createRef<RNTextInput>();

  const [shoppingListItem, dispatchItem] = useShoppingListItemState(
    useSelector((st: RootState) =>
      selectors.shoppingListItem(st, shoppingListItemId),
    ),
  );

  const onBlur = () => {
    if (shoppingListItem.name === '') {
      dispatch(actions.deleteItem(shoppingListId, shoppingListItemId));
      return;
    }
    dispatch(actions.editItem(shoppingListItemId, shoppingListItem));
  };

  return (
    <ItemContainer>
      <ItemText
        value={shoppingListItem.name}
        placeholder="New item"
        onChangeText={(value) => dispatchItem({ type: 'setName', name: value })}
        onBlur={onBlur}
        returnKeyType="next"
        onSubmitEditing={() => amountInput.current?.focus()}
      />
      <Amount
        ref={amountInput}
        placeholder="Amt."
        value={shoppingListItem.amount}
        onChangeText={(value) =>
          dispatchItem({ type: 'setAmount', amount: value })
        }
        onBlur={onBlur}
        returnKeyType="next"
        onSubmitEditing={() => unitInput.current?.focus()}
      />
      <Unit
        ref={unitInput}
        placeholder="unit"
        autoCapitalize="none"
        value={shoppingListItem.unit}
        onChangeText={(value) => dispatchItem({ type: 'setUnit', unit: value })}
        onBlur={onBlur}
        returnKeyType="done"
      />
      <TouchableOpacity
        onPress={() =>
          dispatch(actions.deleteItem(shoppingListId, shoppingListItemId))
        }>
        <SvgImage
          size={25}
          icon="closeFilled"
          fill={theme.colors.iconSubtleColor}
        />
      </TouchableOpacity>
    </ItemContainer>
  );
};

const ItemContainer = styled.View`
  height: ${SHOPPING_LIST_ITEM_HEIGHT}px;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.paper};
  padding: ${(props) => props.theme.itemPadding};
  padding-bottom: 11px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator};
`;

const Input = styled(TextInput)`
  font-weight: 500;
  border-bottom-width: 1px;
  margin-right: 8px;
  padding-bottom: 8px;
`;

const ItemText = styled(Input)`
  flex: 1;
`;

const Amount = styled(Input)`
  text-align: center;
  width: 44px;
`;

const Unit = styled(Input)`
  width: 36px
  text-align: center;
`;

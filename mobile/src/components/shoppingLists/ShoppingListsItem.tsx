import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RootState } from '../../redux';
import {
  actions,
  selectors,
} from '../../redux/modules/shoppingLists/ShoppingLists';
import { Deleteable } from '../common/Deleteable';
import { Text } from '../common/Text';

type ShoppingListsItemProps = {
  shoppingListId: string;
};

const SHOPPING_LISTS_ITEM_HEIGHT = 60;

export const ShoppingListsItem = ({
  shoppingListId,
}: ShoppingListsItemProps) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const shoppingList = useSelector((s: RootState) =>
    selectors.shoppingList(s, shoppingListId),
  );

  const deleteShoppingList = () => {
    dispatch(actions.deleteShoppingList(shoppingListId));
  };

  return (
    <Deleteable
      containerHeight={SHOPPING_LISTS_ITEM_HEIGHT}
      onDeleteAnimationComplete={deleteShoppingList}>
      {({ interceptPress }) => (
        <Container
          onPress={() =>
            interceptPress(() => navigate('ShoppingList', { shoppingListId }))
          }>
          <ItemText>{shoppingList.name}</ItemText>
        </Container>
      )}
    </Deleteable>
  );
};

const Container = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.paper}
  padding: ${(props) => props.theme.itemPadding}
  border-color: ${(props) => props.theme.colors.itemSeparator};
  border-bottom-width: 1px;
`;

const ItemText = styled(Text)`
  font-weight: 500;
`;

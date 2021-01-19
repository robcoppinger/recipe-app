import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {RootState} from '../../redux';
import {selectors} from '../../redux/modules/shoppingLists/ShoppingLists';
import {Text} from '../common/Text';

type ShoppingListsItemProps = {
  shoppingListId: string;
};

export const ShoppingListsItem = ({shoppingListId}: ShoppingListsItemProps) => {
  const {navigate} = useNavigation();
  const shoppingList = useSelector((s: RootState) =>
    selectors.shoppingList(s, shoppingListId),
  );

  return (
    <Container onPress={() => navigate('ShoppingList', {shoppingListId})}>
      <ItemText>{shoppingList.name}</ItemText>
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.paper}
  padding: ${(props) => props.theme.itemPadding}
  border-color: ${(props) => props.theme.colors.itemSeparator};
  border-bottom-width: 1px;
`;

const ItemText = styled(Text)`
  font-weight: 500;
`;

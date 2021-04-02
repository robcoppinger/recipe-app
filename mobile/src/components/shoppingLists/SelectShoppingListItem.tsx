import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { useTheme } from '../../context/ThemeContext';
import { RootState } from '../../redux';
import { selectors } from '../../redux/modules/shoppingLists/ShoppingLists';
import { SvgImage } from '../common/SvgImage';
import { Text } from '../common/Text';

type SelectShoppingListItemProps = {
  shoppingListId: string;
  isSelected: boolean;
  setSelectedId: (id: string) => void;
};

export const SelectShoppingListItem = ({
  shoppingListId,
  isSelected,
  setSelectedId,
}: SelectShoppingListItemProps) => {
  const theme = useTheme();
  const shoppingList = useSelector((s: RootState) =>
    selectors.shoppingList(s, shoppingListId),
  );

  return (
    <Container onPress={() => setSelectedId(shoppingListId)}>
      <NameText>{shoppingList.name}</NameText>
      <SvgImage
        icon={isSelected ? 'checkedFilled' : 'unchecked'}
        size={25}
        fill={theme.colors.primary}
      />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  padding-horizontal: 4px
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.itemSeparator}
  flex-direction: row;
  align-items: center;
`;

const NameText = styled(Text)`
  padding-vertical: ${(props) => props.theme.itemPadding};
  padding-right: 12px;
  flex: 1;
  font-weight: 500;
`;

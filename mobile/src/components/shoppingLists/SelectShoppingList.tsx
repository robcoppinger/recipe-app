import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { useTheme } from '../../context/ThemeContext';
import {
  actions,
  selectors,
} from '../../redux/modules/shoppingLists/ShoppingLists';
import { SvgImage } from '../common/SvgImage';
import { Text } from '../common/Text';
import { SelectNewShoppingListItem } from './SelectNewShoppingListItem';
import { SelectShoppingListItem } from './SelectShoppingListItem';
import { v4 as uuidV4 } from 'uuid';
import { useModalView } from '../../context/ModalViewContext';

export const SelectShoppingList = ({
  onSelection,
}: {
  onSelection: (shoppingListId: string) => void;
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const modalView = useModalView();

  const shoppingLists = useSelector(selectors.shoppingLists);
  const [selectedId, setSelectedId] = useState('');
  const [newName, setNewName] = useState('');

  const isButtonDisabled =
    selectedId === '' || (selectedId === 'new' && newName === '');

  const buttonPress = () => {
    let shoppingListId = selectedId;
    if (selectedId === 'new') {
      const newId = uuidV4();
      shoppingListId = newId;
      dispatch(actions.addEmptyShoppingList(newId, newName));
    }
    onSelection(shoppingListId);
    modalView.hideModal();
  };

  return (
    <Container>
      <ListView>
        <SelectNewShoppingListItem
          isSelected={selectedId === 'new'}
          {...{
            setSelectedId,
            newName,
            setNewName,
          }}
        />
        {Object.keys(shoppingLists).map((shoppingListId) => (
          <SelectShoppingListItem
            key={shoppingListId}
            shoppingListId={shoppingListId}
            isSelected={shoppingListId === selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </ListView>

      <Button
        onPress={buttonPress}
        disabled={isButtonDisabled}
        style={
          isButtonDisabled && {
            borderColor: theme.colors.itemSeparator,
            backgroundColor: theme.colors.screenBackground,
          }
        }>
        <SvgImage
          icon="cart"
          size={25}
          fill={
            isButtonDisabled ? theme.colors.textSecondary : theme.colors.primary
          }
        />
        <ButtonText
          style={
            isButtonDisabled && {
              color: theme.colors.textSecondary,
            }
          }>
          Add to list
        </ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: column;
  flex: 1;
  padding-horizontal: ${(props) => props.theme.itemPadding};
`;

const ListView = styled.ScrollView`
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  margin-top: 4px;
  flex-direction: row;
  padding-horizontal: ${(props) => props.theme.itemPadding};
  padding-vertical: 12px;
  background-color: ${(props) => props.theme.colors.primaryFaded};
  border-radius: 6px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled(Text)`
  margin-left: 12px;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
`;

import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {v4 as uuidV4} from 'uuid';
import {actions} from '../../redux/modules/shoppingListItems/ShoppingListItems';
import {TextInput} from '../common/TextInput';

type NewShoppingListItemProps = {
  shoppingListId: string;
};

export const NewShoppingListItem = ({
  shoppingListId,
}: NewShoppingListItemProps) => {
  const dispatch = useDispatch();
  const [newItem, setNewItem] = useState('');
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
  return (
    <NewItem
      placeholder="new Item"
      value={newItem}
      onChangeText={setNewItem}
      blurOnSubmit={newItem === ''}
      onSubmitEditing={addItem}
    />
  );
};

const NewItem = styled(TextInput)`
  font-weight: 500;
  border-bottom-width: 1px;
  padding-bottom: 12px;
  padding-top: 12px;
  margin: 12px;
`;

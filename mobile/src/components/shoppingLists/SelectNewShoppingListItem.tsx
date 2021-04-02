import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '../../context/ThemeContext';
import { SvgImage } from '../common/SvgImage';
import { TextInput } from '../common/TextInput';

type SelectNewShoppingListItemProps = {
  isSelected: boolean;
  setSelectedId: (id: string) => void;
  newName: string;
  setNewName: (name: string) => void;
};

export const SelectNewShoppingListItem = ({
  isSelected,
  setSelectedId,
  newName,
  setNewName,
}: SelectNewShoppingListItemProps) => {
  const theme = useTheme();

  return (
    <Container>
      <SvgImage
        icon="addOutline"
        size={25}
        fill={isSelected ? theme.colors.primary : theme.colors.textSecondary}
      />
      <NameText
        returnKeyType="done"
        onFocus={() => setSelectedId('new')}
        placeholder="New Shopping List"
        value={newName}
        onChangeText={setNewName}
      />
      <TouchableOpacity onPress={() => setSelectedId('new')}>
        <SvgImage
          icon={isSelected ? 'checkedFilled' : 'unchecked'}
          size={25}
          fill={theme.colors.primary}
        />
      </TouchableOpacity>
    </Container>
  );
};

const Container = styled.View`
  padding-horizontal: 4px
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.colors.itemSeparator}
  flex-direction: row;
  align-items: center;
`;

const NameText = styled(TextInput)`
  padding-vertical: ${(props) => props.theme.itemPadding};
  padding-horizontal: 12px;
  flex: 1;
  font-weight: 500;
`;

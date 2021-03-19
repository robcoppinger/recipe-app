import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Layout} from '../components/common/Layout';
import {ShoppingListsItem} from '../components/shoppingLists/ShoppingListsItem';
import {actions, selectors} from '../redux/modules/shoppingLists/ShoppingLists';
import {v4 as uuidV4} from 'uuid';
import {useNavigation} from '@react-navigation/native';
import {SvgImage} from '../components/common/SvgImage';
import {useTheme} from '../context/ThemeContext';

export const ShoppingLists = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const theme = useTheme();

  const shoppingLists = useSelector(selectors.shoppingLists);

  const HeaderRightComponent = () => (
    <TouchableOpacity
      style={{position: 'absolute', right: 12}}
      onPress={() => {
        const shoppingListId = uuidV4();
        dispatch(
          actions.addEmptyShoppingList(shoppingListId, 'New Shopping List'),
        );
        navigate('ShoppingList', {shoppingListId});
      }}>
      <SvgImage icon="add" size={30} fill={theme.colors.primary} />
    </TouchableOpacity>
  );

  return (
    <Layout
      showDrawer
      headerLabel="Shopping Lists"
      headerRightComponent={HeaderRightComponent}>
      <FlatList
        data={Object.keys(shoppingLists)}
        keyExtractor={(item) => item}
        renderItem={({item}) => <ShoppingListsItem shoppingListId={item} />}
      />
    </Layout>
  );
};

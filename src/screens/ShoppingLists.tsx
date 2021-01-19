import React from 'react';
import {useSelector} from 'react-redux';
import {Layout} from '../components/common/Layout';
import {ShoppingListsItem} from '../components/shoppingLists/ShoppingListsItem';
import {selectors} from '../redux/modules/shoppingLists/ShoppingLists';

export const ShoppingLists = () => {
  const shoppingLists = useSelector(selectors.shoppingLists);

  return (
    <Layout showDrawer headerLabel="Shopping Lists">
      <>
        {Object.keys(shoppingLists).map((id) => (
          <ShoppingListsItem key={id} shoppingListId={id} />
        ))}
      </>
    </Layout>
  );
};

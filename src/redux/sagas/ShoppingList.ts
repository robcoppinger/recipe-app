import {takeLatest, select, put} from 'redux-saga/effects';
import {v4 as uuidV4} from 'uuid';
import {RootState} from '..';
import {selectors as ingredientSelectors} from '../modules/ingredients/Ingredients';
import {Ingredient} from '../modules/ingredients/types';
import {actions} from '../modules/shoppingListItems/ShoppingListItems';
import {ShoppingListItem} from '../modules/shoppingListItems/types';
import {PREPARE_INGREDIENTS_IMPORT} from '../modules/shoppingLists/ShoppingLists';
import {PrepareIngredientsImportAction} from '../modules/shoppingLists/types';

function* importIngredients(action: PrepareIngredientsImportAction) {
  const {ingredientIds, shoppingListId} = action;

  for (var ingredientId of ingredientIds) {
    const ingredient: Ingredient = yield select((s: RootState) =>
      ingredientSelectors.ingredient(s, ingredientId),
    );
    if (!ingredient) continue;

    const newItem: ShoppingListItem = {
      shoppingListId,
      isFound: false,
      name: ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.unit,
    };

    yield put(actions.addItem(shoppingListId, uuidV4(), newItem));
  }
}

export default function* applicationSaga() {
  yield takeLatest([PREPARE_INGREDIENTS_IMPORT], importIngredients);
}

import {takeLatest, select, put} from 'redux-saga/effects';
import {v4 as uuidV4} from 'uuid';
import {RootState} from '..';
import {selectors as ingredientSelectors} from '../modules/ingredients/Ingredients';
import {actions} from '../modules/shoppingLists/ShoppingLists';
import {ShoppingListItem} from '../modules/shoppingListItems/types';
import {PREPARE_INGREDIENTS_IMPORT} from '../modules/shoppingLists/ShoppingLists';
import {PrepareIngredientsImportAction} from '../modules/shoppingLists/types';

function* importIngredients(action: PrepareIngredientsImportAction) {
  const {ingredientIds, shoppingListId} = action;

  const ingredients: {[key: string]: ShoppingListItem} = {};

  for (var ingredientId of ingredientIds) {
    const ingredient: ShoppingListItem = yield select((s: RootState) =>
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
    ingredients[uuidV4()] = newItem;
  }
  yield put(actions.importIngredients(shoppingListId, ingredients));
}

export default function* applicationSaga() {
  yield takeLatest([PREPARE_INGREDIENTS_IMPORT], importIngredients);
}

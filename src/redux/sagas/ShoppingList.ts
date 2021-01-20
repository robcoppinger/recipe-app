import {takeLatest, select} from 'redux-saga/effects';
import {PREPARE_INGREDIENTS_IMPORT} from '../modules/shoppingLists/ShoppingLists';
import {PrepareIngredientsImportAction} from '../modules/shoppingLists/types';

function* importIngredients(action: PrepareIngredientsImportAction) {
  console.log('SAGA RUNNING');
}

export default function* applicationSaga() {
  yield takeLatest([PREPARE_INGREDIENTS_IMPORT], importIngredients);
}

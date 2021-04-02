import { all, fork } from 'redux-saga/effects';
import shoppingList from './ShoppingList';

export default function* rootSaga() {
  // your root saga with all the actions for users
  // TODO: Add self learned words saga
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    fork(shoppingList),
  ]);
}

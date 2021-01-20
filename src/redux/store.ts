import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'remote-redux-devtools';
import {rootReducer} from './index';
import AsyncStorage from '@react-native-community/async-storage';
import rootSaga from './sagas';

export const version = -1;

export function configureStore(key = 'primary') {
  const persistConfig = {
    version,
    key,
    storage: AsyncStorage,
    timeout: 10000,
    throttle: 500,
    blacklist: [],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const composeEnhancers = composeWithDevTools({
    hostname: 'localhost',
    port: 8080,
    realtime: true,
  });

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk, sagaMiddleware)),
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return {store, persistor};
}

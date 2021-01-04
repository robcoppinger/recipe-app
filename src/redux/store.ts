import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'remote-redux-devtools';
import {rootReducer} from './index';
import AsyncStorage from '@react-native-community/async-storage';

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

  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );

  const persistor = persistStore(store);

  return {store, persistor};
}

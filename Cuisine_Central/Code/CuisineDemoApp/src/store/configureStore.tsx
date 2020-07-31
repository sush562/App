import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from '@react-native-community/async-storage';
import rootReducer from './reducers/index';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

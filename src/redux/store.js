// Importa las funciones necesarias de Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';


import rootReducer from './reducer';

const persistConfig = {
  key: 'root', 
  storage, 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const combinedReducers = combineReducers({
  persistedReducer,
});

const Store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(Store);

export { Store, persistor };

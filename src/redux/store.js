// Importa las funciones necesarias de Redux
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // o cualquier otro almacenamiento
import { composeWithDevTools } from 'redux-devtools-extension';

// Importa tus reducers aquí
import rootReducer from './reducer';

// Configura la persistencia
const persistConfig = {
  key: 'root', // la clave de almacenamiento
  storage, // el almacenamiento a utilizar
  // Puedes añadir otras configuraciones como whitelist o blacklist según sea necesario
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Combina todos tus reducers en uno solo si tienes varios
const combinedReducers = combineReducers({
  persistedReducer,
});

// Crea el store de Redux con persistencia y Redux DevTools
const Store = createStore(
  combinedReducers,
  composeWithDevTools(applyMiddleware(/* Puedes agregar middleware aquí si es necesario */))
);

// Configura el persistor
const persistor = persistStore(Store);

export { Store, persistor };

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pokemonReducer from './slices/pokemonSlice';
import typesReducer from './slices/typesSlice';
import searchPokemonReducer from './slices/searchPokemonSlice';
import pokemonDetailsReducer from './slices/pokemonDetailsSlice';

const rootReducer = combineReducers({
  pokemons: pokemonReducer,
  pokemonsDetails: pokemonDetailsReducer,
  types: typesReducer,
  pokemon: searchPokemonReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['pokemonsDetails', 'types'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

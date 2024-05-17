import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Or your preferred storage engine
import cartReducer from './cartSlice'; // Import your cart reducer

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  // Add other reducers here if needed
});

// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Persist reducer
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  rootReducer
);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
});
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;

// Create persisted store
export const persistor = persistStore(store);

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import slices
import uiReducer from "./slices/uiSlice";
import favoritesReducer from "./slices/favoritesSlice";
import navigationReducer from "./slices/navigationSlice";

// Combine reducers
const rootReducer = combineReducers({
  ui: uiReducer,
  favorites: favoritesReducer,
  navigation: navigationReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["ui", "favorites", "navigation"], // Persist all slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];

// Create store instance
export const store = makeStore();
export const persistor = persistStore(store);

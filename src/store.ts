import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./features/users-slice";
import { issuesReducer } from "./features/issues-slice";
import { loadingReducer } from "./features/loading-slice";
import errorSlice from "./features/error-slice";
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";
import { reposReducer } from "./features/repos-slice";

export const rootReducer = combineReducers({
  users: usersReducer,
  issues: issuesReducer,
  repos: reposReducer,
  loading: loadingReducer,
  error: errorSlice,
});

type RootReducer = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer<RootReducer>(
  persistConfig,
  rootReducer
);

// const persistedReducer = persistReducer(persistConfig, );

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type ApplicationState = ReturnType<typeof store.getState>;
export type ApplicationDispatch = typeof store.dispatch;

export default store;
export const persistor = persistStore(store);

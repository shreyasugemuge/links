import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
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
import { PersistGate } from "redux-persist/integration/react";

/**
 * Configuration object for persisting the Redux store.
 * @type {Object}
 * @property {string} key - The key to use for storing the state in the storage.
 * @property {Object} storage - The storage engine to use for persisting the state.
 * @property {number} version - The version of the persisted state.
 */
const persistConfig = { key: "root", storage, version: 1 };

/**
 * Creates a new reducer with persistence enabled.
 * @type {Function}
 * @param {Object} persistConfig - The configuration object for persisting the state.
 * @param {Function} authReducer - The reducer function for the authentication state.
 * @returns {Function} - The new reducer function with persistence enabled.
 */
const persistedReducer = persistReducer(persistConfig, authReducer);

/**
 * Creates a new Redux store with the persisted reducer and middleware.
 * @type {Object}
 * @property {Function} reducer - The root reducer function for the store.
 * @property {Function} middleware - The middleware function for the store.
 */
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/**
 * Creates a new React root element and renders the app.
 * @type {Object}
 * @property {Function} render - The render function for the root element.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { default as logger, default as storage } from "redux-logger";
import { persistReducer } from "redux-persist";
import navbarReducer from "./slices/navbarSlice";
import taskReducer from "./slices/taskSlice";
import translationReducer from "./slices/translation";
import userReducer from "./slices/userSlice";

interface PersistConfig {
    key: string;
    storage: any;
}

const persistConfig: PersistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    navbar: navbarReducer,
    user: userReducer,
    translation: translationReducer,
    task: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: false,
            // Ignore check for non-serializable data (e.g., for Redux Persist)
        });
        return process.env.NODE_ENV === "development"
            ? // @ts-expect-error TODO
              middleware.concat(logger)
            : middleware;
    },
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storageSession from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

// Slices
import userAuthSlice from "@/features/userAuthSlice";

// Persistence Configuration For User Auth
const userAuthPersistConfig = {
    key: "user",
    version: 1,
    storage: storageSession,
};

// persist the slice
const persistedUserReducer = persistReducer(userAuthPersistConfig, userAuthSlice);

// Create a Root Reducer
const rootReducer = combineReducers({
    userAuth: persistedUserReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

const storePersister = persistStore(store);

export { store, storePersister };

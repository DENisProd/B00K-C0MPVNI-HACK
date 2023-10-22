import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./usersApi";
import authReducer from './authSlice';


export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware)
})
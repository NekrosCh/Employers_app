import { configureStore } from "@reduxjs/toolkit";
// import employers from '../components/employers-list/employersSlice';
import { employersApi } from "../api/apiSlice";

const store = configureStore({
    reducer: {
        [employersApi.reducerPath]: employersApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employersApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
// import employers from '../components/employers-list/employersSlice';
import { employersApi } from "../api/apiSlice";
import filter from '../components/app-filter/filterSlice';

const store = configureStore({
    reducer: {
        [employersApi.reducerPath]: employersApi.reducer,
        filter
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(employersApi.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
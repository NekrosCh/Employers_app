import { configureStore } from "@reduxjs/toolkit";
import employers from '../components/employers-list/employersSlice'

const store = configureStore({
    reducer: {employers},
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;
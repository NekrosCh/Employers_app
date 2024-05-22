import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeFilter: 'all',
    term: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggleActiveFilter: (state, action) => {state.activeFilter = action.payload},
        searchTerm: (state, action) => {state.term = action.payload}
    }
});

const {actions, reducer} = filterSlice;
export default reducer;
export const {toggleActiveFilter, searchTerm} = actions;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    employers: [],
    employersLoadingStatus: 'idle'
}

export const fetchEmployers = createAsyncThunk(
    'employers/fetchEmployers',
    async () => {
        return await axios.get("http://localhost:3001/employers")
            .then(data => data.data);
    }

);

const employersSlice = createSlice({
    name: 'employers',
    initialState,
    reducers: {
        employersCreated: (state, action) => {
            state.employers.push(action.payload);
        },
        employersDelete: (state, action) => {
            state.employers.filter(item => item.id !== action.payload);
        },
        employersUpdate: (state, action) => {
            state.employers = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployers.pending, (state) => {
                state.employersLoadingStatus = 'loading';
            })
            .addCase(fetchEmployers.fulfilled, (state, action) => {
                state.employers = action.payload;
                state.employersLoadingStatus = 'idle';
            })
            .addCase(fetchEmployers.rejected, (state) => {
                state.employersLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = employersSlice;
export default reducer;
export const {employersCreated, employersDelete, employersUpdate} = actions;

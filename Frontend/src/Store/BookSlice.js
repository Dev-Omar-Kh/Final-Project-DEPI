import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios, BookGetAll } from "../API/Api";

export const getAllBooks = createAsyncThunk('api/bookData' , async() =>{

    const {data} = await Axios.get(`${BookGetAll}`);

    return data;

});

const apiSlice = createSlice({

    name : 'api',

    initialState : {

        bookData : null,
        bookLoading : false,
        bookError : false

    },

    extraReducers : (builder) => {

        builder.addCase(getAllBooks.pending , (state) => {

            state.bookLoading = true

        })

        builder.addCase(getAllBooks.rejected , (state , res) => {

            state.bookLoading = false;
            state.bookError = res.error.message;
            state.bookData = null

        });

        builder.addCase(getAllBooks.fulfilled , (state , res) => {

            state.bookLoading = false;
            state.bookError = false;
            state.bookData = res.payload

        });

    }

});

export const apiReducer = apiSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios, CartGetAll } from "../API/Api";

export const getCardElements = createAsyncThunk('api/cartData' , async() =>{

    const {data} = await Axios.get(`${CartGetAll}` , {withCredentials: true});

    return data;

});

const cartSlice = createSlice({

    name: 'cart',

    initialState : {

        cartData : [],
        cartLoading : false,
        cartError : false

    },

    extraReducers : (builder) => {

        builder.addCase(getCardElements.pending , (state) => {

            state.cartLoading = true

        })

        builder.addCase(getCardElements.rejected , (state , res) => {

            state.cartLoading = false;
            state.cartError = res.error.message;
            state.cartData = []

        });

        builder.addCase(getCardElements.fulfilled , (state , res) => {

            state.cartLoading = false;
            state.cartError = false;
            state.cartData = res.payload

        });

    }

});

export const cartReducer = cartSlice.reducer;
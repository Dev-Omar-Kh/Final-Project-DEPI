import { configureStore } from "@reduxjs/toolkit";
import { apiReducer } from "./BookSlice";
import { cartReducer } from "./CartSlice";

export const Store = configureStore({

    reducer : {

        api: apiReducer,
        cart: cartReducer,

    }

});
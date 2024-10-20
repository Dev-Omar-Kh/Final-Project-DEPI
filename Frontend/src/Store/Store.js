import { configureStore } from "@reduxjs/toolkit";
import { apiReducer } from "./BookSlice";

export const Store = configureStore({

    reducer : {

        api: apiReducer,

    }

});
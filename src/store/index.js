import { configureStore } from "@reduxjs/toolkit";
import film from "./film";
import auht from "./auht";



const store = configureStore({
    reducer:{
   auht,
   film,
    }
})
export default store ;
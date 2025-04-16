import { configureStore } from "@reduxjs/toolkit";
import tabReduce from "./modules/tabs";

const store = configureStore({
    reducer:{
        tabs:tabReduce
    }
})

export default store
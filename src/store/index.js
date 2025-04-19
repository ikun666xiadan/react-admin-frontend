import { configureStore } from "@reduxjs/toolkit";
import tabReduce from "./modules/tabs";
import userReduce from "./modules/user";

const store = configureStore({
  reducer: {
    tabs: tabReduce,
    user: userReduce,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./userSearch.js";

const store = configureStore({
  reducer: { search: searchReducer },
});

export default store;
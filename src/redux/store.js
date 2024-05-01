import { configureStore } from "@reduxjs/toolkit";
import recentReducer from "./reducer/recentReducer";
import favoriteReducer from "./reducer/favoriteReducer";
import commentReducer from "./reducer/commentReducer";
import productReducer from "./reducer/productReducer";

const store = configureStore({
  reducer: {
    product: productReducer,
    recent: recentReducer,
    favorite: favoriteReducer,
    comment: commentReducer,
  },
});
export default store;

import { configureStore } from "@reduxjs/toolkit";
import toggleCartReducer from "./toggle-cart-slice";
import itemsReducer from "./items-slice";

const store = configureStore({
    reducer: { toggleCart: toggleCartReducer, items: itemsReducer }
});

export default store;
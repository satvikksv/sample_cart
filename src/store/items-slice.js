import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0
}

const itemsSlice = createSlice({
    name: "itemsSlice",
    initialState: initialState,
    reducers: {
        replaceCart(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
        },
        addItemToCart(state, action) {
            const newItem = action.payload;
            state.totalQuantity++;
            const existingItem = state.items.find((item) => {return item.id === newItem.id});
            if (!existingItem) {
                state.items.push({id: newItem.id, price: newItem.price, quantity: 1, totalPrice: newItem.price, name: newItem.title});
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => {return item.id === id});
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                 state.items = state.items.filter((item) => {return item.id !== id});
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});

export default itemsSlice.reducer;
export const itemsActions = itemsSlice.actions;

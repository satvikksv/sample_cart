import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCart: false, notification: null};

const toggleCartSlice = createSlice({
    name: "togglingCart",
    initialState: initialState,
    reducers: {
        toggle(state) {
            state.showCart = !state.showCart;
        },
        showNotification(state, action) {
            state.notification = { status: action.payload.status, title: action.payload.title, message: action.payload.message}
        }
    }
});

export default toggleCartSlice.reducer;
export const toggleCartActions  = toggleCartSlice.actions;
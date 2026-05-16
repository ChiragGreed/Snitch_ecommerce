import { createSlice, current } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: []
    },
    reducers: {
        setcartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        addItemQuantity: (state, action) => {
            state.cartItems.items.forEach((item) => {
                if (item._id == action.payload) {
                    item.quantity += 1;
                    return;
                }
            })
        },
        subItemQuantity: (state, action) => {
            state.cartItems.items.forEach((item) => {
                if (item._id == action.payload) {
                    item.quantity -= 1;
                    return;
                }
            })
        },
        removeCartItem: (state, action) => {
            if (state.cartItems.items) {
                state.cartItems.items = state.cartItems.items.filter(
                    (item) => item._id !== action.payload
                );
            }
        },

    }
})

export const { setcartItems, addItemQuantity, subItemQuantity, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
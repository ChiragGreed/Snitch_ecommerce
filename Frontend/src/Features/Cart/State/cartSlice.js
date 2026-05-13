import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: []
    },
    reducers: {
        setcartItems: (state, action) => {
            state.cartItems = action.payload;
        }
        
    }
})

export const { setcartItems } = cartSlice.actions;
export default cartSlice.reducer;
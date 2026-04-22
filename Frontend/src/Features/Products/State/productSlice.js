import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        AllProducts: [],
        SellerProducts: [],
    },
    reducers: {
        setAllProducts: (state, action) => {
            state.AllProducts = action.payload;
        },
        setSellerProducts: (state, action) => {
            state.SellerProducts = action.payload;
        }
    }
})

export const { setAllProducts, setSellerProducts } = productSlice.actions;
export default productSlice.reducer;
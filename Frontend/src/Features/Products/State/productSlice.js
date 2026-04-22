import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        Products: [],
        SellerProducts: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.Products.push(action.payload);
        },
        setSellerProducts: (state, action) => {
            state.SellerProducts = action.payload;
        }
    }
})

export const { setProducts, setSellerProducts } = productSlice.actions;
export default productSlice.reducer;
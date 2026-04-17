import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        Products: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.Products.push(action.payload);
        }
    }
})

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
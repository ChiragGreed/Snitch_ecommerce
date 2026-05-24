import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Features/Authentication/State/authSlice.js';
import productReducer from './Features/Products/State/productSlice.js';
import cartReducer from './Features/Cart/State/cartSlice.js';


export const reduxStore = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer
    }
});


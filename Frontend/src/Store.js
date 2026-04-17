import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/Features/Authentication/State/authSlice.js';
import productReducer from '../src/Features/Products/State/productSlice.js';

export const reduxStore = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
    }
});


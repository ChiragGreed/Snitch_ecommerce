import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/Features/Authentication/State/authSlice.js';

export const reduxStore = configureStore({
    reducer: {
        auth: authReducer
    }
});


import { configureStore } from '@reduxjs/toolkit'
import authSlice from './feature/auth/authSlice';
import nodeSlice from './feature/node/nodeSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        node:nodeSlice
    }
});

export default store;
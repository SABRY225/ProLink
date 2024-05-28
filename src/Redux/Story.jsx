import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import {searchReducer} from './SearchSlice'; 
import profileReducer from './profileSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        profile:profileReducer
    },
});

export default store;
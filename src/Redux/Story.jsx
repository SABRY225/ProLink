import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import {searchReducer} from './SearchSlice'; 
import profileReducer from './profileSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        Profile:profileReducer
    },
});

export default store;
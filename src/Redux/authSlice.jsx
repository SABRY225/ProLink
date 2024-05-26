import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state,{ payload }) => {
            state.token = payload;
        },
        logoutSuccess: (state) => {
            state.token = '';
        },
    }
});

export const { loginSuccess, logoutSuccess} = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    email:' ',
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
        setEmail:(state,{ payload })=>{
            state.email=payload;
        }
    }
});

export const { loginSuccess, logoutSuccess,setEmail} = authSlice.actions;
export default authSlice.reducer;
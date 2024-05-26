import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id:'',
    Name:''
};


const profileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {

        setId: (state, { payload }) => {
            state.id = payload;
        },
        setName: (state, { payload }) => {
            state.Name = payload;
        },
    }
});

export const {setId ,setName} = profileSlice.actions;
export default profileSlice.reducer;
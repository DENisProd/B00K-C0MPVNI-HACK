import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        data: {}
    },
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload;
        },
        setUserData(state, action) {
            state.data = action.payload;
        }
    },
});

export const {setIsAuth, setUserData} = authSlice.actions;

export default authSlice.reducer;
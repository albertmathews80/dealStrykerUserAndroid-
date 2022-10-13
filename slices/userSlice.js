import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userDetail: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { userDetail } = userSlice.actions;

export default userSlice.reducer;

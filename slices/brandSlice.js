import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
};

export const brandSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        incrementbrand: (state, action) => {
            state.value = action.payload;
            // console.log(action.payload,"check")
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { incrementbrand, decrement, incrementByAmount } = brandSlice.actions;

export default brandSlice.reducer;

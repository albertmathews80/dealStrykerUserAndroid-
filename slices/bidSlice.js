import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bids: [],
    loading: true,
};

export const bidSlice = createSlice({
    name: "bid",
    initialState,
    reducers: {
        setBids: (state, { payload }) => {
            return {
                ...state,
                bids: payload,
                loading: false,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setBids } = bidSlice.actions;

export default bidSlice.reducer;

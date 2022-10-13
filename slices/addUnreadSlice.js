import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    userData: {},
    unreadLiveBids: [],
    error: null,
};

export const addUnreadSlice = createSlice({
    name: "addUnread",
    initialState,
    reducers: {
        addUnread: (state, { payload }) => {
            return {
                ...state,
                unreadLiveBids: [...state.unreadLiveBids, payload.id],
            };
        },
        handleLoading: (state, { payload }) => {
            return {
                ...state,
                loading: payload,
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { addUnread, handleLoading } = addUnreadSlice.actions;

export default addUnreadSlice.reducer;

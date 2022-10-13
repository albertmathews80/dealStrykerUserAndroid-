import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";

export const fetchCarData = createAsyncThunk("car/fetchCar", async () => {
    const carsSelect = useSelector((state) => state.counter.value);
    const brandSelect = useSelector((state) => state.brand.value);
    let res = await axios.get(`https://www.dealstryker.com/models/${carsSelect}/${brandSelect}`);
    return res;
});

const initialState = {
    value: null,
};

export const carSlice = createSlice({
    name: "car",
    initialState,
    reducers: {
        incrementcar: (state, action) => {
            state.value = action.payload;
            // console.log(action.payload,"check")
        },
    },
    extraReducers: {
        [fetchCarData.pending]: () => {
            console.log("pending");
        },
        [fetchCarData.fulfilled]: (state, { payload }) => {
            console.log("fetched succressfully");
            return { ...state, value: payload };
        },
        [fetchCarData.rejected]: () => {
            console.log("Rejected");
        },
    },
});

// Action creators are generated for each case reducer function
export const { incrementcar, decrement, incrementByAmount } = carSlice.actions;

export default carSlice.reducer;

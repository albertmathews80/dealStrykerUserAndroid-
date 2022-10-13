const initialState = {
    bids: [],
    loading: true,
};

export const setBids = (state = initialState, { payload }) => {
    console.clear();
    console.log("state >>>>>>>", state);
    console.log("payload >>>>>>>", payload);

    return {
        ...state,
        bids: payload,
        loading: false,
    };
};

export default initialState;

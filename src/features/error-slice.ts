import { createSlice } from "@reduxjs/toolkit";

type ErrorState = {
  error: null | string;
};

const initialState: ErrorState = {
  error: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const { setError, resetError } = errorSlice.actions;
export const errorReducer = errorSlice.reducer;

export default errorSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    resetLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setLoading, resetLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;

export default loadingSlice.reducer;

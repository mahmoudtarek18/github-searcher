/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetLoading, setLoading } from "./loading-slice";
import { resetError, setError } from "./error-slice";

// profile picture, name, location, any other data you have and link to their profile

export type usersState = {
  entities: { userName: string; items: User[] }[];
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (userName: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoading());
    dispatch(resetError());
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${userName}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      dispatch(resetLoading());
      return { userName, items: data.items };
    } catch (e) {
      dispatch(setError("There is something wrong"));
      dispatch(resetLoading());
      return rejectWithValue(e);
    }
  }
);

const initialState: usersState = {
  entities: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, () => {
      setLoading();
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      resetError();
      if (
        state.entities.some((user) => user.userName === action.payload.userName)
      )
        return;
      state.entities.push({
        userName: action.payload.userName,
        items: action.payload.items,
      });
    });
  },
});

export const usersReducer = usersSlice.reducer;

export default usersSlice;

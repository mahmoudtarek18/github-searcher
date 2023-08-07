/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetLoading, setLoading } from "./loading-slice";
import { resetError, setError } from "./error-slice";

export type IssuesState = {
  entities: { issueName: string; items: Issue[] }[];
};

export const fetchIssues = createAsyncThunk(
  "issues/fetchIssues",
  async (issueName: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoading());
    dispatch(resetError());
    try {
      const res = await fetch(
        `https://api.github.com/search/issues?q=${issueName}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      dispatch(resetLoading());
      return { issueName, items: data.items };
    } catch (e) {
      dispatch(setError("There is something wrong"));
      dispatch(resetLoading());
      return rejectWithValue(e);
    }
  }
);

const initialState: IssuesState = {
  entities: [],
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, () => {
      setLoading();
    });

    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      resetLoading();

      if (
        state.entities.some(
          (issue) => issue.issueName === action.payload.issueName
        )
      )
        return;
      state.entities.push({
        issueName: action.payload.issueName,
        items: action.payload.items,
      });
    });
  },
});

export const issuesReducer = issuesSlice.reducer;

export default issuesSlice;

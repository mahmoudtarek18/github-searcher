/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetLoading, setLoading } from "./loading-slice";
import { resetError, setError } from "./error-slice";

// profile picture, name, location, any other data you have and link to their profile

export type reposState = {
  entities: { repoName: string; items: Repo[] }[];
};

export const fetchRepos = createAsyncThunk(
  "repos/fetchRepos",
  async (repoName: string, { dispatch, rejectWithValue }) => {
    dispatch(setLoading());
    dispatch(resetError());
    try {
      const res = await fetch(
        `https://api.github.com/search/repositories?q=${repoName}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      dispatch(resetLoading());
      const filteredItems = data.items.map((item: any) => ({
        id: item.id,
        html_url: item.html_url,
        full_name: item.full_name,
        forks_count: item.forks_count,
        visibility: item.visibility,
        watchers_count: item.watchers_count,
      }));
      return { repoName, items: filteredItems };
    } catch (e) {
      dispatch(setError("There is something wrong"));
      dispatch(resetLoading());
      return rejectWithValue(e);
    }
  }
);

const initialState: reposState = {
  entities: [],
};

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRepos.pending, () => {
      setLoading();
    });
    builder.addCase(fetchRepos.fulfilled, (state, action) => {
      if (
        state.entities.some((repo) => repo.repoName === action.payload.repoName)
      )
        return;
      state.entities.push({
        repoName: action.payload.repoName,
        items: action.payload.items,
      });
    });
  },
});

export const reposReducer = reposSlice.reducer;

export default reposSlice;

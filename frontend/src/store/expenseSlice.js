import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8006/api/expense";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetch",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

export const fetchSummary = createAsyncThunk(
  "expenses/summary",
  async () => {
    const res = await axios.get(`${API_URL}/summary`);
    return res.data;
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    list: [],
    summary: { total: 0, byCategory: {} },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  },
});

export default expenseSlice.reducer;


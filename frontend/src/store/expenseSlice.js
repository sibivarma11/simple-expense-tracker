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
    loading: false,
    error: null,
    editingExpense: null,
  },
  reducers: {
    setEditingExpense: (state, action) => {
      state.editingExpense = action.payload;
    },
    clearEditingExpense: (state) => {
      state.editingExpense = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  },
});

export const { setEditingExpense, clearEditingExpense } = expenseSlice.actions;

export default expenseSlice.reducer;



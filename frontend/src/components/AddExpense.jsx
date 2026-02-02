import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchExpenses, fetchSummary } from "../store/expenseSlice";

const API_URL = "http://localhost:8006/api/expense";

const AddExpense = () => {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
  });

  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.category) return;

    await axios.post(API_URL, form);
    setForm({ description: "", amount: "", category: "Food" });
    dispatch(fetchExpenses());
    dispatch(fetchSummary());
  };

  return (
    <form onSubmit={submit} className="add-expense-form">
      <input
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })}
      />
      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default AddExpense;


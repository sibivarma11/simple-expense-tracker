import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchExpenses, fetchSummary, setEditingExpense } from "../store/expenseSlice";
import { Trash2, Filter, Edit3, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:8006/api/expense";

const ExpenseList = () => {
  const [filter, setFilter] = useState("All");
  const { list: expenses, loading } = useSelector(state => state.expenses);
  const dispatch = useDispatch();

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Expense deleted");
      dispatch(fetchExpenses());
      dispatch(fetchSummary());
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const categories = ["All", ...new Set(expenses.map(e => e.category))];
  const filteredExpenses = filter === "All"
    ? expenses
    : expenses.filter(e => e.category === filter);

  if (loading && expenses.length === 0) {
    return (
      <div className="expense-list loading-container">
        <Loader2 className="spinner" size={48} />
        <p>Loading expenses...</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <div className="list-header">
        <h2>Recent Expenses</h2>
        <div className="filter-box">
          <Filter size={18} />
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>
      <ul>
        {filteredExpenses.length === 0 ? (
          <p className="no-data">No expenses found matching the criteria.</p>
        ) : filteredExpenses.map(e => (
          <li key={e._id}>
            <div className="item-info">
              <span className="desc">{e.description}</span>
              <span className="cat">{e.category}</span>
            </div>
            <span className="amt">₹{e.amount}</span>
            <div className="list-actions">
              <button className="edit-btn" onClick={() => dispatch(setEditingExpense(e))}>
                <Edit3 size={18} />
              </button>
              <button className="delete-btn" onClick={() => remove(e._id)}>
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

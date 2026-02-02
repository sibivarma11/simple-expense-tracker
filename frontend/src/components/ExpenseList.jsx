import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchExpenses, fetchSummary } from "../store/expenseSlice";
import { Trash2, Filter } from "lucide-react";

const API_URL = "http://localhost:8006/api/expense";

const ExpenseList = () => {
  const [filter, setFilter] = useState("All");
  const expenses = useSelector(state => state.expenses.list);
  const dispatch = useDispatch();

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;
    await axios.delete(`${API_URL}/${id}`);
    dispatch(fetchExpenses());
    dispatch(fetchSummary());
  };

  const categories = ["All", ...new Set(expenses.map(e => e.category))];
  const filteredExpenses = filter === "All"
    ? expenses
    : expenses.filter(e => e.category === filter);

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
            <button className="delete-btn" onClick={() => remove(e._id)}>
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;



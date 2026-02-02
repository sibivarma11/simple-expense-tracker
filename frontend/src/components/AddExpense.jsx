import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchExpenses, fetchSummary, clearEditingExpense } from "../store/expenseSlice";
import toast from "react-hot-toast";
import { PlusCircle, Save, XCircle } from "lucide-react";

const API_URL = "http://localhost:8006/api/expense";

const AddExpense = () => {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "Food",
  });

  const dispatch = useDispatch();
  const editingExpense = useSelector(state => state.expenses.editingExpense);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        description: editingExpense.description,
        amount: editingExpense.amount,
        category: editingExpense.category,
      });
    } else {
      setForm({ description: "", amount: "", category: "Food" });
    }
  }, [editingExpense]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.category) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (editingExpense) {
        await axios.put(`${API_URL}/${editingExpense._id}`, form);
        toast.success("Expense updated!");
        dispatch(clearEditingExpense());
      } else {
        await axios.post(API_URL, form);
        toast.success("Expense added!");
      }
      setForm({ description: "", amount: "", category: "Food" });
      dispatch(fetchExpenses());
      dispatch(fetchSummary());
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={submit} className="add-expense-form">
      <h3>{editingExpense ? "Edit Expense" : "Add New Expense"}</h3>
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

      <div className="form-actions">
        <button type="submit" className={editingExpense ? "update-btn" : "add-btn"}>
          {editingExpense ? <><Save size={18} /> Update</> : <><PlusCircle size={18} /> Add</>}
        </button>
        {editingExpense && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => dispatch(clearEditingExpense())}
          >
            <XCircle size={18} /> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AddExpense;

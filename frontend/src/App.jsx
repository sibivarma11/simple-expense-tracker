import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchExpenses, fetchSummary } from './store/expenseSlice'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'
import { Toaster } from 'react-hot-toast'
import './App.css'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExpenses())
    dispatch(fetchSummary())
  }, [dispatch])

  return (
    <div className="container">
      <Toaster position="top-right" />
      <h1>Simple Expense Tracker</h1>


      <div className="summary-section">
        <Summary />
      </div>

      <div className="dashboard">
        <AddExpense />
        <ExpenseList />
      </div>
    </div>
  )
}


export default App
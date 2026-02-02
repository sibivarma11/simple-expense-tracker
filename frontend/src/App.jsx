import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchExpenses, fetchSummary } from './store/expenseSlice'
import AddExpense from './components/AddExpense'
import ExpenseList from './components/ExpenseList'
import Summary from './components/Summary'
import './App.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchExpenses())
    dispatch(fetchSummary())
  }, [dispatch])

  return (
    <div className="container">
      <h1>Simple Expense Tracker</h1>
      <div className="dashboard">
        <div className="left-panel">
          <AddExpense />
          <Summary />
        </div>
        <div className="right-panel">
          <ExpenseList />
        </div>
      </div>
    </div>
  )
}

export default App
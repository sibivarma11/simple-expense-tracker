import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Summary = () => {
  const summary = useSelector(state => state.expenses.summary);

  const chartData = summary?.byCategory
    ? Object.entries(summary.byCategory).map(([name, value]) => ({ name, value }))
    : [];

  return (
    <div className="summary-card">
      <h3>Total Expense: ₹{summary?.total || 0}</h3>

      {chartData.length > 0 && (
        <div style={{ width: '100%', height: 250, marginTop: '1rem' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="category-breakdown">
        {summary?.byCategory && Object.keys(summary.byCategory).length > 0 ? (
          Object.entries(summary.byCategory).map(([cat, amt]) => (
            <div key={cat} className="category-item">
              <span>{cat}</span>
              <span>₹{amt}</span>
            </div>
          ))
        ) : (
          <p>No category data available.</p>
        )}
      </div>
    </div>
  );
};

export default Summary;


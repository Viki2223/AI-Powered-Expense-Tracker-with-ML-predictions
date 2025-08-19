import React, { useState, useEffect } from 'react';
import { expenseAPI } from '../../utils/api';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Stats from './Stats';
import Prediction from '../AI/Prediction';

const Dashboard = ({ user, onLogout }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    count: 0
  });

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const response = await expenseAPI.getExpenses();
      const expenseData = response.data;
      setExpenses(expenseData);
      
      // Calculate stats
      const total = expenseData.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
      const thisMonth = expenseData.filter(expense => {
        const expenseDate = new Date(expense.timestamp);
        const now = new Date();
        return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
      }).reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
      
      setStats({
        total: total,
        thisMonth: thisMonth,
        count: expenseData.length
      });
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleExpenseChange = () => {
    loadExpenses();
  };

  return (
    <div className="container">
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '4px' }}>
            Welcome back! 👋
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>
            {user.first_name ? `${user.first_name} ${user.last_name}` : user.email}
          </p>
        </div>
        <button className="btn btn-secondary" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Stats */}
      <Stats stats={stats} />

      {/* Prediction */}
      <Prediction onRefresh={loadExpenses} />

      {/* Main Content */}
      <div className="grid">
        <ExpenseForm onExpenseAdded={handleExpenseChange} />
        <ExpenseList 
          expenses={expenses} 
          loading={loading} 
          onExpenseChanged={handleExpenseChange} 
        />
      </div>
    </div>
  );
};

export default Dashboard;


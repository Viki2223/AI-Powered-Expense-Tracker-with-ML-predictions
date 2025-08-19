import React, { useState } from 'react';
import { expenseAPI } from '../../utils/api';

const ExpenseForm = ({ onExpenseAdded, editingExpense, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    category: editingExpense?.category || '',
    amount: editingExpense?.amount?.toString() || '',
    description: editingExpense?.description || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    'Food', 'Transportation', 'Entertainment', 
    'Shopping', 'Bills', 'Healthcare', 'Other'
  ];

  React.useEffect(() => {
    if (editingExpense) {
      setFormData({
        category: editingExpense.category,
        amount: editingExpense.amount.toString(),
        description: editingExpense.description || ''
      });
    }
  }, [editingExpense]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({
      category: '',
      amount: '',
      description: ''
    });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount) {
      setMessage('Please fill in category and amount');
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setMessage('Amount must be greater than 0');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const expenseData = {
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
        date: new Date().toISOString().split('T')[0]
      };

      if (editingExpense) {
        await expenseAPI.updateExpense(editingExpense.id, expenseData);
        setMessage('✅ Expense updated successfully!');
      } else {
        await expenseAPI.addExpense(expenseData);
        setMessage('✅ Expense added successfully!');
      }

      resetForm();
      onExpenseAdded();
      
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error('Error saving expense:', error);
      setMessage(`❌ Error ${editingExpense ? 'updating' : 'adding'} expense. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onCancelEdit) onCancelEdit();
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Food': '🍽️',
      'Transportation': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛒',
      'Bills': '📄',
      'Healthcare': '🏥',
      'Other': '📝'
    };
    return icons[category] || '💰';
  };

  return (
    <div className="card" style={{
      border: editingExpense ? '2px solid #4299e1' : 'none',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ color: '#333', margin: 0 }}>
          {editingExpense ? '✏️ Edit Expense' : '➕ Add New Expense'}
        </h3>
        {editingExpense && (
          <span style={{ 
            background: '#4299e1', 
            color: 'white', 
            padding: '4px 12px', 
            borderRadius: '16px', 
            fontSize: '0.8rem',
            fontWeight: 'bold'
          }}>
            EDIT MODE
          </span>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <select
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{getCategoryIcon(cat)} {cat}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <input
            type="number"
            name="amount"
            step="0.01"
            min="0.01"
            className="form-control"
            placeholder="Amount in Rupees (e.g., 250.50)"
            value={formData.amount}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            disabled={loading}
            maxLength={200}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            type="submit" 
            className={`btn ${editingExpense ? 'btn-primary' : 'btn-success'}`}
            style={{ flex: 1 }} 
            disabled={loading}
          >
            {loading ? '⏳ Processing...' : (
              editingExpense ? '✏️ Update Expense' : '💰 Add Expense'
            )}
          </button>
          
          {editingExpense && (
            <button
              type="button"
              onClick={handleCancel}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {message && (
        <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default ExpenseForm;


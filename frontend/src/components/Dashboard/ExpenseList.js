import React, { useState } from 'react';
import { expenseAPI } from '../../utils/api';
import ExpenseForm from './ExpenseForm';

const ExpenseList = ({ expenses, loading, onExpenseChanged }) => {
  const [editingExpense, setEditingExpense] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const formatRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
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

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await expenseAPI.deleteExpense(expenseId);
      setDeleteConfirm(null);
      onExpenseChanged();
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  const handleExpenseUpdated = () => {
    setEditingExpense(null);
    onExpenseChanged();
  };

  if (editingExpense) {
    return (
      <ExpenseForm 
        editingExpense={editingExpense}
        onExpenseAdded={handleExpenseUpdated}
        onCancelEdit={handleCancelEdit}
      />
    );
  }

  return (
    <>
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>📊 Your Expenses</h3>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>📊 Loading expenses...</p>
          </div>
        ) : expenses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</p>
            <p>No expenses recorded yet!</p>
            <p>Add your first expense to get started with AI predictions.</p>
          </div>
        ) : (
          <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {expenses.map((expense, index) => (
              <div 
                key={expense.id || index} 
                className="expense-item"
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <strong style={{ color: '#333', fontSize: '1.1rem' }}>
                      {getCategoryIcon(expense.category)} {expense.category}
                    </strong>
                  </div>
                  {expense.description && (
                    <div style={{ color: '#666', fontSize: '0.9rem', marginBottom: '4px' }}>
                      {expense.description}
                    </div>
                  )}
                  <div style={{ color: '#888', fontSize: '0.8rem' }}>
                    {new Date(expense.timestamp).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ color: '#e53e3e', fontSize: '1.3rem' }}>
                      {formatRupees(parseFloat(expense.amount))}
                    </strong>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEditExpense(expense)}
                      style={{
                        background: '#4299e1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#3182ce'}
                      onMouseOut={(e) => e.target.style.background = '#4299e1'}
                      title="Edit expense"
                    >
                      ✏️
                    </button>
                    
                    <button
                      onClick={() => setDeleteConfirm(expense)}
                      style={{
                        background: '#e53e3e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseOver={(e) => e.target.style.background = '#c53030'}
                      onMouseOut={(e) => e.target.style.background = '#e53e3e'}
                      title="Delete expense"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal">
          <div className="modal-content" style={{ textAlign: 'center' }}>
            <h3 style={{ color: '#e53e3e', marginBottom: '16px' }}>🗑️ Delete Expense</h3>
            <p style={{ marginBottom: '8px', color: '#333' }}>
              Are you sure you want to delete this expense?
            </p>
            <div style={{ 
              background: '#f7f7f7', 
              padding: '12px', 
              borderRadius: '8px', 
              margin: '16px 0' 
            }}>
              <strong>{getCategoryIcon(deleteConfirm.category)} {deleteConfirm.category}</strong>
              <br />
              <span style={{ color: '#e53e3e', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {formatRupees(deleteConfirm.amount)}
              </span>
              {deleteConfirm.description && (
                <>
                  <br />
                  <small style={{ color: '#666' }}>{deleteConfirm.description}</small>
                </>
              )}
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '20px' }}>
              This action cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteExpense(deleteConfirm.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseList;


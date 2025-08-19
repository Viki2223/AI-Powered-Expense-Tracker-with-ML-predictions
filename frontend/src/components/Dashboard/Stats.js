import React from 'react';

const Stats = ({ stats }) => {
  const formatRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="grid" style={{ marginBottom: '32px' }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', opacity: 0.9 }}>💰 Total Expenses</h3>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '4px' }}>
          {formatRupees(stats.total)}
        </h2>
        <p style={{ opacity: 0.8 }}>{stats.count} transactions</p>
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, #48bb78, #38a169)', color: 'white' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', opacity: 0.9 }}>📅 This Month</h3>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '4px' }}>
          {formatRupees(stats.thisMonth)}
        </h2>
        <p style={{ opacity: 0.8 }}>Current month spending</p>
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, #ed8936, #dd6b20)', color: 'white' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', opacity: 0.9 }}>📊 Average</h3>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '4px' }}>
          {formatRupees(stats.count > 0 ? stats.total / stats.count : 0)}
        </h2>
        <p style={{ opacity: 0.8 }}>Per transaction</p>
      </div>
    </div>
  );
};

export default Stats;


import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ analytics }) => {
  const [activeChart, setActiveChart] = useState('trend');

  const formatRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: { size: 12 }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${formatRupees(context.parsed.y || context.parsed)}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { 
          color: '#666',
          callback: function(value) {
            return formatRupees(value);
          }
        },
        grid: { color: 'rgba(0,0,0,0.1)' }
      },
      x: {
        ticks: { color: '#666' },
        grid: { color: 'rgba(0,0,0,0.1)' }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#333',
          font: { size: 11 }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${formatRupees(context.parsed)}`;
          }
        }
      }
    }
  };

  const getTrendChartData = () => {
    if (!analytics?.weekly_trend || analytics.weekly_trend.length === 0) return null;
    
    const data = analytics.weekly_trend;
    return {
      labels: data.map(item => item.week),
      datasets: [
        {
          label: 'Weekly Spending (₹)',
          data: data.map(item => item.amount),
          borderColor: '#4299e1',
          backgroundColor: 'rgba(66, 153, 225, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        }
      ],
    };
  };

  const getCategoryChartData = () => {
    if (!analytics?.category_breakdown || Object.keys(analytics.category_breakdown).length === 0) return null;
    
    const categories = Object.keys(analytics.category_breakdown);
    const amounts = Object.values(analytics.category_breakdown);
    
    const colors = [
      '#ff6384', '#36a2eb', '#cc65fe', '#ffce56', 
      '#4bc0c0', '#9966ff', '#ff9f40', '#ff6384'
    ];
    
    return {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: colors.slice(0, categories.length),
          borderColor: colors.slice(0, categories.length),
          borderWidth: 2,
        },
      ],
    };
  };

  const getMonthlyComparisonData = () => {
    if (!analytics?.monthly_comparison || analytics.monthly_comparison.length === 0) return null;
    
    const data = analytics.monthly_comparison;
    return {
      labels: data.map(item => item.month),
      datasets: [
        {
          label: 'Monthly Spending (₹)',
          data: data.map(item => item.amount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  // Check if we have any chart data
  const hasChartData = analytics && (
    (analytics.weekly_trend && analytics.weekly_trend.length > 0) ||
    (analytics.category_breakdown && Object.keys(analytics.category_breakdown).length > 0) ||
    (analytics.monthly_comparison && analytics.monthly_comparison.length > 0)
  );

  if (!hasChartData) {
    return (
      <div className="card">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>📊 Analytics</h3>
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>📈</p>
          <p>Add more expenses to see detailed analytics charts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: '20px', color: '#333' }}>📊 Analytics</h3>
      
      {/* Chart Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '20px',
        gap: '8px',
        flexWrap: 'wrap'
      }}>
        {getTrendChartData() && (
          <button
            onClick={() => setActiveChart('trend')}
            style={{
              background: activeChart === 'trend' ? '#4299e1' : '#e2e8f0',
              color: activeChart === 'trend' ? 'white' : '#666',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            📈 Weekly Trend
          </button>
        )}
        
        {getCategoryChartData() && (
          <button
            onClick={() => setActiveChart('category')}
            style={{
              background: activeChart === 'category' ? '#4299e1' : '#e2e8f0',
              color: activeChart === 'category' ? 'white' : '#666',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🥧 Categories
          </button>
        )}
        
        {getMonthlyComparisonData() && (
          <button
            onClick={() => setActiveChart('monthly')}
            style={{
              background: activeChart === 'monthly' ? '#4299e1' : '#e2e8f0',
              color: activeChart === 'monthly' ? 'white' : '#666',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            📅 Monthly
          </button>
        )}
      </div>

      {/* Chart Display */}
      <div style={{ height: '300px', marginBottom: '20px' }}>
        {activeChart === 'trend' && getTrendChartData() && (
          <Line data={getTrendChartData()} options={chartOptions} />
        )}
        {activeChart === 'category' && getCategoryChartData() && (
          <Doughnut data={getCategoryChartData()} options={doughnutOptions} />
        )}
        {activeChart === 'monthly' && getMonthlyComparisonData() && (
          <Bar data={getMonthlyComparisonData()} options={chartOptions} />
        )}
      </div>

      {/* Analytics Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
        <div style={{ textAlign: 'center', padding: '12px', background: '#f7fafc', borderRadius: '8px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4299e1' }}>
            {formatRupees(analytics.daily_average || 0)}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Daily Average</div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '12px', background: '#f7fafc', borderRadius: '8px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#48bb78' }}>
            {analytics.transaction_count || 0}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Transactions</div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '12px', background: '#f7fafc', borderRadius: '8px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ed8936' }}>
            {analytics.spending_pattern === 'increasing' && '📈'}
            {analytics.spending_pattern === 'decreasing' && '📉'}
            {analytics.spending_pattern === 'stable' && '📊'}
            {analytics.spending_pattern === 'insufficient_data' && '📝'}
            {analytics.spending_pattern === 'no_data' && '📝'}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            {analytics.spending_pattern === 'increasing' && 'Increasing'}
            {analytics.spending_pattern === 'decreasing' && 'Decreasing'}
            {analytics.spending_pattern === 'stable' && 'Stable'}
            {analytics.spending_pattern === 'insufficient_data' && 'Need More Data'}
            {analytics.spending_pattern === 'no_data' && 'No Data'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;


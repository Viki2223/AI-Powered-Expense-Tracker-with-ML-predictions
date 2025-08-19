import React, { useState, useEffect } from 'react';
import { expenseAPI } from '../../utils/api';
import Charts from './Charts';

const Prediction = ({ onRefresh }) => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrediction = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await expenseAPI.getPrediction();
      setPrediction(response.data);
    } catch (err) {
      console.error('Error fetching prediction:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch prediction');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  const formatRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const getConfidenceColor = (confidence) => {
    const colors = {
      'high': '#48bb78',
      'medium': '#ed8936', 
      'low': '#f6ad55',
      'none': '#a0aec0',
      'error': '#e53e3e'
    };
    return colors[confidence] || '#a0aec0';
  };

  const getConfidenceIcon = (confidence) => {
    const icons = {
      'high': '🎯',
      'medium': '📊',
      'low': '⚠️',
      'none': '📝',
      'error': '❌'
    };
    return icons[confidence] || '🤖';
  };

  const handleRefresh = () => {
    fetchPrediction();
    if (onRefresh) onRefresh();
  };

  return (
    <div className="grid" style={{ marginBottom: '32px' }}>
      <div 
        className={`card prediction-card`}
        style={{ 
          background: prediction?.confidence === 'error' 
            ? 'linear-gradient(135deg, #e53e3e, #c53030)' 
            : 'linear-gradient(135deg, #4299e1, #3182ce)',
          color: 'white',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.2rem' }}>🤖 AI Prediction</h3>
          <button
            onClick={handleRefresh}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
            title="Refresh prediction"
          >
            🔄
          </button>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔮</div>
            <p>Analyzing your spending patterns...</p>
            <div style={{ 
              width: '60%', 
              height: '4px', 
              background: 'rgba(255,255,255,0.3)', 
              borderRadius: '2px',
              margin: '20px auto',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'white',
                borderRadius: '2px',
                animation: 'shimmer 1.5s ease-in-out infinite',
                transform: 'translateX(-100%)'
              }}></div>
            </div>
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>❌</div>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
              Prediction Error
            </h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.9, lineHeight: '1.4' }}>
              {error}
            </p>
          </div>
        ) : prediction ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.8rem', marginBottom: '16px', fontWeight: 'bold' }}>
              {formatRupees(prediction.prediction)}
            </div>
            
            <p style={{ fontSize: '1.1rem', marginBottom: '16px', opacity: 0.95 }}>
              Next 30 days prediction
            </p>
            
            <div style={{ 
              background: 'rgba(255,255,255,0.15)', 
              borderRadius: '12px', 
              padding: '16px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '12px'
              }}>
                <span style={{ 
                  background: getConfidenceColor(prediction.confidence),
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {getConfidenceIcon(prediction.confidence)} 
                  {prediction.confidence?.toUpperCase()} CONFIDENCE
                </span>
              </div>
              
              <p style={{ 
                fontSize: '0.9rem', 
                lineHeight: '1.5', 
                opacity: 0.95,
                margin: 0
              }}>
                {prediction.message}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📊</div>
            <p>No prediction available</p>
          </div>
        )}
        
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
      
      {/* Charts */}
      {prediction && prediction.analytics && (
        <Charts analytics={prediction.analytics} />
      )}
    </div>
  );
};

export default Prediction;


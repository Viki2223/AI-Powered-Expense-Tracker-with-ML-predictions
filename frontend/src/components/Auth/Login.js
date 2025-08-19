import React, { useState } from 'react';
import { authAPI } from '../../utils/api';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setMessage('Please enter both email and password');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
        onLogin(response.data.user, response.data.access_token);
        setMessage('Login successful!');
      } else {
        await authAPI.register(formData);
        setMessage('Registration successful! Please login.');
        setIsLogin(true);
        setFormData({
          ...formData,
          password: '',
          first_name: '',
          last_name: ''
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '100px auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '8px', color: '#667eea', fontSize: '2.5rem' }}>
          🤖 AI Expense Tracker
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '32px', color: '#666', fontSize: '16px' }}>
          Smart expense tracking with AI-powered predictions
        </p>
        
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>
          {isLogin ? '🔑 Login' : '📝 Register'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="last_name"
                  className="form-control"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </>
          )}
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', marginBottom: '16px' }} 
            disabled={loading}
          >
            {loading ? '⏳ Processing...' : (isLogin ? '🚀 Login' : '✨ Create Account')}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
              setFormData({
                ...formData,
                password: '',
                first_name: '',
                last_name: ''
              });
            }}
            disabled={loading}
          >
            {isLogin ? '📝 Need an account? Register here' : '🔑 Already have account? Login here'}
          </button>
        </div>

        {message && (
          <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}
        
        {/* Demo credentials hint */}
        <div style={{ marginTop: '20px', padding: '12px', background: '#f7fafc', borderRadius: '8px', fontSize: '14px', color: '#666' }}>
          <strong>Demo:</strong> Register with any email or use existing account
        </div>
      </div>
    </div>
  );
};

export default Login;

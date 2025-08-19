import React, { useState, useEffect } from 'react';
import { authAPI, expenseAPI } from './utils/api';
import storage from './utils/storage';

function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('login');
  const [initializing, setInitializing] = useState(true);
  const [debugInfo, setDebugInfo] = useState({ 
    token: false, 
    user: false, 
    storageTest: 'Not tested' 
  });
  
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    first_name: '', last_name: '', email: '', password: '' 
  });
  const [expenseForm, setExpenseForm] = useState({
    category: '', amount: '', description: ''
  });
  
  const [message, setMessage] = useState('');
  
  const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Other'];

  // Update debug info
  const updateDebugInfo = () => {
    const hasToken = !!storage.getToken();
    const hasUser = !!storage.getUser();
    const storageDebug = storage.getDebugInfo();
    
    const user = storage.getUser();
    
    const newDebugInfo = {
      token: hasToken,
      user: hasUser,
      tokenLength: storage.getToken()?.length || 0,
      userEmail: user?.email || 'none',
      storageAvailable: storageDebug.localStorageAvailable,
      storageTest: storageDebug.storageTest,
      memoryKeys: storageDebug.memoryStorageKeys.length,
      localKeys: storageDebug.localStorageKeys.length,
      hasValidAuth: storage.hasValidAuth()
    };
    
    setDebugInfo(newDebugInfo);
    
    console.log('🔍 Debug info updated:', newDebugInfo);
    console.log('📦 Full storage debug:', storageDebug);
    
    return newDebugInfo;
  };

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔍 Checking authentication on app load...');
      
      const currentDebug = updateDebugInfo();
      
      if (currentDebug.hasValidAuth) {
        const user = storage.getUser();
        
        console.log('✅ Found stored authentication for user:', user.email);
        
        try {
          // Verify token is still valid
          await authAPI.verifyToken();
          
          console.log('✅ Token verification passed, restoring session');
          setUser(user);
          setView('dashboard');
          
          // Load dashboard data
          await loadDashboardData();
          
        } catch (error) {
          console.error('❌ Token verification failed:', error);
          storage.clearAuth();
          updateDebugInfo();
          setView('login');
          setMessage('Session expired. Please login again.');
        }
      } else {
        console.log('ℹ️ No valid authentication found');
        setView('login');
      }
      
      setInitializing(false);
    };

    checkAuth();
  }, []);

  // Listen for auth errors
  useEffect(() => {
    const handleAuthError = (event) => {
      console.warn('🔐 Auth error detected:', event.detail);
      setUser(null);
      setView('login');
      setExpenses([]);
      setPrediction(null);
      storage.clearAuth();
      updateDebugInfo();
      setMessage(event.detail?.message || 'Session expired. Please login again.');
    };

    window.addEventListener('auth-error', handleAuthError);
    return () => window.removeEventListener('auth-error', handleAuthError);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      console.log('📊 Loading dashboard data...');
      
      // Load expenses
      const expensesResponse = await expenseAPI.getExpenses();
      const expensesData = expensesResponse.data || [];
      setExpenses(expensesData);
      console.log(`✅ Loaded ${expensesData.length} expenses`);
      
      // Load prediction
      const predictionResponse = await expenseAPI.getPrediction();
      setPrediction(predictionResponse.data);
      console.log('✅ Loaded AI prediction:', predictionResponse.data.confidence);
      
    } catch (error) {
      console.error('❌ Error loading dashboard data:', error);
      
      if (error.response?.status !== 401) {
        setMessage('Error loading dashboard data');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!loginForm.email || !loginForm.password) {
      setMessage('Please enter email and password');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      console.log('🔑 Starting login process for:', loginForm.email);
      
      // Step 1: Login API call
      const response = await authAPI.login(loginForm);
      const { user: userData, access_token } = response.data;
      
      console.log('✅ Login API successful:', {
        user: userData.email,
        tokenReceived: !!access_token,
        tokenLength: access_token?.length
      });
      
      // Step 2: Store authentication data
      console.log('💾 Storing authentication data...');
      
      const tokenStored = storage.setToken(access_token);
      const userStored = storage.setUser(userData);
      
      if (!tokenStored || !userStored) {
        throw new Error('Failed to store authentication data');
      }
      
      // Step 3: Verify storage
      const storedToken = storage.getToken();
      const storedUser = storage.getUser();
      
      console.log('✅ Storage verification:', {
        tokenStored: !!storedToken,
        userStored: !!storedUser,
        tokenMatches: storedToken === access_token,
        userEmailMatches: storedUser?.email === userData.email
      });
      
      if (!storedToken || !storedUser) {
        throw new Error('Storage verification failed');
      }
      
      // Step 4: Update app state
      console.log('🔄 Updating application state...');
      
      setUser(userData);
      setLoginForm({ email: '', password: '' });
      setMessage('✅ Login successful! Loading dashboard...');
      updateDebugInfo();
      
      // Step 5: Switch to dashboard
      setView('dashboard');
      
      // Step 6: Load dashboard data
      setTimeout(async () => {
        try {
          await loadDashboardData();
          setMessage(''); // Clear login message
          console.log('✅ Login process completed successfully');
        } catch (error) {
          console.error('❌ Dashboard load failed after login:', error);
          if (error.response?.status === 401) {
            storage.clearAuth();
            updateDebugInfo();
            setView('login');
            setMessage('❌ Session invalid after login. Please try again.');
          }
        }
      }, 300);
      
    } catch (error) {
      console.error('❌ Login failed:', error);
      
      const errorMessage = error.response?.data?.error || error.message || 'Login failed. Please try again.';
      setMessage(errorMessage);
      
      // Clear any partial auth data
      storage.clearAuth();
      updateDebugInfo();
      
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!registerForm.email || !registerForm.password || !registerForm.first_name) {
      setMessage('Please fill in all required fields');
      return;
    }
    
    if (registerForm.password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      console.log('📝 Registering user:', registerForm.email);
      
      await authAPI.register(registerForm);
      setMessage('✅ Registration successful! Please login with your credentials.');
      setView('login');
      
      setLoginForm({ email: registerForm.email, password: '' });
      setRegisterForm({ first_name: '', last_name: '', email: '', password: '' });
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      setMessage(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    
    if (!expenseForm.category || !expenseForm.amount) {
      setMessage('Please fill in category and amount');
      return;
    }
    
    if (parseFloat(expenseForm.amount) <= 0) {
      setMessage('Amount must be greater than 0');
      return;
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      const expenseData = {
        category: expenseForm.category,
        amount: parseFloat(expenseForm.amount),
        description: expenseForm.description.trim(),
        date: new Date().toISOString().split('T')[0]
      };
      
      await expenseAPI.addExpense(expenseData);
      
      setExpenseForm({ category: '', amount: '', description: '' });
      setMessage('✅ Expense added successfully!');
      
      await loadDashboardData();
      
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      console.error('❌ Add expense error:', error);
      if (error.response?.status !== 401) {
        setMessage('❌ Failed to add expense. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    if (!window.confirm('Are you sure you want to delete this expense?')) {
      return;
    }
    
    try {
      await expenseAPI.deleteExpense(expenseId);
      setMessage('✅ Expense deleted successfully!');
      await loadDashboardData();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('❌ Delete expense error:', error);
      if (error.response?.status !== 401) {
        setMessage('❌ Failed to delete expense.');
      }
    }
  };

  const handleLogout = () => {
    console.log('🚪 Logging out...');
    
    setUser(null);
    setExpenses([]);
    setPrediction(null);
    storage.clearAuth();
    updateDebugInfo();
    
    setLoginForm({ email: '', password: '' });
    setExpenseForm({ category: '', amount: '', description: '' });
    
    setView('login');
    setMessage('✅ Logged out successfully');
  };

  const handleDebugRefresh = () => {
    console.log('🔍 Debug refresh requested');
    
    const updatedDebug = updateDebugInfo();
    const testResult = storage.getDebugInfo();
    
    console.log('🧪 Storage test results:', testResult);
    console.log('📊 Current authentication state:', {
      hasToken: updatedDebug.token,
      hasUser: updatedDebug.user,
      hasValidAuth: updatedDebug.hasValidAuth
    });
    
    setMessage(`🔍 Debug: Token=${updatedDebug.token ? 'YES' : 'NO'}, User=${updatedDebug.user ? 'YES' : 'NO'}, Test=${testResult.storageTest}`);
    setTimeout(() => setMessage(''), 5000);
  };

  const formatRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Food': '🍽️', 'Transportation': '🚗', 'Entertainment': '🎬',
      'Shopping': '🛒', 'Bills': '📄', 'Healthcare': '🏥', 'Other': '📝'
    };
    return icons[category] || '💰';
  };

  // Loading screen
  if (initializing) {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🤖</div>
          <h2 style={{ color: '#667eea', marginBottom: '16px' }}>AI Expense Tracker</h2>
          <p style={{ color: '#666' }}>Checking authentication...</p>
          <div style={{ marginTop: '16px', fontSize: '0.9rem', color: '#999' }}>
            {debugInfo.hasValidAuth ? 'Restoring session...' : 'Initializing...'}
          </div>
        </div>
      </div>
    );
  }

  // LOGIN VIEW
  if (view === 'login') {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth: '450px', margin: '100px auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '8px', color: '#667eea', fontSize: '2.5rem' }}>
            🤖 AI Expense Tracker
          </h1>
          <p style={{ textAlign: 'center', marginBottom: '16px', color: '#666', fontSize: '16px' }}>
            Smart expense tracking with AI predictions
          </p>
          <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>
            🔑 Login
          </h2>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email address"
                value={loginForm.email}
                onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                disabled={loading}
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                disabled={loading}
                required
                autoComplete="current-password"
                minLength="6"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%', marginBottom: '16px' }} 
              disabled={loading}
            >
              {loading ? '⏳ Logging in...' : '🚀 Login'}
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setView('register');
                setMessage('');
              }}
              disabled={loading}
            >
              📝 Create New Account
            </button>
          </div>

          {message && (
            <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}

          {/* Enhanced Debug Info */}
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            background: '#f8fafc', 
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: '#666',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '12px', color: '#333', textAlign: 'center' }}>
              🔍 Authentication Debug
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
              <div>
                🔑 Token: <strong style={{ color: debugInfo.token ? '#48bb78' : '#e53e3e' }}>
                  {debugInfo.token ? 'Yes' : 'No'}
                </strong>
              </div>
              <div>
                👤 User: <strong style={{ color: debugInfo.user ? '#48bb78' : '#e53e3e' }}>
                  {debugInfo.user ? 'Yes' : 'No'}
                </strong>
              </div>
            </div>
            
            <div style={{ fontSize: '0.8rem', marginBottom: '12px', color: '#888' }}>
              <div>📦 Storage: <strong>{debugInfo.storageAvailable ? 'Available' : 'Unavailable'}</strong></div>
              <div>🧪 Test: <strong style={{ color: debugInfo.storageTest === 'PASSED' ? '#48bb78' : '#e53e3e' }}>
                {debugInfo.storageTest}
              </strong></div>
              <div>🔐 Auth: <strong style={{ color: debugInfo.hasValidAuth ? '#48bb78' : '#e53e3e' }}>
                {debugInfo.hasValidAuth ? 'Valid' : 'Invalid'}
              </strong></div>
              {debugInfo.tokenLength > 0 && (
                <div>📏 Token: {debugInfo.tokenLength} chars</div>
              )}
              {debugInfo.userEmail !== 'none' && (
                <div>📧 User: {debugInfo.userEmail}</div>
              )}
            </div>
            
            <button 
              onClick={handleDebugRefresh}
              style={{
                width: '100%',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 12px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
            >
              🔄 Refresh Debug Info
            </button>
          </div>

          {/* Quick Test Info */}
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            background: '#e6fffa', 
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: '#234e52',
            border: '1px solid #b2f5ea'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🧪 Test Login:</div>
            <div>Register with any email and password (min 6 chars) to test the application!</div>
          </div>
        </div>
      </div>
    );
  }

  // REGISTER VIEW (keeping existing code)
  if (view === 'register') {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth: '450px', margin: '50px auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '8px', color: '#667eea', fontSize: '2.5rem' }}>
            🤖 AI Expense Tracker
          </h1>
          <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>
            📝 Create Account
          </h2>
          
          <form onSubmit={handleRegister}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name *"
                  value={registerForm.first_name}
                  onChange={(e) => setRegisterForm({...registerForm, first_name: e.target.value})}
                  disabled={loading}
                  required
                  maxLength="50"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={registerForm.last_name}
                  onChange={(e) => setRegisterForm({...registerForm, last_name: e.target.value})}
                  disabled={loading}
                  maxLength="50"
                />
              </div>
            </div>
            
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address *"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                disabled={loading}
                required
                autoComplete="email"
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password (min 6 characters) *"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                disabled={loading}
                required
                minLength="6"
                autoComplete="new-password"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-success" 
              style={{ width: '100%', marginBottom: '16px' }} 
              disabled={loading}
            >
              {loading ? '⏳ Creating Account...' : '✨ Create Account'}
            </button>
          </form>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setView('login');
                setMessage('');
              }}
              disabled={loading}
            >
              🔑 Back to Login
            </button>
          </div>

          {message && (
            <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW (keeping existing dashboard code)
  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
  const thisMonth = expenses.filter(exp => {
    const expDate = new Date(exp.timestamp);
    const now = new Date();
    return expDate.getMonth() === now.getMonth() && expDate.getFullYear() === now.getFullYear();
  }).reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

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
            {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email}
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
            Session: {debugInfo.hasValidAuth ? '🟢 Active' : '🔴 Inactive'} • Auth: {debugInfo.token && debugInfo.user ? '✅' : '❌'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={handleDebugRefresh}
            style={{ fontSize: '0.85rem', padding: '8px 12px' }}
          >
            🔍 Debug ({debugInfo.storageTest})
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid" style={{ marginBottom: '32px' }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', opacity: 0.9 }}>💰 Total Expenses</h3>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '4px' }}>
            {formatRupees(totalExpenses)}
          </h2>
          <p style={{ opacity: 0.8 }}>{expenses.length} transactions</p>
        </div>

        <div className="card" style={{ background: 'linear-gradient(135deg, #48bb78, #38a169)', color: 'white' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', opacity: 0.9 }}>📅 This Month</h3>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '4px' }}>
            {formatRupees(thisMonth)}
          </h2>
          <p style={{ opacity: 0.8 }}>Current month spending</p>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #4299e1, #3182ce)', 
          color: 'white', 
          textAlign: 'center' 
        }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>🤖 AI Prediction</h3>
          {prediction ? (
            <div>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
                {formatRupees(prediction.prediction)}
              </h2>
              <p style={{ fontSize: '0.9rem', marginBottom: '8px', opacity: 0.9 }}>
                Next 30 days
              </p>
              <span style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '4px 12px', 
                borderRadius: '16px', 
                fontSize: '0.8rem' 
              }}>
                {prediction.confidence.toUpperCase()} CONFIDENCE
              </span>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🔮</div>
              <p>{loading ? 'Generating prediction...' : 'Add expenses to see predictions'}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Add Expense Form and Expenses List */}
      <div className="grid">
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#333' }}>➕ Add New Expense</h3>
          
          <form onSubmit={handleAddExpense}>
            <div className="form-group">
              <select
                className="form-control"
                value={expenseForm.category}
                onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
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
                step="0.01"
                min="0.01"
                max="999999"
                className="form-control"
                placeholder="Amount in Rupees (e.g., 250.50)"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Description (optional)"
                value={expenseForm.description}
                onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
                disabled={loading}
                maxLength="200"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-success" 
              style={{ width: '100%' }} 
              disabled={loading}
            >
              {loading ? '⏳ Adding...' : '💰 Add Expense'}
            </button>
          </form>

          {message && (
            <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}
        </div>
        
        <div className="card">
          <h3 style={{ marginBottom: '20px', color: '#333' }}>📊 Recent Expenses</h3>
          
          {loading && expenses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⏳</div>
              <p>Loading your expenses...</p>
            </div>
          ) : expenses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</p>
              <p><strong>No expenses recorded yet!</strong></p>
              <p>Add your first expense to see AI predictions.</p>
            </div>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {expenses.slice(0, 20).map((expense, index) => (
                <div key={expense.id || index} className="expense-item">
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
                      <strong style={{ color: '#e53e3e', fontSize: '1.2rem' }}>
                        {formatRupees(parseFloat(expense.amount))}
                      </strong>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
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
                      title="Delete expense"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

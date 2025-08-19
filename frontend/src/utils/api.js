  import axios from 'axios';
import storage from './storage';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
});

// Request interceptor with enhanced token handling
api.interceptors.request.use((config) => {
  const token = storage.getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(`🔐 Added token to ${config.method?.toUpperCase()} ${config.url} (token length: ${token.length})`);
  } else {
    console.log(`⚠️ No token found for ${config.method?.toUpperCase()} ${config.url}`);
  }
  
  // Add request timestamp for debugging
  config.metadata = { startTime: new Date() };
  
  return config;
}, (error) => {
  console.error('❌ Request interceptor error:', error);
  return Promise.reject(error);
});

// Response interceptor with enhanced error handling
api.interceptors.response.use(
  (response) => {
    const duration = new Date() - response.config.metadata.startTime;
    console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status} (${duration}ms)`);
    return response;
  },
  (error) => {
    const { response, config } = error;
    const duration = config?.metadata ? new Date() - config.metadata.startTime : 0;
    
    console.error(`❌ ${config?.method?.toUpperCase()} ${config?.url} - ${response?.status || 'Network Error'} (${duration}ms)`);
    
    if (response?.status === 401) {
      console.warn('🔐 Authentication error detected');
      
      // Clear authentication data
      storage.clearAuth();
      
      // Dispatch auth error event with detailed info
      window.dispatchEvent(new CustomEvent('auth-error', {
        detail: { 
          message: 'Session expired. Please login again.',
          status: response.status,
          url: config?.url,
          timestamp: new Date().toISOString()
        }
      }));
    }
    
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  register: (userData) => {
    console.log('📝 Registering user:', userData.email);
    return api.post('/register', userData);
  },
  
  login: async (credentials) => {
    console.log('🔑 Logging in user:', credentials.email);
    
    try {
      const response = await api.post('/login', credentials);
      console.log('✅ Login response received:', {
        status: response.status,
        hasToken: !!response.data.access_token,
        hasUser: !!response.data.user,
        tokenLength: response.data.access_token?.length
      });
      return response;
    } catch (error) {
      console.error('❌ Login API error:', error.response?.data || error.message);
      throw error;
    }
  },
  
  verifyToken: () => {
    console.log('🔍 Verifying token...');
    return api.get('/verify-token');
  }
};

// Expense API
export const expenseAPI = {
  getExpenses: () => {
    console.log('📊 Fetching expenses...');
    return api.get('/expenses');
  },
  
  addExpense: (expenseData) => {
    console.log('💰 Adding expense:', expenseData.category, '₹' + expenseData.amount);
    return api.post('/expenses', expenseData);
  },
  
  updateExpense: (id, expenseData) => {
    console.log('✏️ Updating expense:', id);
    return api.put(`/expenses/${id}`, expenseData);
  },
  
  deleteExpense: (id) => {
    console.log('🗑️ Deleting expense:', id);
    return api.delete(`/expenses/${id}`);
  },
  
  getPrediction: () => {
    console.log('🤖 Getting AI prediction...');
    return api.get('/predict');
  },
};

export default api;

// ============================================
// AI Expense Tracker - Application Constants
// ============================================

// Application Information
export const APP_CONSTANTS = {
  NAME: 'AI Expense Tracker',
  VERSION: '1.0.0',
  DESCRIPTION: 'Smart expense tracking with AI-powered predictions',
  AUTHOR: 'Your Name',
  SUPPORT_EMAIL: 'support@your-domain.com',
  CONTACT_EMAIL: 'contact@your-domain.com',
  GITHUB_URL: 'https://github.com/yourusername/ai-expense-tracker',
  DEMO_URL: 'https://your-demo-url.com',
  DOCUMENTATION_URL: 'https://docs.your-domain.com'
};

// Authentication Constants
export const AUTH_CONSTANTS = {
  TOKEN_KEY: 'expense_tracker_token',
  USER_KEY: 'expense_tracker_user',
  REFRESH_TOKEN_KEY: 'expense_tracker_refresh_token',
  TOKEN_EXPIRY_KEY: 'expense_tracker_token_expiry',
  
  // Session timeouts (in milliseconds)
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes
  SESSION_TIMEOUT: 60 * 60 * 1000, // 1 hour
  REMEMBER_ME_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 days
  
  // Password requirements
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 128,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBERS: false,
  REQUIRE_SPECIAL_CHARS: false
};

// API Configuration
export const API_CONSTANTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Endpoints
  ENDPOINTS: {
    // Authentication
    REGISTER: '/register',
    LOGIN: '/login',
    LOGOUT: '/logout',
    REFRESH_TOKEN: '/refresh',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    
    // User Management
    PROFILE: '/profile',
    UPDATE_PROFILE: '/profile',
    CHANGE_PASSWORD: '/change-password',
    DELETE_ACCOUNT: '/delete-account',
    
    // Expenses
    EXPENSES: '/expenses',
    EXPENSE_BY_ID: '/expenses',
    EXPENSE_CATEGORIES: '/expenses/categories',
    EXPENSE_STATS: '/expenses/stats',
    EXPENSE_EXPORT: '/expenses/export',
    
    // AI & Analytics
    PREDICTIONS: '/predict',
    ANALYTICS: '/analytics',
    INSIGHTS: '/insights',
    TRENDS: '/trends',
    
    // System
    HEALTH: '/health',
    VERSION: '/version',
    SETTINGS: '/settings'
  }
};

// Expense Categories with Icons and Colors
export const EXPENSE_CATEGORIES = {
  FOOD: {
    name: 'Food',
    icon: '🍽️',
    color: '#ff6b6b',
    description: 'Meals, groceries, dining out'
  },
  TRANSPORTATION: {
    name: 'Transportation',
    icon: '🚗',
    color: '#4ecdc4',
    description: 'Fuel, public transport, taxi, maintenance'
  },
  ENTERTAINMENT: {
    name: 'Entertainment',
    icon: '🎬',
    color: '#45b7d1',
    description: 'Movies, games, subscriptions, hobbies'
  },
  SHOPPING: {
    name: 'Shopping',
    icon: '🛒',
    color: '#f9ca24',
    description: 'Clothes, electronics, home items'
  },
  BILLS: {
    name: 'Bills',
    icon: '📄',
    color: '#f0932b',
    description: 'Utilities, rent, insurance, phone'
  },
  HEALTHCARE: {
    name: 'Healthcare',
    icon: '🏥',
    color: '#eb4d4b',
    description: 'Medical, dental, pharmacy, fitness'
  },
  EDUCATION: {
    name: 'Education',
    icon: '📚',
    color: '#6c5ce7',
    description: 'Courses, books, training, certification'
  },
  TRAVEL: {
    name: 'Travel',
    icon: '✈️',
    color: '#00b894',
    description: 'Flights, hotels, vacation expenses'
  },
  INVESTMENTS: {
    name: 'Investments',
    icon: '📈',
    color: '#00cec9',
    description: 'Stocks, mutual funds, crypto, savings'
  },
  GIFTS: {
    name: 'Gifts',
    icon: '🎁',
    color: '#fd79a8',
    description: 'Presents, donations, celebrations'
  },
  PERSONAL_CARE: {
    name: 'Personal Care',
    icon: '💄',
    color: '#fdcb6e',
    description: 'Beauty, grooming, spa, wellness'
  },
  OTHER: {
    name: 'Other',
    icon: '📝',
    color: '#636e72',
    description: 'Miscellaneous expenses'
  }
};

// Get category list for dropdowns
export const CATEGORY_LIST = Object.keys(EXPENSE_CATEGORIES).map(key => ({
  value: EXPENSE_CATEGORIES[key].name,
  label: `${EXPENSE_CATEGORIES[key].icon} ${EXPENSE_CATEGORIES[key].name}`,
  icon: EXPENSE_CATEGORIES[key].icon,
  color: EXPENSE_CATEGORIES[key].color,
  description: EXPENSE_CATEGORIES[key].description
}));

// Currency Configuration
export const CURRENCY_CONSTANTS = {
  DEFAULT: 'INR',
  SYMBOL: '₹',
  LOCALE: 'en-IN',
  DECIMAL_PLACES: 2,
  
  SUPPORTED_CURRENCIES: {
    INR: { symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
    USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
    EUR: { symbol: '€', name: 'Euro', locale: 'de-DE' },
    GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
    JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' }
  }
};

// AI Prediction Constants
export const AI_CONSTANTS = {
  CONFIDENCE_LEVELS: {
    HIGH: { value: 'high', label: 'High Confidence', color: '#48bb78', icon: '🎯' },
    MEDIUM: { value: 'medium', label: 'Medium Confidence', color: '#ed8936', icon: '📊' },
    LOW: { value: 'low', label: 'Low Confidence', color: '#f6ad55', icon: '⚠️' },
    NONE: { value: 'none', label: 'No Data', color: '#a0aec0', icon: '📝' },
    ERROR: { value: 'error', label: 'Error', color: '#e53e3e', icon: '❌' }
  },
  
  PREDICTION_TYPES: {
    DAILY: 'daily',
    WEEKLY: 'weekly', 
    MONTHLY: 'monthly',
    YEARLY: 'yearly'
  },
  
  MIN_EXPENSES_FOR_PREDICTION: 5,
  HIGH_CONFIDENCE_THRESHOLD: 20,
  MEDIUM_CONFIDENCE_THRESHOLD: 10,
  
  CHART_COLORS: [
    '#ff6384', '#36a2eb', '#cc65fe', '#ffce56',
    '#4bc0c0', '#9966ff', '#ff9f40', '#ff6384',
    '#c9cbcf', '#4bc0c0'
  ]
};

// Date and Time Constants
export const DATE_CONSTANTS = {
  FORMATS: {
    DISPLAY: 'DD/MM/YYYY',
    API: 'YYYY-MM-DD',
    DATETIME: 'DD/MM/YYYY HH:mm',
    TIME: 'HH:mm'
  },
  
  PERIODS: {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    THIS_WEEK: 'this_week',
    LAST_WEEK: 'last_week',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    THIS_YEAR: 'this_year',
    LAST_YEAR: 'last_year',
    CUSTOM: 'custom'
  }
};

// UI Constants
export const UI_CONSTANTS = {
  THEME: {
    PRIMARY: '#667eea',
    SECONDARY: '#764ba2',
    SUCCESS: '#48bb78',
    WARNING: '#ed8936',
    ERROR: '#e53e3e',
    INFO: '#4299e1'
  },
  
  BREAKPOINTS: {
    MOBILE: '768px',
    TABLET: '1024px',
    DESKTOP: '1200px'
  },
  
  ANIMATION_DURATION: '0.3s',
  BORDER_RADIUS: '8px',
  BOX_SHADOW: '0 4px 20px rgba(0,0,0,0.1)',
  
  LOADING_MESSAGES: [
    '🤖 Analyzing your expenses...',
    '📊 Generating insights...',
    '🔮 Predicting future spending...',
    '📈 Calculating trends...',
    '💡 Finding patterns...'
  ]
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters long',
  PASSWORD_MISMATCH: 'Passwords do not match',
  INVALID_NAME: 'Name must contain only letters and spaces',
  INVALID_AMOUNT: 'Please enter a valid amount',
  AMOUNT_TOO_SMALL: 'Amount must be greater than 0',
  AMOUNT_TOO_LARGE: 'Amount is too large',
  TERMS_REQUIRED: 'Please accept the terms and conditions',
  
  // API Error Messages
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  REGISTRATION_FAILED: 'Registration failed. Please try again.',
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  UPDATE_FAILED: 'Update failed. Please try again.',
  DELETE_FAILED: 'Delete failed. Please try again.'
};

// Feature Flags
export const FEATURE_FLAGS = {
  AI_PREDICTIONS: true,
  INTERACTIVE_CHARTS: true,
  EXPENSE_EXPORT: true,
  DARK_MODE: false,
  MULTI_CURRENCY: false,
  NOTIFICATIONS: true,
  OFFLINE_MODE: false,
  PREMIUM_FEATURES: false,
  SOCIAL_LOGIN: false,
  TWO_FACTOR_AUTH: false
};

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'expense_tracker_theme',
  LANGUAGE: 'expense_tracker_language',
  CURRENCY: 'expense_tracker_currency',
  SETTINGS: 'expense_tracker_settings',
  CACHE_PREFIX: 'expense_tracker_cache_',
  OFFLINE_DATA: 'expense_tracker_offline'
};

// Error Codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  MAINTENANCE_ERROR: 'MAINTENANCE_ERROR'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  REGISTRATION_SUCCESS: 'Account created successfully! Please login.',
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'Successfully logged out.',
  EXPENSE_ADDED: 'Expense added successfully!',
  EXPENSE_UPDATED: 'Expense updated successfully!',
  EXPENSE_DELETED: 'Expense deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  DATA_EXPORTED: 'Data exported successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!'
};

// Chart Configuration
export const CHART_CONSTANTS = {
  DEFAULT_HEIGHT: 300,
  COLORS: AI_CONSTANTS.CHART_COLORS,
  
  OPTIONS: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

// Export Configuration
export const EXPORT_CONSTANTS = {
  FORMATS: {
    CSV: { value: 'csv', label: 'CSV', icon: '📊' },
    PDF: { value: 'pdf', label: 'PDF', icon: '📄' },
    EXCEL: { value: 'xlsx', label: 'Excel', icon: '📈' }
  },
  
  DATE_RANGES: {
    LAST_MONTH: 'last_month',
    LAST_3_MONTHS: 'last_3_months',
    LAST_6_MONTHS: 'last_6_months',
    LAST_YEAR: 'last_year',
    ALL_TIME: 'all_time',
    CUSTOM: 'custom'
  }
};

// Pagination Constants
export const PAGINATION_CONSTANTS = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_VISIBLE_PAGES: 5
};

// Notification Constants
export const NOTIFICATION_CONSTANTS = {
  TYPES: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  },
  
  POSITIONS: {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
    TOP_CENTER: 'top-center',
    BOTTOM_CENTER: 'bottom-center'
  },
  
  DEFAULT_DURATION: 5000, // 5 seconds
  PERSISTENT_DURATION: 0 // Won't auto-hide
};

// Regular Expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  PHONE: /^[+]?[\d\s\-\(\)]{10,}$/,
  NAME: /^[a-zA-Z\s'.-]{2,50}$/,
  AMOUNT: /^\d+(\.\d{1,2})?$/,
  URL: /^https?:\/\/.+/
};

// Helper Functions
export const HELPERS = {
  formatCurrency: (amount, currency = CURRENCY_CONSTANTS.DEFAULT) => {
    const currencyInfo = CURRENCY_CONSTANTS.SUPPORTED_CURRENCIES[currency];
    return new Intl.NumberFormat(currencyInfo.locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: CURRENCY_CONSTANTS.DECIMAL_PLACES,
      maximumFractionDigits: CURRENCY_CONSTANTS.DECIMAL_PLACES
    }).format(amount);
  },
  
  formatDate: (date, format = DATE_CONSTANTS.FORMATS.DISPLAY) => {
    return new Date(date).toLocaleDateString('en-IN');
  },
  
  getCategoryIcon: (categoryName) => {
    const category = Object.values(EXPENSE_CATEGORIES)
      .find(cat => cat.name === categoryName);
    return category ? category.icon : EXPENSE_CATEGORIES.OTHER.icon;
  },
  
  getCategoryColor: (categoryName) => {
    const category = Object.values(EXPENSE_CATEGORIES)
      .find(cat => cat.name === categoryName);
    return category ? category.color : EXPENSE_CATEGORIES.OTHER.color;
  },
  
  getRandomLoadingMessage: () => {
    const messages = UI_CONSTANTS.LOADING_MESSAGES;
    return messages[Math.floor(Math.random() * messages.length)];
  },
  
  truncateText: (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },
  
  debounce: (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
};

// Default Export
export default {
  APP_CONSTANTS,
  AUTH_CONSTANTS,
  API_CONSTANTS,
  EXPENSE_CATEGORIES,
  CATEGORY_LIST,
  CURRENCY_CONSTANTS,
  AI_CONSTANTS,
  DATE_CONSTANTS,
  UI_CONSTANTS,
  VALIDATION_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS,
  STORAGE_KEYS,
  ERROR_CODES,
  CHART_CONSTANTS,
  EXPORT_CONSTANTS,
  PAGINATION_CONSTANTS,
  NOTIFICATION_CONSTANTS,
  REGEX_PATTERNS,
  HELPERS
};
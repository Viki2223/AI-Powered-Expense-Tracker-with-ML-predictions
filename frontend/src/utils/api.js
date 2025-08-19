import axios from 'axios';
import storage from './storage';

// Detect API URL based on environment
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://ai-expense-tracker-backend.onrender.com/api'  // Replace with your Render backend URL
  : 'http://localhost:5000/api';

// Rest of your API code...
// [Keep your existing API implementation]

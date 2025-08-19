import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '../../utils/api';
import { validateEmail, validatePassword, validateName } from '../../utils/validation';
import { AUTH_CONSTANTS, VALIDATION_MESSAGES, UI_CONSTANTS } from '../../utils/constants';

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Real-time password strength calculation
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Real-time password confirmation validation
    if (name === 'confirm_password' && formData.password) {
      if (value !== formData.password) {
        setErrors(prev => ({
          ...prev,
          confirm_password: VALIDATION_MESSAGES.PASSWORD_MISMATCH
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          confirm_password: ''
        }));
      }
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 25;
    
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 25;
    
    // Lowercase check  
    if (/[a-z]/.test(password)) strength += 25;
    
    // Number or special character check
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
    
    return strength;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#e53e3e';
    if (passwordStrength < 50) return '#ed8936';
    if (passwordStrength < 75) return '#f6ad55';
    return '#48bb78';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = VALIDATION_MESSAGES.REQUIRED_FIELD;
    } else if (!validateName(formData.first_name)) {
      newErrors.first_name = VALIDATION_MESSAGES.INVALID_NAME;
    }

    // Last name validation
    if (!formData.last_name.trim()) {
      newErrors.last_name = VALIDATION_MESSAGES.REQUIRED_FIELD;
    } else if (!validateName(formData.last_name)) {
      newErrors.last_name = VALIDATION_MESSAGES.INVALID_NAME;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = VALIDATION_MESSAGES.REQUIRED_FIELD;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = VALIDATION_MESSAGES.INVALID_EMAIL;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = VALIDATION_MESSAGES.REQUIRED_FIELD;
    } else if (!validatePassword(formData.password)) {
      newErrors.password = VALIDATION_MESSAGES.INVALID_PASSWORD;
    }

    // Confirm password validation
    if (!formData.confirm_password) {
      newErrors.confirm_password = VALIDATION_MESSAGES.REQUIRED_FIELD;
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = VALIDATION_MESSAGES.PASSWORD_MISMATCH;
    }

    // Terms agreement validation
    if (!agreedToTerms) {
      newErrors.terms = VALIDATION_MESSAGES.TERMS_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const registrationData = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      };

      await authAPI.register(registrationData);
      
      setSuccess(true);
      
      // Call parent callback if provided
      if (onRegisterSuccess) {
        onRegisterSuccess({
          email: registrationData.email,
          name: `${registrationData.first_name} ${registrationData.last_name}`
        });
      }

    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response?.data?.error) {
        const errorMessage = error.response.data.error;
        
        // Handle specific error types
        if (errorMessage.includes('email')) {
          setErrors({ email: errorMessage });
        } else {
          setErrors({ general: errorMessage });
        }
      } else {
        setErrors({ general: VALIDATION_MESSAGES.REGISTRATION_FAILED });
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container">
        <div className="card" style={{ maxWidth: '450px', margin: '100px auto', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '24px' }}>✅</div>
          <h2 style={{ color: '#48bb78', marginBottom: '16px' }}>Registration Successful!</h2>
          <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
            Welcome to AI Expense Tracker! Your account has been created successfully.
          </p>
          <p style={{ color: '#666', marginBottom: '32px' }}>
            You can now login with your credentials and start tracking your expenses.
          </p>
          <Link to="/login" className="btn btn-success" style={{ textDecoration: 'none' }}>
            🔑 Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '500px', margin: '50px auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ color: '#667eea', fontSize: '2.5rem', marginBottom: '8px' }}>
            🤖 AI Expense Tracker
          </h1>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '24px' }}>
            Smart expense tracking with AI-powered predictions
          </p>
          <h2 style={{ color: '#333', fontSize: '1.8rem' }}>
            📝 Create Your Account
          </h2>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} noValidate>
          {/* General Error */}
          {errors.general && (
            <div className="alert alert-error" style={{ marginBottom: '20px' }}>
              {errors.general}
            </div>
          )}

          {/* Name Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <input
                type="text"
                name="first_name"
                className={`form-control ${errors.first_name ? 'error' : ''}`}
                placeholder="First Name *"
                value={formData.first_name}
                onChange={handleChange}
                disabled={loading}
                maxLength={50}
                autoComplete="given-name"
              />
              {errors.first_name && (
                <small style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                  {errors.first_name}
                </small>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <input
                type="text"
                name="last_name"
                className={`form-control ${errors.last_name ? 'error' : ''}`}
                placeholder="Last Name *"
                value={formData.last_name}
                onChange={handleChange}
                disabled={loading}
                maxLength={50}
                autoComplete="family-name"
              />
              {errors.last_name && (
                <small style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                  {errors.last_name}
                </small>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="form-group">
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'error' : ''}`}
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              autoComplete="email"
            />
            {errors.email && (
              <small style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                {errors.email}
              </small>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-control ${errors.password ? 'error' : ''}`}
                placeholder="Password *"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                autoComplete="new-password"
                style={{ paddingRight: '50px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
                disabled={loading}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div style={{ marginTop: '8px' }}>
                <div style={{
                  height: '4px',
                  background: '#e2e8f0',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${passwordStrength}%`,
                    background: getPasswordStrengthColor(),
                    transition: 'width 0.3s ease, background-color 0.3s ease'
                  }}></div>
                </div>
                <small style={{ 
                  color: getPasswordStrengthColor(), 
                  fontSize: '0.8rem', 
                  marginTop: '4px', 
                  display: 'block' 
                }}>
                  Password strength: {getPasswordStrengthText()}
                </small>
              </div>
            )}
            
            {errors.password && (
              <small style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                {errors.password}
              </small>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <input
              type={showPassword ? "text" : "password"}
              name="confirm_password"
              className={`form-control ${errors.confirm_password ? 'error' : ''}`}
              placeholder="Confirm Password *"
              value={formData.confirm_password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
            />
            {errors.confirm_password && (
              <small style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                {errors.confirm_password}
              </small>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={loading}
                style={{ marginTop: '2px' }}
              />
              <span style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#555' }}>
                I agree to the{' '}
                <a href="/terms" target="_blank" style={{ color: '#667eea', textDecoration: 'underline' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" target="_blank" style={{ color: '#667eea', textDecoration: 'underline' }}>
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.terms && (
              <small style={{ color: '#e53e3e', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                {errors.terms}
              </small>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: '100%', marginBottom: '20px', fontSize: '16px', padding: '14px' }}
            disabled={loading || !agreedToTerms}
          >
            {loading ? (
              <>
                <span style={{ marginRight: '8px' }}>⏳</span>
                Creating Account...
              </>
            ) : (
              <>
                <span style={{ marginRight: '8px' }}>✨</span>
                Create Account
              </>
            )}
          </button>

          {/* Login Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#666', fontSize: '0.95rem' }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{ 
                  color: '#667eea', 
                  textDecoration: 'underline',
                  fontWeight: '600'
                }}
              >
                Login here
              </Link>
            </p>
          </div>
        </form>

        {/* Features Preview */}
        <div style={{ 
          marginTop: '32px', 
          padding: '20px', 
          background: '#f8fafc', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ color: '#333', marginBottom: '16px', fontSize: '1.1rem' }}>
            🚀 What you'll get:
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '4px 0', color: '#555', fontSize: '0.9rem' }}>
              🤖 AI-powered expense predictions
            </li>
            <li style={{ padding: '4px 0', color: '#555', fontSize: '0.9rem' }}>
              📊 Interactive charts and analytics
            </li>
            <li style={{ padding: '4px 0', color: '#555', fontSize: '0.9rem' }}>
              💰 Smart expense categorization
            </li>
            <li style={{ padding: '4px 0', color: '#555', fontSize: '0.9rem' }}>
              🔒 Secure data encryption
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;

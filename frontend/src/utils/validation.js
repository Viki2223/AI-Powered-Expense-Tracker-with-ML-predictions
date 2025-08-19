import { REGEX_PATTERNS, AUTH_CONSTANTS } from './constants';

export const validateEmail = (email) => {
  return REGEX_PATTERNS.EMAIL.test(email);
};

export const validatePassword = (password) => {
  if (!password || password.length < AUTH_CONSTANTS.MIN_PASSWORD_LENGTH) {
    return false;
  }
  
  if (password.length > AUTH_CONSTANTS.MAX_PASSWORD_LENGTH) {
    return false;
  }
  
  if (AUTH_CONSTANTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    return false;
  }
  
  if (AUTH_CONSTANTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    return false;
  }
  
  if (AUTH_CONSTANTS.REQUIRE_NUMBERS && !/\d/.test(password)) {
    return false;
  }
  
  if (AUTH_CONSTANTS.REQUIRE_SPECIAL_CHARS && !/[!@#$%^&*]/.test(password)) {
    return false;
  }
  
  return true;
};

export const validateName = (name) => {
  return REGEX_PATTERNS.NAME.test(name);
};

export const validateAmount = (amount) => {
  return REGEX_PATTERNS.AMOUNT.test(amount) && parseFloat(amount) > 0;
};

// Enhanced storage manager with robust localStorage handling
class StorageManager {
  constructor() {
    this.isLocalStorageAvailable = this.checkLocalStorageAvailability();
    this.memoryStorage = {};
    this.listeners = [];
    
    console.log('📦 Storage Manager initialized:', {
      localStorageAvailable: this.isLocalStorageAvailable,
      userAgent: navigator.userAgent.substring(0, 50)
    });
    
    // Test storage immediately
    this.performInitialTest();
  }

  checkLocalStorageAvailability() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      const retrieved = localStorage.getItem(test);
      localStorage.removeItem(test);
      
      if (retrieved !== test) {
        throw new Error('localStorage read/write mismatch');
      }
      
      console.log('✅ localStorage is available and working');
      return true;
    } catch (e) {
      console.error('❌ localStorage is not available:', e.message);
      return false;
    }
  }

  performInitialTest() {
    try {
      const testKey = '__storage_manager_test__';
      const testValue = 'test_' + Date.now();
      
      if (this.setItem(testKey, testValue)) {
        const retrieved = this.getItem(testKey);
        if (retrieved === testValue) {
          console.log('✅ Storage manager test passed');
          this.removeItem(testKey);
          return true;
        }
      }
      
      console.error('❌ Storage manager test failed');
      return false;
    } catch (error) {
      console.error('❌ Storage manager test error:', error);
      return false;
    }
  }

  setItem(key, value) {
    try {
      console.log(`💾 Setting ${key}:`, {
        valueType: typeof value,
        valueLength: value?.length || 0,
        timestamp: new Date().toISOString()
      });

      if (this.isLocalStorageAvailable) {
        // Try localStorage first
        localStorage.setItem(key, value);
        
        // Immediate verification
        const stored = localStorage.getItem(key);
        if (stored !== value) {
          throw new Error(`localStorage verification failed for ${key}`);
        }
        
        console.log(`✅ Successfully stored ${key} in localStorage`);
        this.notifyListeners(key, value);
        return true;
      } else {
        // Fallback to memory storage
        this.memoryStorage[key] = value;
        console.log(`✅ Successfully stored ${key} in memory storage`);
        this.notifyListeners(key, value);
        return true;
      }
    } catch (error) {
      console.error(`❌ Failed to store ${key} in localStorage:`, error);
      
      // Try memory storage as fallback
      try {
        this.memoryStorage[key] = value;
        console.log(`✅ Fallback: stored ${key} in memory storage`);
        this.notifyListeners(key, value);
        return true;
      } catch (memoryError) {
        console.error(`❌ Memory storage also failed for ${key}:`, memoryError);
        return false;
      }
    }
  }

  getItem(key) {
    try {
      // Try localStorage first
      if (this.isLocalStorageAvailable) {
        const value = localStorage.getItem(key);
        if (value !== null) {
          console.log(`✅ Retrieved ${key} from localStorage (length: ${value.length})`);
          return value;
        }
      }
      
      // Check memory storage
      if (this.memoryStorage[key] !== undefined) {
        console.log(`✅ Retrieved ${key} from memory storage`);
        return this.memoryStorage[key];
      }
      
      console.log(`ℹ️ No value found for ${key}`);
      return null;
    } catch (error) {
      console.error(`❌ Failed to retrieve ${key}:`, error);
      return null;
    }
  }

  removeItem(key) {
    try {
      if (this.isLocalStorageAvailable) {
        localStorage.removeItem(key);
      }
      delete this.memoryStorage[key];
      console.log(`✅ Removed ${key} from storage`);
      this.notifyListeners(key, null);
    } catch (error) {
      console.error(`❌ Failed to remove ${key}:`, error);
    }
  }

  clear() {
    try {
      if (this.isLocalStorageAvailable) {
        localStorage.clear();
      }
      this.memoryStorage = {};
      console.log('✅ Cleared all storage');
      this.notifyListeners('*', null);
    } catch (error) {
      console.error('❌ Failed to clear storage:', error);
    }
  }

  // Add storage event listeners
  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners(key, value) {
    this.listeners.forEach(callback => {
      try {
        callback(key, value);
      } catch (error) {
        console.error('Storage listener error:', error);
      }
    });
  }

  // Enhanced debugging
  getDebugInfo() {
    const info = {
      localStorageAvailable: this.isLocalStorageAvailable,
      memoryStorageKeys: Object.keys(this.memoryStorage),
      localStorageKeys: [],
      storageTest: null,
      testResults: {}
    };

    try {
      if (this.isLocalStorageAvailable) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
            info.localStorageKeys.push(key);
          }
        }
      }
    } catch (error) {
      info.localStorageError = error.message;
    }

    // Comprehensive storage test
    try {
      const testKey = '__debug_test_comprehensive__';
      const testValue = JSON.stringify({
        timestamp: Date.now(),
        random: Math.random(),
        text: 'Hello World',
        array: [1, 2, 3],
        object: { nested: true }
      });
      
      // Test write
      const writeSuccess = this.setItem(testKey, testValue);
      info.testResults.write = writeSuccess;
      
      if (writeSuccess) {
        // Test read
        const retrieved = this.getItem(testKey);
        const readSuccess = retrieved === testValue;
        info.testResults.read = readSuccess;
        
        // Test parse
        try {
          const parsed = JSON.parse(retrieved);
          info.testResults.parse = !!parsed.timestamp;
        } catch (e) {
          info.testResults.parse = false;
        }
        
        // Clean up
        this.removeItem(testKey);
        
        info.storageTest = (writeSuccess && readSuccess && info.testResults.parse) ? 'PASSED' : 'FAILED';
      } else {
        info.storageTest = 'FAILED';
      }
    } catch (error) {
      info.storageTest = 'ERROR: ' + error.message;
    }

    return info;
  }

  // Token-specific methods
  setToken(token) {
    console.log('🔑 Setting authentication token...');
    const success = this.setItem('token', token);
    if (success) {
      console.log('✅ Token stored successfully');
    } else {
      console.error('❌ Failed to store token');
    }
    return success;
  }

  getToken() {
    const token = this.getItem('token');
    if (token) {
      console.log('🔑 Token retrieved successfully (length:', token.length, ')');
    } else {
      console.log('⚠️ No token found in storage');
    }
    return token;
  }

  removeToken() {
    console.log('🔑 Removing authentication token...');
    this.removeItem('token');
  }

  // User-specific methods
  setUser(userData) {
    console.log('👤 Setting user data...');
    const userString = JSON.stringify(userData);
    const success = this.setItem('user', userString);
    if (success) {
      console.log('✅ User data stored successfully');
    } else {
      console.error('❌ Failed to store user data');
    }
    return success;
  }

  getUser() {
    const userString = this.getItem('user');
    if (userString) {
      try {
        const userData = JSON.parse(userString);
        console.log('👤 User data retrieved successfully:', userData.email);
        return userData;
      } catch (error) {
        console.error('❌ Failed to parse user data:', error);
        this.removeItem('user'); // Remove corrupted data
        return null;
      }
    } else {
      console.log('⚠️ No user data found in storage');
      return null;
    }
  }

  removeUser() {
    console.log('👤 Removing user data...');
    this.removeItem('user');
  }

  // Authentication helper
  clearAuth() {
    console.log('🚪 Clearing all authentication data...');
    this.removeToken();
    this.removeUser();
  }

  hasValidAuth() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }
}

// Create and export singleton instance
const storage = new StorageManager();
export default storage;

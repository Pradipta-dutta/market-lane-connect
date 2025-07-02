
// Authentication context for managing login state across portals
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  // Mock login function - in real app, this would connect to MongoDB API
  const login = async (credentials, type) => {
    // TODO: Replace with actual API call to MongoDB backend
    console.log('Login attempt:', credentials, type);
    
    // Mock authentication logic
    if (type === 'customer') {
      // Simulate OTP verification for customers
      if (credentials.phoneNumber && credentials.otp === '1234') {
        const mockCustomer = { 
          phoneNumber: credentials.phoneNumber, 
          name: 'Mock Customer',
          type: 'customer'
        };
        setUser(mockCustomer);
        setUserType('customer');
        return { success: true, user: mockCustomer };
      }
    } else {
      // Simulate email/password for other user types
      if (credentials.email && credentials.password) {
        const mockUser = {
          id: type === 'admin' ? 'admin1' : type === 'storekeeper' ? 'keeper1' : 'emp1',
          email: credentials.email,
          name: `Mock ${type.charAt(0).toUpperCase() + type.slice(1)}`,
          type: type
        };
        setUser(mockUser);
        setUserType(type);
        return { success: true, user: mockUser };
      }
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
  };

  const value = {
    user,
    userType,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

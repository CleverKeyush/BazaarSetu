import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Demo accounts for testing
      const demoAccounts = {
        'vendor@demo.com': {
          id: 'vendor-1',
          name: 'Ravi Kumar',
          email: 'vendor@demo.com',
          userType: 'vendor',
          company: 'Spice Palace Restaurant'
        },
        'supplier@demo.com': {
          id: 'supplier-1',
          name: 'Sita Sharma',
          email: 'supplier@demo.com',
          userType: 'supplier',
          company: 'Fresh Foods Supply Co.'
        }
      };

      // Check for demo accounts first
      if (demoAccounts[credentials.email]) {
        const demoUser = demoAccounts[credentials.email];
        
        // Validate password and userType
        if ((credentials.email === 'vendor@demo.com' && credentials.password === 'vendor123' && credentials.userType === 'vendor') ||
            (credentials.email === 'supplier@demo.com' && credentials.password === 'supplier123' && credentials.userType === 'supplier')) {
          
          setUser(demoUser);
          localStorage.setItem('user', JSON.stringify(demoUser));
          localStorage.setItem('token', 'demo-token-' + Date.now());
          return { success: true };
        } else {
          return { success: false, error: 'Invalid credentials' };
        }
      }

      // Try backend API
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      // Fallback to demo mode for any email
      console.warn('Backend not available, using demo mode');
      const mockUser = {
        id: Date.now().toString(),
        name: credentials.email.split('@')[0],
        email: credentials.email,
        userType: credentials.userType,
        company: 'Demo Company'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'demo-token-' + Date.now());
      return { success: true };
    }
  };

  const register = async (userData) => {
    try {
      // Try backend API first
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      // Fallback to demo mode if backend is not running
      console.warn('Backend not available, using demo mode for registration');
      const mockUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        userType: userData.userType,
        company: userData.company
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'demo-token-' + Date.now());
      return { success: true };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
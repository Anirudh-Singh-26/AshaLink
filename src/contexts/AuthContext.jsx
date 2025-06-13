
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock database of users for demo purposes
const mockUsers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    phone: '+1234567890',
    email: 'dr.sarah@ashalink.com',
    password: 'doctor123',
    role: 'doctor',
    specialization: 'Obstetrics & Gynecology'
  },
  {
    id: '2',
    name: 'Admin User',
    phone: '+1234567891',
    email: 'admin@ashalink.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: '3',
    name: 'Jane Doe',
    phone: '+1234567892',
    email: 'jane.doe@example.com',
    password: 'patient123',
    role: 'patient',
    age: 28,
    location: 'New York',
    pregnancyDuration: 20
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('ashalink_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?[\d\s-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const login = async (credentials) => {
    try {
      // Validate input
      if (!credentials.email || !credentials.password) {
        return { success: false, error: 'Email and password are required' };
      }

      if (!validateEmail(credentials.email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      if (!validatePassword(credentials.password)) {
        return { success: false, error: 'Password must be at least 6 characters long' };
      }

      // Find user in mock database
      const foundUser = mockUsers.find(
        u => u.email.toLowerCase() === credentials.email.toLowerCase() && 
             u.password === credentials.password
      );

      if (!foundUser) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Remove password from user object before storing
      const { password, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('ashalink_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: 'An error occurred during login' };
    }
  };

  const register = async (userData) => {
    try {
      // Validate required fields
      if (!userData.name || !userData.email || !userData.password || !userData.phone) {
        return { success: false, error: 'All fields are required' };
      }

      if (!validateEmail(userData.email)) {
        return { success: false, error: 'Please enter a valid email address' };
      }

      if (!validatePhone(userData.phone)) {
        return { success: false, error: 'Please enter a valid phone number' };
      }

      if (!validatePassword(userData.password)) {
        return { success: false, error: 'Password must be at least 6 characters long' };
      }

      // Check if user already exists
      const existingUser = mockUsers.find(
        u => u.email.toLowerCase() === userData.email.toLowerCase()
      );

      if (existingUser) {
        return { success: false, error: 'An account with this email already exists' };
      }

      // Role-specific validation
      if (userData.role === 'patient') {
        if (!userData.age || !userData.location || !userData.pregnancyDuration) {
          return { success: false, error: 'Age, location, and pregnancy duration are required for patients' };
        }
        if (userData.age < 13 || userData.age > 60) {
          return { success: false, error: 'Please enter a valid age between 13 and 60' };
        }
        if (userData.pregnancyDuration < 1 || userData.pregnancyDuration > 42) {
          return { success: false, error: 'Pregnancy duration must be between 1 and 42 weeks' };
        }
      }

      if (userData.role === 'doctor' && !userData.specialization) {
        return { success: false, error: 'Specialization is required for doctors' };
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        role: userData.role || 'patient'
      };

      // Remove password before storing in state
      const { password, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('ashalink_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: 'An error occurred during registration' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ashalink_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

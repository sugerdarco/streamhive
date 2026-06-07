import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser as loginApi, registerUser as registerApi, logoutUser as logoutApi } from '../services/authService';
import { getCurrentUser } from '../services/userService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setLoading(false);
        return;
      }
      const { data } = await getCurrentUser();
      setUser(data.data);
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (credentials) => {
    const { data } = await loginApi(credentials);
    const { accessToken, refreshToken, user: loggedInUser } = data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setUser(loggedInUser);
    setIsAuthenticated(true);
    return loggedInUser;
  };

  const register = async (formData) => {
    const { data } = await registerApi(formData);
    return data.data;
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch {
      // ignore
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const refreshUser = async () => {
    try {
      const { data } = await getCurrentUser();
      setUser(data.data);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

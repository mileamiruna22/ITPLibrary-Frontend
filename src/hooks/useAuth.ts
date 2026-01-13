import { useState } from 'react';
import { loginUserApi, type LoginPayload, type LoginResponse } from '../api/authApi';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<LoginResponse | null>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('authToken');
  });

  const login = async (payload: LoginPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setIsLoggedIn(false);
    setUserData(null);

    try {

      const data = await loginUserApi(payload);
      localStorage.setItem('authToken', data.token);
      setIsLoggedIn(true);
      setUserData(data);
      return true;

    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserData(null);
    window.location.href = '/login';
  };

  return { login, logout, loading, error, isLoggedIn, userData };
};
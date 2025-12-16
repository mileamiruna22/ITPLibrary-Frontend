import { useState } from 'react';

interface LoginPayload {
  userEmail: string;
  password: string;
}

interface LoginResponse {
  token: string;
  userId: string;
}

const API_LOGIN_URL = 'https://localhost:7069/api/login';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_LOGIN_ENDPOINT = '/api/login';
// const API_LOGIN_URL = `${API_BASE_URL}${API_LOGIN_ENDPOINT}`;

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
      const response = await fetch(API_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();

        localStorage.setItem('authToken', data.token);

        setIsLoggedIn(true);
        setUserData(data);
        return true;
      } 

        let errorMessage = 'Login failed.';
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}.`;
        }
        setError(errorMessage);
        return false;
      
    } catch (err) {
      console.error('Network error during login:', err);
      setError('Could not contact server. Check your connection.');
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

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  loginUserApi,
  logoutUserApi,
  checkAuthStatusApi,
  type LoginPayload,
  type LoginResponse
} from '../api/authApi';
import { Loading } from '../components/Loading';

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  userData: LoginResponse | null;
  login: (payload: LoginPayload) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<LoginResponse | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await checkAuthStatusApi();
        setUserData(data);
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (payload: LoginPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginUserApi(payload);
      setIsLoggedIn(true);
      setUserData(data);
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setIsLoggedIn(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUserApi();
    } catch {
      // silent fail
    }
    setIsLoggedIn(false);
    setUserData(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ login, logout, loading, error, isLoggedIn, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
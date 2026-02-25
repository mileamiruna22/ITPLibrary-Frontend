import { useState } from 'react';

interface RegisterPayload {
  userEmail: string;
  password: string;
  confirmedPassword: string;
}

const API_REGISTER_URL = `${import.meta.env.VITE_API_BASE_URL}/register`;

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (payload: RegisterPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return true;
      }

      let errorMessage = `Error at registration (Status: ${response.status}).`;

      try {
        const errorData = await response.json();
        if (response.status === 409) {
          errorMessage = errorData.message || 'A user with this email already exists.';
        } else {
          errorMessage = errorData.message || errorData.error || errorMessage;
        }
      } catch {
        errorMessage = response.status === 404
          ? 'API registration route not found.'
          : `Server error: ${response.status} ${response.statusText}.`;
      }

      setError(errorMessage);
      return false;
    } catch {
      setError('Network error. Check your API connection.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
import { useState } from 'react';

interface RegisterPayload {
  userEmail: string;
  password: string;
  confirmedPassword: string;
}

const API_REGISTER_URL = 'https://localhost:7069/api/register';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_REGISTER_ENDPOINT = '/api/register';
// const API_REGISTER_URL = `${API_BASE_URL}${API_REGISTER_ENDPOINT}`;

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (payload: RegisterPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return true;
      } else {
        let errorMessage = `Error at registration (Status: ${response.status}).`;
        try {
          const errorData = await response.json();

          if (response.status === 409) {
            errorMessage =
              errorData.message || 'A user with this email already exists.';
          } else {
            errorMessage = errorData.message || errorData.error || errorMessage;
          }
        } catch (e) {
          if (response.status === 404) {
            errorMessage = `API registration route (${API_REGISTER_URL}) not found.`;
          } else {
            errorMessage = `Server error: ${response.status} ${response.statusText}. Could not read error response.`;
          }
        }
        setError(errorMessage);
        return false;
      }
    } catch (err) {
      console.error('Network error during registration:', err);
      setError('Network error. Check your API connection.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

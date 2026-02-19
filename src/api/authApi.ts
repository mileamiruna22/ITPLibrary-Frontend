export interface LoginPayload {
  userEmail: string;
  password: string;
}

export interface LoginResponse {
  message: string; // Backend acum returnează message în loc de token
}

const API_BASE_URL = 'https://localhost:7069/api';
// const apiUrl = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = `${apiUrl}/api`;

export const loginUserApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // IMPORTANT! Trimite și primește cookies
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data: LoginResponse = await response.json();
      // Cookie-ul e setat automat de browser!
      return data;
    } else {
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
     
      throw new Error(errorMessage);
    }
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Could not contact server. Check your connection.');
  }
};

export const logoutUserApi = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include', // Trimite cookie-ul
    });

    if (!response.ok) {
      throw new Error('Logout failed.');
    }
    // Cookie-ul e șters automat de backend
  } catch (err) {
    console.error('Logout error:', err);
    throw err;
  }
};

export const checkAuthStatusApi = async (): Promise<LoginResponse> => {
  try {
    const response = await fetch(`https://localhost:7069/api/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // <--- FOARTE IMPORTANT: Trimite cookie-ul la server
    });

    if (response.ok) {
      // Dacă e ok, serverul ne dă datele userului
      return await response.json();
    } else {
      // Dacă nu, înseamnă că a expirat sesiunea
      throw new Error('Not authenticated');
    }
  } catch (error) {
    throw error;
  }
};
// Helper function pentru request-uri autentificate
export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include', // Trimite cookie-ul automat
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};
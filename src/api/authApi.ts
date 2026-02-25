export interface LoginPayload {
  userEmail: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUserApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return await response.json();
    }

    let errorMessage = 'Login failed.';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      errorMessage = `Server error: ${response.status} ${response.statusText}.`;
    }

    throw new Error(errorMessage);
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error('Could not contact server. Check your connection.');
  }
};

export const logoutUserApi = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed.');
  }
};

export const checkAuthStatusApi = async (): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  return await response.json();
};

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};
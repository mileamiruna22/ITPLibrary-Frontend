export interface LoginPayload {
  userEmail: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
}

const API_BASE_URL = 'https://localhost:7069/api/login';
// const apiUrl = import.meta.env.VITE_API_BASE_URL;
// const API_BASE_URL = `${apiUrl}/api/login`;

export const loginUserApi = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data: LoginResponse = await response.json();
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
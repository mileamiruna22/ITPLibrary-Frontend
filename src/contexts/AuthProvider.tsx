import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
// IMPORTANT: Asigură-te că ai adăugat 'checkAuthStatusApi' în fișierul authApi.ts așa cum am discutat!
import { 
  loginUserApi, 
  logoutUserApi, 
  checkAuthStatusApi, 
  type LoginPayload, 
  type LoginResponse 
} from '../api/authApi';

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  userData: LoginResponse | null;
  login: (payload: LoginPayload) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Hook-ul custom pentru a folosi contextul
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 1. Pornim cu loading TRUE. 
  // Asta înseamnă că "tragem cortina" peste site până verificăm cookie-ul.
  const [loading, setLoading] = useState(true); 
  
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<LoginResponse | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 2. Acest useEffect rulează DOAR o dată, când dai refresh la pagină sau intri pe site.
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Încercăm să luăm datele utilizatorului de la server (folosind cookie-ul existent)
        const data = await checkAuthStatusApi();
        
        // Dacă nu a dat eroare, înseamnă că suntem logați
        setUserData(data);
        setIsLoggedIn(true);
      } catch (err) {
        // Dacă a dat eroare (401), înseamnă că sesiunea a expirat sau nu există
        setIsLoggedIn(false);
        setUserData(null);
      } finally {
        // INDIFERENT de rezultat, am terminat verificarea.
        // Acum putem seta loading pe false și să afișăm site-ul.
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Funcția de Login (folosită în pagina de Login)
  const login = async (payload: LoginPayload): Promise<boolean> => {
    setLoading(true); // Afișăm loading cât timp face request-ul
    setError(null);

    try {
      const data = await loginUserApi(payload);
      
      // Succes
      setIsLoggedIn(true);
      setUserData(data);
      return true;
    } catch (err: any) {
      // Eroare
      setError(err.message || 'An unexpected error occurred.');
      setIsLoggedIn(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Funcția de Logout (folosită în Navbar)
  const logout = async () => {
    try {
        // Cerem serverului să șteargă cookie-ul
        await logoutUserApi();
    } catch (e) {
        console.error("Logout error", e);
    }
    // Curățăm starea locală
    setIsLoggedIn(false);
    setUserData(null);
    // Opțional: Poți face reload sau redirect aici dacă e nevoie
  };

  // 3. Randarea condițională:
  // Dacă încă verificăm cine e utilizatorul, afișăm un text simplu sau un spinner.
  // Astfel utilizatorul nu vede "Login" pentru o secundă și apoi "Logout".
  if (loading) {
    return (
      <div style={{
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        fontSize: '1.2rem',
        color: '#555'
      }}>
        Se încarcă sesiunea...
      </div>
    );
  }

  // Când loading e false, afișăm aplicația normală
  return (
    <AuthContext.Provider value={{ login, logout, loading, error, isLoggedIn, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
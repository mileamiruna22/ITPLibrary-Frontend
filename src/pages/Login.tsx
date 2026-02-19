import React, { useState, type FormEvent, useEffect } from 'react';
import layoutStyles from '../styles/layout/Layout.module.scss';
import registerStyles from './Register.module.scss';
import loginStyles from './Login.module.scss';
import formStyles from './Form.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { useAuth } from '../contexts/AuthProvider';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  
  const { login, loading, error, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // Validare câmpuri - FĂRĂ validare regex pentru email
  const validateField = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      if (!value.trim()) return 'Email/Username is required'; // Schimbat mesajul
    }
    if (field === 'password') {
      if (!value.trim()) return 'Password is required';
    }
    return '';
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched({ ...touched, [field]: true });
    const value = field === 'email' ? email : password;
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setTouched({ email: true, password: true });
      return;
    }

    const success = await login({ userEmail: email, password: password });

    if (success) {
      console.log('Login successful!');
      navigate('/'); 
    }
  };

  return (
    <main className={`${layoutStyles.contentWrapper}`}>
      <section className={`${registerStyles.registerSection}`}>
        <div className={`${registerStyles.registerImage}`}>
          <img
            src="https://images.pexels.com/photos/11836671/pexels-photo-11836671.jpeg"
            alt="Bookshelf with lights"
          />
        </div>

        <div className={`${registerStyles.registerFormContainer}`}>
          <h1 className={`${registerStyles.registerTitle}`}>Log in</h1>
          <p>Use a local account to log in.</p>
          
          {error && (
            <div className={`${registerStyles.errorMessage}`}>{error}</div>
          )}

          <form onSubmit={handleLogin}>
            {/* EMAIL */}
            <div className={formStyles.formGroup}>
              <label htmlFor="email">Email or Username</label> {/* ← Schimbat label */}
              <input
                type="text" 
                id="email"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className={touched.email && errors.email ? formStyles.inputError : ''}
                disabled={loading}
              />
              {touched.email && errors.email && (
                <span className={formStyles.errorMessage}>{errors.email}</span>
              )}
            </div>

            {/* PASSWORD */}
            <div className={formStyles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                className={touched.password && errors.password ? formStyles.inputError : ''}
                disabled={loading}
              />
              {touched.password && errors.password && (
                <span className={formStyles.errorMessage}>{errors.password}</span>
              )}
            </div>

            {/* REMEMBER ME */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me?
              </label>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </div>

            {/* LINKS */}
            <div className={`${loginStyles.loginLinks}`}>
              <a href="#" className={`${loginStyles.loginLink}`}>
                Forgot your password?
              </a>
            </div>
            <div className={`${loginStyles.loginLinks}`}>
              <Link to="/register" className={`${loginStyles.loginLink}`}>
                Register as new user
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
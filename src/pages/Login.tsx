import React, { useState, type FormEvent, useEffect } from 'react';
import layoutStyles from '../styles/layout/Layout.module.scss';
import registerStyles from './Register.module.scss';
import loginStyles from './Login.module.scss';
import formStyles from './Form.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { useAuth } from '../contexts/AuthProvider';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ username?: boolean; password?: boolean }>({});

  const { login, loading, error, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const validateField = (field: 'username' | 'password', value: string) => {
    if (field === 'username' && !value.trim()) return 'Username is required';
    if (field === 'password' && !value.trim()) return 'Password is required';
    return '';
  };

  const handleBlur = (field: 'username' | 'password') => {
    setTouched({ ...touched, [field]: true });
    const value = field === 'username' ? username : password;
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const handleChange = (field: 'username' | 'password', value: string) => {
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);

    if (touched[field]) {
      setErrors({ ...errors, [field]: validateField(field, value) });
    }
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const usernameError = validateField('username', username);
    const passwordError = validateField('password', password);

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError });
      setTouched({ username: true, password: true });
      return;
    }

    const success = await login({ userEmail: username, password });
    if (success) navigate('/');
  };

  return (
    <main className={layoutStyles.contentWrapper}>
      <section className={registerStyles.registerSection}>
        <div className={registerStyles.registerImage}>
          <img
            src="https://images.pexels.com/photos/11836671/pexels-photo-11836671.jpeg"
            alt="Bookshelf with lights"
          />
        </div>

        <div className={registerStyles.registerFormContainer}>
          <h1 className={registerStyles.registerTitle}>Log in</h1>
          <p>Use a local account to log in.</p>

          {error && <div className={registerStyles.errorMessage}>{error}</div>}

          <form onSubmit={handleLogin}>
            <div className={formStyles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => handleChange('username', e.target.value)}
                onBlur={() => handleBlur('username')}
                className={touched.username && errors.username ? formStyles.inputError : ''}
                disabled={loading}
              />
              {touched.username && errors.username && (
                <span className={formStyles.errorMessage}>{errors.username}</span>
              )}
            </div>

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

            <div className={loginStyles.rememberMe}>
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me?
              </label>
            </div>

            <div>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
              </Button>
            </div>

            <div className={loginStyles.loginLinks}>
              <a href="#" className={loginStyles.loginLink}>
                Forgot your password?
              </a>
            </div>
            <div className={loginStyles.loginLinks}>
              <Link to="/register" className={loginStyles.loginLink}>
                Register as new user
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
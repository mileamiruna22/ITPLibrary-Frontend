import React, { useState, type FormEvent, useEffect } from 'react';
import layoutStyles from '../styles/layout/Layout.module.scss';
import registerStyles from './Register.module.scss';
import loginStyles from './Login.module.scss';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, loading, error, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    const success = await login({ userEmail: email, password: password });

    if (success) {
      console.log('Login successful!');
      window.location.href = '/';
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

          <form
            className={`${registerStyles.registerFormContainer}`}
            onSubmit={handleLogin}
          >
            <h3>Email</h3>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <h3>Password</h3>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
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
              <button
                type="submit"
                className={`${registerStyles.btnRegister}`}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>

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

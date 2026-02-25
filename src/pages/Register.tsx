import React, { useState, type FormEvent } from 'react';
import layoutStyles from '../styles/layout/Layout.module.scss';
import registerStyles from './Register.module.scss';
import formStyles from './Form.module.scss';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';

export const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [touched, setTouched] = useState<{
    username?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const { register, loading, error } = useRegister();
  const navigate = useNavigate();

  const validateField = (
    field: 'username' | 'password' | 'confirmPassword',
    value: string
  ) => {
    if (field === 'username' && !value.trim()) return 'Username is required';
    if (field === 'password' && !value.trim()) return 'Password is required';
    if (field === 'confirmPassword') {
      if (!value.trim()) return 'Please confirm your password';
      if (value !== password) return 'Passwords do not match';
    }
    return '';
  };

  const handleBlur = (field: 'username' | 'password' | 'confirmPassword') => {
    setTouched({ ...touched, [field]: true });
    let value = '';
    if (field === 'username') value = username;
    if (field === 'password') value = password;
    if (field === 'confirmPassword') value = confirmPassword;
    setErrors({ ...errors, [field]: validateField(field, value) });
  };

  const handleChange = (
    field: 'username' | 'password' | 'confirmPassword',
    value: string
  ) => {
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);

    if (touched[field]) {
      setErrors({ ...errors, [field]: validateField(field, value) });
    }

    if (field === 'password' && touched.confirmPassword && confirmPassword) {
      setErrors({ ...errors, confirmPassword: confirmPassword !== value ? 'Passwords do not match' : '' });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const usernameError = validateField('username', username);
    const passwordError = validateField('password', password);
    const confirmPasswordError = validateField('confirmPassword', confirmPassword);

    if (usernameError || passwordError || confirmPasswordError) {
      setErrors({ username: usernameError, password: passwordError, confirmPassword: confirmPasswordError });
      setTouched({ username: true, password: true, confirmPassword: true });
      return;
    }

    const success = await register({
      userEmail: username,
      password,
      confirmedPassword: confirmPassword,
    });

    if (success) {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
      setTouched({});
      setTimeout(() => navigate('/login'), 500);
    }
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
          <h1 className={registerStyles.registerTitle}>Register</h1>
          <p>Create a new account</p>

          {error && <div className={registerStyles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit}>
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

            <div className={formStyles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                className={touched.confirmPassword && errors.confirmPassword ? formStyles.inputError : ''}
                disabled={loading}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <span className={formStyles.errorMessage}>{errors.confirmPassword}</span>
              )}
            </div>

            <div className={registerStyles.formActions}>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
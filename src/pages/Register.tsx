import React, { useState, type FormEvent } from 'react';
import layoutStyles from '../styles/layout/Layout.module.scss';
import registerStyles from './Register.module.scss';
import formStyles from './Form.module.scss';
import { useRegister } from '../hooks/useRegister';
import { useNavigate } from 'react-router-dom'; // ← ADAUGĂ
import { Button } from '../components';

export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const { register, loading } = useRegister();
  const navigate = useNavigate(); // ← ADAUGĂ

  const validateField = (
    field: 'email' | 'password' | 'confirmPassword',
    value: string
  ) => {
    if (field === 'email') {
      if (!value.trim()) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
    }
    if (field === 'password') {
      if (!value.trim()) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
    }
    if (field === 'confirmPassword') {
      if (!value.trim()) return 'Please confirm your password';
      if (value !== password) return 'Passwords do not match';
    }
    return '';
  };

  const handleBlur = (field: 'email' | 'password' | 'confirmPassword') => {
    setTouched({ ...touched, [field]: true });
    let value = '';
    if (field === 'email') value = email;
    if (field === 'password') value = password;
    if (field === 'confirmPassword') value = confirmPassword;
    
    const error = validateField(field, value);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (
    field: 'email' | 'password' | 'confirmPassword',
    value: string
  ) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
    
    if (field === 'password' && touched.confirmPassword && confirmPassword) {
      const confirmError = confirmPassword !== value ? 'Passwords do not match' : '';
      setErrors({ ...errors, confirmPassword: confirmError });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);
    const confirmPasswordError = validateField('confirmPassword', confirmPassword);

    if (emailError || passwordError || confirmPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      setTouched({ email: true, password: true, confirmPassword: true });
      return;
    }

    const success = await register({
      userEmail: email,
      password: password,
      confirmedPassword: confirmPassword,
    });

    if (success) {
      console.log('Registration successful!');
      // Resetează formularul
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
      setTouched({});
      
      // REDIRECT pe login după 500ms pentru feedback vizual
      setTimeout(() => {
        navigate('/login');
      }, 500);
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
          <h1 className={`${registerStyles.registerTitle}`}>Register</h1>
          <p>Create a new account</p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className={formStyles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
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

            {/* CONFIRM PASSWORD */}
            <div className={formStyles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                className={
                  touched.confirmPassword && errors.confirmPassword
                    ? formStyles.inputError
                    : ''
                }
                disabled={loading}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <span className={formStyles.errorMessage}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div className={`${registerStyles.formActions}`}>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};
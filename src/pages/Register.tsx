import React, { useState, type FormEvent } from 'react';
import layoutStyles from '../styles/layout/Layout.module.scss';
import registerStyles from '../styles/components/Register.module.scss';
import { useRegister } from '../hooks/useRegister';

export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register } = useRegister();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
      return;
    }

    const success = await register({
      userEmail: email,
      password: password,
      confirmedPassword: confirmPassword,
    });

    if (success) {
      console.log('Registration successful!');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
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

          <form
            className={`${registerStyles.registerForm}`}
            onSubmit={handleSubmit}
          >
            <h3>Email</h3>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              />
            </div>

            <h3>Confirm Password</h3>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className={`${registerStyles.formActions}`}>
              <button type="submit" className={`${registerStyles.btnRegister}`}>
                Register
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

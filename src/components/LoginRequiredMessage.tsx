import { Link } from 'react-router-dom';
import layoutStyles from '../styles/layout/Layout.module.scss';
import styles from '../styles/components/LoginRequiredMessage.module.scss';

interface LoginRequiredMessageProps {
  title?: string;
  message?: string;
  buttonText?: string;
}

export const LoginRequiredMessage = ({
  title = 'Please log in first',
  message = 'You need to be logged in to view this page.',
  buttonText = 'Go to Login',
}: LoginRequiredMessageProps) => {
  return (
    <main className={layoutStyles.contentWrapper}>
      <section className={styles.guestMessageContainer}>
        <h2>{title}</h2>
        <p>{message}</p>

        <Link to="/login" className={styles.btnLoginRedirect}>
          {buttonText}
        </Link>
      </section>
    </main>
  );
};
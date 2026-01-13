import layoutStyles from '../styles/layout/Layout.module.scss';
import styles from './LoginRequiredMessage.module.scss';
import { Button } from './Button';

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

        <Button to="/login" variant="request">
          {buttonText}
        </Button>
      </section>
    </main>
  );
};
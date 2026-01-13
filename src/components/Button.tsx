import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

interface BaseButtonProps {
  variant?: 'primary' | 'outline' | 'BookCard' | 'request';
}

type ButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = BaseButtonProps & React.ComponentProps<typeof Link>;

type ButtonComponentProps = ButtonProps | LinkButtonProps;

export const Button: React.FC<ButtonComponentProps> = (props) => {
  const { variant = 'primary', children, ...rest } = props as any;
  const combinedClasses = `${styles.button} ${styles[variant]}`;

  if ('to' in props) {
    return (
      <Link className={combinedClasses} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...rest}>
      {children}
    </button>
  );
};
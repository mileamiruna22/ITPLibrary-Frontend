import React from 'react';
import styles from './CartBadge.module.scss';

interface CartBadgeProps {
  count: number;
}

export const CartBadge: React.FC<CartBadgeProps> = ({ count }) => {
  if (count === 0) return null;

  const displayCount = count > 10 ? '10+' : count;

  return (
    <span className={styles.cartBadge}>
      {displayCount}
    </span>
  );
};
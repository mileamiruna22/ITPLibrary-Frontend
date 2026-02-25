import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useAuth } from '../contexts/AuthProvider';
import { useCart } from '../hooks/useCart';
import { CartBadge } from './CartBadge';
import { useQueryClient } from '@tanstack/react-query';

interface NavLink {
  name: string;
  href: string;
  iconSrc: string;
  showBadge?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { name: 'HOME', href: '/', iconSrc: 'iconHome.png' },
  { name: 'SHOPPING CART', href: '/shoppingcart', iconSrc: 'iconShopping.jpg', showBadge: true },
  { name: 'ORDERS', href: '/orders', iconSrc: 'iconOrders.jpg' },
];

export const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const totalItems = isLoggedIn
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const handleLogout = async () => {
    await logout();
    queryClient.removeQueries({ queryKey: ['cart'] });
    navigate('/');
  };

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.mainNavList}>
        {NAV_LINKS.map((link) => (
          <li key={link.name}>
            <Link to={link.href} className={styles.navLink}>
              <span className={styles.iconWrapper}>
                <img
                  src={link.iconSrc}
                  className={styles.logoIconMenu}
                  alt={`${link.name} Icon`}
                />
                {link.showBadge && <CartBadge count={totalItems} />}
              </span>
              {link.name}
            </Link>
          </li>
        ))}

        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className={`${styles.navLink} ${styles.logoutButton}`}>
              <img src="iconLogout.jpg" className={styles.logoIconMenu} alt="Logout Icon" />
              LOGOUT
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" className={styles.navLink}>
              <img src="iconLogin.jpg" className={styles.logoIconMenu} alt="Login Icon" />
              LOGIN
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
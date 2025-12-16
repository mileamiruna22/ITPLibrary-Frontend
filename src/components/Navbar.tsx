import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/layout/Navbar.module.scss';
import { useAuth } from '../hooks/useAuth';

const NAV_LINKS = [
  { name: 'HOME', href: '/', iconSrc: 'iconHome.png' },
  { name: 'SHOPPING CART', href: '/shoppingcart', iconSrc: 'iconShopping.jpg' },
  { name: 'ORDERS', href: '/orders', iconSrc: 'iconOrders.jpg' },
];

export const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.mainNavList}>
        {NAV_LINKS.map((link) => (
          <li key={link.name}>
            <Link to={link.href} className={styles.navLink}>
              <img
                src={link.iconSrc}
                className={styles.logoIconMenu}
                alt={`${link.name} Icon`}
              />
              {link.name}
            </Link>
          </li>
        ))}

        {isLoggedIn ? (
          <li>
            <button
              onClick={handleLogout}
              className={styles.navLink}
              style={{
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
              }}
            >
              <img
                src="iconLogout.jpg"
                className={styles.logoIconMenu}
                alt="Logout Icon"
              />
              LOGOUT
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login" className={styles.navLink}>
              <img
                src="iconLogin.jpg"
                className={styles.logoIconMenu}
                alt="Login Icon"
              />
              LOGIN
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

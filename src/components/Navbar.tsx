import React from 'react';
import styles from '../styles/layout/Navbar.module.scss';

const NAV_LINKS = [
  { name: 'HOME', href: '/', iconSrc: 'iconHome.png' },
  { name: 'SHOPPING CART', href: '/shoppingcart', iconSrc: 'iconShopping.jpg' },
  { name: 'ORDERS', href: '/orders', iconSrc: 'iconOrders.jpg' },
  { name: 'LOGIN', href: '/login', iconSrc: 'iconLogin.jpg' },
];

export const Navbar: React.FC = () => {
  return (
    <nav className={styles.mainNav}>
      <ul className={styles.mainNavList}>
        {NAV_LINKS.map((link) => (
          <li key={link.name}>
            <a href={link.href} className={styles.navLink}>
              <img
                src={link.iconSrc}
                className={styles.logoIconMenu}
                alt={`${link.name} Icon`}
              />
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

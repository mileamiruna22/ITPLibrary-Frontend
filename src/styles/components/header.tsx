import React from 'react';

const NAV_LINKS = [
  { name: 'HOME', href: '/home', iconSrc: 'public/iconHome.png' },
  { name: 'SHOPPING CART', href: '/cart', iconSrc: 'public/iconShopping.jpg' },
  { name: 'ORDERS', href: '/orders', iconSrc: 'public/iconOrders.jpg' },
  { name: 'LOGIN', href: '/login', iconSrc: 'public/iconLogin.jpg' },
];


type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="main-header">
      <div className="content-wrapper header-flex">
        <div className="logo">
          <img 
            src="public/logoITP.jpg" 
            className="logo-icon" 
            alt="ITP Library Logo"
          />
          ITP Library
        </div>

        
        <nav className="main-nav">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link"> 
                  <img 
                    src={link.iconSrc} 
                    className="logo-icon-menu"
                    alt={`${link.name} Icon`}
                  />
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
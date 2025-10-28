import React from 'react';

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="main-footer">
      <div className="content-wrapper footer-flex">
        <div className="footer-content">
          <p>
            &copy; Copyright 
            <a href="https://www.itperspectives.ro/" target="_blank" rel="noopener noreferrer">
              IT Perspectives
            </a>
          </p> 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
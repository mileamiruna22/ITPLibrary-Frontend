import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import { ScrollToTop } from './pages/ScrollToTop.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
    <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

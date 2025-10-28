import React from 'react';
import Header from './styles/components/header';
import Footer from './styles/components/footer';
import HomePage from './pages/HomePage';


function App() {
  return (
    <>
      <Header />
      <main> 
        <HomePage />
      </main>
      <Footer />
    </>
  );
}

export default App;
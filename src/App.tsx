import React from 'react';
import Header from './components/header';
import Footer from './components/footer';
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
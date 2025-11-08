import { Footer, Header } from './components';
import { HomePage } from './pages/HomePage';


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
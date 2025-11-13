import { Footer, Header } from './components';
import { HomePage } from './pages/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/main.scss';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main> 
        <HomePage />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
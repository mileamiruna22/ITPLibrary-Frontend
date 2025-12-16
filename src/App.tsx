import { Routes, Route } from 'react-router-dom';
import { Footer, Header } from './components';
import { HomePage } from './pages/HomePage';
import { Login } from './pages/Login';
import { ShoppingCart } from './pages/ShoppingCart';
import { BookDetails } from './pages/BookDetails';
import { Register } from './pages/Register';
import './styles/main.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Orders } from './pages/Orders';
import { OrderDetails } from './pages/OrdersDetails';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/shoppingcart" element={<ShoppingCart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders-details" element={<OrderDetails />} />
        </Routes>

        <Footer />
    </QueryClientProvider>
  );
}

export default App;

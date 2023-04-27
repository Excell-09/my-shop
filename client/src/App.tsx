import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Wishlist from './pages/wishlist';
import Checkout from './pages/checkout';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/wishlist' Component={Wishlist} />
        <Route path='/checkout' Component={Checkout} />
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Wishlist from './pages/wishlist';
import Checkout from './pages/checkout';
import Login from './pages/login';
import Register from './pages/register';
import DetailProduct from './pages/detailProduct';
import FailurePayment from './pages/failurPayment';
import SuccessPayment from './pages/successPayment';
import ProtectRoute from './utils/ProtectRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/product/:id' Component={DetailProduct} />
        <Route path='/wishlist' Component={Wishlist} />
        <Route path='/checkout' Component={Checkout} />
        <Route
          path='/login'
          element={
            <ProtectRoute>
              <Login />
            </ProtectRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectRoute>
              <Register />
            </ProtectRoute>
          }
        />
        <Route path='/payment'>
          <Route path='success' Component={SuccessPayment} />
          <Route path='failure' Component={FailurePayment} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

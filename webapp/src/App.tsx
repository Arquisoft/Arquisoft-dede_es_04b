import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Carrito from './components/Carrito/Carrito';
import DetalleProducto from './pages/DetalleProducto';
import CheckOut from './pages/CheckOut';
import { SessionProvider } from '@inrupt/solid-ui-react';
import LogOut from './components/LogOut/LogOut';
import Pedidos from './pages/Pedidos';
import SignUp from './pages/SignUp';
import PrivateRoute from './routers/PrivateRoute';
import Subcategoria from './pages/Subcategoria';
import PublicRoute from './routers/PublicRoute';
import VerPedido from './pages/VerPedido';

export const isLogeado = (): boolean => {
  return getToken() != null;
}

function getToken(): string | null {
  const userSessionStr = sessionStorage.getItem('userSession');
  if (userSessionStr != null) {
    const userSession = JSON.parse(userSessionStr);
    return userSession.token;
  }
  return null;
}

export const getPodSession = () => {
  const item = sessionStorage.getItem("podSession");
  if (item != null)
    return JSON.parse(item);
  return null;
}

function App(): JSX.Element {



  return (
    <SessionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/productos/categorias/:sub_category" element={<Subcategoria />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/productos" element={<Catalogo />} />

          {/* Ventanas que necesitan estar logeado */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/pedidos/:id" element={<VerPedido />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/logout" element={<LogOut />} />
          </Route>

          {/* Ventanas que hay que estar sin logear */}
          <Route path="/" element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
          
          <Route path="*" element={<h1>Error 404: Página no existe</h1>}/>
        </Routes>
      </BrowserRouter>
    </SessionProvider>

  );
}

export default App;

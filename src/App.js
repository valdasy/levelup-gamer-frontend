// src/App.js
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Páginas
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminRoutes from './pages/AdminRoutes';

// Páginas de órdenes/boletas
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';

// Datos y utils
import { PRODUCTS, CATEGORIES, DUOC_EMAIL_DOMAIN, DUOC_DISCOUNT } from './utils/constants';
import { isDuocEmail } from './utils/validators';

function App() {
  // Estado global
  const [products, setProducts] = useState(PRODUCTS);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  // Órdenes (persistencia local)
  const [orders, setOrders] = useState(() => {
    try {
      const raw = localStorage.getItem('orders');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Carrito
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex((it) => it.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity };
        return copy;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) =>
      prev
        .map((it) => (it.id === productId ? { ...it, quantity } : it))
        .filter((it) => it.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((it) => it.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  // Totales
  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
    const hasDuoc = user?.email && isDuocEmail(user.email);
    const discountRate = hasDuoc ? DUOC_DISCOUNT : 0;
    const discount = Math.round(subtotal * discountRate);
    const total = subtotal - discount;
    return { subtotal, discount, total };
  }, [cartItems, user]);

  // Auth
  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => {
    setUser(null);
    clearCart();
  };

  // Admin CRUD
  const handleCreateProduct = (newProduct) => {
    setProducts((prev) => [...prev, { ...newProduct, id: Date.now() }]);
  };
  const handleUpdateProduct = (updated) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };
  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  // Órdenes
  const generateOrderNumber = () => 'LUG-' + Date.now().toString().slice(-8);

  const handlePlaceOrder = (payload, navigate) => {
    const orderNumber = generateOrderNumber();
    const createdAt = new Date().toISOString();
    const order = {
      id: orderNumber,
      createdAt,
      userEmail: user?.email || payload.customer.email,
      customer: payload.customer,
      shippingAddress: payload.shippingAddress,
      items: payload.cartItems,
      totals: payload.totals,
    };

    // Persistir antes de navegar
    setOrders((prev) => [order, ...prev]);

    // Actualizar perfil si corresponde
    if (payload.saveToProfile && user) {
      const updatedUser = {
        ...user,
        name: payload.customer.name,
        phone: payload.customer.phone,
        address: payload.shippingAddress,
      };
      setUser(updatedUser);
    }

    // 1) Navegar primero a éxito
    navigate(`/orders/success/${orderNumber}`);

    // 2) Limpiar carrito después para no gatillar el guard de Checkout
    setTimeout(() => {
      clearCart();
    }, 0);
  };

  // Guard de admin
  const isAdmin = user?.isAdmin === true;
  const RequireAdmin = ({ children }) => (isAdmin ? children : <Navigate to="/auth" replace />);

  return (
    <Router>
      <Header
        cartItemsCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        user={user}
        onLogout={handleLogout}
      />

      <main style={{ minHeight: '70vh' }}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                products={products}
                categories={CATEGORIES}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/products/:category"
            element={<ProductPage products={products} addToCart={addToCart} />}
          />

          <Route
            path="/product/:productId"
            element={<ProductDetailPage products={products} addToCart={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <CartPage
                cartItems={cartItems}
                totals={totals}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                user={user}
                duocEmailDomain={DUOC_EMAIL_DOMAIN}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cartItems={cartItems}
                user={user}
                totals={totals}
                onPlaceOrder={(payload, navigate) => handlePlaceOrder(payload, navigate)}
              />
            }
          />

          {/* Órdenes / Boletas */}
          <Route path="/orders" element={<OrdersPage orders={orders} user={user} />} />
          <Route path="/orders/success/:orderId" element={<OrderSuccessPage orders={orders} />} />
          <Route path="/orders/:orderId" element={<OrderDetailPage orders={orders} />} />

          <Route
            path="/profile"
            element={<ProfilePage user={user} setUser={setUser} />}
          />

          <Route
            path="/auth"
            element={<AuthPage onLogin={handleLogin} />}
          />

        <Route
          path="/admin/*"
          element={
            <RequireAdmin>
              <AdminRoutes
                products={products}
                onCreate={handleCreateProduct}
                onUpdate={handleUpdateProduct}
                onDelete={handleDeleteProduct}
              />
            </RequireAdmin>
          }
        />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;

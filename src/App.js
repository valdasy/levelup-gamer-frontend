import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import authService from './services/authService';

// Pages
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminRoutes from './pages/AdminRoutes';

import './App.css';

function App() {
  // Función para redireccionar si ya está autenticado
  const RedirectIfAuthenticated = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated();
    
    if (isAuthenticated) {
      return <Navigate to="/home" replace />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta raíz - redirige según autenticación */}
          <Route 
            path="/" 
            element={
              authService.isAuthenticated() 
                ? <Navigate to="/home" replace /> 
                : <Navigate to="/auth" replace />
            } 
          />

          {/* Rutas públicas */}
          <Route 
            path="/auth" 
            element={
              <RedirectIfAuthenticated>
                <AuthPage />
              </RedirectIfAuthenticated>
            } 
          />

          {/* Rutas protegidas (requieren login) */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <ProductPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/product/:id" 
            element={
              <ProtectedRoute>
                <ProductDetailPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/order-success" 
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/order/:id" 
            element={
              <ProtectedRoute>
                <OrderDetailPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />

          {/* Rutas de administrador (requieren rol ADMIN) */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/products" 
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminProductsPage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/admin/routes" 
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <AdminRoutes />
              </ProtectedRoute>
            } 
          />

          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

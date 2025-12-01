import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { CarritoProvider } from './context/CarritoContext';
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
  const RedirectIfAuthenticated = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated();
    
    if (isAuthenticated) {
      return <Navigate to="/home" replace />;
    }
    
    return children;
  };

  return (
    <Router>
      <CarritoProvider>
        <div className="App">
          <Routes>
            {/* Ruta raíz - ir al home sin forzar login */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Auth - solo si NO está autenticado */}
            <Route 
              path="/auth" 
              element={
                <RedirectIfAuthenticated>
                  <AuthPage />
                </RedirectIfAuthenticated>
              } 
            />

            {/* Rutas PÚBLICAS - no requieren login */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />

            {/* Rutas PROTEGIDAS - requieren login */}
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

            {/* Rutas de ADMIN - requieren login + rol ADMIN */}
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

            {/* 404 */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </CarritoProvider>
    </Router>
  );
}

export default App;

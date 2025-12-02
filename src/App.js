import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { CarritoProvider } from "./context/CarritoContext";
import authService from "./services/authService";

// Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminRoutes from "./pages/AdminRoutes";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    window.location.href = "/home";
  };

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    setCurrentUser(authService.getCurrentUser());
  }, []);

  const RedirectIfAuthenticated = ({ children }) => {
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
            {/* Ruta raíz */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Auth */}
            <Route
              path="/auth"
              element={
                <RedirectIfAuthenticated>
                  <AuthPage onLogin={handleLogin} />
                </RedirectIfAuthenticated>
              }
            />

            {/* Públicas */}
            <Route
              path="/home"
              element={<HomePage onLogout={handleLogout} />}
            />
            <Route
              path="/products"
              element={<ProductPage onLogout={handleLogout} />}
            />
            <Route
              path="/product/:id"
              element={<ProductDetailPage onLogout={handleLogout} />}
            />

            {/* Protegidas */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderSuccessPage onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetailPage onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminPage onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminProductsPage onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/routes"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminRoutes onLogout={handleLogout} />
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

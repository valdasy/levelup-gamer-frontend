import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuthenticated) {
    // No está autenticado, redirigir al login
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole && !authService.hasRole(requiredRole)) {
    // No tiene el rol requerido, redirigir al home
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;

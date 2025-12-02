import React from "react";
import { Link } from "react-router-dom";
import authService from "../../services/authService";
import { useCarrito } from "../../context/CarritoContext";
import "./Header.css";

const Header = ({ onLogout }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();
  const { cantidadTotal } = useCarrito();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      authService.logout();
      window.location.href = "/home";
    }
  };

  const displayName = user?.nombreCompleto?.trim() || user?.email || "Usuario";

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/home" className="logo">
          <h1>Level UP Gamer</h1>
        </Link>

        <nav className="nav-menu">
          <Link to="/home">Inicio</Link>
          <Link to="/products">Productos</Link>

          {isAuthenticated ? (
            <>
              <Link to="/cart" className="cart-link">
                Carrito
                {cantidadTotal > 0 && (
                  <span className="cart-badge">{cantidadTotal}</span>
                )}
              </Link>

              <Link to="/profile">Mi Perfil</Link>

              {authService.hasRole("ADMIN") && (
                <Link to="/admin">Admin LevelUp</Link>
              )}

              <div className="user-section">
                <span className="user-name">{displayName}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Cerrar Sesión
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth" className="btn-login-link">
                Iniciar Sesión
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

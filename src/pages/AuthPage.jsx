import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import './AuthPage.css';

export default function AuthPage({ onLogin }) {
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    onLogin?.(userData);
    setMessage({ type: "success", text: "Sesión iniciada correctamente." });

    setTimeout(() => {
      if (userData.roles?.includes('ADMIN')) {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }, 500);
  };

  const handleRegister = (userData) => {
    onLogin?.(userData);
    setMessage({
      type: "success",
      text: "Cuenta creada e inicio de sesión correcto.",
    });

    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* Logo o título */}
          <div className="auth-header">
            <h1>Level UP Gamer</h1>
            <p>Tu tienda gaming favorita</p>
          </div>

          {/* Mensajes de éxito/error */}
          {message && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          {/* Tabs */}
          <div className="auth-tabs">
            <button
              className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Iniciar Sesión
            </button>
            <button
              className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Registrarse
            </button>
          </div>

          {/* Tab Content */}
          <div className="auth-content">
            {activeTab === 'login' ? (
              <LoginForm onSuccess={handleLogin} />
            ) : (
              <RegisterForm onSuccess={handleRegister} />
            )}
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <p>
              ¿Olvidaste tu contraseña? <a href="/reset-password">Recupérala aquí</a>
            </p>
          </div>
        </div>

        {/* Decoración lateral */}
        <div className="auth-decoration">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
        </div>
      </div>
    </div>
  );
}

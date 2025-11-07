import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validators";

const LoginForm = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Email inválido");
      return;
    }

    // Verificar si es el admin
    if (formData.email === "admin@levelupgamer.cl") {
      const adminUser = {
        email: "admin@levelupgamer.cl",
        name: "Administrador",
        referralCode: "ADMIN001",
        isAdmin: true,
      };
      setUser(adminUser);
      navigate("/admin");
      return;
    }

    // Usuario normal
    const mockUser = {
      email: formData.email,
      name: "Usuario Demo",
      referralCode: "DEMO123456",
      isAdmin: false,
    };

    setUser(mockUser);
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit} className="auth-form">
      {error && <Alert variant="danger">{error}</Alert>}

      <Alert variant="info" className="mb-3">
        <small>
          <strong>Acceso Admin:</strong> admin@levelupgamer.cl
        </small>
      </Alert>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="login-email">Email</Form.Label>
        <Form.Control
          id="login-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="tu@email.com"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="login-password">Contraseña</Form.Label>
        <Form.Control
          id="login-password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="••••••"
        />
      </Form.Group>

      <Button variant="success" type="submit" className="w-100">
        Iniciar Sesión
      </Button>
    </Form>
  );
};

export default LoginForm;

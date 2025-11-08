// src/pages/AuthPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ← AGREGAR ESTO
import { Container, Row, Col, Card, Tabs, Tab, Alert } from "react-bootstrap";
import LoginForm from "../components/LoginForm/LoginForm";
import RegisterForm from "../components/RegisterForm/RegisterForm";

export default function AuthPage({ onLogin }) {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // ← AGREGAR ESTO

  const handleLogin = (userData) => {
    onLogin?.(userData);
    setMessage({ type: "success", text: "Sesión iniciada correctamente." });

    // ✅ AGREGAR ESTO: Redirigir después del login
    setTimeout(() => {
      if (userData.isAdmin) {
        navigate("/admin"); // Si es admin, ir a admin
      } else {
        navigate("/"); // Si es usuario normal, ir a home
      }
    }, 500);
  };

  const handleRegister = (userData) => {
    onLogin?.(userData);
    setMessage({
      type: "success",
      text: "Cuenta creada e inicio de sesión correcto.",
    });

    // ✅ AGREGAR ESTO: Redirigir después del registro
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">Autenticación</h4>
              {message && <Alert variant={message.type}>{message.text}</Alert>}
              <Tabs defaultActiveKey="login" className="mb-3">
                <Tab eventKey="login" title="Ingresar">
                  <LoginForm onSuccess={handleLogin} />
                </Tab>
                <Tab eventKey="register" title="Registrarse">
                  <RegisterForm onSuccess={handleRegister} />
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

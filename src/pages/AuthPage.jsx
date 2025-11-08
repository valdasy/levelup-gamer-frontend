// src/pages/AuthPage.jsx
import { useState } from 'react';
import { Container, Row, Col, Card, Tabs, Tab, Alert } from 'react-bootstrap';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';

export default function AuthPage({ onLogin }) {
  const [message, setMessage] = useState(null);

  const handleLogin = (userData) => {
    onLogin?.(userData);
    setMessage({ type: 'success', text: 'Sesión iniciada correctamente.' });
  };

  const handleRegister = (userData) => {
    onLogin?.(userData);
    setMessage({ type: 'success', text: 'Cuenta creada e inicio de sesión correcto.' });
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

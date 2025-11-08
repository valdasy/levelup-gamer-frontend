// src/components/LoginForm/LoginForm.jsx
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { validateEmail } from '../../utils/validators';

export default function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!validateEmail(form.email)) e.email = 'Email inválido';
    if (!form.password) e.password = 'Contraseña requerida';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const user = {
      name: form.email === 'admin@levelupgamer.cl' ? 'Admin' : 'Usuario',
      email: form.email,
      isAdmin: form.email === 'admin@levelupgamer.cl',
    };
    onSuccess?.(user);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          isInvalid={!!errors.email}
          placeholder="tu@correo.com"
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          isInvalid={!!errors.password}
          placeholder="********"
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      <div className="d-grid">
        <Button type="submit" variant="primary">Ingresar</Button>
      </div>
    </Form>
  );
}

// src/components/RegisterForm/RegisterForm.jsx
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { validateEmail, isOver18, validatePassword } from '../../utils/validators';

export default function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    birthDate: '',
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nombre requerido';
    if (!validateEmail(form.email)) e.email = 'Email inválido';
    if (!validatePassword(form.password)) e.password = 'Contraseña inválida';
    if (!isOver18(form.birthDate)) e.birthDate = 'Debes ser mayor de 18 años';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newUser = {
      name: form.name,
      email: form.email,
      isAdmin: form.email === 'admin@levelupgamer.cl',
      // campos opcionales que se completarán luego
      phone: '',
      address: null,
    };
    onSuccess?.(newUser); // NOTA: no usar setUser directo aquí
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Group className="mb-3">
        <Form.Label>Nombre completo</Form.Label>
        <Form.Control
          name="name"
          value={form.name}
          onChange={onChange}
          isInvalid={!!errors.name}
          placeholder="Ej: Juan Pérez"
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

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

      <Form.Group className="mb-3">
        <Form.Label>Fecha de nacimiento</Form.Label>
        <Form.Control
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={onChange}
          isInvalid={!!errors.birthDate}
        />
        <Form.Control.Feedback type="invalid">{errors.birthDate}</Form.Control.Feedback>
      </Form.Group>

      <div className="d-grid">
        <Button type="submit" variant="primary">Crear cuenta</Button>
      </div>
    </Form>
  );
}

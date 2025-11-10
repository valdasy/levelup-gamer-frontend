// src/components/RegisterForm/RegisterForm.jsx
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { validateEmail, isOver18, validatePassword } from '../../utils/validators';

export default function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // ✅ AGREGAR
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
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden'; // ✅ AGREGAR
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
      phone: '',
      address: null,
    };
    onSuccess?.(newUser);
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Nombre Completo</Form.Label>
        <Form.Control
          id="name" // ✅ AGREGAR
          name="name"
          value={form.name}
          onChange={onChange}
          isInvalid={!!errors.name}
          placeholder="Ej: Juan Pérez"
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">Email</Form.Label> {/* ✅ AGREGAR htmlFor */}
        <Form.Control
          id="email" // ✅ AGREGAR
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          isInvalid={!!errors.email}
          placeholder="tu@email.com" 
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Contraseña</Form.Label> {/* ✅ AGREGAR htmlFor */}
        <Form.Control
          id="password" // ✅ AGREGAR
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          isInvalid={!!errors.password}
          placeholder="Mínimo 6 caracteres"
        />
        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
      </Form.Group>

      {/* ✅ AGREGAR CAMPO CONFIRMAR CONTRASEÑA */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="confirmPassword">Confirmar Contraseña</Form.Label>
        <Form.Control
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onChange}
          isInvalid={!!errors.confirmPassword}
          placeholder="Repetir contraseña"
        />
        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="birthDate">Fecha de Nacimiento</Form.Label> {/* ✅ Cambiar texto */}
        <Form.Control
          id="birthDate" // ✅ AGREGAR
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={onChange}
          isInvalid={!!errors.birthDate}
        />
        <Form.Control.Feedback type="invalid">{errors.birthDate}</Form.Control.Feedback>
      </Form.Group>

      <div className="d-grid">
        <Button type="submit" variant="primary">Registrarse</Button> {/* ✅ CAMBIAR */}
      </div>
    </Form>
  );
}

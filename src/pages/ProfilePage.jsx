// src/pages/ProfilePage.jsx
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { validateEmail } from '../utils/validators';

export default function ProfilePage({ user, setUser }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine: '',
    number: '',
    apt: '',
    city: '',
    region: '',
    zip: '',
  });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        addressLine: user.address?.addressLine || '',
        number: user.address?.number || '',
        apt: user.address?.apt || '',
        city: user.address?.city || '',
        region: user.address?.region || '',
        zip: user.address?.zip || '',
      });
    }
  }, [user]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Nombre requerido';
    if (!validateEmail(form.email)) e.email = 'Email inválido';
    if (!form.city.trim()) e.city = 'Ciudad requerida';
    if (!form.region.trim()) e.region = 'Región requerida';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSaved(false);
    if (!validate()) return;
    const updated = {
      ...user,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: {
        addressLine: form.addressLine,
        number: form.number,
        apt: form.apt,
        city: form.city,
        region: form.region,
        zip: form.zip,
      },
    };
    setUser?.(updated);
    setSaved(true);
  };

  if (!user) {
    return (
      <Container className="my-4">
        <Alert variant="warning">Debes iniciar sesión para ver tu perfil.</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row className="g-4">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">Perfil de usuario</h4>

              {saved && <Alert variant="success">Perfil actualizado correctamente.</Alert>}

              <Form onSubmit={onSubmit} noValidate>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
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
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        isInvalid={!!errors.email}
                        placeholder="tu@correo.com"
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="+56 9 1234 5678"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="mb-3">Dirección</h5>

                <Row className="mb-3">
                  <Col md={8}>
                    <Form.Group>
                      <Form.Label>Calle</Form.Label>
                      <Form.Control
                        name="addressLine"
                        value={form.addressLine}
                        onChange={onChange}
                        placeholder="Av. Siempre Viva"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Número</Form.Label>
                      <Form.Control
                        name="number"
                        value={form.number}
                        onChange={onChange}
                        placeholder="1234"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Depto./Casa (opcional)</Form.Label>
                      <Form.Control
                        name="apt"
                        value={form.apt}
                        onChange={onChange}
                        placeholder="Depto 45"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Ciudad</Form.Label>
                      <Form.Control
                        name="city"
                        value={form.city}
                        onChange={onChange}
                        isInvalid={!!errors.city}
                        placeholder="Santiago"
                      />
                      <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Región</Form.Label>
                      <Form.Control
                        name="region"
                        value={form.region}
                        onChange={onChange}
                        isInvalid={!!errors.region}
                        placeholder="RM"
                      />
                      <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Código postal (opcional)</Form.Label>
                      <Form.Control
                        name="zip"
                        value={form.zip}
                        onChange={onChange}
                        placeholder="1230000"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="primary">Guardar cambios</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Tu cuenta</h5>
              <div className="text-muted small">
                Actualiza tus datos y dirección para autocompletar en el checkout.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

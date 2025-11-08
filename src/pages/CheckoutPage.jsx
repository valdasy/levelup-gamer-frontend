// src/pages/CheckoutPage.jsx
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';
import { isDuocEmail, validateEmail } from '../utils/validators';

export default function CheckoutPage({ cartItems, user, onPlaceOrder, totals }) {
const navigate = useNavigate();
const [isSubmitting, setIsSubmitting] = useState(false);

// Guard: solo si NO estamos enviando
useEffect(() => {
if (!isSubmitting && (!cartItems || cartItems.length === 0)) {
    navigate('/cart');
}
}, [cartItems, isSubmitting, navigate]);

const { subtotal, discount, total } = useMemo(() => {
if (totals) return totals;
const sub = cartItems?.reduce((acc, it) => acc + it.price * it.quantity, 0) || 0;
const duoc = user?.email && isDuocEmail(user.email) ? 0.2 : 0;
const disc = Math.round(sub * duoc);
return { subtotal: sub, discount: disc, total: sub - disc };
}, [cartItems, totals, user]);

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
notes: '',
saveToProfile: true,
});

useEffect(() => {
if (user) {
    setForm((f) => ({
    ...f,
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    addressLine: user.address?.addressLine || '',
    number: user.address?.number || '',
    apt: user.address?.apt || '',
    city: user.address?.city || '',
    region: user.address?.region || '',
    zip: user.address?.zip || '',
    }));
}
}, [user]);

const [errors, setErrors] = useState({});

const handleChange = (e) => {
const { name, value, type, checked } = e.target;
setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
};

const validatePhone = (value) => value.replace(/\D/g, '').length >= 8;

const validate = () => {
const e = {};
if (!form.name.trim()) e.name = 'Nombre requerido';
if (!validateEmail(form.email)) e.email = 'Email inválido';
if (!validatePhone(form.phone)) e.phone = 'Teléfono inválido';
if (!form.addressLine.trim()) e.addressLine = 'Calle requerida';
if (!form.city.trim()) e.city = 'Ciudad requerida';
if (!form.region.trim()) e.region = 'Región requerida';
setErrors(e);
return Object.keys(e).length === 0;
};

const handleSubmit = (e) => {
e.preventDefault();
if (!validate()) return;
setIsSubmitting(true);
const payload = {
    customer: { name: form.name, email: form.email, phone: form.phone },
    shippingAddress: {
    addressLine: form.addressLine, number: form.number, apt: form.apt,
    city: form.city, region: form.region, zip: form.zip, notes: form.notes,
    },
    cartItems,
    totals: { subtotal, discount, total },
    saveToProfile: user ? form.saveToProfile : false,
};
onPlaceOrder?.(payload, navigate);
};

return (
<div className="container my-4">
    <Button variant="link" onClick={() => navigate('/cart')}>{'< Volver al carrito'}</Button>
    <Row className="g-4">
    <Col md={8}>
        <Card>
        <Card.Body>
            <h4 className="mb-3">Datos de contacto</h4>
            <Form onSubmit={handleSubmit} noValidate>
            <Row className="mb-3">
                <Col md={6}>
                <Form.Group>
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control
                    name="name"
                    value={form.name}
                    onChange={handleChange}
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
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    placeholder="tu@correo.com"
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
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                    placeholder="Ej: +56 9 1234 5678"
                    />
                    <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                </Form.Group>
                </Col>
            </Row>

            <h4 className="mb-3">Dirección de entrega</h4>
            <Row className="mb-3">
                <Col md={8}>
                <Form.Group>
                    <Form.Label>Calle</Form.Label>
                    <Form.Control
                    name="addressLine"
                    value={form.addressLine}
                    onChange={handleChange}
                    isInvalid={!!errors.addressLine}
                    placeholder="Ej: Av. Siempre Viva"
                    />
                    <Form.Control.Feedback type="invalid">{errors.addressLine}</Form.Control.Feedback>
                </Form.Group>
                </Col>
                <Col md={4}>
                <Form.Group>
                    <Form.Label>Número</Form.Label>
                    <Form.Control
                    name="number"
                    value={form.number}
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                    isInvalid={!!errors.region}
                    placeholder="RM"
                    />
                    <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
                </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={4}>
                <Form.Group>
                    <Form.Label>Código postal (opcional)</Form.Label>
                    <Form.Control
                    name="zip"
                    value={form.zip}
                    onChange={handleChange}
                    placeholder="1230000"
                    />
                </Form.Group>
                </Col>
                <Col md={8}>
                <Form.Group>
                    <Form.Label>Referencias (opcional)</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={2}
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Color de portón, punto de referencia, etc."
                    />
                </Form.Group>
                </Col>
            </Row>

            {user && (
                <Form.Check
                className="mb-3"
                type="checkbox"
                name="saveToProfile"
                checked={form.saveToProfile}
                onChange={handleChange}
                label="Guardar esta dirección en mi perfil"
                />
            )}

            <div className="d-flex gap-2">
                <Button variant="secondary" onClick={() => navigate('/cart')}>
                Volver al carrito
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Procesando...' : 'Confirmar compra'}
                </Button>
            </div>
            </Form>
        </Card.Body>
        </Card>
    </Col>

    <Col md={4}>
        <Card>
        <Card.Body>
            <h5>Resumen</h5>
            <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${subtotal?.toLocaleString()}</span>
            </div>
            {discount > 0 && (
            <div className="d-flex justify-content-between text-success">
                <span>Descuento DuocUC</span>
                <span>- ${discount?.toLocaleString()}</span>
            </div>
            )}
            <hr />
            <div className="d-flex justify-content-between fw-semibold">
            <span>Total</span>
            <span>${total?.toLocaleString()}</span>
            </div>
            <small className="text-muted">
            {user?.email && isDuocEmail(user.email)
                ? 'Se aplicó 20% de descuento por email @duocuc.cl'
                : 'Inicia sesión con correo @duocuc.cl para obtener 20% de descuento'}
            </small>
        </Card.Body>
        </Card>
    </Col>
    </Row>
</div>
);
}

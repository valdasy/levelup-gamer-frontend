// src/pages/AdminProductsPage.jsx
import { useMemo, useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AdminProductsPage({ products, onCreate, onUpdate, onDelete }) {
const [q, setQ] = useState('');
const filtered = useMemo(
() => (products || []).filter(p => (p.name || '').toLowerCase().includes(q.toLowerCase())),
[products, q]
);

return (
<Container className="py-3">
    <div className="d-flex justify-content-between align-items-center mb-3">
    <h4 className="mb-0">Productos</h4>
    <Button as={Link} to="/admin" variant="outline-secondary" size="sm">Volver al dashboard</Button>
    </div>

    <Card className="mb-3">
    <Card.Body>
        <Row className="g-2">
        <Col md={6}>
            <Form.Control
            placeholder="Buscar producto..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            />
        </Col>
        <Col md="auto">
            <Button variant="primary" size="sm" onClick={() => {
            const name = prompt('Nombre del producto');
            const price = Number(prompt('Precio'));
            if (!name || !price) return;
            onCreate?.({ name, price, stock: 0, id: Date.now() });
            }}>Nuevo producto</Button>
        </Col>
        </Row>
    </Card.Body>
    </Card>

    <Table hover responsive>
    <thead>
        <tr>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Stock</th>
        <th></th>
        </tr>
    </thead>
    <tbody>
        {(filtered || []).map(p => (
        <tr key={p.id}>
            <td>{p.name}</td>
            <td>${(p.price || 0).toLocaleString()}</td>
            <td>
            <Badge bg={p.stock > 0 ? 'success' : 'secondary'}>
                {p.stock || 0}
            </Badge>
            </td>
            <td className="text-end">
            <Button size="sm" variant="outline-primary" className="me-2" onClick={() => {
                const name = prompt('Nuevo nombre', p.name);
                const price = Number(prompt('Nuevo precio', p.price));
                if (!name || !price) return;
                onUpdate?.({ ...p, name, price });
            }}>Editar</Button>
            <Button size="sm" variant="outline-danger" onClick={() => onDelete?.(p.id)}>Eliminar</Button>
            </td>
        </tr>
        ))}
    </tbody>
    </Table>
</Container>
);
}

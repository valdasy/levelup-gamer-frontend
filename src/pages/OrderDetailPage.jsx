// src/pages/OrderDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Table, Button } from 'react-bootstrap';

export default function OrderDetailPage({ orders }) {
const { orderId } = useParams();
const order = orders.find(o => o.id === orderId);

if (!order) {
return (
    <Container className="my-4">
    <Card className="p-4 text-center">
        <h4>Boleta no encontrada</h4>
        <Button as={Link} to="/orders">Volver a mis boletas</Button>
    </Card>
    </Container>
);
}

return (
<Container className="my-4">
    <Card className="p-4">
    <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
        <h4 className="mb-1">Boleta</h4>
        <div className="text-muted small">Orden: {order.id}</div>
        <div className="text-muted small">Fecha: {new Date(order.createdAt).toLocaleString()}</div>
        </div>
        <div>
        <Button variant="outline-secondary" size="sm" onClick={() => window.print()}>
            Imprimir
        </Button>
        </div>
    </div>

    <div className="mb-3">
        <strong>Cliente:</strong> {order.customer.name} — {order.customer.email} — {order.customer.phone}
    </div>
    <div className="mb-4">
        <strong>Dirección:</strong> {order.shippingAddress.addressLine} {order.shippingAddress.number}{order.shippingAddress.apt ? `, ${order.shippingAddress.apt}` : ''}, {order.shippingAddress.city}, {order.shippingAddress.region}{order.shippingAddress.zip ? `, ${order.shippingAddress.zip}` : ''}
    </div>

    <Table responsive bordered>
        <thead>
        <tr>
            <th>Producto</th>
            <th>Cant.</th>
            <th>Precio</th>
            <th>Subtotal</th>
        </tr>
        </thead>
        <tbody>
        {order.items.map(it => (
            <tr key={it.id}>
            <td>{it.name}</td>
            <td>{it.quantity}</td>
            <td>${it.price.toLocaleString()}</td>
            <td>${(it.price * it.quantity).toLocaleString()}</td>
            </tr>
        ))}
        </tbody>
    </Table>

    <div className="d-flex justify-content-end">
        <div style={{ minWidth: 260 }}>
        <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${order.totals.subtotal.toLocaleString()}</span>
        </div>
        {order.totals.discount > 0 && (
            <div className="d-flex justify-content-between text-success">
            <span>Descuento</span>
            <span>- ${order.totals.discount.toLocaleString()}</span>
            </div>
        )}
        <hr />
        <div className="d-flex justify-content-between fw-semibold">
            <span>Total</span>
            <span>${order.totals.total.toLocaleString()}</span>
        </div>
        </div>
    </div>

    <div className="mt-3">
        <Button as={Link} to="/orders" variant="primary">Volver a mis boletas</Button>
    </div>
    </Card>
</Container>
);
}

// src/pages/OrderSuccessPage.jsx
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function OrderSuccessPage({ orders }) {
const { orderId } = useParams();
const order = orders.find(o => o.id === orderId);

if (!order) {
return (
    <Container className="my-5">
    <Card className="p-4 text-center">
        <h4>Orden no encontrada</h4>
        <Button as={Link} to="/">Volver al inicio</Button>
    </Card>
    </Container>
);
}

return (
<Container className="my-5">
    <Row className="justify-content-center">
    <Col md={8} lg={6}>
        <Card className="p-4 text-center">
        <h3 className="mb-2">¡Compra exitosa!</h3>
        <p className="text-muted mb-1">N° de orden: {order.id}</p>
        <p className="text-muted">Fecha: {new Date(order.createdAt).toLocaleString()}</p>
        <div className="my-3">
            <div>Total pagado: <strong>${order.totals.total.toLocaleString()}</strong></div>
            <small className="text-muted d-block">Te enviamos un resumen a {order.customer.email}</small>
        </div>
        <div className="d-flex justify-content-center gap-2 mt-2">
            <Button as={Link} to={`/orders/${order.id}`} variant="primary">Ver boleta</Button>
            <Button as={Link} to="/products/all" variant="outline-primary">Seguir comprando</Button>
        </div>
        </Card>
    </Col>
    </Row>
</Container>
);
}

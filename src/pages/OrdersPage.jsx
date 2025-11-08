// src/pages/OrdersPage.jsx
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function OrdersPage({ orders, user }) {
if (!user) {
return (
    <Container className="my-4">
    <Alert variant="warning">Debes iniciar sesión para ver tus boletas.</Alert>
    </Container>
);
}

const myOrders = orders.filter(o => o.userEmail === user.email);

return (
<Container className="my-4">
    <h4 className="mb-3">Mis boletas</h4>
    {myOrders.length === 0 ? (
    <Alert variant="info">Aún no tienes compras registradas.</Alert>
    ) : (
    <Table hover responsive>
        <thead>
        <tr>
            <th>N° Orden</th>
            <th>Fecha</th>
            <th>Total</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {myOrders.map(o => (
            <tr key={o.id}>
            <td>{o.id}</td>
            <td>{new Date(o.createdAt).toLocaleString()}</td>
            <td>${o.totals.total.toLocaleString()}</td>
            <td>
                <Button as={Link} to={`/orders/${o.id}`} size="sm" variant="primary">
                Ver boleta
                </Button>
            </td>
            </tr>
        ))}
        </tbody>
    </Table>
    )}
</Container>
);
}
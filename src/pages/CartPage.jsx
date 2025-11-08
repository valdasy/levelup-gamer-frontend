// src/pages/CartPage.jsx
import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, ListGroup, Image } from 'react-bootstrap';
import { isDuocEmail } from '../utils/validators';

export default function CartPage({
  cartItems,
  totals,                 // { subtotal, discount, total } calculado en App
  updateQuantity,          // (productId, quantity)
  removeFromCart,          // (productId)
  clearCart,               // ()
  user,
  duocEmailDomain          // p.ej. '@duocuc.cl' desde constants para mensajes
}) {
  const navigate = useNavigate();
  const hasItems = cartItems && cartItems.length > 0;

  const summary = useMemo(() => {
    if (totals) return totals;
    const subtotal = cartItems?.reduce((acc, it) => acc + it.price * it.quantity, 0) || 0;
    const duoc = user?.email && isDuocEmail(user.email) ? 0.2 : 0;
    const discount = Math.round(subtotal * duoc);
    const total = subtotal - discount;
    return { subtotal, discount, total };
  }, [cartItems, totals, user]);

  const handleQtyChange = (id, value) => {
    const q = Number(value);
    if (Number.isNaN(q) || q < 0) return;
    updateQuantity(id, q);
  };

  return (
    <Container className="my-4">
      <h3 className="mb-3">Tu carrito</h3>

      {!hasItems && (
        <Card className="p-4 text-center">
          <p className="mb-3">Tu carrito está vacío.</p>
          <Button as={Link} to="/" variant="primary">Seguir comprando</Button>
        </Card>
      )}

      {hasItems && (
        <Row className="g-4">
          <Col md={8}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.id} className="py-3">
                      <Row className="align-items-center g-2">
                        <Col xs={3} md={2}>
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fluid rounded />
                          ) : (
                            <div style={{
                              width: '100%', aspectRatio: '1/1', background: '#F8F9FA',
                              border: '1px solid #E0E0E0', borderRadius: 8
                            }} />
                          )}
                        </Col>
                        <Col xs={9} md={4}>
                          <div className="fw-semibold">{item.name}</div>
                          <div className="text-muted small">{item.category}</div>
                          <div className="mt-1">${item.price.toLocaleString()}</div>
                        </Col>
                        <Col xs={6} md={3}>
                          <Form.Label className="small mb-1">Cantidad</Form.Label>
                          <Form.Control
                            type="number"
                            min={0}
                            value={item.quantity}
                            onChange={(e) => handleQtyChange(item.id, e.target.value)}
                          />
                          <div className="small text-muted mt-1">
                            Subtotal: ${(item.price * item.quantity).toLocaleString()}
                          </div>
                        </Col>
                        <Col xs={6} md={3} className="text-end">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            Eliminar
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="d-flex justify-content-between mt-3">
                  <Button variant="outline-secondary" onClick={clearCart}>
                    Vaciar carrito
                  </Button>
                  <Button as={Link} to="/" variant="secondary">
                    Seguir comprando
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <h5 className="mb-3">Resumen</h5>

                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${summary.subtotal.toLocaleString()}</span>
                </div>

                {summary.discount > 0 && (
                  <div className="d-flex justify-content-between text-success mt-1">
                    <span>Descuento DuocUC</span>
                    <span>- ${summary.discount.toLocaleString()}</span>
                  </div>
                )}

                <hr />

                <div className="d-flex justify-content-between fw-semibold">
                  <span>Total</span>
                  <span>${summary.total.toLocaleString()}</span>
                </div>

                <small className="text-muted d-block mt-2">
                  {user?.email && isDuocEmail(user.email)
                    ? 'Se aplicó 20% de descuento por email @duocuc.cl'
                    : `Inicia sesión con correo ${duocEmailDomain || '@duocuc.cl'} para 20% de descuento`}
                </small>

                <div className="d-grid mt-3">
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={!hasItems}
                    onClick={() => navigate('/checkout')}
                  >
                    Ir a pagar
                  </Button>
                </div>

                <div className="d-grid mt-2">
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate('/')}
                  >
                    Agregar más productos
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

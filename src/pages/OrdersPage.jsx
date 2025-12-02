import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Alert,
  Card,
  Badge,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import authService from "../services/authService";
import "./OrdersPage.css";

export default function OrdersPage({ onLogout }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setUser(currentUser);

    try {
      // TODO: Llamar al backend para obtener pedidos del usuario
      // const data = await pedidoService.getMisPedidos();
      // setOrders(data);

      // Por ahora, lista vacía (no hay pedidos aún)
      setOrders([]);
    } catch (err) {
      console.error("Error cargando pedidos:", err);
      setError("Error al cargar tus pedidos");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDIENTE: { bg: "warning", icon: "clock", text: "Pendiente" },
      PROCESANDO: { bg: "info", icon: "arrow-repeat", text: "Procesando" },
      ENVIADO: { bg: "primary", icon: "truck", text: "Enviado" },
      ENTREGADO: { bg: "success", icon: "check-circle", text: "Entregado" },
      CANCELADO: { bg: "danger", icon: "x-circle", text: "Cancelado" },
    };

    const config = statusConfig[status] || statusConfig["PENDIENTE"];

    return (
      <Badge bg={config.bg} className="status-badge">
        <i className={`bi bi-${config.icon} me-1`}></i>
        {config.text}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="orders-page">
        <Header onLogout={onLogout} />
        <Container className="my-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando tus pedidos...</p>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="orders-page">
        <Header onLogout={onLogout} />
        <Container className="my-5">
          <Alert variant="warning" className="shadow-sm">
            <Alert.Heading>
              <i className="bi bi-exclamation-triangle me-2"></i>
              Acceso restringido
            </Alert.Heading>
            <p>Debes iniciar sesión para ver tus pedidos.</p>
            <hr />
            <div className="d-flex gap-2">
              <Button as={Link} to="/auth" variant="warning">
                Iniciar sesión
              </Button>
              <Button as={Link} to="/home" variant="outline-secondary">
                Volver al inicio
              </Button>
            </div>
          </Alert>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="orders-page">
      <Header onLogout={onLogout} />

      <div className="orders-hero">
        <Container>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h1 className="mb-2">
                <i className="bi bi-receipt me-3"></i>
                Mis Pedidos
              </h1>
              <p className="mb-0">Revisa el estado de tus compras</p>
            </div>
            <Button
              as={Link}
              to="/products"
              variant="light"
              className="shadow-sm"
            >
              <i className="bi bi-shop me-2"></i>
              Seguir comprando
            </Button>
          </div>
        </Container>
      </div>

      <Container className="my-5">
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
          </Alert>
        )}

        {orders.length === 0 ? (
          <Card className="empty-state-card shadow-sm">
            <Card.Body className="text-center p-5">
              <div className="empty-icon mb-4">
                <i className="bi bi-cart-x"></i>
              </div>
              <h3 className="mb-3">Aún no tienes pedidos</h3>
              <p className="text-muted mb-4">
                Cuando realices tu primera compra, aparecerá aquí
              </p>
              <Button as={Link} to="/products" variant="primary" size="lg">
                <i className="bi bi-shop me-2"></i>
                Explorar productos
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <>
            <div className="mb-4">
              <h5 className="text-muted">
                <i className="bi bi-list-check me-2"></i>
                Total de pedidos: <strong>{orders.length}</strong>
              </h5>
            </div>

            <div className="orders-list">
              {orders.map((order) => (
                <Card key={order.id} className="order-card shadow-sm mb-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <div className="order-number">
                          <small className="text-muted d-block mb-1">
                            N° Pedido
                          </small>
                          <strong className="h5 mb-0">#{order.id}</strong>
                        </div>
                      </Col>
                      <Col md={3}>
                        <div>
                          <small className="text-muted d-block mb-1">
                            <i className="bi bi-calendar me-1"></i>
                            Fecha
                          </small>
                          <div>
                            {new Date(order.createdAt).toLocaleDateString(
                              "es-CL"
                            )}
                          </div>
                          <small className="text-muted">
                            {new Date(order.createdAt).toLocaleTimeString(
                              "es-CL"
                            )}
                          </small>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div>
                          <small className="text-muted d-block mb-1">
                            Estado
                          </small>
                          {getStatusBadge(order.status || "PENDIENTE")}
                        </div>
                      </Col>
                      <Col md={2}>
                        <div>
                          <small className="text-muted d-block mb-1">
                            <i className="bi bi-box-seam me-1"></i>
                            Productos
                          </small>
                          <strong>{order.items?.length || 0}</strong>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div>
                          <small className="text-muted d-block mb-1">
                            Total
                          </small>
                          <strong className="h5 mb-0 text-primary">
                            ${order.total?.toLocaleString("es-CL") || "0"}
                          </strong>
                        </div>
                      </Col>
                      <Col md={1} className="text-end">
                        <Button
                          as={Link}
                          to={`/order/${order.id}`}
                          variant="outline-primary"
                          size="sm"
                          className="view-btn"
                        >
                          <i className="bi bi-eye"></i>
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </>
        )}

        <Card className="info-card shadow-sm mt-4">
          <Card.Body>
            <Row>
              <Col md={4} className="border-end">
                <div className="info-item">
                  <i className="bi bi-truck info-icon"></i>
                  <div>
                    <h6 className="mb-1">Envío gratis</h6>
                    <small className="text-muted">
                      En compras sobre $50.000
                    </small>
                  </div>
                </div>
              </Col>
              <Col md={4} className="border-end">
                <div className="info-item">
                  <i className="bi bi-shield-check info-icon"></i>
                  <div>
                    <h6 className="mb-1">Compra protegida</h6>
                    <small className="text-muted">
                      Garantía de satisfacción
                    </small>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="info-item">
                  <i className="bi bi-headset info-icon"></i>
                  <div>
                    <h6 className="mb-1">Soporte 24/7</h6>
                    <small className="text-muted">Estamos para ayudarte</small>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Footer />
    </div>
  );
}

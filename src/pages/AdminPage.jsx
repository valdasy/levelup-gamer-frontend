// src/pages/AdminPage.jsx
import { useMemo } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminPage({ products, onCreate, onUpdate, onDelete }) {
  const navigate = useNavigate();

  // KPIs de ejemplo (ajústalos a tu backend si corresponde)
  const kpis = useMemo(() => {
    const totalProductos = products?.length || 0;
    const inventario = products?.reduce((acc, p) => acc + (p.stock || 0), 0);
    const comprasHoy = 1234; // simulado
    const usuariosMes = 890;  // simulado
    return { totalProductos, inventario, comprasHoy, usuariosMes };
  }, [products]);

  return (
    <div className="d-flex" style={{ minHeight: 'calc(100vh - 120px)' }}>
      {/* Sidebar */}
      <aside style={{ width: 260 }} className="border-end bg-light">
        <ListGroup variant="flush" className="rounded-0">
          <ListGroup.Item action as={Link} to="/admin" active>
            Dashboard
          </ListGroup.Item>
          <ListGroup.Item action as={Link} to="/orders">Órdenes</ListGroup.Item>
          <ListGroup.Item action as={Link} to="/admin/products">Productos</ListGroup.Item>
          <ListGroup.Item action as={Link} to="/admin/categories">Categorías</ListGroup.Item>
          <ListGroup.Item action as={Link} to="/admin/users">Usuarios</ListGroup.Item>
          <ListGroup.Item action as={Link} to="/admin/reports">Reportes</ListGroup.Item>
          <ListGroup.Item action as={Link} to="/profile">Perfil</ListGroup.Item>
          <div className="p-3">
            <Button as={Link} to="/" variant="dark" className="w-100 mb-2">Tienda</Button>
            <Button variant="danger" className="w-100" onClick={() => navigate('/auth')}>
              Cerrar Sesión
            </Button>
          </div>
        </ListGroup>
      </aside>

      {/* Contenido */}
      <main className="flex-grow-1">
        <Container fluid className="py-3">
          <h4 className="mb-1">Dashboard</h4>
          <div className="text-muted mb-3">Resumen de las actividades diarias</div>

          {/* KPIs superiores */}
          <Row className="g-3 mb-3">
            <Col md={4}>
              <Card className="h-100 text-white" style={{ background: '#1976d2' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">Compras</div>
                      <div style={{ fontSize: 28, lineHeight: 1.1 }}>{kpis.comprasHoy.toLocaleString()}</div>
                      <small className="opacity-75">Probabilidad de aumento: 20%</small>
                    </div>
                    <div style={{ fontSize: 36 }}>🛒</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-white" style={{ background: '#2e7d32' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">Productos</div>
                      <div style={{ fontSize: 28, lineHeight: 1.1 }}>{kpis.totalProductos}</div>
                      <small className="opacity-75">Inventario actual: {kpis.inventario}</small>
                    </div>
                    <div style={{ fontSize: 36 }}>📦</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-dark" style={{ background: '#ffd54f' }}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">Usuarios</div>
                      <div style={{ fontSize: 28, lineHeight: 1.1 }}>{kpis.usuariosMes}</div>
                      <small className="opacity-75">Nuevos este mes: 120</small>
                    </div>
                    <div style={{ fontSize: 36 }}>👥</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Mosaico de accesos */}
          <Row className="g-3">
            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: 26 }}>📊</div>
                  <h5 className="mt-2">Dashboard</h5>
                  <div className="text-muted small mb-3">Visión general de métricas y estadísticas.</div>
                  <Button as={Link} to="/admin" variant="outline-primary" size="sm">Abrir</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: 26 }}>🧾</div>
                  <h5 className="mt-2">Órdenes</h5>
                  <div className="text-muted small mb-3">Gestión y seguimiento de compras.</div>
                  <Button as={Link} to="/orders" variant="outline-primary" size="sm">Abrir</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: 26 }}>📦</div>
                  <h5 className="mt-2">Productos</h5>
                  <div className="text-muted small mb-2">Inventario y detalles.</div>
                  <div className="mb-3">
                    <Badge bg="secondary">{kpis.totalProductos} items</Badge>
                  </div>
                  <Button as={Link} to="/admin/products" variant="outline-primary" size="sm">Abrir</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: 26 }}>🗂️</div>
                  <h5 className="mt-2">Categorías</h5>
                  <div className="text-muted small mb-3">Organiza productos por categoría.</div>
                  <Button as={Link} to="/admin/categories" variant="outline-primary" size="sm">Abrir</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: 26 }}>👥</div>
                  <h5 className="mt-2">Usuarios</h5>
                  <div className="text-muted small mb-3">Cuentas y roles.</div>
                  <Button as={Link} to="/admin/users" variant="outline-primary" size="sm">Abrir</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: 26 }}>📈</div>
                  <h5 className="mt-2">Reportes</h5>
                  <div className="text-muted small mb-3">Informes detallados.</div>
                  <Button as={Link} to="/admin/reports" variant="outline-primary" size="sm">Abrir</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: 26 }}>👤</div>
                  <h5 className="mt-2">Perfil</h5>
                  <div className="text-muted small mb-3">Datos personales y cuenta.</div>
                  <Button as={Link} to="/profile" variant="outline-primary" size="sm">Abrir</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="h-100">
                <Card.Body className="text-center">
                  <div style={{ fontSize: 26 }}>🏬</div>
                  <h5 className="mt-2">Tienda</h5>
                  <div className="text-muted small mb-3">Ver sitio en tiempo real.</div>
                  <Button as={Link} to="/" variant="outline-primary" size="sm">Abrir</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import "./Header.css";

const Header = ({ cartItemsCount, user }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="gamer-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-title">
          <span className="neon-text">LEVEL-UP</span> GAMER
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/products/all">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              Carrito{" "}
              {cartItemsCount > 0 && (
                <Badge bg="success" pill className="ms-1">
                  {cartItemsCount}
                </Badge>
              )}
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  Perfil
                </Nav.Link>
                {user.email === "admin@levelupgamer.cl" && (
                  <Nav.Link as={Link} to="/admin">
                    Admin
                  </Nav.Link>
                )}
              </>
            ) : (
              <Nav.Link as={Link} to="/auth">
                Ingresar
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

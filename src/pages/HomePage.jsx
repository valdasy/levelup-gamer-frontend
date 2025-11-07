import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard/ProductCard";
import FilterBar from "../components/FilterBar/FilterBar";
import { CATEGORIES } from "../utils/constants";
import "./HomePage.css";

const HomePage = ({ products, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section con Animación */}
      <div className="hero-section">
        <div className="hero-background">
          <div className="gradient-overlay"></div>
          <div className="animated-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
          </div>
        </div>
        <Container className="hero-content">
          <h1 className="hero-title">LEVEL-UP GAMER</h1>
          <p className="hero-subtitle">
            Tu tienda online de productos gaming en Chile
          </p>
        </Container>
      </div>

      {/* Catálogo de Productos */}
      <Container className="py-5">
        <FilterBar
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <ProductCard product={product} onAddToCart={addToCart} />
            </Col>
          ))}
        </Row>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <h3 className="text-secondary">No se encontraron productos</h3>
          </div>
        )}
      </Container>
    </>
  );
};

export default HomePage;

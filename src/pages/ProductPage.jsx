import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard/ProductCard";
import FilterBar from "../components/FilterBar/FilterBar";
import { CATEGORIES } from "../utils/constants";

const ProductPage = ({ products, addToCart }) => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    category === "all" ? "all" : category
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container className="py-5">
      <h2 className="mb-4">
        {selectedCategory === "all" ? "Todos los Productos" : selectedCategory}
      </h2>

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
  );
};

export default ProductPage;

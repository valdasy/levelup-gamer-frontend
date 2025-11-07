import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import { PRODUCTS } from "./utils/constants";
import "./App.css";

function App() {
  const [products, setProducts] = useState(PRODUCTS);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Funciones CRUD para productos
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    // También eliminar del carrito si existe
    removeFromCart(productId);
  };

  return (
    <Router>
      <div className="App">
        <Header cartItemsCount={cartItems.length} user={user} />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={<HomePage products={products} addToCart={addToCart} />}
            />
            <Route
              path="/products/:category"
              element={
                <ProductPage products={products} addToCart={addToCart} />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  updateQuantity={updateCartQuantity}
                  removeItem={removeFromCart}
                  clearCart={clearCart}
                  user={user}
                />
              }
            />
            <Route
              path="/profile"
              element={<ProfilePage user={user} setUser={setUser} />}
            />
            <Route path="/auth" element={<AuthPage setUser={setUser} />} />
            <Route
              path="/admin"
              element={
                <AdminPage
                  user={user}
                  products={products}
                  addProduct={addProduct}
                  updateProduct={updateProduct}
                  deleteProduct={deleteProduct}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

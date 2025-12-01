import React, { createContext, useState, useContext, useEffect } from 'react';
import carritoService from '../services/carritoService';
import authService from '../services/authService';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cantidadTotal, setCantidadTotal] = useState(0);

  // Cargar carrito al iniciar si está autenticado
  useEffect(() => {
    if (authService.isAuthenticated()) {
      cargarCarrito();
    }
  }, []);

  // Calcular cantidad total de items
  useEffect(() => {
    if (carrito?.items) {
      const total = carrito.items.reduce((sum, item) => sum + item.cantidad, 0);
      setCantidadTotal(total);
    } else {
      setCantidadTotal(0);
    }
  }, [carrito]);

  const cargarCarrito = async () => {
    try {
      setLoading(true);
      const data = await carritoService.getCarrito();
      setCarrito(data);
    } catch (error) {
      console.error('Error cargando carrito:', error);
    } finally {
      setLoading(false);
    }
  };

  const agregarProducto = async (productoId, cantidad = 1) => {
    try {
      setLoading(true);
      const data = await carritoService.agregarProducto(productoId, cantidad);
      setCarrito(data);
      return data;
    } catch (error) {
      console.error('Error agregando producto:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const actualizarCantidad = async (itemId, cantidad) => {
    try {
      setLoading(true);
      const data = await carritoService.actualizarCantidad(itemId, cantidad);
      setCarrito(data);
    } catch (error) {
      console.error('Error actualizando cantidad:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const eliminarItem = async (itemId) => {
    try {
      setLoading(true);
      const data = await carritoService.eliminarItem(itemId);
      setCarrito(data);
    } catch (error) {
      console.error('Error eliminando item:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const vaciarCarrito = async () => {
    try {
      setLoading(true);
      await carritoService.vaciarCarrito();
      setCarrito(null);
    } catch (error) {
      console.error('Error vaciando carrito:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    carrito,
    loading,
    cantidadTotal,
    cargarCarrito,
    agregarProducto,
    actualizarCantidad,
    eliminarItem,
    vaciarCarrito
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};

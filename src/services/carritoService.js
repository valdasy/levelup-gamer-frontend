import api from './api';

const carritoService = {
  // Obtener carrito actual
  getCarrito: async () => {
    const response = await api.get('/carrito');
    return response.data;
  },

  // Agregar producto al carrito
  agregarProducto: async (productoId, cantidad) => {
    const response = await api.post(`/carrito/agregar?productoId=${productoId}&cantidad=${cantidad}`);
    return response.data;
  },

  // Actualizar cantidad de un item
  actualizarCantidad: async (itemId, cantidad) => {
    const response = await api.put(`/carrito/actualizar/${itemId}?cantidad=${cantidad}`);
    return response.data;
  },

  // Eliminar item del carrito
  eliminarItem: async (itemId) => {
    const response = await api.delete(`/carrito/eliminar/${itemId}`);
    return response.data;
  },

  // Vaciar carrito
  vaciarCarrito: async () => {
    const response = await api.delete('/carrito/vaciar');
    return response.data;
  }
};

export default carritoService;

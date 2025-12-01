import api from './api';

const productoService = {
  // Obtener todos los productos activos
  getProductosActivos: async () => {
    const response = await api.get('/productos/activos');
    return response.data;
  },

  // Obtener productos destacados
  getProductosDestacados: async () => {
    const response = await api.get('/productos/destacados');
    return response.data;
  },

  // Obtener producto por ID
  getProductoPorId: async (id) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  // Obtener productos por categoría
  getProductosPorCategoria: async (categoriaId) => {
    const response = await api.get(`/productos/categoria/${categoriaId}`);
    return response.data;
  },

  // Buscar productos
  buscarProductos: async (nombre) => {
    const response = await api.get(`/productos/buscar?nombre=${nombre}`);
    return response.data;
  },

  // Crear producto (solo admin)
  crearProducto: async (producto) => {
    const response = await api.post('/productos', producto);
    return response.data;
  },

  // Actualizar producto (solo admin)
  actualizarProducto: async (id, producto) => {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  },

  // Eliminar producto (solo admin)
  eliminarProducto: async (id) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  }
};

export default productoService;

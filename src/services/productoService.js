import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8081/api/productos";

// Función helper para obtener headers con token
const getAuthHeaders = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const productoService = {
  // Obtener todos los productos (para admin)
  getProductos: async () => {
    try {
      console.log("🔍 Llamando a:", API_URL);
      const response = await axios.get(API_URL, {
        headers: getAuthHeaders(),
      });
      console.log("✅ Productos obtenidos:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
      console.error("❌ Error response:", error.response);
      throw error;
    }
  },

  // Obtener productos activos
  getProductosActivos: async () => {
    try {
      const response = await axios.get(`${API_URL}/activos`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos activos:", error);
      throw error;
    }
  },

  // Obtener productos destacados
  getProductosDestacados: async () => {
    try {
      const response = await axios.get(`${API_URL}/destacados`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos destacados:", error);
      throw error;
    }
  },

  // Obtener productos disponibles
  getProductosDisponibles: async () => {
    try {
      const response = await axios.get(`${API_URL}/disponibles`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos disponibles:", error);
      throw error;
    }
  },

  // Obtener producto por ID
  getProductoPorId: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener producto:", error);
      throw error;
    }
  },

  // Obtener por categoría
  getProductosPorCategoria: async (categoriaId) => {
    try {
      const response = await axios.get(`${API_URL}/categoria/${categoriaId}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos por categoría:", error);
      throw error;
    }
  },

  // Buscar por nombre
  buscarProductos: async (nombre) => {
    try {
      const response = await axios.get(`${API_URL}/buscar`, {
        params: { nombre },
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error al buscar productos:", error);
      throw error;
    }
  },

  // Crear producto
  crearProducto: async (producto) => {
    try {
      console.log("📝 Creando producto:", producto);
      const response = await axios.post(API_URL, producto, {
        headers: getAuthHeaders(),
      });
      console.log("✅ Producto creado:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al crear producto:", error);
      console.error("❌ Error response:", error.response?.data);
      throw error;
    }
  },

  // Actualizar producto
  actualizarProducto: async (id, producto) => {
    try {
      console.log("📝 Actualizando producto:", id, producto);
      const response = await axios.put(`${API_URL}/${id}`, producto, {
        headers: getAuthHeaders(),
      });
      console.log("✅ Producto actualizado:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al actualizar producto:", error);
      console.error("❌ Error response:", error.response?.data);
      throw error;
    }
  },

  // Eliminar producto
  eliminarProducto: async (id) => {
    try {
      console.log("🗑️ Eliminando producto:", id);
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: getAuthHeaders(),
      });
      console.log("✅ Producto eliminado:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
      console.error("❌ Error response:", error.response?.data);
      throw error;
    }
  },

  // Cambiar estado
  cambiarEstadoProducto: async (id, activo) => {
    try {
      console.log("🔄 Cambiando estado del producto:", id, "activo:", activo);
      const response = await axios.patch(`${API_URL}/${id}/estado`, null, {
        params: { activo },
        headers: getAuthHeaders(),
      });
      console.log("✅ Estado cambiado:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
      console.error("❌ Error response:", error.response?.data);
      throw error;
    }
  },

  // Actualizar stock
  actualizarStockProducto: async (id, cantidad) => {
    try {
      console.log(
        "📦 Actualizando stock del producto:",
        id,
        "cantidad:",
        cantidad
      );
      const response = await axios.patch(`${API_URL}/${id}/stock`, null, {
        params: { cantidad },
        headers: getAuthHeaders(),
      });
      console.log("✅ Stock actualizado:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error al actualizar stock:", error);
      console.error("❌ Error response:", error.response?.data);
      throw error;
    }
  },
};

export default productoService;

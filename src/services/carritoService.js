import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:8081/api/carrito";

// Función helper para obtener headers con token
const getAuthHeaders = () => {
  const token = authService.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const carritoService = {
  // Obtener carrito del usuario actual
  obtenerCarrito: async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener carrito:", error);
      throw error;
    }
  },

  // Agregar producto al carrito
  agregarProducto: async (productoId, cantidad = 1) => {
    try {
      const response = await axios.post(`${API_URL}/agregar`, null, {
        params: { productoId, cantidad },
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      throw error;
    }
  },

  // Actualizar cantidad de un item
  actualizarCantidad: async (itemId, cantidad) => {
    try {
      const response = await axios.put(
        `${API_URL}/actualizar/${itemId}`,
        null,
        {
          params: { cantidad },
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      throw error;
    }
  },

  // Eliminar item del carrito
  eliminarItem: async (itemId) => {
    try {
      const response = await axios.delete(`${API_URL}/eliminar/${itemId}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error al eliminar item:", error);
      throw error;
    }
  },

  // Vaciar carrito
  vaciarCarrito: async () => {
    try {
      const response = await axios.delete(`${API_URL}/vaciar`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
      throw error;
    }
  },
};

export default carritoService;

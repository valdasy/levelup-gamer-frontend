import api from './api';

const categoriaService = {
  // Obtener categorías activas
  getCategoriasActivas: async () => {
    const response = await api.get('/categorias/activas');
    return response.data;
  },

  // Obtener todas las categorías
  getCategorias: async () => {
    const response = await api.get('/categorias');
    return response.data;
  }
};

export default categoriaService;

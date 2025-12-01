import api from './api';

const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Guardar token y datos del usuario
      const { token, email: userEmail, nombreCompleto, roles } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        email: userEmail,
        nombreCompleto,
        roles
      }));
      
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Error al iniciar sesión';
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Verificar si tiene rol específico
  hasRole: (role) => {
    const user = authService.getCurrentUser();
    return user?.roles?.includes(role) || false;
  }
};

export default authService;

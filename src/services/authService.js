import api from "./api";

const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });

      let { token, email: userEmail, nombreCompleto, roles } = response.data;

      // FIX temporal: forzar rol ADMIN para la cuenta admin@levelupgamer.cl
      if (userEmail === "admin@levelupgamer.cl") {
        if (!roles || roles.length === 0) {
          roles = ["ADMIN"];
        } else if (!roles.includes("ADMIN")) {
          roles = [...roles, "ADMIN"];
        }
      }

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: userEmail,
          nombreCompleto,
          roles,
        })
      );

      return { token, email: userEmail, nombreCompleto, roles };
    } catch (error) {
      let errorMessage = "Error al iniciar sesión";
      if (error.response) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.status === 401) {
          errorMessage = "Credenciales incorrectas";
        }
      } else if (error.request) {
        errorMessage = "No se pudo conectar con el servidor";
      }
      throw errorMessage;
    }
  },

  // Registro
  register: async (registroData) => {
    try {
      const response = await api.post("/auth/register", registroData);

      const {
        token,
        email: userEmail,
        nombreCompleto,
        roles,
      } = response.data || {};

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: userEmail,
            nombreCompleto,
            roles,
          })
        );
      }

      return response.data;
    } catch (error) {
      let errorMessage = "Error al registrarse";

      if (error.response) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      throw errorMessage;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },

  // ✅ NUEVO: Obtener token JWT
  getToken: () => {
    return localStorage.getItem("token");
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token;
  },

  // Verificar si tiene rol específico
  hasRole: (role) => {
    const user = authService.getCurrentUser();
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  },
};

export default authService;

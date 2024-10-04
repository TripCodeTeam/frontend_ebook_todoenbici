// Define la estructura de un usuario autenticado
export interface AuthUser {
  id: string; // El ID del usuario
  name: string; // Nombre del usuario
  email: string; // Correo electrónico
  role: string; // Rol del usuario (ej: 'admin', 'user', etc.)
  // Añade otros campos relevantes según la información de usuario que manejes
}

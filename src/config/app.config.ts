/**
 * Configuración centralizada de la aplicación
 */
export const appConfig = {
  // Información de la aplicación
  name: 'ComunidadPro API',
  version: '1.0.0',
  description: 'API REST para gestión de restauración y finanzas',

  // Permisos disponibles
  permissions: {
    USUARIOS: 'Usuarios',
    PERSONAS: 'Personas',
    MINISTERIOS: 'Ministerios',
    TRANSACCIONES: 'Transacciones',
  },

  // Roles del sistema
  roles: {
    ADMIN: 'admin',
    USER: 'user',
  },

  // Estados de entidades
  entityStatus: {
    ACTIVE: 'Activo',
    INACTIVE: 'Inactivo',
  },

  // Tipos de ID
  idTypes: ['CC', 'TI', 'PAS', 'CE'] as const,

  // Estados civiles
  civilStatus: ['Soltero', 'Casado', 'Divorciado', 'Viudo', 'Unión Libre'] as const,

  // Tipos de membresía
  membershipTypes: ['Miembro', 'Visitante', 'Simpatizante'] as const,

  // Géneros
  genders: ['Masculino', 'Femenino', 'Otro'] as const,

  // Grupos de población
  populationGroups: ['Niño', 'Adulto'] as const,

  // Tipos de transacciones
  transactionTypes: ['Ingreso', 'Gasto'] as const,

// Medios de transacción
  medioTrxTypes: ['Efectivo', 'Transferencia'] as const,
};
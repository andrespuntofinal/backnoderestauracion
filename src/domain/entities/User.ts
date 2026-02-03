export class User {
  id?: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  permissions: string[]; // E.g., ['Ministerios', 'Transacciones', 'Personas']
  avatar?: string;
  createdAt?: Date;

  constructor(data: {
    id?: string;
    email: string;
    name: string;
    role: 'admin' | 'user';
    permissions: string[];
    avatar?: string;
    createdAt?: Date;
  }) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.role = data.role;
    this.permissions = data.permissions;
    this.avatar = data.avatar;
    this.createdAt = data.createdAt;
  }

  // Reglas de negocio (Métodos de dominio)
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  hasPermission(permission: string): boolean {
    return this.isAdmin() || this.permissions.includes(permission);
  }

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  addPermission(permission: string): void {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
    }
  }

  removePermission(permission: string): void {
    this.permissions = this.permissions.filter(p => p !== permission);
  }
}
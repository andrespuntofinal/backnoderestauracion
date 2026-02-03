export class Ministry {
  id?: string;
  name: string;
  status: 'Activo' | 'Inactivo';
  createdAt?: Date;

  constructor(data: {
    id?: string;
    name: string;
    status: 'Activo' | 'Inactivo';
    createdAt?: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.status = data.status;
    this.createdAt = data.createdAt;
  }

  // Reglas de negocio
  isActive(): boolean {
    return this.status === 'Activo';
  }

  deactivate(): void {
    this.status = 'Inactivo';
  }

  activate(): void {
    this.status = 'Activo';
  }
}